"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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

const InvoicePublic = () => {
  const { publicId } = useParams();
  const { toast } = useToast();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fetchInvoice = async () => {
    setLoading(true);
    const res = await fetch(`/api/public/invoices/${publicId}`);
    const data = await res.json();
    if (res.ok) {
      setInvoice(data.invoice);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoice();
  }, [publicId]);

  const handleSubmit = async () => {
    if (!receipt) {
      toast({ title: "Receipt required", description: "Please upload a receipt." });
      return;
    }
    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("description", description);
    const res = await fetch(`/api/public/invoices/${publicId}/payment`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      toast({ title: "Submission failed", description: data.error || "Try again.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Payment submitted", description: "Pending approval." });
    fetchInvoice();
  };

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Invoice not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {invoice.logoUrl && (
                <img src={invoice.logoUrl} alt="Logo" className="h-10 object-contain" />
              )}
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Invoice
                </p>
                <h1 className="text-2xl font-semibold">{invoice.invoice_id}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{invoice.status}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/api/public/invoices/${publicId}/pdf`, "_blank")}
              >
                Download PDF
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Billed to</p>
              <p className="font-medium">{invoice.client_name}</p>
              <p className="text-sm text-muted-foreground">{invoice.client_email}</p>
              {invoice.company_name && <p className="text-sm">{invoice.company_name}</p>}
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Issue date: {invoice.issue_date || "—"}</p>
              <p>Due date: {invoice.due_date || "—"}</p>
              <p>Payment terms: {invoice.payment_terms || "—"}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold">{invoice.title}</h2>
            <p className="text-sm text-muted-foreground">{invoice.description}</p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="py-2">Item</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Unit</th>
                  <th className="py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {(invoice.invoice_items || []).map((item: any) => (
                  <tr key={item.id} className="border-b border-border/40">
                    <td className="py-2">{item.item_name}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">
                      {formatCurrency(item.unit_price, invoice.currency)}
                    </td>
                    <td className="py-2">
                      {formatCurrency(item.subtotal, invoice.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>{formatCurrency(invoice.tax, invoice.currency)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>-{formatCurrency(invoice.discount, invoice.currency)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-foreground">
              <span>Total</span>
              <span>{formatCurrency(invoice.total, invoice.currency)}</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border/60 bg-muted/20 p-4 text-sm">
            <p className="font-semibold">Payment instructions</p>
            <p className="text-muted-foreground">
              {invoice.payment_instructions?.reference || "Please follow the bank instructions provided."}
            </p>
            <div className="mt-3 space-y-1">
              <p>Account name: {invoice.payment_instructions?.account_name || "—"}</p>
              <p>Bank name: {invoice.payment_instructions?.bank_name || "—"}</p>
              <p>Account number: {invoice.payment_instructions?.account_number || "—"}</p>
            </div>
          </div>

          {invoice.signatureUrl && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">Authorized signature</p>
              <img src={invoice.signatureUrl} alt="Signature" className="h-16 object-contain" />
            </div>
          )}

          {invoice.footer_note && (
            <p className="mt-6 text-sm text-muted-foreground">{invoice.footer_note}</p>
          )}
        </div>

        <div className="rounded-3xl border border-border/60 bg-background/80 p-8 shadow-xl">
          {invoice.status === "unpaid" && !submitted ? (
            <>
              <h2 className="text-xl font-semibold">Mark as Paid</h2>
              <p className="text-sm text-muted-foreground">
                Upload your receipt and include any payment references.
              </p>
              <div className="mt-4 space-y-4">
                <Input type="file" accept="image/*,application/pdf" onChange={(e) => setReceipt(e.target.files?.[0] || null)} />
                <Textarea
                  placeholder="Payment description / reference"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleSubmit}>Submit payment</Button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Badge variant="secondary">{invoice.status}</Badge>
              <p className="text-sm text-muted-foreground">
                {invoice.status === "payment_submitted"
                  ? "Payment received and pending approval."
                  : invoice.status === "approved"
                    ? "Payment verified. Thank you!"
                    : "This invoice requires attention."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicePublic;
