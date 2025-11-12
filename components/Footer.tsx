"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaBullhorn,
  FaChartLine,
  FaSearchDollar,
  FaUsers,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"

const MarketingFooter: React.FC = () => {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/our-work" },
    { label: "Contact", href: "/contact" },
  ];

  const socials = [
    { Icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61579906194112", color: "#1877F2" },
    { Icon: FaXTwitter, href: "https://x.com/Zentrok_05", color: "#ffffff" },
    { Icon: FaInstagram, href: "https://www.instagram.com/zentrok_?igsh=d3Bsb2U5b3dkYWg0", color: "#E4405F" },
    { Icon: FaLinkedinIn, href: "http://www.linkedin.com/in/zentrok-private-limited", color: "#0077B5" },
    { Icon: FaYoutube, href: "https://youtube.com/@zentrokpvtltd-s5l?si=1cID75lxCF2YDpr5", color: "#F54927" },
  ];

  const marketingIcons = [
    { Icon: FaBullhorn, label: "Ads" },
    { Icon: FaChartLine, label: "Analytics" },
    { Icon: FaSearchDollar, label: "SEO" },
    { Icon: FaUsers, label: "Engagement" },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "var(--surface-900)",
        color: "var(--foreground)",
      }}
    >
      {/* Background Mountains */}
      <div
        className="absolute top-0 left-0 w-full h-52"
        style={{
          background: `linear-gradient(to top, var(--surface-900), var(--surface-800), var(--background))`,
        }}
      >
        <div className="absolute bottom-0 left-0 w-full h-[160px]" style={{ background: "linear-gradient(to top, var(--surface-800), transparent)" }} />
        <div className="absolute bottom-0 left-10 w-40 h-24 rounded-t-full opacity-70" style={{ backgroundColor: "var(--honey)" }} />
        <div className="absolute bottom-0 left-42 w-56 h-28 rounded-t-full opacity-80" style={{ backgroundColor: "var(--amber)" }} />
        <div className="absolute bottom-0 right-20 w-48 h-28 rounded-t-full opacity-60" style={{ backgroundColor: "var(--sun)" }} />
      </div>

      {/* Road Path */}
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-full h-44"
      >
        <svg viewBox="0 0 600 200" className="w-full h-full opacity-70">
          <path
            d="M0,200 C150,150 300,250 600,100"
            stroke="var(--honey)"
            strokeWidth="30"
            fill="transparent"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center flex flex-col items-center space-y-8">
        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl font-bold max-w-3xl whitespace-nowrap overflow-hidden text-ellipsis">
          🚀 Your <span style={{ color: "var(--sun)" }}>Digital Marketing Journey</span> Starts Here
        </h2>

        <p className="max-w-md opacity-80 text-sm md:text-base">
          From SEO to Social Media Ads, we help brands climb beyond the{" "}
          <span style={{ color: "var(--amber)", fontStyle: "italic" }}>status quo</span> and reach their full{" "}
          <span style={{ fontWeight: 600, color: "var(--honey)" }}>potential</span>.
        </p>

        {/* Marketing Icons */}
        <div className="flex flex-wrap justify-center gap-6">
          {marketingIcons.map(({ Icon, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-2"
            >
              <Icon size={28} style={{ color: "var(--sun)" }} />
              <span className="text-xs opacity-80">{label}</span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-sm uppercase tracking-wide">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="transition-colors"
              style={{ color: "var(--foreground)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sun)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {socials.map(({ Icon, href, color }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="p-2 rounded-full border"
              style={{
                borderColor: "var(--honey)",
                backgroundColor: "transparent",
              }}
            >
              <Icon size={16} style={{ color }} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs opacity-70" style={{ color: "var(--foreground)" }}>
          © {new Date().getFullYear()} Zentrok Digital Marketing. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default MarketingFooter;
