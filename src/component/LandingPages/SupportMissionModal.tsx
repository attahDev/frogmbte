// SupportMissionModal.tsx

import React, { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const presetAmounts = [
  { amount: 5, label: "Help resource a student" },
  { amount: 15, label: "Support a community workshop" },
  { amount: 30, label: "Fund digital skill materials" },
];

const paymentMethods = ["VISA", "MasterCard", "PayPal"];

const SupportMissionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(5);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("VISA");

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const finalAmount = customAmount
    ? Number(customAmount)
    : selectedAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity"
      />

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-[620px]
          max-h-[90vh]
          bg-white
          rounded-2xl
          shadow-[0_40px_120px_rgba(0,0,0,0.35)]
          flex
          flex-col
          overflow-hidden
          animate-[fadeInScale_0.25s_ease-out]
        "
      >
        {/* HEADER */}
        <div className="bg-[#0B1F3B] px-6 py-6 text-white relative">
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#FFD700] hover:scale-110 transition"
          >
            <X size={22} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
              <Heart className="text-[#FFD700]" size={22} />
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Support the Mission
              </h2>
              <p className="mt-1 text-sm text-white/80 leading-5">
                Empower more people across Greater Manchester through tech and opportunity.
              </p>
            </div>
          </div>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* CONTRIBUTION OPTIONS */}
          <div>
            <h3 className="text-lg font-semibold text-[#0B1F3B]">
              Contribution Options
            </h3>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {presetAmounts.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => {
                    setSelectedAmount(option.amount);
                    setCustomAmount("");
                  }}
                  className={`rounded-xl p-3 sm:p-4 border-2 text-left transition
                    ${
                      selectedAmount === option.amount &&
                      !customAmount
                        ? "border-[#FFD700] bg-[#FFF8DB]"
                        : "border-gray-200"
                    }
                  `}
                >
                  <p className="text-xl sm:text-2xl font-bold text-[#0B1F3B]">
                    £{option.amount}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {option.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOM AMOUNT */}
          <div>
            <label className="block text-[#0B1F3B] font-medium mb-2">
              Enter a different amount
            </label>

            <div className="border-2 border-gray-200 rounded-xl px-4 py-3 flex items-center focus-within:border-[#FFD700] transition">
              <span className="text-lg mr-2">£</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="0"
                className="w-full outline-none text-lg"
              />
            </div>
          </div>

          {/* SUPPORT TYPE */}
          <div>
            <label className="block text-[#0B1F3B] font-medium mb-2">
              Support Type
            </label>

            <input
              type="text"
              placeholder="Enter support type"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FFD700] transition"
            />
          </div>

          {/* CONTACT DETAILS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#0B1F3B]">
              Contact Details
            </h3>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FFD700] transition"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FFD700] transition"
            />

            <textarea
              placeholder="Why you're supporting us (optional)"
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FFD700] transition"
            />
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <h3 className="text-lg font-semibold text-[#0B1F3B]">
              Payment Method
            </h3>

            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedPayment(method)}
                  className={`flex-1 min-w-[calc(33.333%-0.5rem)] sm:min-w-0 py-2.5 rounded-xl border-2 text-xs sm:text-sm transition
                    ${
                      selectedPayment === method
                        ? "border-[#FFD700] bg-[#FFF8DB]"
                        : "border-gray-200"
                    }
                  `}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* COMPLETE BUTTON */}
          <button className="w-full bg-[#D7263D] text-white py-3 rounded-xl text-base font-semibold shadow-lg hover:bg-[#D7263D] transition">
            Complete Support (£{finalAmount})
          </button>

          <p className="text-center text-xs text-gray-500">
            Thank you for empowering Greater Manchester's next generation.
            <span className="text-[#D7263D]">
              {" "}Your contribution details are protected.
            </span>
          </p>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SupportMissionModal;
