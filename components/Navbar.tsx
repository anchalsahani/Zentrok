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
  const fg = "var(--foreground)";
  const sun = "var(--sun)";
  const amber = "var(--amber)";
  const honey = "var(--honey)";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverPos, setHoverPos] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activePos, setActivePos] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 1,
  });

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
        <Link
          href="/"
          className="flex justify-center items-center h-full gap-0"
        >
          <Image
            src="/zentrokLogo.png"
            alt="ZENTROK Logo"
            width={100}
            height={100}
          />
        </Link>

        {/* ✅ Desktop Nav (Centered) */}
        <div className="hidden md:flex flex-1 ml-5 justify-center items-center">
          <ul
            onMouseLeave={() => setHoverPos({ ...hoverPos, opacity: 0 })}
            className="relative flex w-fit rounded-full border border-gray-300 dark:border-gray-600 p-0.5 bg-[var(--background)]"
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
          <div className="mt-6">
            <motion.a
              href="/contact"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(255, 200, 60, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center rounded-full px-6 py-3 text-base font-semibold shadow-md transition-all"
              style={{
                background: `linear-gradient(135deg, ${sun}, ${amber})`,
                color: "var(--background)",
              }}
            >
              <span className="flex items-center gap-2">Let&apos;s Work<Send size={16}/>
              </span>
              
            </motion.a>
          </div>
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
              className={`transition-transform ${
                mobileMenuOpen ? "rotate-0" : "-rotate-180"
              }`}
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

const NavTab = ({
  href,
  children,
  setHoverPos,
  setActivePos,
  isActive,
}: NavTabProps) => {
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
    animate={{
      left: position.left,
      width: position.width,
      opacity: position.opacity,
    }}
    transition={{ type: "spring", damping: 20, stiffness: 300 }}
    className="absolute z-0 h-full rounded-full bg-[var(--sun)] group-hover:bg-[var(--amber)]"
  />
);
