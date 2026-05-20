import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import projectsData, { type Project } from "@/data/projects";
import blogsData from "@/data/blogs";
import { useToast } from "@/components/ui/use-toast";
import { apiUrl } from "@/lib/api";

type InvoiceItem = {
  item_name: string;
  quantity: number;
  unit_price: number;
};

type Invoice = {
  id: string;
  public_id: string;
  invoice_id: string;
  client_name: string;
  client_email: string;
  status: string;
  total: number;
  currency: string;
  due_date?: string;
  issue_date?: string;
  receipt_message?: string | null;
  receiptUrl?: string | null;
};

const emptyItem: InvoiceItem = { item_name: "", quantity: 1, unit_price: 0 };

const formatCurrency = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(value || 0);
  } catch {
    return `${value || 0} ${currency || "USD"}`;
  }
};

const Admin = () => {
  const { toast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [branding, setBranding] = useState<{ signatureUrl?: string | null; logoUrl?: string | null; footer_note?: string | null }>({});
  const [brandingUploading, setBrandingUploading] = useState(false);

  const [items, setItems] = useState<InvoiceItem[]>([{ ...emptyItem }]);
  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    company_name: "",
    billing_address: "",
    issue_date: "",
    due_date: "",
    currency: "USD",
    payment_terms: "Net 7",
    title: "",
    description: "",
    tax: 0,
    discount: 0,
    account_name: "",
    bank_name: "",
    account_number: "",
    payment_reference: "",
    footer_note: "",
  });

  const [createdLink, setCreatedLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [projectSlug, setProjectSlug] = useState<string | null>(projectsData[0]?.slug ?? null);
  const [projectMeta, setProjectMeta] = useState<any>(null);
  const [projectFiles, setProjectFiles] = useState<Array<{ name: string; path: string; url: string }>>([]);
  const [newScreenshots, setNewScreenshots] = useState<File[]>([]);
  const [projLoading, setProjLoading] = useState(false);
  const [projectForm, setProjectForm] = useState<any>(null);
  const [projectUploading, setProjectUploading] = useState(false);
  const [blogSlugAdmin, setBlogSlugAdmin] = useState<string | null>(blogsData[0]?.slug ?? null);
  const [blogForm, setBlogForm] = useState<any>(null);
  const [blogFiles, setBlogFiles] = useState<Array<{ name: string; path: string; url: string }>>([]);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogUploading, setBlogUploading] = useState(false);

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filters, setFilters] = useState({ status: "", client: "" });
  const detailRef = useRef<HTMLDivElement>(null);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unit_price) || 0),
        0,
      ),
    [items],
  );

  const total = useMemo(
    () => subtotal + Number(form.tax || 0) - Number(form.discount || 0),
    [subtotal, form.tax, form.discount],
  );

  const fetchWithAuth = async (
    path: string,
    init?: RequestInit,
    options: { handleUnauthorized?: boolean } = {},
  ) => {
    const { handleUnauthorized = true } = options;
    const res = await fetch(apiUrl(path), {
      credentials: "include",
      ...init,
    });

    if (res.status === 401 && handleUnauthorized) {
      setAuthenticated(false);
      setAuthChecked(true);
      setAuthError("Your session has expired. Please sign in again.");
    }

    return res;
  };

  const checkAuth = async () => {
    try {
      const res = await fetchWithAuth("/api/auth/me", undefined, {
        handleUnauthorized: false,
      });
      if (!res.ok) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setAuthenticated(Boolean(data?.authenticated));
    } catch {
      setAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  };

  const loadBranding = async () => {
    try {
      const res = await fetchWithAuth("/api/admin/branding");
      if (res.ok) {
        const data = await res.json();
        setBranding(data);
      }
    } catch {
      // ignore
    }
  };

  const loadInvoices = async () => {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.client) params.append("client", filters.client);
    const res = await fetchWithAuth(`/api/admin/invoices?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setInvoices(data.invoices || []);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadBranding();
      loadInvoices();
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated && projectSlug) loadProject(projectSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, projectSlug]);

  useEffect(() => {
    if (authenticated && blogSlugAdmin) loadBlogAdmin(blogSlugAdmin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, blogSlugAdmin]);

  const loadProject = async (slug: string) => {
    setProjLoading(true);
    try {
      const res = await fetchWithAuth(`/api/admin/projects/${slug}`);
      if (!res.ok) throw new Error("Failed to load project");
      const data = await res.json();
      setProjectMeta(data.meta || {});
      setProjectForm(data.meta || {});
      setProjectFiles(data.files || []);
      setNewScreenshots([]);
    } catch (err) {
      // ignore
    } finally {
      setProjLoading(false);
    }
  };

  const handleAddScreenshots = (files: FileList | null) => {
    if (!files) return;
    setNewScreenshots((prev) => [...prev, ...Array.from(files)]);
  };

  const loadBlogAdmin = async (slug: string) => {
    setBlogLoading(true);
    try {
      const res = await fetchWithAuth(`/api/admin/blogs/${slug}`);
      if (!res.ok) {
        // fallback to local data
        const local = blogsData.find((b) => b.slug === slug) || null;
        setBlogForm(local ? { ...local } : null);
        setBlogFiles([]);
        setBlogImageFile(null);
        return;
      }
      const data = await res.json();
      setBlogForm(data.meta || (blogsData.find((b) => b.slug === slug) || {}));
      setBlogFiles(data.files || []);
      setBlogImageFile(null);
    } catch (err) {
      const local = blogsData.find((b) => b.slug === slug) || null;
      setBlogForm(local ? { ...local } : null);
      setBlogFiles([]);
      setBlogImageFile(null);
    } finally {
      setBlogLoading(false);
    }
  };

  const handleBlogImageSelect = (files: FileList | null) => {
    if (!files || !files.length) return;
    setBlogImageFile(files[0]);
  };

  const handleRemoveBlogFile = async (filePath: string) => {
    if (!blogSlugAdmin) return;
    try {
      const res = await fetchWithAuth(`/api/admin/blogs/${blogSlugAdmin}/files`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: filePath }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setBlogFiles((prev) => prev.filter((f) => f.path !== filePath));
      toast({ title: "Deleted", description: "Image removed." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to remove image.", variant: "destructive" });
    }
  };

  const handleSaveBlog = async () => {
    if (!blogSlugAdmin || !blogForm) return;
    setBlogUploading(true);
    try {
      const fd = new FormData();
      fd.append("meta", JSON.stringify(blogForm));
      if (blogImageFile) fd.append("image", blogImageFile, blogImageFile.name);
      const res = await fetchWithAuth(`/api/admin/blogs/${blogSlugAdmin}`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      if (Array.isArray(data.uploaded)) {
        const uploaded = data.uploaded.map((u: any) => ({ name: u.path.split("/").pop(), path: u.path, url: u.url }));
        setBlogFiles((prev) => [...prev, ...uploaded]);
      }
      setBlogImageFile(null);
      toast({ title: "Saved", description: "Blog saved." });
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message || "Failed to save.", variant: "destructive" });
    } finally {
      setBlogUploading(false);
    }
  };

  const handleRemoveExistingFile = async (filePath: string) => {
    if (!projectSlug) return;
    try {
      const res = await fetchWithAuth(`/api/admin/projects/${projectSlug}/files`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: filePath }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setProjectFiles((prev) => prev.filter((f) => f.path !== filePath));
      toast({ title: "Deleted", description: "File removed." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to remove file.", variant: "destructive" });
    }
  };

  const handleSaveProject = async () => {
    if (!projectSlug) return;
    const fd = new FormData();
    fd.append("meta", JSON.stringify(projectMeta || {}));
    newScreenshots.forEach((f) => fd.append("screenshots", f));
    try {
      const res = await fetchWithAuth(`/api/admin/projects/${projectSlug}`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      // merge returned uploaded files
      if (Array.isArray(data.uploaded)) {
        const uploaded = data.uploaded.map((u) => ({ name: u.path.split("/").pop(), path: u.path, url: u.url }));
        setProjectFiles((prev) => [...prev, ...uploaded]);
      }
      setNewScreenshots([]);
      toast({ title: "Saved", description: "Project saved." });
    } catch (err) {
      toast({ title: "Error", description: (err as Error).message || "Failed to save.", variant: "destructive" });
    }
  };

  useEffect(() => {
    if (projectSlug) {
      const p = projectsData.find((x) => x.slug === projectSlug) || null;
      setProjectForm(p ? { ...p } : null);
    } else {
      setProjectForm(null);
    }
  }, [projectSlug]);

  const handleLogin = async () => {
    setAuthError("");
    const res = await fetchWithAuth("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    }, { handleUnauthorized: false });
    if (!res.ok) {
      setAuthError("Authentication failed.");
      return;
    }
    setAuthenticated(true);
    setPasscode("");
  };

  const handleLogout = async () => {
    await fetchWithAuth("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
  };

  const updateItem = (index: number, next: Partial<InvoiceItem>) => {
    setItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, ...next } : item)),
    );
  };

  const handleCreateInvoice = async () => {
    setLoading(true);
    setCreatedLink("");
    try {
      const payload = {
        ...form,
        items: items.filter((item) => item.item_name.trim()),
        payment_instructions: {
          account_name: form.account_name,
          bank_name: form.bank_name,
          account_number: form.account_number,
          reference: form.payment_reference,
        },
        public_base_url: window.location.origin,
      };

      const res = await fetchWithAuth("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create invoice.");

      setCreatedLink(data.publicUrl || "");
      toast({ title: "Invoice created", description: "Invoice link is ready to share." });
      loadInvoices();
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectInvoice = async (invoiceId: string) => {
    const res = await fetchWithAuth(`/api/admin/invoices/${invoiceId}`);
    const data = await res.json();
    if (res.ok) {
      setSelectedInvoice(data.invoice);
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      toast({ title: "Error", description: data.error || "Failed to load invoice.", variant: "destructive" });
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!selectedInvoice) return;
    const res = await fetchWithAuth(`/api/admin/invoices/${selectedInvoice.id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      toast({ title: "Status updated", description: `Invoice marked ${status}.` });
      loadInvoices();
      handleSelectInvoice(selectedInvoice.id);
    }
  };

  const handleDeleteInvoice = async () => {
    if (!selectedInvoice) return;
    const confirmed = window.confirm("Delete this invoice? This cannot be undone.");
    if (!confirmed) return;

    const res = await fetchWithAuth(`/api/admin/invoices/${selectedInvoice.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();
      toast({
        title: "Delete failed",
        description: data.error || "Unable to delete invoice.",
        variant: "destructive",
      });
      return;
    }

    toast({ title: "Invoice deleted" });
    setSelectedInvoice(null);
    loadInvoices();
  };

  const handleBrandingUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBrandingUploading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const res = await fetchWithAuth("/api/admin/branding", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload branding.");
      setBranding(data);
      toast({ title: "Branding updated", description: "Signature and logo saved." });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setBrandingUploading(false);
    }
  };

  if (!authChecked) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-border/60 bg-background/80 p-8 shadow-xl">
          <Badge variant="outline" className="mb-4">
            Admin Access
          </Badge>
          <h1 className="text-2xl font-semibold mb-2">Enter admin passcode</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Access to invoices and payment approvals is restricted.
          </p>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
            />
            {authError && <p className="text-sm text-destructive">{authError}</p>}
            <Button className="w-full" onClick={handleLogin}>
              Unlock Admin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge variant="outline">Admin Dashboard</Badge>
            <h1 className="text-3xl font-semibold mt-2">Admin</h1>
            <p className="text-muted-foreground">Manage invoices, branding, and project content.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </div>

        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices">
            <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Create Invoice</h2>
                  <Badge variant="secondary">Draft</Badge>
                </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Client full name</p>
                <Input
                  placeholder="Client full name"
                  value={form.client_name}
                  onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Client email</p>
                <Input
                  placeholder="Client email"
                  value={form.client_email}
                  onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Company / organization (optional)</p>
                <Input
                  placeholder="Company / organization"
                  value={form.company_name}
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Billing address (optional)</p>
                <Input
                  placeholder="Billing address"
                  value={form.billing_address}
                  onChange={(e) => setForm({ ...form, billing_address: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Invoice issue date</p>
                <Input
                  type="date"
                  value={form.issue_date}
                  onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Due date</p>
                <Input
                  type="date"
                  value={form.due_date}
                  onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Currency</p>
                <Input
                  placeholder="Currency (e.g. USD)"
                  value={form.currency}
                  onChange={(e) => setForm({ ...form, currency: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Payment terms</p>
                <Input
                  placeholder="Net 7 (payment due in 7 days)"
                  value={form.payment_terms}
                  onChange={(e) => setForm({ ...form, payment_terms: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Invoice title</p>
                <Input
                  placeholder="Invoice title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Payment reference (optional)</p>
                <Input
                  placeholder="Payment reference"
                  value={form.payment_reference}
                  onChange={(e) => setForm({ ...form, payment_reference: e.target.value })}
                />
              </div>
            </div>

            <Textarea
              placeholder="Description of work"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Line items</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setItems((prev) => [...prev, { ...emptyItem }])}
                >
                  Add item
                </Button>
              </div>
              <div className="hidden md:grid md:grid-cols-4 text-xs text-muted-foreground px-1">
                <span>Item</span>
                <span>Qty</span>
                <span>Unit price</span>
                <span>Subtotal</span>
              </div>
              {items.map((item, index) => (
                <div key={index} className="grid gap-3 md:grid-cols-4">
                  <Input
                    placeholder="Item name"
                    value={item.item_name}
                    onChange={(e) => updateItem(index, { item_name: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Unit price"
                    value={item.unit_price}
                    onChange={(e) => updateItem(index, { unit_price: Number(e.target.value) })}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(item.quantity * item.unit_price, form.currency)}
                    </span>
                    {items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setItems((prev) => prev.filter((_, idx) => idx !== index))
                        }
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Tax (optional)</p>
                <Input
                  type="number"
                  placeholder="Tax"
                  value={form.tax}
                  onChange={(e) => setForm({ ...form, tax: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Discount (optional)</p>
                <Input
                  type="number"
                  placeholder="Discount"
                  value={form.discount}
                  onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 px-4">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-semibold">{formatCurrency(total, form.currency)}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Account name"
                value={form.account_name}
                onChange={(e) => setForm({ ...form, account_name: e.target.value })}
              />
              <Input
                placeholder="Bank name"
                value={form.bank_name}
                onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
              />
              <Input
                placeholder="Account number"
                value={form.account_number}
                onChange={(e) => setForm({ ...form, account_number: e.target.value })}
              />
            </div>

            <Textarea
              placeholder="Footer note"
              value={form.footer_note}
              onChange={(e) => setForm({ ...form, footer_note: e.target.value })}
            />

            <Button disabled={loading} onClick={handleCreateInvoice}>
              {loading ? "Creating..." : "Create Invoice"}
            </Button>
            {createdLink && (
              <div className="rounded-xl border border-border/60 p-4 text-sm">
                <p className="text-muted-foreground">Invoice link</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate">{createdLink}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(createdLink)}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </div>

          </section>

          </TabsContent>

          <TabsContent value="branding">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <form
                className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl space-y-4"
                onSubmit={handleBrandingUpload}
              >
                <h2 className="text-xl font-semibold">Branding</h2>
                <div className="grid gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Signature</p>
                    {branding.signatureUrl && (
                      <img src={branding.signatureUrl} alt="Signature" className="mt-2 h-16 object-contain" />
                    )}
                    <Input type="file" name="signature" accept="image/*" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Logo</p>
                    {branding.logoUrl && (
                      <img src={branding.logoUrl} alt="Logo" className="mt-2 h-16 object-contain" />
                    )}
                    <Input type="file" name="logo" accept="image/*" />
                  </div>
                  <Textarea
                    name="footer_note"
                    placeholder="Default footer note"
                    defaultValue={branding.footer_note || ""}
                  />
                  <Button type="submit" disabled={brandingUploading}>
                    {brandingUploading ? "Saving..." : "Save Branding"}
                  </Button>
                </div>
              </form>

              <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Manage Invoices</h2>
                  <Button variant="outline" size="sm" onClick={loadInvoices}>
                    Refresh
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Input
                    placeholder="Filter by client"
                    value={filters.client}
                    onChange={(e) => setFilters({ ...filters, client: e.target.value })}
                  />
                  <Input
                    placeholder="Status"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  />
                  <Button variant="secondary" onClick={loadInvoices}>
                    Apply
                  </Button>
                </div>

                <div className="space-y-3 max-h-[360px] overflow-y-auto">
                  {invoices.map((invoice) => (
                    <button
                      key={invoice.id}
                      className="w-full rounded-xl border border-border/60 p-4 text-left hover:bg-muted/30"
                      onClick={() => handleSelectInvoice(invoice.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{invoice.client_name}</p>
                          <p className="text-xs text-muted-foreground">{invoice.invoice_id}</p>
                        </div>
                        <Badge variant="outline">{invoice.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {formatCurrency(invoice.total, invoice.currency)}
                      </p>
                    </button>
                  ))}
                  {!invoices.length && (
                    <p className="text-sm text-muted-foreground">No invoices yet.</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Project content manager</h2>
                  <Badge variant="secondary">Media</Badge>
                </div>

                <div className="grid gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Select project</p>
                    <select
                      className="w-full rounded-md border border-border/60 px-3 py-2"
                      value={projectSlug ?? ""}
                      onChange={(e) => setProjectSlug(e.target.value || null)}
                    >
                      <option value="">-- choose project --</option>
                      {projectsData.map((p) => (
                        <option key={p.slug} value={p.slug}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  {projectForm && (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground">README / PRD</p>
                        <Textarea
                          value={projectForm.readme || ""}
                          onChange={(e) => setProjectForm({ ...projectForm, readme: e.target.value })}
                        />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Tags (comma separated)</p>
                        <Input
                          value={(projectForm.tags || []).join(", ")}
                          onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Video URL (embed)</p>
                          <Input value={projectForm.videoUrl || ""} onChange={(e) => setProjectForm({ ...projectForm, videoUrl: e.target.value })} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Docs URL</p>
                          <Input value={projectForm.docsUrl || ""} onChange={(e) => setProjectForm({ ...projectForm, docsUrl: e.target.value })} />
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Changelog (one per line)</p>
                        <Textarea value={(projectForm.changelog || []).join("\n")} onChange={(e) => setProjectForm({ ...projectForm, changelog: e.target.value.split("\n").map(s=>s.trim()).filter(Boolean) })} />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <Input placeholder="Published date" value={projectForm.publishedDate || ""} onChange={(e) => setProjectForm({ ...projectForm, publishedDate: e.target.value })} />
                        <Input placeholder="License" value={projectForm.license || ""} onChange={(e) => setProjectForm({ ...projectForm, license: e.target.value })} />
                        <Input placeholder="Live URL" value={projectForm.live || ""} onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })} />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Screenshots (multiple)</p>
                        <Input type="file" multiple accept="image/*" onChange={(e) => handleAddScreenshots(e.target.files)} />
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          {(projectForm?.screenshots || []).map((src: string, i: number) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={i} src={src} alt={`screenshot-${i}`} className="h-24 w-full object-cover rounded" />
                          ))}
                          {newScreenshots.map((f, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={`new-${i}`} src={URL.createObjectURL(f)} alt={`new-${i}`} className="h-24 w-full object-cover rounded" />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button disabled={projectUploading} onClick={handleSaveProject}>{projectUploading ? "Saving..." : "Save project"}</Button>
                        <Button variant="outline" onClick={() => { if (projectSlug) { loadProject(projectSlug); } }}>Reset</Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl space-y-4">
                  <h3 className="text-lg font-semibold">Project preview</h3>
                  {projectForm ? (
                    <div>
                      <p className="font-semibold">{projectForm.title}</p>
                      <p className="text-sm text-muted-foreground">{projectForm.description}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Choose a project to preview.</p>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Blog Posts</h2>
                  <Badge variant="secondary">Content</Badge>
                </div>

                <div className="grid gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Select post</p>
                    <select
                      className="w-full rounded-md border border-border/60 px-3 py-2"
                      value={blogSlugAdmin ?? ""}
                      onChange={(e) => setBlogSlugAdmin(e.target.value || null)}
                    >
                      <option value="">-- choose post --</option>
                      {blogsData.map((p) => (
                        <option key={p.slug} value={p.slug}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  {blogForm && (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground">Title</p>
                        <Input value={blogForm.title || ""} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} />
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={!!blogForm.titleStyle?.bold} onChange={(e) => setBlogForm({ ...blogForm, titleStyle: { ...blogForm.titleStyle, bold: e.target.checked } })} />
                          <span className="text-sm">Bold</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={!!blogForm.titleStyle?.italic} onChange={(e) => setBlogForm({ ...blogForm, titleStyle: { ...blogForm.titleStyle, italic: e.target.checked } })} />
                          <span className="text-sm">Italic</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" checked={!!blogForm.titleStyle?.underline} onChange={(e) => setBlogForm({ ...blogForm, titleStyle: { ...blogForm.titleStyle, underline: e.target.checked } })} />
                          <span className="text-sm">Underline</span>
                        </label>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Excerpt</p>
                        <Textarea value={blogForm.excerpt || ""} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Content</p>
                        <Textarea value={blogForm.content || ""} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Medium URL</p>
                          <Input value={blogForm.mediumUrl || ""} onChange={(e) => setBlogForm({ ...blogForm, mediumUrl: e.target.value })} />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">LinkedIn URL</p>
                          <Input value={blogForm.linkedinUrl || ""} onChange={(e) => setBlogForm({ ...blogForm, linkedinUrl: e.target.value })} />
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Published date</p>
                        <Input type="date" value={blogForm.publishedAt || ""} onChange={(e) => setBlogForm({ ...blogForm, publishedAt: e.target.value })} />
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Hero image</p>
                        <Input type="file" accept="image/*" onChange={(e) => handleBlogImageSelect(e.target.files)} />
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          {blogFiles.map((f, i) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <div key={i} className="relative">
                              <img src={f.url} alt={f.name} className="h-28 w-full object-cover rounded" />
                              <button onClick={() => handleRemoveBlogFile(f.path)} className="absolute top-1 right-1 rounded bg-red-600 text-white px-2 text-xs">Remove</button>
                            </div>
                          ))}
                          {blogImageFile && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={URL.createObjectURL(blogImageFile)} alt="new" className="h-28 w-full object-cover rounded" />
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button disabled={blogUploading} onClick={handleSaveBlog}>{blogUploading ? "Saving..." : "Save post"}</Button>
                        <Button variant="outline" onClick={() => { if (blogSlugAdmin) loadBlogAdmin(blogSlugAdmin); }}>Reset</Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl">
                <h3 className="text-lg font-semibold">Preview</h3>
                {blogForm ? (
                  <div className="mt-4">
                    <h2 className={`${blogForm.titleStyle?.bold ? "font-bold" : ""} ${blogForm.titleStyle?.italic ? "italic" : ""} ${blogForm.titleStyle?.underline ? "underline" : ""} text-xl`}>{blogForm.title}</h2>
                    <p className="text-sm text-muted-foreground mt-2">{blogForm.excerpt}</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Select a blog to preview.</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {selectedInvoice && (
          <section
            ref={detailRef}
            className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Invoice {selectedInvoice.invoice_id}</h2>
                <p className="text-sm text-muted-foreground">{selectedInvoice.client_name}</p>
              </div>
              <Badge variant="secondary">{selectedInvoice.status}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Due: {selectedInvoice.due_date || "—"}
            </div>
            {selectedInvoice.receipt_message && (
              <p className="text-sm text-muted-foreground">
                Receipt note: {selectedInvoice.receipt_message}
              </p>
            )}
            {selectedInvoice.receiptUrl && (
              <div className="space-y-3">
                <a
                  className="text-sm text-primary underline"
                  href={selectedInvoice.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open receipt
                </a>
                {selectedInvoice.receiptUrl.toLowerCase().includes(".pdf") ? (
                  <iframe
                    title="Receipt preview"
                    src={selectedInvoice.receiptUrl}
                    className="h-64 w-full rounded-xl border border-border/60"
                  />
                ) : (
                  <img
                    src={selectedInvoice.receiptUrl}
                    alt="Receipt preview"
                    className="max-h-64 w-full rounded-xl border border-border/60 object-contain"
                  />
                )}
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => handleStatusUpdate("approved")}>
                Approve payment
              </Button>
              <Button variant="outline" onClick={() => handleStatusUpdate("rejected")}>
                Reject payment
              </Button>
              <Button variant="destructive" onClick={handleDeleteInvoice}>
                Delete invoice
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Admin;
