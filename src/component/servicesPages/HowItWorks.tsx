import React from "react";

const steps = [
    {
        number: "1",
        title: "Select Your Support Package",
        description:
            "Choose the business support package that best matches your goals, whether you need registration help, compliance guidance, or structured administrative support to move your business forward with confidence.",
        highlight: true,
    },
    {
        number: "2",
        title: "Complete Your Application Details",
        description:
            "Fill in the guided application form with your business information and necessary details, required services, and key documents so the team can understand your needs clearly before the process begins.",
    },
    {
        number: "3",
        title: "Get Matched with a Community Agent",
        description:
            "Once your application and payment are confirmed, you'll be connected with a dedicated support agent who will guide you through the process and provide personalised assistance.",
    },
    {
        number: "4",
        title: "Track Progress from Your Dashboard",
        description:
            "You get to monitor your application status, view updates, communicate with your assigned agent, keep track and follow each stage of your business support journey directly from your dashboard.",
    },
];

const HowItWorks: React.FC = () => {
    return (
        <section className="relative bg-[#F7F5EE] py-16 sm:py-20 lg:py-28 overflow-hidden">

            {/* GRID BACKGROUND */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #D0CBC4 1px, transparent 1px),
            linear-gradient(to bottom, #D0CBC4 1px, transparent 1px)
          `,
                    backgroundSize: "300px 300px",
                }}
            />

            <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12">

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-stretch">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col justify-center">

                        <div className="w-full sm:w-fit border border-[#001F3F66] bg-[#F7F5EE] p-6 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl lg:text-[36px] leading-tight lg:leading-[50px] font-semibold text-[#001F3F]">
                                How it Works and{" "}
                                <span className="hidden sm:inline">
                                    <br />
                                </span>
                                What you need to do
                            </h2>

                            <p className="mt-4 sm:mt-5 text-base sm:text-[18px] text-[#001F3F] leading-relaxed">
                                Get started quickly through a clear process that helps you apply
                                for services and move forward confidently within the Greater
                                Manchester tech community.
                            </p>
                        </div>

                        <button className="mt-8 sm:mt-10 self-center sm:self-start bg-[#D7263D] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-[15px] sm:text-[16px] font-medium hover:bg-[#C81E1E] transition">
                            <a href="#business">Apply for Business Support →</a>
                        </button>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">

                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`relative w-full max-w-[300px] mx-auto sm:mx-0 min-h-[280px] sm:min-h-[300px] p-6 sm:p-10 border border-[#001F3F66] ${
                                    step.highlight
                                        ? "bg-[#D7263D] text-[#F7F5EE] border-none"
                                        : "bg-[#F7F5EE] border-[#C9C5BE]"
                                }`}
                            >
                                <span
                                    className={`absolute top-6 sm:top-8 left-6 sm:left-8 text-[40px] sm:text-[45px] leading-none font-semibold ${
                                        step.highlight
                                            ? "text-white/15"
                                            : "bg-gradient-to-b from-[#0A0A0A] to-[#F7F5EE] bg-clip-text text-transparent"
                                    }`}
                                >
                                    {step.number}
                                </span>

                                <h3 className="relative mt-8 sm:mt-10 text-[18px] sm:text-[20px] font-semibold leading-snug">
                                    {step.title}
                                </h3>

                                <p
                                    className={`mt-3 text-[12px] leading-relaxed ${
                                        step.highlight
                                            ? "text-white/90"
                                            : "text-[#5D6A77]"
                                    }`}
                                >
                                    {step.description}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
