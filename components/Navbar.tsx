"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import UpperNavbar from "./UpperNavbar";

type Position = { left: number; width: number; opacity: number };

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverPos, setHoverPos] = useState<Position>({ left: 0, width: 0, opacity: 0 });
  const [activePos, setActivePos] = useState<Position>({ left: 0, width: 0, opacity: 1 });

  const pathname = usePathname();

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/our-work", label: "Our Work" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBgClass = isScrolled
    ? "bg-[var(--background)] text-[var(--foreground)] backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700"
    : "bg-transparent";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBgClass}`}
    >
      {/* ✅ UpperNavbar only shows when not scrolled */}
      {!isScrolled && <UpperNavbar />}

      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex pb-3 items-center gap-0">
          <Image
            src="/favicon.svg"
            alt="ZENTROK Logo"
            width={45}
            height={45}
            className="rounded-md"
          />
          <div className="flex flex-col leading-none relative">
            <span
              className="text-xl font-extrabold tracking-widest text-[var(--foreground)]"
              style={{ fontFamily: "'Seven Swordsmen BB', sans-serif" }}
            >
              ZENTROK
            </span>
            <span
              className="absolute right-0 text-[10px] mt-6 font-medium text-[var(--foreground)]"
              style={{ fontFamily: "'Seven Swordsmen BB', sans-serif" }}
            >
              Pvt.Ltd.
            </span>
          </div>
        </Link>

        {/* ✅ Desktop Nav (Centered) */}
        <div className="hidden md:flex flex-1 ml-5 justify-center">
          <ul
            onMouseLeave={() => setHoverPos({ ...hoverPos, opacity: 0 })}
            className="relative flex mt-2 w-fit rounded-full border border-gray-300 dark:border-gray-600 p-0.5 bg-[var(--background)]"
          >
            {navLinks.map(({ href, label }) => (
              <NavTab
                key={href}
                href={href}
                setHoverPos={setHoverPos}
                setActivePos={setActivePos}
                isActive={pathname === href}
              >
                {label}
              </NavTab>
            ))}
            <Cursor position={hoverPos.opacity ? hoverPos : activePos} />
          </ul>
        </div>

        {/* Right Actions (Desktop only) */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/contact"
              className="relative overflow-hidden flex items-center px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl group transition-all duration-300 pr-9 bg-[var(--foreground)] text-[var(--background)]"
            >
              <span className="relative z-10">Let&apos;s Work</span>
              <Send
                size={16}
                className="absolute right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10"
              />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center -ml-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full shadow font-medium bg-[var(--foreground)] text-[var(--background)]"
          >
            <ChevronLeft
              size={14}
              className={`transition-transform ${mobileMenuOpen ? "rotate-0" : "-rotate-180"}`}
            />
          </button>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-4 top-full mt-2 shadow-md rounded-xl px-4 py-3 flex flex-col gap-3 w-48 bg-[var(--background)] text-[var(--foreground)]"
            >
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                    pathname === href
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}

// --------------------- NavTab ---------------------
type NavTabProps = {
  href: string;
  children: ReactNode;
  setHoverPos: React.Dispatch<React.SetStateAction<Position>>;
  setActivePos: React.Dispatch<React.SetStateAction<Position>>;
  isActive: boolean;
};

const NavTab = ({ href, children, setHoverPos, setActivePos, isActive }: NavTabProps) => {
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      setActivePos({ left: ref.current.offsetLeft, width, opacity: 1 });
    }
  }, [isActive, setActivePos]);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setHoverPos({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className="relative z-10 px-4 py-2 text-sm uppercase cursor-pointer group"
    >
      <Link
        href={href}
        className={`relative z-10 transition-colors duration-200 ${
          isActive
            ? "text-[var(--background)]"
            : "text-[var(--foreground)] group-hover:text-[var(--background)]"
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

// --------------------- Cursor ---------------------
type CursorProps = { position: Position };
const Cursor = ({ position }: CursorProps) => (
  <motion.li
    animate={{ left: position.left, width: position.width, opacity: position.opacity }}
    transition={{ type: "spring", damping: 20, stiffness: 300 }}
    className="absolute z-0 h-full rounded-full bg-[var(--sun)] group-hover:bg-[var(--amber)]"
  />
);
