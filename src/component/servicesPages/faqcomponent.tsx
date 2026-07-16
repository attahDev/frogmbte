import { useState } from "react";
import ContactUsModal from "../utils/contactUsModal";


const faqs = [
    {
        question: "Who is this Business Support Service for?",
        answer:
            "This service is designed for aspiring entrepreneurs, small business owners, startups, and community members who need structured support with business setup, administration, or growth processes.",
    },
    {
        question: "What is included in the support packages?",
        answer:
            "Each package includes core services tailored to your business stage, with optional add-ons for extended support.",
    },
    {
        question: "Do I need to have a registered business before applying?",
        answer:
            "No, we support both new and already registered businesses.",
    },
    {
        question: "Is the package fee refundable?",
        answer:
            "Package fees are non-refundable once services begin.",
    },
    {
        question: "When does the support process start?",
        answer:
            "The process begins once your application and payment are confirmed.",
    },
    {
        question: "How long does the support process take?",
        answer:
            "Timelines depend on your selected package and business needs.",
    },
];


const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [open, setOpen] = useState(false);

    return (
        <section className="bg-[#F3F1EC] py-14 sm:py-16 lg:py-28">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-6 grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
                {/* LEFT SIDE */}
                <div className="flex flex-col justify-between">
                    <h2 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] leading-tight lg:leading-[60px] font-semibold text-[#001F3F]">
                        Frequently asked <br className="hidden sm:block" /> Questions
                    </h2>

                    {/* STILL HAVE QUESTIONS CARD */}
                    <div className="mt-10 sm:mt-12 lg:mt-20 bg-[#D7263D1A] border border-[#D7263D40] rounded-[24px] sm:rounded-3xl p-6 sm:p-8 lg:p-10 max-w-full sm:max-w-[420px]">
                        <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#001F3F]">
                            Still have a question?
                        </h3>

                        <p className="mt-3 sm:mt-4 text-[#001F3F]/70 leading-6 text-sm sm:text-base">
                            Can’t find the answer to your question? Send us an email and we’ll
                            get back to you as soon as possible!
                        </p>
                        <ContactUsModal
                            isOpen={open}
                            onClose={() => setOpen(false)}
                        />
                        <button onClick={() => setOpen(true)} className="mt-5 sm:mt-6 bg-[#D7263D] text-white px-5 sm:px-6 py-3 rounded-lg font-medium hover:bg-[#C9141A] transition w-full sm:w-auto text-sm sm:text-base">
                            Send Email →

                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE FAQ */}
                <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="border border-[#001F3F66] rounded-[20px] sm:rounded-3xl bg-[#FFFDF7] overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 lg:p-8 text-left"
                                >
                                    <span className="text-base sm:text-lg lg:text-[22px] font-bold text-[#0A0A0A] leading-snug">
                                        {faq.question}
                                    </span>

                                    <div
                                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border border-[#D7263D1A] transition shrink-0 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    >
                                        <svg
                                            width="19"
                                            height="10"
                                            viewBox="0 0 19 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M0 0L9.375 9.375L18.75 0H0Z" fill="#1D1B20" />
                                        </svg>
                                    </div>
                                </button>

                                <div
                                    className={`transition-all duration-500 ease-in-out px-5 sm:px-6 lg:px-8 ${isOpen ? "max-h-[300px] pb-5 sm:pb-6 lg:pb-8 opacity-100" : "max-h-0 opacity-0"
                                        } overflow-hidden`}
                                >
                                    <p className="text-[#001F3F]/70 leading-6 sm:leading-7 text-sm sm:text-base">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;