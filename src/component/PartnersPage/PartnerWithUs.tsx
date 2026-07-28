/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/PartnerSection.tsx
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { api } from "../../lib/api"; // Adjust path to your api file

const PartnerWithUs = () => {
  const [fullName, setFullName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [wantsSponsorship, setWantsSponsorship] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!fullName || !organizationName || !email || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/newsletter/partnership-request", {
        fullName,
        organizationName,
        email,
        message,
        wantsSponsorship,
      });

      setSuccess(true);
      setFullName("");
      setOrganizationName("");
      setEmail("");
      setMessage("");
      setWantsSponsorship(false);
    } catch (err: any) {
      if (err.response) {
        switch (err.response.status) {
          case 409:
            setError("A request with this email already exists.");
            break;
          case 429:
            setError("Too many attempts. Please try again later.");
            break;
          case 400:
            setError("Invalid input. Please check your details.");
            break;
          default:
            setError("Something went wrong. Please try again.");
        }
      } else {
        setError("Network error. Is the server running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FFFDF7] py-12 sm:py-16 lg:py-20 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-start justify-between gap-10 sm:gap-14 max-w-[1440px] mx-auto overflow-hidden">
      {/* LEFT CONTENT */}
      <motion.div
        className="w-full min-w-0 md:w-1/2"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl sm:text-[36px] md:text-[40px] font-bold text-[#001F3F] mb-4 text-center md:text-left">
          Partner with us
        </h2>

        <p className="text-[#4A5565] text-[16px] sm:text-[18px] mb-8 max-w-md leading-relaxed text-center md:text-left mx-auto md:mx-0">
          Let's build something powerful together from <br className="hidden sm:block" />
          mentorship programs to sponsorship opportunities.
        </p>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            "Branding & exposure at events",
            "Co-hosting opportunities",
            "Access to diverse local talent",
            "Social impact recognition",
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 mt-3 sm:mt-5">
              <CheckCircle className="text-[#D7263D] w-5 h-5 shrink-0" />
              <span className="text-[#001F3F] text-[12px] sm:text-[18px] leading-snug">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* CONTACT BUTTON */}
        <div className="flex justify-center md:justify-start">
          <button className="bg-[#D7263D] text-white px-6 py-2.5 rounded-md font-medium hover:bg-[#D7263D] transition flex items-center gap-2 mt-3 sm:mt-5">
            Contact Us <ArrowRight size={18} />
          </button>
        </div>

        {/* IMAGE + TEXT */}
        <div className="relative mx-auto mt-8 w-full max-w-[574px] overflow-hidden rounded-3xl shadow-md sm:mt-10 md:mx-0">
          <div className="relative h-[260px] sm:h-[250px] md:h-[290px]">
            <img
              src="/partners/patus.jpg"
              alt="Two men in flat caps and blazers engage in conversation at a tech summit."
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 md:p-8">
              <h3 className="mb-2 text-[20px] font-bold leading-tight text-white sm:mb-3 sm:text-[26px] md:text-[28px]">
                For Greater Manchester&apos;s
              </h3>
              <p className="max-w-md text-[12px] leading-relaxed text-white/85 sm:text-[14px] md:text-[15px]">
                Your support helps us connect diverse talent with mentorship,
                education and real world experiences, building a stronger, more
                inclusive tech ecosystem for everyone.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT FORM */}
      <motion.div
        className="w-full min-w-0 md:w-[45%] bg-[#fffdf7] shadow-lg rounded-2xl p-5 sm:p-8"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h3 className="text-[22px] sm:text-[25px] font-bold text-[#001F3F] mb-2 text-center">
          Become a Partner
        </h3>

        <p className="text-[#001F3F] mb-6 text-[15px] sm:text-[16px] leading-relaxed text-center">
          We're always open to new partnerships that support <br className="hidden sm:block" />
          innovation, education, and inclusion.
        </p>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl text-black w-auto">
            ✓ Partnership request submitted! We'll contact you soon.
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-200 w-auto">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="fullName"
              className="text-[14px] text-[#001F3F] font-medium"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-200 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-[#d7263d] outline-none transition"
            />
          </div>

          {/* Organization Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="organization"
              className="text-[14px] text-[#001F3F] font-medium"
            >
              Organization Name
            </label>
            <input
              id="organization"
              type="text"
              placeholder="Enter your organization name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="border border-gray-200 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-[#d7263d] outline-none transition"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-[14px] text-[#001F3F] font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-[#d7263d] outline-none transition"
            />
          </div>

          {/* Message / Proposal */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="message"
              className="text-[14px] text-[#001F3F] font-medium"
            >
              Message / Proposal
            </label>
            <textarea
              id="message"
              placeholder="Write your message or proposal"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-200 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-[#d7263d] outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Checkbox */}
          <label
            htmlFor="interest"
            className="flex items-center gap-2 text-[14px] text-[#001F3F]"
          >
            <input
              id="interest"
              type="checkbox"
              checked={wantsSponsorship}
              onChange={(e) => setWantsSponsorship(e.target.checked)}
              className="accent-[#d7263d]"
            />
            I'm interested in sponsorship or collaboration
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-[#D7263D] text-white py-2.5 rounded-xl font-medium hover:bg-[#D7263D] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default PartnerWithUs;