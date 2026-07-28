import { motion } from "framer-motion";
import { Building2, CalendarDays, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const stats = [
    { icon: <Users className="w-5 h-5 text-[#D7263D]" />, label: "Students Mentored", value: "500+" },
    { icon: <Building2 className="w-5 h-5 text-[#D7263D]" />, label: "Businesses Supported", value: "200+" },
    { icon: <CalendarDays className="w-5 h-5 text-[#D7263D]" />, label: "Events Hosted", value: "100+" },
];

const AboutGMBTE: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-[#FFD700] px-4 py-14 sm:px-6 sm:py-16 md:px-12 lg:px-16 lg:py-20">
            <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
                {/* LEFT CONTENT */}
                <div className="min-w-0 text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 text-3xl font-extrabold leading-tight text-[#001F3F] sm:text-[48px] md:text-[64px]"
                    >
                        About GMBTE
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-4 text-lg font-semibold leading-snug text-[#001F3F] sm:text-[22px] md:text-[24px]"
                    >
                        Building a stronger, more connected tech <br className="hidden sm:block" />
                        community across Greater Manchester.
                    </motion.p>

                    <p className="mb-8 text-[16px] leading-relaxed text-[#001F3FCC] sm:text-[18px]">
                        Empowering Greater Manchester's diverse community through <br className="hidden sm:block" />
                        technology education, professional mentorship, and business <br className="hidden sm:block" />
                        growth opportunities. We’re bridging the gap between talent <br className="hidden sm:block" />
                        and opportunity in the digital economy.
                    </p>

                    <div className="mb-10 flex flex-wrap gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className=" items-center space-x-3"
                            >
                                <div className="mb-1 flex items-center gap-2">
                                    {/* {stat.icon} */}
                                    <p className="text-xl font-extrabold text-[#001F3F] sm:text-2xl">{stat.value}</p>
                                </div>
                                <p className="text-sm font-medium text-[#001F3F]/80 sm:text-base">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <Link to="/login" className="inline-flex items-center gap-2 rounded-lg bg-[#D7263D] px-6 py-3 text-base text-white transition-transform hover:scale-105 hover:bg-[#b41d31] sm:text-lg">
                        Join the Movement
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>

                {/* RIGHT IMAGE */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full min-w-0"
                >
                    <div className="h-[280px] w-full overflow-hidden rounded-[20px] sm:h-[400px] lg:h-[480px]">
                        <img
                            src="/about/about.jpg"
                            alt="A group of happy people, wearing colorful traditional clothing, stand indoors holding certificates."
                            className="h-full w-full rounded-[20px] object-cover"
                        />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute bottom-4 left-4 max-w-[220px] items-center gap-3 rounded-xl bg-white px-4 py-5 shadow-lg sm:bottom-6 sm:left-6 sm:max-w-[240px] sm:gap-4 sm:px-5 sm:py-6">
                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="h-8 w-8 shrink-0 rounded-full bg-[#D7263D] sm:h-9 sm:w-9"
                        />
                        <p className="text-left text-[14px] font-semibold leading-snug text-[#001F3F] sm:text-[15px]">
                            Connecting Talent <br />& Opportunity
                        </p>
                    </div>
                </motion.div>

                {/* Decorative SVG */}
                <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] rotate-[-20deg] select-none opacity-10">
                    <svg
                        width="200"
                        height="200"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.37631 12.5932L10.1976 12.5844C10.1471 13.2199 8.80268 14.4119 8.24989 14.6333C8.1261 14.4928 7.87394 14.3313 7.70862 14.2071C7.2359 13.852 6.48818 13.1772 6.37631 12.5932ZM10.6057 11.2529L6.10527 11.2352C5.77801 11.1405 5.902 10.6995 5.94612 10.1752L10.6419 10.1825C10.7001 10.5392 10.6814 10.9489 10.6057 11.2529ZM6.19608 8.82775C6.30795 8.29344 6.76537 7.89583 7.07714 7.65977C8.21134 6.80097 8.56066 6.86356 9.63565 7.70388C9.96371 7.96041 10.3633 8.27198 10.4807 8.82736L6.19608 8.82775ZM10.3319 6.99629C11.3091 6.48045 11.8502 5.95965 13.0989 5.53482C13.6433 5.34943 14.3938 5.24015 14.9373 5.45197C16.5567 6.08305 15.3639 8.28609 13.1161 8.39935C12.582 8.42637 11.5623 8.42795 11.2728 8.12016L10.3321 6.99629H10.3319ZM6.35902 7.0875C5.3506 7.74402 6.00949 8.55652 3.44403 8.39557C1.23225 8.25688 0.0197617 5.95688 1.78803 5.41918C3.34806 4.94488 6.12634 6.69983 6.35902 7.0875ZM9.08007 4.35949C9.7048 5.14596 9.40853 4.67961 9.73083 5.02217C9.31673 6.35866 7.16377 6.17903 6.87049 5.02217L7.32592 4.64443C7.49938 4.06938 7.67881 3.9907 7.40997 3.35346C8.09132 3.0405 8.34169 3.02221 9.07431 3.30219C9.09438 3.73318 8.94634 3.7914 9.08007 4.35949ZM6.62488 2.85291C6.26841 3.08063 5.96837 3.55791 5.86266 4.12541C5.71303 4.92818 5.98406 5.29121 6.21456 5.80685C4.85503 5.0792 2.63829 3.6841 0.885915 4.84831C-0.524487 5.78539 -0.199601 7.61565 1.49634 8.69144C2.41375 9.27344 3.34408 9.32113 4.57207 9.26191C4.36383 9.75887 3.26778 10.5149 2.44952 10.598C2.06105 10.6373 1.70418 10.6054 1.71391 11.0461C1.72981 11.7545 2.97728 11.4469 3.45953 11.2651C4.17447 10.9956 4.44033 10.6266 4.91384 10.318C4.92139 13.2012 6.52653 14.7748 8.2793 15.75C8.96065 15.481 10.1646 14.4233 10.6427 13.7441C11.3461 12.7446 11.6078 11.8608 11.6638 10.3234C11.8526 10.4224 12.0726 10.6505 12.2945 10.8092C13.0802 11.371 14.6792 11.8612 14.8409 11.1709C14.9581 10.6705 14.609 10.6395 14.238 10.6054C13.8593 10.5704 13.6139 10.4979 13.3003 10.3349C12.8094 10.0796 12.2051 9.62237 11.9895 9.24384C14.2364 9.47453 16.6237 8.46849 16.6247 6.34712C16.6253 5.11953 15.2864 4.28021 13.7832 4.43639C12.9002 4.52819 11.945 5.0013 11.1806 5.40606C10.8956 5.55688 10.678 5.73074 10.375 5.82433C10.9813 4.71119 10.8986 3.59051 9.99331 2.86544C10.0907 2.30688 10.8392 1.60664 11.1607 1.34435C11.4752 1.08743 11.6257 1.04729 12.0074 0.868655C12.4356 0.668162 12.4829 0.239557 12.1165 0.0539678C11.5943 -0.210507 10.6333 0.59286 10.3806 0.830311C10.1217 1.07352 9.97086 1.24242 9.73898 1.51544C9.51702 1.77674 9.31316 2.13639 9.14028 2.31303C8.21889 2.14592 8.31109 2.20713 7.41592 2.30529C7.2196 1.79899 5.22164 -0.395105 4.38013 0.0623118C4.23408 0.141793 3.93423 0.562453 4.4912 0.860311C4.84728 1.05047 5.06506 1.10074 5.39153 1.35369C5.77543 1.65115 6.48361 2.32476 6.62469 2.85351L6.62488 2.85291Z"
                            fill="#040404"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default AboutGMBTE;
