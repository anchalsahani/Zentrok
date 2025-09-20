"use client";

import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

export default function DigitalGrowthWalk() {
  const fg = "var(--foreground)";
  const sun = "var(--sun)";
  const amber = "var(--amber)";
  const honey = "var(--honey)";

  // Controls for sync animations
  const barsControl = useAnimation();
  const walkerControl = useAnimation();
  const titleControl = useAnimation();

  useEffect(() => {
    const loop = async () => {
      while (true) {
        // Start all animations at the same time
        walkerControl.start({
          x: 520, // stops near logo
          transition: { duration: 6, ease: "linear" },
        });

        barsControl.start((i) => ({
          height: [10, [42, 64, 78, 100][i]],
          transition: { duration: 6, ease: "easeInOut" },
        }));

        // Title animation - subtle pulse effect
        titleControl.start({
          scale: [1, 1.02, 1],
          transition: { duration: 2, ease: "easeInOut" },
        });

        await new Promise((r) => setTimeout(r, 6000));

        // Reset
        walkerControl.set({ x: -60 });
        barsControl.set({ height: 10 });
      }
    };
    loop();
  }, [walkerControl, barsControl, titleControl]);

  return (
    <section
      id="digital-growth"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: `
          linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
          linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px),
          linear-gradient(to right, var(--grid-major) 1px, transparent 1px),
          linear-gradient(to bottom, var(--grid-major) 1px, transparent 1px),
          radial-gradient(1200px 300px at 50% 120%, rgba(255,220,100,0.08), transparent 70%)
        `,
        backgroundSize: `
          var(--grid-size) var(--grid-size),
          var(--grid-size) var(--grid-size),
          calc(var(--grid-size) * 5) calc(var(--grid-size) * 5),
          calc(var(--grid-size) * 5) calc(var(--grid-size) * 5),
          auto
        `,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at 80% 90%,
              rgba(255, 220, 100, 0.25),
              rgba(255, 200, 60, 0.15),
              transparent 70%
            )
          `,
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:py-20">
        {/* Centered Title Section */}
        <div className="flex justify-center mb-12 md:mb-16">
          <motion.h2 
            animate={titleControl}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 15px rgba(255, 220, 100, 0.5)",
              transition: { duration: 0.3 }
            }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-2xl"
            style={{ color: fg }}
          >
            Walk toward digital growth
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          {/* Left - Walking man with logo */}
          <div className="relative col-span-7 h-[260px] md:h-[300px]">
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 600 300"
              className="absolute inset-0"
            >
              {/* Path line */}
              <path
                d="M20 230 C 160 220, 320 240, 580 230"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="2"
                fill="none"
              />
              {/* Walking man */}
              <motion.g animate={walkerControl} initial={{ x: -60 }}>
                <ellipse cx="60" cy="232" rx="26" ry="6" fill="rgba(0,0,0,.12)" />
                <rect x="52" y="160" width="16" height="55" rx="8" fill={amber} />
                <circle cx="60" cy="142" r="14" fill={sun} />

                {/* Legs + arms */}
                <motion.rect
                  x="58"
                  y="210"
                  width="10"
                  height="36"
                  rx="5"
                  fill={sun}
                  style={{ transformBox: "fill-box", transformOrigin: "top" }}
                  animate={{ rotate: [22, -18, 22] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.rect
                  x="48"
                  y="210"
                  width="10"
                  height="36"
                  rx="5"
                  fill={amber}
                  style={{ transformBox: "fill-box", transformOrigin: "top" }}
                  animate={{ rotate: [-18, 22, -18] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.rect
                  x="70"
                  y="170"
                  width="9"
                  height="36"
                  rx="5"
                  fill={sun}
                  style={{ transformBox: "fill-box", transformOrigin: "top left" }}
                  animate={{ rotate: [-18, 18, -18] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.rect
                  x="41"
                  y="170"
                  width="9"
                  height="36"
                  rx="5"
                  fill={amber}
                  style={{ transformBox: "fill-box", transformOrigin: "top right" }}
                  animate={{ rotate: [18, -18, 18] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.g>
            </motion.svg>
          </div>

          {/* Right - Text + growth bars */}
          <div className="col-span-5">
            <div className="mx-auto max-w-md">
              <p className="text-sm md:text-base opacity-80 mb-6" style={{ color: fg }}>
                Progress compounding one step at a time. Your brand scales as the
                foundation strengthens.
              </p>

              <div className="flex items-end gap-3 h-28">
                {[42, 64, 78, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    animate={barsControl}
                    className="w-8 rounded-t-md"
                    whileHover={{
                      scaleY: 1.2,
                      transition: { duration: 0.2 }
                    }}
                    style={{
                      background:
                        i % 2 === 0
                          ? `linear-gradient(${sun}, ${amber})`
                          : `linear-gradient(${amber}, ${honey})`,
                    }}
                    initial={{ height: 10 }}
                  />
                ))}
              </div>

              <div className="mt-6">
                <motion.a
                  href="/contact"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 5px 15px rgba(255, 200, 60, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary inline-flex items-center rounded-full px-6 py-3 text-base font-semibold shadow-md transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${sun}, ${amber})`,
                    color: "var(--background)"
                  }}
                >
                  JOIN US NOW
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}