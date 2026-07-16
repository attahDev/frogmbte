import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PopupBanner = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000); // Hide after 5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* 🔹 Full-screen blurred glassy overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/20 backdrop-blur-lg z-[9998] pointer-events-auto"
          />

          {/* 🔹 Popup banner */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-[#FFD700]/90 backdrop-blur-md text-[#001F3F] font-bold text-lg md:text-xl px-8 py-4 rounded-2xl shadow-2xl z-[9999] border border-white/20"
          >
            Greater Manchester Black Tech Expo
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
