import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContactHeroSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] md:h-[90vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background image */}
      <img
        src="/contact/contact.jpg"
        alt="A man in a blue jacket speaks into a microphone at the Borderless Africa Tech Summit 2023."
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Blue overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001F3FB2] via-[#001F3FB2] to-[#001F3FB2]" />

      {/* Content */}
      <div className="relative z-10 text-[#FFD700] px-4 sm:px-6 md:px-10 max-w-[1440px] mx-auto">
        <h1 className="text-[30px] sm:text-[42px] md:text-[64px] font-extrabold leading-tight">
          Building North West England
          <br className="hidden md:block" />
          Tech Future, Together.
        </h1>

        <p className="mt-6 text-[16px] sm:text-[20px] md:text-[25px] text-[#FFFDF7CC]/80 max-w-3xl mx-auto leading-relaxed">
         We'd love to hear from you, whether you're a student,
          <br className="hidden sm:block" />
          partner or business looking to collaborate.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#message" className="bg-[#D7263D] text-[15px] sm:text-[16px] text-white px-8 py-3 sm:py-4 rounded-lg flex items-center gap-2 shadow-lg transition-all hover:bg-[#C61E33] w-full sm:w-auto justify-center">
            Send a Message <ArrowRight className="w-5 h-5" />
          </a>

          <Link to="/partners" className="bg-[#FFD700] text-[15px] sm:text-[16px] text-[#001F3F] px-8 py-3 sm:py-4 rounded-lg shadow-lg transition-all hover:bg-yellow-400 w-full sm:w-auto justify-center">
            Partner with Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;
