// src/components/UpperNavbar.tsx
import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"
import { motion } from "framer-motion";

// Social icons with their brand colors
const socialIcons = [
  { Icon: FaWhatsapp, link: "https://wa.me/8826360287", color: "#25D366" },
  { Icon: FaInstagram, link: "https://www.instagram.com/zentrok_/", color: "#E4405F" }, 
  { Icon: FaLinkedin, link: "http://www.linkedin.com/in/zentrok-private-limited", color: "#0077B5" }, 
  { Icon: FaFacebook, link: "https://www.facebook.com/profile.php?id=61579906194112", color: "#1877F2" }, 
  { Icon: FaXTwitter, link: "https://x.com/Zentrok_05", color: "#fffff" },
  { Icon: FaYoutube, link: "https://youtube.com/@zentrokpvtltd-s5l?si=1cID75lxCF2YDpr5", color: "#F54927" }, 
];

const UpperNavbar: React.FC = () => {
  return (
    <div className="bg-[var(--surface-1000)] text-[var(--text-on-surface)] py-2 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
        
        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <a
            href="tel:+919211870764"
            className="flex items-center hover:text-[var(--sun)] transition-colors"
          >
            <FaPhone className="mr-2 text-blue-500" />
            <span>+91 92118 70764</span>
          </a>
          <a
            href="mailto:support@zentrok.com"
            className="flex items-center hover:text-[var(--sun)] transition-colors"
          >
            <FaEnvelope className="mr-2 text-red-500" />
            <span>info@zentrok.com</span>
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          {socialIcons.map(({ Icon, link, color }, idx) => (
            <motion.a
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform"
            >
              <Icon size={20} style={{ color }} />
            </motion.a>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default UpperNavbar;
