/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../lib/api";

export default function NewsletterSignup() {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setSuccess(false);

        if (!firstName || !email) {
            setError("Please enter your name and email.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/newsletter/subscribe", {
                firstName,
                email,
            });

            setSuccess(true);
            setFirstName("");
            setEmail("");
        } catch (err: any) {
            if (err.response) {
                switch (err.response.status) {
                    case 409:
                        setError("This email is already subscribed.");
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
        <section className="relative w-full bg-[#FFD700] py-12 sm:py-16 md:py-24 flex justify-center overflow-hidden">
            <div className="relative max-w-[1400px] w-full px-4 sm:px-6 md:px-12 mb-6 sm:mb-10">
                <div className="relative flex items-center justify-center">
                    {/* Blue Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative bg-[#001F3F] text-white w-full lg:w-[820px] h-auto lg:h-[600px] p-6 sm:p-12 lg:p-16 z-20 shadow-xl"
                    >
                        <h4 className="text-[18px] tracking-wide text-[#FFFFFF] mb-3">
                            Stay in the Loop
                        </h4>
                        <h2 className="text-2xl sm:text-[36px] font-bold leading-tight mb-6 sm:mb-8">
                            Sign Up For Our <br /> Newsletter
                        </h2>
                        <p className="font-open-sans text-[16px] sm:text-[18px] text-[#FFFFFF99] leading-relaxed mb-10 max-w-xl">
                            Stay connected with the latest from Greater Manchester's tech
                            community. Get updates about events, mentorships, inspiring
                            stories, and new career opportunities.
                        </p>

                        {/* Success/Error Messages */}
                        {success && (
                           <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-200 w-auto inline-block">
    ✓ Successfully subscribed! Check your email for confirmation.
</div>
                        )}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-200 w-auto inline-block">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <div className="flex flex-col gap-6 max-w-[500px]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label
                                        htmlFor="firstName"
                                        className="block text-sm font-medium text-white mb-2"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-[#132E57] text-white placeholder:text-[#FFFFFF26] focus:outline-none focus:ring-2 focus:ring-[#C1283C] transition border-0"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-white mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-[#132E57] text-white placeholder:text-[#FFFFFF26] focus:outline-none focus:ring-2 focus:ring-[#C1283C] transition border-0"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <motion.button
                                onClick={handleSubmit}
                                disabled={loading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full flex items-center justify-center gap-3 bg-[#C1283C] hover:bg-[#A31F32] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-lg text-base"
                            >
                                {loading ? "Subscribing..." : "Sign Up"}
                                {!loading && <ArrowRight className="w-5 h-5" />}
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Image overlapping card (Visible only on large screens) */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="hidden lg:block absolute right-[-70px] bottom-[-40px] w-[420px] h-[540px] z-30"
                    >
                        <img
                            src="/events/signup.jpg"
                            alt="A group of people seated in a conference room faces a presenter in a suit beside a projected screen."
                            className="w-full h-full object-cover  shadow-2xl"
                        />
                    </motion.div>

                    {/* Decorative pattern */}
                    <div className="absolute bottom-[-350px] right-[-350px] opacity-10 rotate-[-20deg] pointer-events-none select-none">
                        <svg width="500" height="500" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.37631 12.5932L10.1976 12.5844C10.1471 13.2199 8.80268 14.4119 8.24989 14.6333C8.1261 14.4928 7.87394 14.3313 7.70862 14.2071C7.2359 13.852 6.48818 13.1772 6.37631 12.5932ZM10.6057 11.2529L6.10527 11.2352C5.77801 11.1405 5.902 10.6995 5.94612 10.1752L10.6419 10.1825C10.7001 10.5392 10.6814 10.9489 10.6057 11.2529ZM6.19608 8.82775C6.30795 8.29344 6.76537 7.89583 7.07714 7.65977C8.21134 6.80097 8.56066 6.86356 9.63565 7.70388C9.96371 7.96041 10.3633 8.27198 10.4807 8.82736L6.19608 8.82775ZM10.3319 6.99629C11.3091 6.48045 11.8502 5.95965 13.0989 5.53482C13.6433 5.34943 14.3938 5.24015 14.9373 5.45197C16.5567 6.08305 15.3639 8.28609 13.1161 8.39935C12.582 8.42637 11.5623 8.42795 11.2728 8.12016L10.3321 6.99629H10.3319ZM6.35902 7.0875C5.3506 7.74402 6.00949 8.55652 3.44403 8.39557C1.23225 8.25688 0.0197617 5.95688 1.78803 5.41918C3.34806 4.94488 6.12634 6.69983 6.35902 7.0875ZM9.08007 4.35949C9.7048 5.14596 9.40853 4.67961 9.73083 5.02217C9.31673 6.35866 7.16377 6.17903 6.87049 5.02217L7.32592 4.64443C7.49938 4.06938 7.67881 3.9907 7.40997 3.35346C8.09132 3.0405 8.34169 3.02221 9.07431 3.30219C9.09438 3.73318 8.94634 3.7914 9.08007 4.35949ZM6.62488 2.85291C6.26841 3.08063 5.96837 3.55791 5.86266 4.12541C5.71303 4.92818 5.98406 5.29121 6.21456 5.80685C4.85503 5.0792 2.63829 3.6841 0.885915 4.84831C-0.524487 5.78539 -0.199601 7.61565 1.49634 8.69144C2.41375 9.27344 3.34408 9.32113 4.57207 9.26191C4.36383 9.75887 3.26778 10.5149 2.44952 10.598C2.06105 10.6373 1.70418 10.6054 1.71391 11.0461C1.72981 11.7545 2.97728 11.4469 3.45953 11.2651C4.17447 10.9956 4.44033 10.6266 4.91384 10.318C4.92139 13.2012 6.52653 14.7748 8.2793 15.75C8.96065 15.481 10.1646 14.4233 10.6427 13.7441C11.3461 12.7446 11.6078 11.8608 11.6638 10.3234C11.8526 10.4224 12.0726 10.6505 12.2945 10.8092C13.0802 11.371 14.6792 11.8612 14.8409 11.1709C14.9581 10.6705 14.609 10.6395 14.238 10.6054C13.8593 10.5704 13.6139 10.4979 13.3003 10.3349C12.8094 10.0796 12.2051 9.62237 11.9895 9.24384C14.2364 9.47453 16.6237 8.46849 16.6247 6.34712C16.6253 5.11953 15.2864 4.28021 13.7832 4.43639C12.9002 4.52819 11.945 5.0013 11.1806 5.40606C10.8956 5.55688 10.678 5.73074 10.375 5.82433C10.9813 4.71119 10.8986 3.59051 9.99331 2.86544C10.0907 2.30688 10.8392 1.60664 11.1607 1.34435C11.4752 1.08743 11.6257 1.04729 12.0074 0.868655C12.4356 0.668162 12.4829 0.239557 12.1165 0.0539678C11.5943 -0.210507 10.6333 0.59286 10.3806 0.830311C10.1217 1.07352 9.97086 1.24242 9.73898 1.51544C9.51702 1.77674 9.31316 2.13639 9.14028 2.31303C8.21889 2.14592 8.31109 2.20713 7.41592 2.30529C7.2196 1.79899 5.22164 -0.395105 4.38013 0.0623118C4.23408 0.141793 3.93423 0.562453 4.4912 0.860311C4.84728 1.05047 5.06506 1.10074 5.39153 1.35369C5.77543 1.65115 6.48361 2.32476 6.62469 2.85351L6.62488 2.85291Z" fill="#040404" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}