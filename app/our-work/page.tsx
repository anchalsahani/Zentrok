// app/our-work/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import {
  ChevronDown,
  X,
  Link as LinkIcon,
  PlayCircle,
  Tag,
  Search,
  Filter,
  ArrowUpRight,
} from "lucide-react";

// ---------- Types ----------
type Project = {
  id: string;
  title: string;
  brand: string;
  sector: "Website Design" | "Social Media Management" | "Content Creation" | "Branding" | "Others";
  services: ("Branding" | "Performance" | "Social" | "SEO" | "Video" | "Web")[];
  year: number;
  cover: string;
  kpi: { label: string; value: string }[];
  summary: string;
  tags: string[];
  link?: string;
  videoUrl?: string; // optional showcase video
};

// ---------- Mock Data (replace with your CMS/API) ----------
const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Healing Health & Lives",
    brand: "Advika Physiotherapy Clinic",
    sector: "Website Design",
    services: ["Branding", "Social", "Performance"],
    year: 2025,
    cover:
      "/project1.png",
    kpi: [
      { label: "Engagement ↑", value: "+148%" },
      { label: "CTR", value: "3.9%" },
      { label: "ROAS", value: "4.6x" },
    ],
    summary:
      "where compassion meets clinical excellence to restore mobility, accelerate recovery, and help you live pain-free. Trust our expert care to guide you every step toward renewed strength and lasting wellness.",
    tags: ["creator", "ugc", "retail-push", "full-funnel"],
    link: "https://www.advikaphysiotherapyclinic.com/",
  },
  {
    id: "p2",
    title: "Astro, Taro & Numerology",
    brand: "Divine SSarthi",
    sector: "Website Design",
    services: ["Branding", "Performance", "Web"],
    year: 2024,
    cover:
      "/project3.png",
    kpi: [
      { label: "Sign-ups", value: "120k" },
      { label: "CPL ↓", value: "-37%" },
      { label: "CAC", value: "₹128" },
    ],
    summary:
      "your gateway to transformative insight: from astrology and tarot to vastu and gemstones, tailor made guidance delivered online or right to your doorstep. Empower your journey with clarity, connection, and cosmic confidence.",
    tags: ["landing-page", "ab-test", "lifecycle"],
    link: "https://divine-ssarthi.vercel.app/",
  },
  {
    id: "p3",
    title: "From Lookbook to Look-at-Me",
    brand: "Velora",
    sector: "Social Media Management",
    services: ["Social", "Video", "SEO"],
    year: 2025,
    cover:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop",
    kpi: [
      { label: "Organic Sessions", value: "+92%" },
      { label: "View-Throughs", value: "2.1M" },
    ],
    summary:
      "SEO + Shorts engine: trend hooks, rapid edits, and cross-posting to drive incremental discovery.",
    tags: ["shorts", "seo", "trend-hacking"],
    link: "#",
    videoUrl: "/video2.mp4",
  },
  {
    id: "p4",
    title: "Zero to Waitlist in 21 Days",
    brand: "Healio",
    sector: "Branding",
    services: ["Performance", "Web"],
    year: 2023,
    cover:
      "https://images.unsplash.com/photo-1512061942530-3c1f288a4b43?q=80&w=1600&auto=format&fit=crop",
    kpi: [
      { label: "Leads", value: "38k" },
      { label: "CPA", value: "₹84" },
    ],
    summary:
      "CRO-first landing systems, ADA-friendly UX, and precise geo-targeting around hospital clusters.",
    tags: ["cro", "geo-targeting", "accessibility"],
    link: "#",
  },
];

// ---------- Filters ----------
const SECTORS: Project["sector"][] = ["Website Design", "Content Creation", "Social Media Management", "Branding","Others"];
const SERVICES: Project["services"][number][] = ["Branding", "Performance", "Social", "SEO", "Video", "Web"];
const YEARS = Array.from(new Set(PROJECTS.map((p) => p.year))).sort((a, b) => b - a);

type SortKey = "newest" | "oldest" | "brand-az" | "brand-za";

// ---------- Page ----------
export default function OurWorkPage() {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState<Set<Project["sector"]>>(new Set());
  const [services, setServices] = useState<Set<Project["services"][number]>>(new Set());
  const [year, setYear] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    let data = [...PROJECTS];

    // search
    if (q.trim()) {
      const k = q.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(k) ||
          p.brand.toLowerCase().includes(k) ||
          p.tags.join(" ").toLowerCase().includes(k) ||
          p.summary.toLowerCase().includes(k)
      );
    }

    // sector
    if (sector.size) data = data.filter((p) => sector.has(p.sector));

    // services
    if (services.size) data = data.filter((p) => p.services.some((s) => services.has(s)));

    // year
    if (year !== "all") data = data.filter((p) => p.year === year);

    // sort
    data.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.year - a.year;
        case "oldest":
          return a.year - b.year;
        case "brand-az":
          return a.brand.localeCompare(b.brand);
        case "brand-za":
          return b.brand.localeCompare(a.brand);
      }
    });

    return data;
  }, [q, sector, services, year, sortBy]);

  const toggleSet = <T,>(s: Set<T>, v: T) => {
    const next = new Set(s);
    next.has(v) ? next.delete(v) : next.add(v);
    return next;
  };

  return (
    <main className="min-h-screen text-[var(--foreground,#1e1a0d)]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--grid-line,rgba(0,0,0,0.03))]">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute -top-40 -right-24 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(ellipse at center, var(--sun,#ffcc33), transparent 60%)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            Our Work
          </motion.h1>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-2xl text-[var(--foreground,#1e1a0d)]/70"
          >
            Real brands. Real outcomes. Explore case studies across sectors—built on creative discipline,
            performance rigor, and relentless iteration.
          </motion.p>
        </div>
      </section>

      {/* Controls */}
      <section className="border-b border-[var(--grid-line,rgba(0,0,0,0.03))]">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Search */}
          <div className="lg:col-span-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground,#1e1a0d)]/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by brand, tag, or outcome…"
                className="w-full rounded-xl bg-[var(--surface-900,#fff8e6)] border border-[var(--grid-line,rgba(0,0,0,0.03))] pl-9 pr-3 py-2.5 outline-none placeholder-[var(--foreground,#1e1a0d)]/40 focus:ring-2 focus:ring-[var(--sun,#ffcc33)]/40 transition"
              />
            </div>
          </div>

          {/* Sector chips */}
          <div className="lg:col-span-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--foreground,#1e1a0d)]/50">
              <Filter className="h-4 w-4" /> Sector
            </span>
            {SECTORS.map((s) => (
              <button
                key={s}
                onClick={() => setSector(toggleSet(sector, s))}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  sector.has(s)
                    ? "border-[var(--sun,#ffcc33)]/50 bg-[var(--sun,#ffcc33)]/10 text-[var(--sun,#ffcc33)]"
                    : "border-[var(--grid-line,rgba(0,0,0,0.03))] bg-[var(--surface-900,#fff8e6)] hover:bg-[var(--surface-900,#fff8e6)]/80 text-[var(--foreground,#1e1a0d)]/80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Year + Sort */}
          <div className="lg:col-span-3 flex items-center gap-3">
            <div className="relative">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
                className="appearance-none rounded-xl bg-[var(--surface-900,#fff8e6)] border border-[var(--grid-line,rgba(0,0,0,0.03))] py-2.5 pl-3 pr-9 text-sm focus:ring-2 focus:ring-[var(--sun,#ffcc33)]/40"
              >
                <option value="all">All Years</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground,#1e1a0d)]/60" />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="appearance-none rounded-xl bg-[var(--surface-900,#fff8e6)] border border-[var(--grid-line,rgba(0,0,0,0.03))] py-2.5 pl-3 pr-9 text-sm focus:ring-2 focus:ring-[var(--sun,#ffcc33)]/40"
              >
                <option value="newest">New first</option>
                <option value="oldest">Old first</option>
                <option value="brand-az">Brand A–Z</option>
                <option value="brand-za">Brand Z–A</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground,#1e1a0d)]/60" />
            </div>
          </div>

          {/* Services chips (full width row) */}
          <div className="lg:col-span-12 flex flex-wrap items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[var(--foreground,#1e1a0d)]/50">
              <Tag className="h-4 w-4" /> Services
            </span>
            {SERVICES.map((s) => (
              <button
                key={s}
                onClick={() => setServices(toggleSet(services, s))}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  services.has(s)
                    ? "border-[var(--sun,#ffcc33)]/50 bg-[var(--sun,#ffcc33)]/10 text-[var(--sun,#ffcc33)]"
                    : "border-[var(--grid-line,rgba(0,0,0,0.03))] bg-[var(--surface-900,#fff8e6)] hover:bg-[var(--surface-900,#fff8e6)]/80 text-[var(--foreground,#1e1a0d)]/80"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-[var(--foreground,#1e1a0d)]/60">No projects match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p, idx) => (
              <motion.article
                key={p.id}
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                className="group relative overflow-hidden rounded-2xl border border-[var(--grid-line,rgba(0,0,0,0.03))] bg-[var(--surface-900,#fff8e6)] hover:bg-[var(--surface-900,#fff8e6)]/80 transition"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={`${p.brand} cover`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Top-left chips */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[var(--sun)] backdrop-blur px-2.5 py-1 text-xs text-[#1e1a0d] border border-[var(--grid-line,rgba(0,0,0,0.03))]">
                      {p.sector}
                    </span>
                    <span className="rounded-full backdrop-blur bg-[var(--sun)] px-2.5 py-1 text-xs text-[#1e1a0d] border border-[var(--grid-line,rgba(0,0,0,0.03))]">
                      {p.year}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight">
                      {p.brand} — <span className="text-[var(--foreground,#1e1a0d)]/80">{p.title}</span>
                    </h3>
                    <button
                      onClick={() => setActive(p)}
                      className="shrink-0 inline-flex items-center gap-1 rounded-full border border-[var(--grid-line,rgba(0,0,0,0.03))] bg-[var(--surface-900,#fff8e6)] px-3 py-1.5 text-xs text-[var(--foreground,#1e1a0d)]/80 hover:bg-[var(--surface-900,#fff8e6)]/80 transition"
                    >
                      View <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="mt-2 text-sm text-[var(--foreground,#1e1a0d)]/70 line-clamp-2">{p.summary}</p>

                  {/* KPIs */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {p.kpi.slice(0, 3).map((k) => (
                      <div
                        key={k.label}
                        className="rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] px-3 py-2 text-center"
                      >
                        <div className="text-[11px] uppercase tracking-wide text-[var(--foreground,#1e1a0d)]/50">{k.label}</div>
                        <div className="text-sm font-semibold">{k.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full border border-[var(--grid-line,rgba(0,0,0,0.03)) px-2.5 py-1 text-[11px] text-[var(--foreground,#1e1a0d)]/70">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="mt-5 flex items-center gap-2">
                    {p.videoUrl && (
                      <button
                        onClick={() => setActive(p)}
                        className="inline-flex items-center gap-2 rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] bg-[var(--surface-900,#fff8e6)] px-3 py-2 text-sm hover:bg-[var(--surface-900,#fff8e6)]/80 transition"
                      >
                        <PlayCircle className="h-4 w-4" /> Watch case
                      </button>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] bg-[var(--surface-900,#fff8e6)] px-3 py-2 text-sm hover:bg-[var(--surface-900,#fff8e6)]/80 transition"
                      >
                        <LinkIcon className="h-4 w-4" /> Visit
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
{/* Modal */}
<AnimatePresence>
  {active && (
    <motion.div
      key="overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActive(null)}
    >
      <div className="min-h-screen flex items-start justify-center p-4 md:p-10">
        <motion.div
          key="dialog"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          className="w-full max-w-4xl rounded-2xl border border-[var(--grid-line,rgba(0,0,0,0.03))] 
                     bg-[var(--surface-1000,#ffffff)] p-4 md:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-black">
                {active.brand} — <span className="text-[var(--foreground,#1e1a0d)]/80">{active.title}</span>
              </h3>
              <p className="mt-1 text-sm text-[var(--foreground,#1e1a0d)]/60">{active.summary}</p>
            </div>
            <button
              onClick={() => setActive(null)}
              className="rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] 
                         bg-[var(--surface-900,#fff8e6)] p-2 hover:bg-[var(--surface-900,#fff8e6)]/80 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Media */}
          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] bg-white">
            {active.videoUrl ? (
              <video controls className="w-full h-auto" poster={active.cover}>
                <source src={active.videoUrl} type="video/mp4" />
              </video>
            ) : (
              <img src={active.cover} alt="cover" className="w-full h-auto" />
            )}
          </div>

          {/* Details row */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] 
                            bg-[var(--surface-900,#fff8e6)] p-4">
              <div className="text-xs text-[var(--foreground,#1e1a0d)]/50 uppercase tracking-wider">Sector</div>
              <div className="mt-1 font-semibold">{active.sector}</div>
            </div>
            <div className="rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] 
                            bg-[var(--surface-900,#fff8e6)] p-4">
              <div className="text-xs text-[var(--foreground,#1e1a0d)]/50 uppercase tracking-wider">Services</div>
              <div className="mt-1 text-sm text-[var(--foreground,#1e1a0d)]/80">{active.services.join(" • ")}</div>
            </div>
            <div className="rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] 
                            bg-[var(--surface-900,#fff8e6)] p-4">
              <div className="text-xs text-[var(--foreground,#1e1a0d)]/50 uppercase tracking-wider">Year</div>
              <div className="mt-1 font-semibold">{active.year}</div>
            </div>
          </div>

          {/* KPIs */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {active.kpi.map((k) => (
              <div key={k.label} className="rounded-xl border border-[var(--grid-line,rgba(0,0,0,0.03))] 
                                           bg-[var(--background)] p-3 text-center">
                <div className="text-[11px] uppercase tracking-wide text-[var(--foreground,#1e1a0d)]/50">{k.label}</div>
                <div className="text-base font-bold">{k.value}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {active.tags.map((t) => (
              <span key={t} className="rounded-full border border-[var(--grid-line,rgba(0,0,0,0.03))] 
                                       bg-[var(--background)]  px-2.5 py-1 text-[11px] text-[var(--foreground,#1e1a0d)]/70">
                #{t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            {active.link && (
              <a
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border 
                           border-[var(--grid-line,rgba(0,0,0,0.03))] bg-[var(--surface-900,#fff8e6)] 
                           px-4 py-2 text-sm hover:bg-[var(--surface-900,#fff8e6)]/80 transition"
              >
                <LinkIcon className="h-4 w-4" /> Visit brand site
              </a>
            )}
            <button
              onClick={() => setActive(null)}
              className="inline-flex items-center gap-2 rounded-xl border 
                         border-[var(--grid-line,rgba(0,0,0,0.03))] bg-[var(--sun,#ffcc33)]/10 
                         px-4 py-2 text-sm text-[var(--sun,#ffcc33)] 
                         hover:bg-[var(--sun,#ffcc33)]/20 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      {/* Footer CTA */}
      <section className="border-t border-[var(--grid-line,rgba(0,0,0,0.03))]">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl md:text-3xl font-black">Ready to build your next case study?</h4>
            <p className="text-[var(--foreground,#1e1a0d)]/70 mt-1">Brief us and we&apos;ll get the flywheel spinning.</p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-[var(--sun,#ffcc33)]/50 bg-[var(--sun,#ffcc33)]/10 px-5 py-3 font-semibold text-[var(--sun,#ffcc33)] hover:bg-[var(--sun,#ffcc33)]/20 transition"
          >
            Let&apos;s Talk <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}