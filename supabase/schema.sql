create extension if not exists "pgcrypto";

create table if not exists public.branding_settings (
  id uuid primary key default gen_random_uuid(),
  signature_path text,
  logo_path text,
  footer_note text,
  created_at timestamptz default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  public_id text unique not null,
  client_name text not null,
  client_email text not null,
  company_name text,
  billing_address text,
  invoice_id text not null,
  issue_date date,
  due_date date,
  currency text default 'USD',
  payment_terms text,
  status text default 'unpaid',
  title text not null,
  description text,
  subtotal numeric default 0,
  tax numeric default 0,
  discount numeric default 0,
  total numeric default 0,
  payment_instructions jsonb,
  footer_note text,
  signature_path text,
  logo_path text,
  receipt_path text,
  receipt_message text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices(id) on delete cascade,
  item_name text not null,
  quantity numeric default 1,
  unit_price numeric default 0,
  subtotal numeric default 0,
  created_at timestamptz default now()
);

create table if not exists public.invoice_events (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices(id) on delete cascade,
  status text not null,
  note text,
  created_at timestamptz default now()
);
