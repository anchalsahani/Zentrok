"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PremiumCTA() {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = resolvedTheme || theme || "light";

  // Use CSS variables directly so they auto-switch with theme
  const styles = {
    section: {
      
        },
    overlay: {
      backgroundColor:
        currentTheme === "dark"
          ? "rgba(0,0,0,0.3)"
          : "rgba(0,0,0,0.08)",
    },
    heading: {
      color: "var(--sun)",
      fontFamily: "var(--font-heading)",
    },
    subtext: {
      color: "var(--foreground)",
      fontFamily: "var(--font-sans)",
    },
    button: {
      backgroundColor: "transparent",
      border: "1px solid var(--honey)",
      color: "var(--honey)",
    },
    buttonHover: {
      backgroundColor: "var(--honey)",
      color: "var(--background)",
    },
  };

  return (
    <section
      className="relative flex items-center justify-center min-h-[60vh] px-6"
      style={styles.section}
    >
      {/* Overlay */}
      <div className="absolute inset-0" style={styles.overlay}></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl text-center">
        <motion.h2
          className="font-bold text-3xl md:text-4xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transform Your Business Today
        </motion.h2>

        <motion.p
          className="text-sm md:text-lg mb-6"
          style={styles.subtext}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Join thousands of successful entrepreneurs who trust our platform to
          grow their businesses.
        </motion.p>

        {/* CTA Button */}
        <Link href="/contact" passHref>
          <motion.a
            className="inline-flex items-center justify-center font-semibold py-3 px-6 rounded-full shadow-md relative overflow-hidden group transition-all hover:text-black duration-300"
            style={styles.button}
            whileHover={{
              scale: 1.04,
              backgroundColor: styles.buttonHover.backgroundColor,
              color: styles.buttonHover.color,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 mr-5 ">Get Started</span>
            <ArrowRight
              size={20}
              className="absolute right-4 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
            />
          </motion.a>
        </Link>
      </div>
    </section>
  );
}
