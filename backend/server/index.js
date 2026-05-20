import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import crypto from "crypto";

import {
  issueSessionCookie,
  clearSessionCookie,
  requireAdmin,
  isAdminAuthenticated,
} from "./auth.js";
import { supabase, SIGNATURE_BUCKET, RECEIPTS_BUCKET } from "./supabase.js";
import {
  sendInvoiceCreatedEmail,
  sendPaymentSubmittedClientEmail,
  sendPaymentSubmittedAdminEmail,
  sendPaymentApprovedEmail,
  sendPaymentRejectedEmail,
} from "./email.js";
import PDFDocument from "pdfkit";

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

const requiredEnv = [
  "INVOICE_ADMIN_PASSCODE",
  "SESSION_SECRET",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SES_FROM_EMAIL",
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Missing environment variable: ${key}`);
  }
});

const ADMIN_NOTIFY_EMAIL =
  process.env.ADMIN_NOTIFY_EMAIL || process.env.SES_FROM_EMAIL;
const EMAIL_ADMIN_ONLY = process.env.EMAIL_ADMIN_ONLY === "true";

const ensureStatus = (value) => {
  const normalized = value?.toLowerCase?.() ?? "unpaid";
  if (
    ["unpaid", "payment_submitted", "approved", "rejected"].includes(normalized)
  ) {
    return normalized;
  }
  return "unpaid";
};

const sendUpstreamError = (res, error, fallbackMessage) => {
  const message = error?.message || fallbackMessage;
  if (message.includes("fetch failed")) {
    return res.status(503).json({
      error: "Supabase is unreachable. Check SUPABASE_URL and DNS/network connectivity.",
    });
  }
  return res.status(500).json({ error: message });
};

const formatCurrency = (amount, currency) => {
  if (amount === null || amount === undefined) return "";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  } catch {
    return `${amount} ${currency || "USD"}`;
  }
};

const brandColor = process.env.EMAIL_BRAND_COLOR || "#d6f86b";

const generateInvoicePdf = async (invoice, items, assets = {}) =>
  new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    if (assets.logo) {
      try {
        doc.image(assets.logo, 50, 45, { width: 120 });
      } catch {
        // ignore logo failures
      }
    }

    doc
      .fillColor(brandColor)
      .fontSize(22)
      .text("Invoice", 50, 50, { align: "right" })
      .fillColor("#0f172a");

    doc
      .fontSize(11)
      .text(`Invoice ID: ${invoice.invoice_id}`, { align: "right" })
      .text(`Issue date: ${invoice.issue_date || "—"}`, { align: "right" })
      .text(`Due date: ${invoice.due_date || "—"}`, { align: "right" });

    doc.moveDown(1.5);
    doc.fontSize(14).text("Billed to");
    doc.fontSize(12).text(invoice.client_name);
    doc.text(invoice.client_email);
    if (invoice.company_name) doc.text(invoice.company_name);
    if (invoice.billing_address) doc.text(invoice.billing_address);

    doc.moveDown(1);
    doc.fontSize(14).text(invoice.title);
    if (invoice.description) {
      doc.fontSize(11).fillColor("#475569").text(invoice.description);
      doc.fillColor("#0f172a");
    }

    doc.moveDown(1);
    doc.fontSize(12).text("Items");
    doc.moveDown(0.5);

    const tableTop = doc.y;
    const colX = [50, 320, 380, 460];
    doc
      .fillColor(brandColor)
      .rect(50, tableTop, 515 - 50, 20)
      .fill();
    doc.fillColor("#0f172a").fontSize(10);
    doc.text("Item", colX[0] + 8, tableTop + 5);
    doc.text("Qty", colX[1] + 8, tableTop + 5);
    doc.text("Unit", colX[2] + 8, tableTop + 5);
    doc.text("Subtotal", colX[3] + 8, tableTop + 5);

    let rowY = tableTop + 26;
    items.forEach((item) => {
      doc
        .fillColor("#0f172a")
        .fontSize(10)
        .text(item.item_name, colX[0] + 8, rowY, { width: 250 });
      doc.text(String(item.quantity), colX[1] + 8, rowY);
      doc.text(formatCurrency(item.unit_price, invoice.currency), colX[2] + 8, rowY);
      doc.text(formatCurrency(item.subtotal, invoice.currency), colX[3] + 8, rowY);
      rowY += 18;
    });

    doc.moveDown(1);
    doc.y = Math.max(doc.y, rowY + 10);

    doc.moveDown(1);
    doc.text(`Subtotal: ${formatCurrency(invoice.subtotal, invoice.currency)}`);
    doc.text(`Tax: ${formatCurrency(invoice.tax, invoice.currency)}`);
    doc.text(`Discount: -${formatCurrency(invoice.discount, invoice.currency)}`);
    doc.fontSize(14).text(`Total: ${formatCurrency(invoice.total, invoice.currency)}`);

    doc.moveDown(1);
    doc.fontSize(12).text("Payment instructions");
    if (invoice.payment_instructions?.account_name) {
      doc.text(`Account name: ${invoice.payment_instructions.account_name}`);
    }
    if (invoice.payment_instructions?.bank_name) {
      doc.text(`Bank name: ${invoice.payment_instructions.bank_name}`);
    }
    if (invoice.payment_instructions?.account_number) {
      doc.text(`Account number: ${invoice.payment_instructions.account_number}`);
    }
    if (invoice.payment_instructions?.reference) {
      doc.text(`Reference: ${invoice.payment_instructions.reference}`);
    }

    if (assets.signature) {
      try {
        doc.moveDown(1);
        doc.text("Authorized signature");
        doc.image(assets.signature, 50, doc.y + 5, { width: 140 });
        doc.moveDown(3);
      } catch {
        // ignore signature failures
      }
    }

    if (invoice.footer_note) {
      doc.moveDown(1);
      doc.fontSize(11).fillColor("#64748b").text(invoice.footer_note);
    }

    doc.end();
  });

const fetchBinary = async (url) => {
  if (!url) return null;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

const generateInvoiceId = () =>
  `INV-${new Date().getFullYear()}-${crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase()}`;

const getSignedUrl = async (bucket, pathValue) => {
  if (!pathValue) return null;
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(pathValue, 60 * 60);
  if (error) {
    console.warn("Failed to sign url", error.message);
    return null;
  }
  return data?.signedUrl ?? null;
};

const uploadToBucket = async (bucket, file, prefix) => {
  if (!file) return null;
  const ext = file.originalname?.split(".").pop() || "bin";
  const pathValue = `${prefix}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(pathValue, file.buffer, {
    contentType: file.mimetype,
    upsert: true,
  });
  if (error) {
    throw new Error(error.message);
  }
  return pathValue;
};

const downloadFromBucket = async (bucket, pathValue) => {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(pathValue);
    if (error) {
      return { error };
    }

    // Try common ways to read the returned data
    if (data?.arrayBuffer) {
      const buf = Buffer.from(await data.arrayBuffer());
      return { buffer: buf };
    }

    // Node Readable stream
    if (data && typeof data.pipe === "function") {
      const chunks = [];
      for await (const chunk of data) chunks.push(chunk);
      return { buffer: Buffer.concat(chunks) };
    }

    // Fallback: return null
    return { buffer: null };
  } catch (err) {
    return { error: err };
  }
};

const BRANDING_ID = "00000000-0000-0000-0000-000000000001";
const DASHBOARD_STATE_ID = "00000000-0000-0000-0000-000000000002";

const fetchBranding = async () => {
  const { data } = await supabase
    .from("branding_settings")
    .select("*")
    .eq("id", BRANDING_ID)
    .maybeSingle();
  return data;
};

const insertEvent = async (invoiceId, status, note = null) => {
  await supabase.from("invoice_events").insert({
    invoice_id: invoiceId,
    status,
    note,
  });
};

app.post("/api/auth/login", (req, res) => {
  const passcode = req.body?.passcode;
  if (!passcode || passcode !== process.env.INVOICE_ADMIN_PASSCODE) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  issueSessionCookie(res, process.env.SESSION_SECRET);
  return res.json({ authenticated: true });
});

app.post("/api/auth/logout", (req, res) => {
  clearSessionCookie(res);
  return res.json({ ok: true });
});

app.get("/api/auth/me", (req, res) => {
  res.json({ authenticated: isAdminAuthenticated(req) });
});

app.get("/api/admin/dashboard-state", requireAdmin, async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("dashboard_state")
      .select("state, updated_at")
      .eq("id", DASHBOARD_STATE_ID)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    res.json({
      state: data?.state || null,
      updated_at: data?.updated_at || null,
    });
  } catch (error) {
    return sendUpstreamError(res, error, "Failed to load dashboard state.");
  }
});

app.put("/api/admin/dashboard-state", requireAdmin, async (req, res) => {
  try {
    const state = req.body?.state;
    if (!state || typeof state !== "object" || Array.isArray(state)) {
      return res.status(400).json({ error: "Invalid dashboard state payload." });
    }

    const { data, error } = await supabase
      .from("dashboard_state")
      .upsert({
        id: DASHBOARD_STATE_ID,
        state,
        updated_at: new Date().toISOString(),
      })
      .select("state, updated_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    res.json({
      state: data?.state || null,
      updated_at: data?.updated_at || null,
    });
  } catch (error) {
    return sendUpstreamError(res, error, "Failed to save dashboard state.");
  }
});

app.get("/api/admin/branding", requireAdmin, async (req, res) => {
  const branding = await fetchBranding();
  const signatureUrl = await getSignedUrl(
    SIGNATURE_BUCKET,
    branding?.signature_path
  );
  const logoUrl = await getSignedUrl(SIGNATURE_BUCKET, branding?.logo_path);
  res.json({
    ...branding,
    signatureUrl,
    logoUrl,
  });
});

app.post(
  "/api/admin/branding",
  requireAdmin,
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const signatureFile = req.files?.signature?.[0];
      const logoFile = req.files?.logo?.[0];
      const footerNote = req.body?.footer_note || null;

      const signaturePath = signatureFile
        ? await uploadToBucket(SIGNATURE_BUCKET, signatureFile, "signature")
        : null;
      const logoPath = logoFile
        ? await uploadToBucket(SIGNATURE_BUCKET, logoFile, "logo")
        : null;

      const payload = {
        id: BRANDING_ID,
        footer_note: footerNote,
      };

      if (signaturePath) payload.signature_path = signaturePath;
      if (logoPath) payload.logo_path = logoPath;

      const { data, error } = await supabase
        .from("branding_settings")
        .upsert(payload)
        .select()
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      res.json({
        ...data,
        signatureUrl: await getSignedUrl(SIGNATURE_BUCKET, data?.signature_path),
        logoUrl: await getSignedUrl(SIGNATURE_BUCKET, data?.logo_path),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.post("/api/admin/invoices", requireAdmin, async (req, res) => {
  try {
    const payload = req.body || {};
    const items = payload.items || [];
    if (!payload.client_name || !payload.client_email || !payload.title) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const invoiceId = payload.invoice_id || generateInvoiceId();
    const publicId = crypto.randomUUID();
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.subtotal || item.quantity * item.unit_price || 0),
      0
    );
    const tax = Number(payload.tax || 0);
    const discount = Number(payload.discount || 0);
    const total = subtotal + tax - discount;

    const branding = await fetchBranding();

    const { data: invoice, error } = await supabase
      .from("invoices")
      .insert({
        public_id: publicId,
        client_name: payload.client_name,
        client_email: payload.client_email,
        company_name: payload.company_name || null,
        billing_address: payload.billing_address || null,
        invoice_id: invoiceId,
        issue_date: payload.issue_date,
        due_date: payload.due_date,
        currency: payload.currency || "USD",
        payment_terms: payload.payment_terms || null,
        status: "unpaid",
        title: payload.title,
        description: payload.description || null,
        subtotal,
        tax,
        discount,
        total,
        payment_instructions: payload.payment_instructions || null,
        footer_note: payload.footer_note || branding?.footer_note || null,
        signature_path: branding?.signature_path || null,
        logo_path: branding?.logo_path || null,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (items.length) {
      const lineItems = items.map((item) => ({
        invoice_id: invoice.id,
        item_name: item.item_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        subtotal: item.subtotal || item.quantity * item.unit_price,
      }));
      const { error: itemsError } = await supabase
        .from("invoice_items")
        .insert(lineItems);
      if (itemsError) throw new Error(itemsError.message);
    }

    await insertEvent(invoice.id, "unpaid", "Invoice created");

    const baseUrl =
      payload.public_base_url || process.env.PUBLIC_BASE_URL || "";
    const invoiceUrl = `${baseUrl}/invoice/${publicId}`;
    if (!EMAIL_ADMIN_ONLY) {
      await sendInvoiceCreatedEmail({
        to: payload.client_email,
        invoiceId,
        clientName: payload.client_name,
        amount: formatCurrency(total, payload.currency),
        dueDate: payload.due_date,
        instructions:
          payload.payment_instructions?.reference ||
          "See invoice for payment instructions.",
        invoiceUrl,
      });
    }

    res.json({ invoice, publicUrl: invoiceUrl });
  } catch (error) {
    return sendUpstreamError(res, error, "Failed to create invoice.");
  }
});

// Get project metadata and file list
app.get("/api/admin/projects/:slug", requireAdmin, async (req, res) => {
  try {
    const { slug } = req.params;
    const metaPath = `projects/${slug}/meta.json`;
    const { buffer, error: dlError } = await downloadFromBucket(PROJECTS_BUCKET, metaPath);
    let meta = null;
    if (dlError) {
      // if not found, return empty meta
      if (dlError?.status === 404) {
        meta = null;
      } else {
        throw dlError;
      }
    } else if (buffer) {
      try {
        meta = JSON.parse(buffer.toString("utf-8"));
      } catch (e) {
        meta = null;
      }
    }

    // list screenshots and other files
    const listPrefix = `projects/${slug}/screenshots`;
    const { data: listData, error: listError } = await supabase.storage.from(PROJECTS_BUCKET).list(listPrefix);
    if (listError) {
      // if folder doesn't exist, return empty files
      if (listError?.status !== 404) throw listError;
    }

    const files = [];
    if (Array.isArray(listData)) {
      for (const f of listData) {
        const signed = await getSignedUrl(PROJECTS_BUCKET, `${listPrefix}/${f.name}`);
        files.push({ name: f.name, path: `${listPrefix}/${f.name}`, url: signed });
      }
    }

    res.json({ meta, files });
  } catch (error) {
    return sendUpstreamError(res, error, "Failed to load project metadata.");
  }
});

// Get blog metadata and files
app.get("/api/admin/blogs/:slug", requireAdmin, async (req, res) => {
  try {
    const { slug } = req.params;
    const metaPath = `blogs/${slug}/meta.json`;
    const { buffer, error: dlError } = await downloadFromBucket(PROJECTS_BUCKET, metaPath);
    let meta = null;
    if (dlError) {
      if (dlError?.status === 404) {
        meta = null;
      } else {
        throw dlError;
      }
    } else if (buffer) {
      try {
        meta = JSON.parse(buffer.toString("utf-8"));
      } catch (e) {
        meta = null;
      }
    }

    const listPrefix = `blogs/${slug}`;
    const { data: listData, error: listError } = await supabase.storage.from(PROJECTS_BUCKET).list(listPrefix);
    if (listError) {
      if (listError?.status !== 404) throw listError;
    }

    const files = [];
    if (Array.isArray(listData)) {
      for (const f of listData) {
        const signed = await getSignedUrl(PROJECTS_BUCKET, `${listPrefix}/${f.name}`);
        files.push({ name: f.name, path: `${listPrefix}/${f.name}`, url: signed });
      }
    }

    res.json({ meta, files });
  } catch (error) {
    return sendUpstreamError(res, error, "Failed to load blog metadata.");
  }
});

// Save blog metadata and image upload
app.post(
  "/api/admin/blogs/:slug",
  requireAdmin,
  upload.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { slug } = req.params;
      const metaRaw = req.body?.meta;
      const meta = metaRaw ? JSON.parse(metaRaw) : {};

      const metaPath = `blogs/${slug}/meta.json`;
      const { error: writeMetaError } = await supabase.storage.from(PROJECTS_BUCKET).upload(
        metaPath,
        Buffer.from(JSON.stringify(meta)),
        { contentType: "application/json", upsert: true },
      );
      if (writeMetaError) throw writeMetaError;

      const uploadedFiles = [];
      const imageFile = req.files?.image?.[0];
      if (imageFile) {
        const pathValue = await uploadToBucket(PROJECTS_BUCKET, imageFile, `blogs/${slug}`);
        uploadedFiles.push(pathValue);
      }

      const fileUrls = [];
      for (const p of uploadedFiles) {
        const url = await getSignedUrl(PROJECTS_BUCKET, p);
        fileUrls.push({ path: p, url });
      }

      res.json({ ok: true, meta, uploaded: fileUrls });
    } catch (error) {
      return sendUpstreamError(res, error, "Failed to save blog metadata.");
    }
  },
);

// Delete a blog file (image etc.)
app.delete("/api/admin/blogs/:slug/files", requireAdmin, async (req, res) => {
  try {
    const { slug } = req.params;
    const pathValue = req.body?.path || req.query?.path;
    if (!pathValue) return res.status(400).json({ error: "Missing file path." });

    const { error } = await supabase.storage.from(PROJECTS_BUCKET).remove([pathValue]);
    if (error) throw error;

    res.json({ ok: true });
  } catch (error) {
    return sendUpstreamError(res, error, "Failed to delete blog file.");
  }
});

// Save project metadata and accept file uploads
app.post(
  "/api/admin/projects/:slug",
  requireAdmin,
  upload.fields([{ name: "screenshots", maxCount: 20 }]),
  async (req, res) => {
    try {
      const { slug } = req.params;

      const metaRaw = req.body?.meta;
      const meta = metaRaw ? JSON.parse(metaRaw) : {};

      // save meta JSON to storage
      const metaPath = `projects/${slug}/meta.json`;
      const { error: writeMetaError } = await supabase.storage.from(PROJECTS_BUCKET).upload(
        metaPath,
        Buffer.from(JSON.stringify(meta)),
        { contentType: "application/json", upsert: true },
      );
      if (writeMetaError) throw writeMetaError;

      // handle file uploads
      const uploadedFiles = [];
      const screenshotFiles = req.files?.screenshots || [];
      for (const f of screenshotFiles) {
        const pathValue = await uploadToBucket(PROJECTS_BUCKET, f, `projects/${slug}/screenshots`);
        uploadedFiles.push(pathValue);
      }

      // return updated meta and file URLs
      const fileUrls = [];
      for (const p of uploadedFiles) {
        const url = await getSignedUrl(PROJECTS_BUCKET, p);
        fileUrls.push({ path: p, url });
      }

      res.json({ ok: true, meta, uploaded: fileUrls });
    } catch (error) {
      return sendUpstreamError(res, error, "Failed to save project metadata.");
    }
  },
);

    // Delete a file from a project (e.g., screenshot)
    app.delete("/api/admin/projects/:slug/files", requireAdmin, async (req, res) => {
      try {
        const { slug } = req.params;
        const pathValue = req.body?.path || req.query?.path;
        if (!pathValue) return res.status(400).json({ error: "Missing file path." });

        const { error } = await supabase.storage.from(PROJECTS_BUCKET).remove([pathValue]);
        if (error) throw error;

        res.json({ ok: true });
      } catch (error) {
        return sendUpstreamError(res, error, "Failed to delete project file.");
      }
    });

app.get("/api/admin/invoices", requireAdmin, async (req, res) => {
  try {
    const { status, client, from, to } = req.query;
    let query = supabase
      .from("invoices")
      .select("*, invoice_items(*)")
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (client) {
      query = query.or(
        `client_name.ilike.%${client}%,client_email.ilike.%${client}%`
      );
    }
    if (from) query = query.gte("issue_date", from);
    if (to) query = query.lte("issue_date", to);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    res.json({ invoices: data });
  } catch (error) {
    return sendUpstreamError(res, error, "Failed to load invoices.");
  }
});

app.get("/api/admin/invoices/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("invoices")
    .select("*, invoice_items(*), invoice_events(*)")
    .eq("id", id)
    .single();
  if (error) return res.status(404).json({ error: error.message });

  const signatureUrl = await getSignedUrl(SIGNATURE_BUCKET, data.signature_path);
  const logoUrl = await getSignedUrl(SIGNATURE_BUCKET, data.logo_path);
  const receiptUrl = await getSignedUrl(RECEIPTS_BUCKET, data.receipt_path);

  res.json({
    invoice: {
      ...data,
      signatureUrl,
      logoUrl,
      receiptUrl,
    },
  });
});

app.post("/api/admin/invoices/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const status = ensureStatus(req.body?.status);
    const note = req.body?.note || null;

    const { data: invoice, error } = await supabase
      .from("invoices")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);

    await insertEvent(invoice.id, status, note);

    if (status === "approved" && !EMAIL_ADMIN_ONLY) {
      try {
        await sendPaymentApprovedEmail({
          to: invoice.client_email,
          invoiceId: invoice.invoice_id,
          clientName: invoice.client_name,
        });
      } catch (emailError) {
        console.warn("Approval email failed:", emailError.message);
      }
    }

    if (status === "rejected" && !EMAIL_ADMIN_ONLY) {
      try {
        await sendPaymentRejectedEmail({
          to: invoice.client_email,
          invoiceId: invoice.invoice_id,
          clientName: invoice.client_name,
          message: note || "Please re-upload your receipt.",
        });
      } catch (emailError) {
        console.warn("Rejection email failed:", emailError.message);
      }
    }

    res.json({ invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/admin/invoices/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { data: invoice, error: fetchError } = await supabase
      .from("invoices")
      .select("receipt_path")
      .eq("id", id)
      .single();
    if (fetchError) throw new Error(fetchError.message);

    if (invoice?.receipt_path) {
      const { error: removeError } = await supabase.storage
        .from(RECEIPTS_BUCKET)
        .remove([invoice.receipt_path]);
      if (removeError) {
        console.warn("Failed to remove receipt:", removeError.message);
      }
    }

    const { error } = await supabase.from("invoices").delete().eq("id", id);
    if (error) throw new Error(error.message);

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/public/invoices/:publicId", async (req, res) => {
  const { publicId } = req.params;
  const { data, error } = await supabase
    .from("invoices")
    .select("*, invoice_items(*)")
    .eq("public_id", publicId)
    .single();
  if (error) return res.status(404).json({ error: "Invoice not found." });

  const signatureUrl = await getSignedUrl(SIGNATURE_BUCKET, data.signature_path);
  const logoUrl = await getSignedUrl(SIGNATURE_BUCKET, data.logo_path);

  res.json({
    invoice: {
      ...data,
      signatureUrl,
      logoUrl,
    },
  });
});

app.get("/api/public/invoices/:publicId/pdf", async (req, res) => {
  const { publicId } = req.params;
  const { data, error } = await supabase
    .from("invoices")
    .select("*, invoice_items(*)")
    .eq("public_id", publicId)
    .single();
  if (error) return res.status(404).json({ error: "Invoice not found." });

  const logoUrl = await getSignedUrl(SIGNATURE_BUCKET, data.logo_path);
  const signatureUrl = await getSignedUrl(SIGNATURE_BUCKET, data.signature_path);
  const [logo, signature] = await Promise.all([
    fetchBinary(logoUrl),
    fetchBinary(signatureUrl),
  ]);

  const pdfBuffer = await generateInvoicePdf(data, data.invoice_items || [], {
    logo,
    signature,
  });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${data.invoice_id}.pdf"`
  );
  res.send(pdfBuffer);
});

app.post(
  "/api/public/invoices/:publicId/payment",
  upload.single("receipt"),
  async (req, res) => {
    try {
      const { publicId } = req.params;
      const receipt = req.file;
      const description = req.body?.description || null;
      if (!receipt) {
        return res.status(400).json({ error: "Receipt is required." });
      }
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "application/pdf",
      ];
      if (!allowedTypes.includes(receipt.mimetype)) {
        return res.status(400).json({ error: "Invalid file type." });
      }

      const { data: invoice, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("public_id", publicId)
        .single();
      if (error) throw new Error("Invoice not found.");

      const receiptPath = await uploadToBucket(
        RECEIPTS_BUCKET,
        receipt,
        `invoice/${invoice.public_id}`
      );

      const { data: updated, error: updateError } = await supabase
        .from("invoices")
        .update({
          status: "payment_submitted",
          receipt_path: receiptPath,
          receipt_message: description,
        })
        .eq("id", invoice.id)
        .select()
        .single();
      if (updateError) throw new Error(updateError.message);

      await insertEvent(updated.id, "payment_submitted", description);

      if (!EMAIL_ADMIN_ONLY) {
        try {
          await sendPaymentSubmittedClientEmail({
            to: updated.client_email,
            invoiceId: updated.invoice_id,
            clientName: updated.client_name,
          });
        } catch (emailError) {
          console.warn("Client payment email failed:", emailError.message);
        }
      }
      try {
        await sendPaymentSubmittedAdminEmail({
          to: ADMIN_NOTIFY_EMAIL,
          invoiceId: updated.invoice_id,
          clientName: updated.client_name,
          amount: formatCurrency(updated.total, updated.currency),
          adminUrl: `${process.env.PUBLIC_BASE_URL || ""}/admin`,
        });
      } catch (emailError) {
        console.warn("Admin payment email failed:", emailError.message);
      }

      res.json({ status: updated.status });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
