import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";

type ContactUsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ContactRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  href?: string;
};

function ContactRow({ icon, title, subtitle, href }: ContactRowProps) {
  const content = (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white/70 p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700 shrink-0">
        {icon}
      </div>

      <div className="flex-1 text-left min-w-0">
        <p className="text-sm sm:text-[15px] font-semibold text-gray-900 break-words">
          {title}
        </p>
        {subtitle && (
          <p className="mt-0.5 text-xs sm:text-sm text-gray-500 break-words">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="block rounded-xl"
    >
      {content}
    </a>
  );
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  // ALL CONTACT INFO LIVES HERE
  const contact = {
    name: "Michael Ekpechue",
    role: "Director, Greater Manchester Black Tech Expo (CIC)",
    email: "michael.ekpechue@gmblacktechexpo.co.uk",
    phone: "07405 230017",
  };

  const telHref = useMemo(() => {
    return `tel:${contact.phone.replace(/\s+/g, "")}`;
  }, [contact.phone]);

  const mailtoHref = useMemo(() => {
    return `mailto:${contact.email}`;
  }, [contact.email]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      window.prompt("Copy email:", contact.email);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-label="Close modal"
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-white p-5 sm:p-6 shadow-2xl"
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="text-xl sm:text-2xl font-bold text-[#001F3F] pr-8">
              Contact Us
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Reach out to us using any of the options below.
            </p>

            <div className="mt-5 space-y-3">
              <ContactRow
                icon={<User size={16} />}
                title={contact.name}
                subtitle={contact.role}
              />

              <ContactRow
                icon={<Mail size={16} />}
                title={contact.email}
                href={mailtoHref}
              />

              <ContactRow
                icon={<Phone size={16} />}
                title={contact.phone}
                href={telHref}
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="flex-1 rounded-xl bg-[#D7263D] px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-50"
              >
                {copied ? "Copied!" : "Copy Email"}
              </button>

              <a
                href={mailtoHref}
                className="flex-1 rounded-xl bg-[#001F3F] px-4 py-2.5 text-sm font-semibold text-white text-center hover:opacity-95"
              >
                Send Email
              </a>
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactUsModal;