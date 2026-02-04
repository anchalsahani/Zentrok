"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { FiX } from "react-icons/fi";

// Socials from react-icons (brand colors available)
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

/* ------------------- TYPES ------------------- */
type NotificationType = "success" | "error" | "info";

interface NotificationItem {
  id: number;
  text: string;
  type: NotificationType;
}

interface NotificationProps extends NotificationItem {
  removeNotif: (id: number) => void;
}

interface NotificationsContainerProps {
  notifications: NotificationItem[];
  removeNotif: (id: number) => void;
}

/* ------------------- NOTIFICATION SYSTEM ------------------- */
const NOTIFICATION_TTL = 5000;

const Notification: React.FC<NotificationProps> = ({
  text,
  id,
  removeNotif,
  type,
}) => {
  const bgColors: Record<NotificationType, string> = {
    success: "bg-[var(--sun)] text-[var(--foreground)]",
    error: "bg-red-600 text-white",
    info: "bg-[var(--amber)] text-[var(--foreground)]",
  };

  const icons: Record<NotificationType, string> = {
    success: "✔",
    error: "✖",
    info: "!",
  };

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);
    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`p-4 flex items-center rounded-lg gap-3 text-sm font-semibold shadow-lg pointer-events-auto ${bgColors[type]}`}
    >
      <div className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs">
        {icons[type]}
      </div>
      <span className="flex-1">{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-2">
        <FiX />
      </button>
    </motion.div>
  );
};

const NotificationsContainer: React.FC<NotificationsContainerProps> = ({
  notifications,
  removeNotif,
}) => (
  <div className="flex flex-col gap-2 w-80 fixed bottom-4 right-4 z-50 pointer-events-none">
    <AnimatePresence>
      {notifications.map((n) => (
        <Notification key={n.id} {...n} removeNotif={removeNotif} />
      ))}
    </AnimatePresence>
  </div>
);

/* ------------------- SOCIAL LINKS ------------------- */
const socialLinks = [
  {
    Icon: FaFacebook,
    link: "https://www.facebook.com/profile.php?id=61579906194112",
    color: "#1877F2",
  }, // Facebook Blue
  { Icon: FaTwitter, link: "https://x.com/Zentrok_05", color: "#1DA1F2" }, // Twitter Blue
  {
    Icon: FaInstagram,
    link: "https://www.instagram.com/zentrok_/",
    color: "#E4405F",
  }, // Instagram Pink
  { Icon: FaLinkedin, link: "#", color: "#0A66C2" }, // LinkedIn Blue
];

/* ------------------------------------------------------------ */

export default function ContactPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addNotification = (text: string, type: NotificationType) => {
    setNotifications((pv) => [{ id: Date.now(), text, type }, ...pv]);
  };

  const removeNotif = (id: number) => {
    setNotifications((pv) => pv.filter((n) => n.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      name: data.name,
      email: data.email,
      message: data.message,
    };

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        form.reset();
        addNotification("Thank you! Your message has been sent.", "success");
      } else {
        const errorData = await response.json();
        addNotification(errorData.message || "Oops! Server error.", "error");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      addNotification(
        "Oops! Something went wrong. Check your connection.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-[var(--foreground)] bg-[var(--background)]">
      {/* Notifications */}
      <NotificationsContainer
        notifications={notifications}
        removeNotif={removeNotif}
      />

      {/* Main Section */}
      <main className="flex-1 container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
        {/* Left - Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[var(--surface-1000)] p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="p-3 border rounded-lg w-full bg-[var(--surface-900)] border-[var(--honey)] focus:outline-none focus:border-[var(--sun)]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="p-3 border rounded-lg w-full bg-[var(--surface-900)] border-[var(--honey)] focus:outline-none focus:border-[var(--sun)]"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="p-3 border rounded-lg w-full bg-[var(--surface-900)] border-[var(--honey)] focus:outline-none focus:border-[var(--sun)]"
            ></textarea>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.04 }}
              whileTap={{ scale: isLoading ? 1 : 0.96 }}
              className="group relative overflow-hidden rounded-full flex items-center px-6 py-3 bg-[var(--sun)] text-[var(--background)] font-semibold shadow-lg hover:bg-[var(--amber)] hover:text-[var(--background)] transition-all duration-300 pr-10 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 mr-4">
                {isLoading ? "Sending..." : "Send Message"}
              </span>
              <Send
                size={18}
                className={`absolute right-3 z-10 ${
                  isLoading ? "opacity-0" : ""
                }`}
              />
            </motion.button>
          </form>
        </motion.div>

        {/* Right - Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-8 relative"
        >
          <div className="absolute -top-12 mt-20 right-0">
            <h1 className="text-3xl sm:text-4xl font-bold ">Contact Us</h1>
            <p className="mt-2 opacity-80">
              We&apos;d love to hear from you! Reach out using the form or
              details below.
            </p>
          </div>

          <div className="pt-16 mt-20">
            <div className="flex items-start space-x-4">
              <Mail className="text-[var(--sun)] w-6 h-6" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="opacity-80">info@zentrok.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 mt-6">
              <Phone className="text-[var(--sun)] w-6 h-6" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="opacity-80">+91 88263-60287</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 mt-6">
              <MapPin className="text-[var(--sun)] w-6 h-6" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="opacity-80">Noida, Uttar Pradesh, India</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6 mt-8">
              {socialLinks.map(({ Icon, link, color }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Map */}
      <section className="w-full max-w-6xl mx-auto px-6 lg:px-20 pb-12">
        <h2 className="text-2xl font-semibold mb-4 ">Our Location</h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2050728280515!2d77.36404817550047!3d28.623615275669607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce544da5a9ebf%3A0x4024cbbabd66b412!2sKLJ%20Noida%20One!5e0!3m2!1sen!2sin!4v1756532048940!5m2!1sen!2sin"
            width="100%"
            height="400"
            loading="lazy"
            className="border-0 w-full"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
}
