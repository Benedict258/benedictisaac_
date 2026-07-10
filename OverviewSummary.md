# Project Overview: benedictisaac_

## 📌 Purpose & Description
A personal portfolio and business operations platform for Benedict Isaac — a freelance developer/consultant. The project combines a public-facing portfolio website (showcasing projects, blog, and services) with an integrated invoicing system that allows clients to view and pay invoices (upload payment receipts), while the admin can manage invoices, approve/reject payments, and track projects and blog content — all backed by Supabase for database and file storage.

## 🛠️ Tech Stack & Dependencies
- **Primary Language:** TypeScript (frontend), JavaScript (backend)
- **Framework/Libraries:** React 18 + Vite + shadcn/ui + Tailwind CSS 3 (frontend); Express.js (backend)
- **Database/Storage:** Supabase (PostgreSQL + Storage for files, receipts, signatures, logos, and project assets)
- **Key Dependencies:** @tanstack/react-query, react-router-dom, recharts, framer-motion, three.js (@react-three/fiber, @react-three/drei), pdfkit, resend (email), multer (file uploads)

## 🗂️ Core Architecture & File Structure
- **`/frontend/`** — Vite + React SPA with shadcn/ui components (`/src/components/ui`), pages (`/src/pages/`), static data (`/src/data/`), and context providers. Uses Tailwind CSS with dark/light theme support via next-themes.
- **`/backend/`** — Express.js REST API serving on port 8787, deployed via Render. Handles admin authentication (HMAC cookie sessions), invoice CRUD, PDF generation, payment receipt uploads, branding management, and blog/project file storage with Supabase.
- **Routes:** Public routes (`/`, `/pricing`, `/blog`, `/project/:slug`, `/invoice/:publicId`) and admin routes (`/admin`, `/dashboard`). The admin dashboard (`/dashboard`) is a personal Kanban-style productivity tracker with day plans and project statuses.

## 🚀 Current Status & Next Steps
- **Status:** Functional & Deployed (Vercel for frontend, Render for backend)
- **Last Active Focus:** Production readiness — switched email provider to Resend, fixed cross-origin auth cookie handling (SameSite/secure), and updated deployment configuration (`render.yaml`, `vercel.json`). The project is actively deployed and operational.
