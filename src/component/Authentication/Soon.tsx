import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#FFFDF7] px-4">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFD700]">
          <Sparkles className="h-10 w-10 text-[#001F3F]" />
        </div>

        <h1 className="text-[44px] font-extrabold leading-none tracking-[-0.05em] text-[#001F3F] sm:text-[72px] md:text-[92px]">
          Coming Soon
        </h1>

        <p className="mt-5 max-w-xl text-[16px] leading-[1.6] text-[#6B7280] sm:text-[18px]">
          We&apos;re working on something exciting. This feature will be available soon.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 flex items-center gap-2 rounded-[14px] bg-[#D7263D] px-6 py-3 text-[15px] font-medium text-white transition hover:opacity-90 sm:text-[16px]"
        >
          Go to Dashboard
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}