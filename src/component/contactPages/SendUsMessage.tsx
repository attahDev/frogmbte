/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { api } from "../../lib/api"; // Adjust path to your api file

const SendUsaMessage: FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [wantsPartnership, setWantsPartnership] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!fullName || !email || !subject || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/newsletter/contact-message", {
        fullName,
        email,
        subject,
        message,
        wantsPartnership,
      });

      setSuccess(true);
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWantsPartnership(false);
    } catch (err: any) {
      if (err.response) {
        switch (err.response.status) {
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
    <section className="w-full bg-[#FFFDF7] py-12 sm:py-16 px-4 sm:px-8 md:px-16">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-12">
      {/* Left Contact Info */}
      <div className="bg-[#001F3F] text-white rounded-2xl p-6 sm:p-8 lg:p-10 w-full lg:w-[360px] xl:w-[400px] shrink-0 shadow-lg flex flex-col justify-between h-auto">
        <div>
          <h2 className="text-[20px] sm:text-[22px] font-semibold mb-6 leading-snug">
            Hi! We are always here <br /> to help you
          </h2>

          {/* Address */}
          <div className="bg-[#1E355A] rounded-xl p-4 sm:p-5 flex items-center gap-4 mb-5">
            <div className="bg-[#FFD700] text-[#061B43] flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full shrink-0">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <div>
              <p className="font-medium text-[18px] sm:text-[22px] text-white leading-tight">
                Address
              </p>
              <p className="text-[14px] sm:text-[16px] text-[#FFFFFF99]">
                Greater Manchester,
                <br />
                United Kingdom
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#1E355A] rounded-xl p-4 sm:p-5 flex items-center gap-4 mb-5">
            <div className="bg-[#FFD700] text-[#061B43] flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full shrink-0">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <p className="font-medium text-[18px] sm:text-[22px] text-white leading-tight">
                Email
              </p>
              <p className="text-[14px] sm:text-[16px] text-[#FFFFFF99]">
                info@gmbte.org
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-[#1E355A] rounded-xl p-4 sm:p-5 flex items-center gap-4 mb-6 sm:mb-8">
            <div className="bg-[#FFD700] text-[#061B43] flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full shrink-0">
              <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <p className="font-medium text-[18px] sm:text-[22px] text-white leading-tight">
                Phone
              </p>
              <p className="text-[14px] sm:text-[16px] text-[#FFFFFF99]">
                +44 123 456 7890
              </p>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-wrap justify-center sm:justify-between gap-3 sm:gap-4 mt-6 sm:mt-0">
          {[Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
            <div
              key={idx}
              className="bg-[#FFD7000D] hover:bg-[#FFD700] text-white p-3 sm:p-5 rounded-full transition-all duration-300 cursor-pointer"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF99]" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Contact Form */}
      <div className="w-full lg:flex-1 lg:min-w-0 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
        <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-[#001F3F] text-center mb-2">
          Send Us a Message
        </h2>
        <p className="text-center text-[15px] sm:text-[17px] text-[#4A5565] mb-6">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="h-[3px] w-10 sm:w-12 bg-[#FFD700] rounded-full" />
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl text-black w-auto">
            ✓ Message sent successfully! We'll get back to you soon.
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-200 w-auto">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-[15px] sm:text-[16px] text-[#001F3F] mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Henry maxi"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-[#D1D5DC] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD84D]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[15px] sm:text-[16px] text-[#001F3F] mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="henrymaxi61@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#D1D5DC] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[15px] sm:text-[16px] text-[#001F3F] mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="How can we help you?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-[#D1D5DC] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[15px] sm:text-[16px] text-[#001F3F] mb-2">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us more about your inquiry..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-[#D1D5DC] rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="partner"
              checked={wantsPartnership}
              onChange={(e) => setWantsPartnership(e.target.checked)}
              className="accent-[#FFD700] w-4 h-4"
            />
            <label
              htmlFor="partner"
              className="text-[#364153] font-medium text-[15px] sm:text-[16px]"
            >
              I'd like to partner with GMBTE
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D7263D] hover:bg-[#C61E33] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-3 transition-all duration-300"
          >
            <Send className="w-5 h-5" /> {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      </div>
    </section>
  );
};

export default SendUsaMessage;