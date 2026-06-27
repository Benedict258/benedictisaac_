import { Resend } from "resend";

const EMAIL_ENABLED = process.env.EMAIL_ENABLED !== "false";

const from = process.env.EMAIL_FROM || process.env.SES_FROM_EMAIL;

const ensureEnv = (keys) => {
  keys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
};

let resend = null;

if (EMAIL_ENABLED) {
  ensureEnv(["RESEND_API_KEY"]);
  if (!from) {
    throw new Error(
      "Missing required environment variable: EMAIL_FROM (or SES_FROM_EMAIL)"
    );
  }
  resend = new Resend(process.env.RESEND_API_KEY);
}

const brandColor = process.env.EMAIL_BRAND_COLOR || "#d6f86b";

const wrapEmail = ({ title, bodyHtml, ctaLabel, ctaUrl }) => {
  const cta = ctaUrl
    ? `<a href="${ctaUrl}" style="display:inline-block;padding:12px 18px;border-radius:10px;background:${brandColor};color:#000;text-decoration:none;font-weight:600;">${ctaLabel}</a>`
    : "";
  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;background:#f8fafc;padding:24px;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;">
        <div style="margin-bottom:16px;">
          <div style="font-size:12px;letter-spacing:0.3em;text-transform:uppercase;color:#64748b;">Benedict Isaac</div>
          <h1 style="margin:10px 0 0;font-size:22px;">${title}</h1>
        </div>
        <div style="font-size:15px;line-height:1.6;color:#334155;">
          ${bodyHtml}
        </div>
        <div style="margin-top:20px;">${cta}</div>
        <div style="margin-top:24px;font-size:12px;color:#94a3b8;">
          Need help? Reply to this email.
        </div>
      </div>
    </div>
  `;
};

const sendEmail = async ({ to, subject, html, text }) => {
  if (!EMAIL_ENABLED) {
    console.warn("[email disabled]", { to, subject });
    return;
  }

  await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
  });
};

export const buildInvoiceCreatedEmail = ({
  invoiceId,
  clientName,
  amount,
  dueDate,
  instructions,
  invoiceUrl,
}) => ({
  subject: `Invoice #${invoiceId} from Benedict Isaac`,
  html: wrapEmail({
    title: `Invoice #${invoiceId}`,
    bodyHtml: `
      <p>Hi ${clientName},</p>
      <p>Your invoice is ready. Summary:</p>
      <ul>
        <li><strong>Invoice ID:</strong> ${invoiceId}</li>
        <li><strong>Amount:</strong> ${amount}</li>
        <li><strong>Due date:</strong> ${dueDate}</li>
      </ul>
      <p><strong>Payment instructions:</strong> ${instructions}</p>
    `,
    ctaLabel: "View Invoice",
    ctaUrl: invoiceUrl,
  }),
  text: `Hi ${clientName},

Your invoice is ready.
Invoice ID: ${invoiceId}
Amount: ${amount}
Due date: ${dueDate}
Payment instructions: ${instructions}

View invoice: ${invoiceUrl}

For questions, reply to this email.`,
});

export const buildPaymentSubmittedClientEmail = ({
  invoiceId,
  clientName,
}) => ({
  subject: `Payment Received – Pending Approval (Invoice #${invoiceId})`,
  html: wrapEmail({
    title: `Payment received for Invoice #${invoiceId}`,
    bodyHtml: `
      <p>Hi ${clientName},</p>
      <p>Your payment has been received and is currently pending verification.</p>
      <p>No action is required at this time.</p>
    `,
  }),
  text: `Hi ${clientName},

Your payment has been received and is currently pending verification.
No action is required at this time.
If you need support, reply to this email.`,
});

export const buildPaymentSubmittedAdminEmail = ({
  invoiceId,
  clientName,
  amount,
  adminUrl,
}) => ({
  subject: `Payment Submitted for Invoice #${invoiceId}`,
  html: wrapEmail({
    title: `Payment submitted for Invoice #${invoiceId}`,
    bodyHtml: `
      <p>Payment submitted.</p>
      <ul>
        <li><strong>Client:</strong> ${clientName}</li>
        <li><strong>Amount:</strong> ${amount}</li>
      </ul>
    `,
    ctaLabel: "Review invoice",
    ctaUrl: adminUrl,
  }),
  text: `Payment submitted.
Client: ${clientName}
Amount: ${amount}
Review: ${adminUrl}`,
});

export const buildPaymentApprovedEmail = ({ invoiceId, clientName }) => ({
  subject: `Payment Confirmed – Invoice #${invoiceId}`,
  html: wrapEmail({
    title: `Payment confirmed for Invoice #${invoiceId}`,
    bodyHtml: `
      <p>Hi ${clientName},</p>
      <p>Your payment has been successfully verified and approved.</p>
      <p>Thank you for your business.</p>
    `,
  }),
  text: `Hi ${clientName},

Your payment has been successfully verified and approved.
Thank you for your business.`,
});

export const buildPaymentRejectedEmail = ({
  invoiceId,
  clientName,
  message,
}) => ({
  subject: `Payment Issue – Invoice #${invoiceId}`,
  html: wrapEmail({
    title: `Payment issue for Invoice #${invoiceId}`,
    bodyHtml: `
      <p>Hi ${clientName},</p>
      <p>We could not verify your payment.</p>
      <p>${message}</p>
      <p>Please reply with clarification or re-upload the receipt.</p>
    `,
  }),
  text: `Hi ${clientName},

We could not verify your payment.
${message}
Please reply with clarification or re-upload the receipt.`,
});

export const sendInvoiceCreatedEmail = (payload) =>
  sendEmail({ to: payload.to, ...buildInvoiceCreatedEmail(payload) });

export const sendPaymentSubmittedClientEmail = (payload) =>
  sendEmail({ to: payload.to, ...buildPaymentSubmittedClientEmail(payload) });

export const sendPaymentSubmittedAdminEmail = (payload) =>
  sendEmail({ to: payload.to, ...buildPaymentSubmittedAdminEmail(payload) });

export const sendPaymentApprovedEmail = (payload) =>
  sendEmail({ to: payload.to, ...buildPaymentApprovedEmail(payload) });

export const sendPaymentRejectedEmail = (payload) =>
  sendEmail({ to: payload.to, ...buildPaymentRejectedEmail(payload) });
