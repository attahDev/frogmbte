import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EventHeroSection: React.FC = () => {
    return (
        <section className="relative w-full min-h-[80vh] md:h-[90vh] flex items-center justify-center text-center overflow-hidden">
            {/* Background image */}
            <img
                src="/events/eventhero.jpg"
                alt="A man in a striped shirt holds a microphone, sitting on a table, addressing an engaged audience in a conference room."
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Blue overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#001F3FB2] via-[#001F3FB2] to-[#001F3FB2]" />

            {/* Yellow gradient glow at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-yellow-400/60 via-yellow-400/30 to-transparent blur-2xl" />

            {/* Content */}
            <div className="relative z-10 text-[#FFFDF7] px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
                <h1 className="text-[36px] sm:text-[48px] md:text-[64px] font-extrabold leading-tight mb-4">
                    What’s On Across Greater
                    <br className="hidden sm:block" />
                    Manchester’s Tech Scene
                </h1>

                <p className="font-open-sans mt-4 sm:mt-6 text-[16px] sm:text-[18px] md:text-[22px] text-[#FFFDF7CC]/80 max-w-3xl mx-auto leading-relaxed px-2">
                    Explore upcoming events, workshops and meetups happening. Connect, learn
                    and grow through our community events, from tech meetups to business
                    workshops that shape Manchester&apos;s digital future.
                </p>

                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 px-2">
                    <Link to="/login" className="bg-[#D7263D] lg:text-[16px] text-[15px] sm:text-[16px] text-white px-8 py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 w-full sm:w-auto">
                        Join the Movement <ArrowRight className="w-5 h-5" />
                    </Link>

                    <a href="#events" className="bg-[#FFD700] text-[15px] lg:text-[16px] sm:text-[16px] text-[#001F3F] px-8 py-3 sm:py-4 rounded-lg shadow-lg transition-all hover:scale-105 w-full sm:w-auto text-center">
                        View All Events
                    </a>
                </div>
            </div>
        </section>
    );
};

export default EventHeroSection;
