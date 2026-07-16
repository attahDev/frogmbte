/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import toast from "react-hot-toast";



export default function OtpPage() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Get the email from localStorage
        const pendingEmail = localStorage.getItem('pendingVerificationEmail');
        if (!pendingEmail) {
            // If no email found, redirect to register
            navigate('/signup');
            return;
        }
        setEmail(pendingEmail);

        setOtp(Array(6).fill(""));
        setTimer(30);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) clearInterval(interval);
                return Math.max(prev - 1, 0);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError(""); // Clear error when user types

        if (index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const data = e.clipboardData.getData("text");
        if (data.length === 6 && /^\d+$/.test(data)) {
            setOtp(data.split(""));
            setError(""); // Clear error on paste
            inputRefs.current[5]?.focus();
        }
    };

    const verifyCode = async () => {
        const otpCode = otp.join("");
        
        if (otpCode.length !== 6) {
            setError("Please enter a 6-digit OTP code");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/verify-email", {
                email: email,
                otpCode: otpCode
            });

            if (response.data.success) {
                // ✅ Clear the pending email from storage
                localStorage.removeItem('pendingVerificationEmail');
                
                // ✅ Store the access token if returned
                if (response.data.data.access_token) {
                    localStorage.setItem('access_token', response.data.data.access_token);
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                }
                
                // ✅ Show success and redirect
                toast.success("Email verified successfully! Redirecting...");
                
                // Redirect to dashboard or login page
                setTimeout(() => {
                    navigate('/login'); // or '/login' if you want them to login manually
                }, 1500);
                
            }
        } catch (err: any) {
            console.error("OTP verification error:", err);
            setError(
                err?.response?.data?.message || 
                "OTP verification failed. Please try again."
            );
            
            // Clear OTP on error for better UX
            setOtp(Array(6).fill(""));
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const resendCode = async () => {
        if (timer === 0) {
            setLoading(true);
            setError("");

            try {
                const response = await api.post("/auth/resend-verification", {
                    email: email
                });

                if (response.data.success) {
                    setTimer(30);
                    alert("New OTP sent to your email!");
                    
                    // Clear existing OTP
                    setOtp(Array(6).fill(""));
                    inputRefs.current[0]?.focus();
                }
            } catch (err: any) {
                setError(
                    err?.response?.data?.message || 
                    "Failed to resend OTP. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move to previous input on backspace
            inputRefs.current[index - 1]?.focus();
        }
        
        // Submit on Enter when last input is filled
        if (e.key === 'Enter' && index === 5 && otp.join("").length === 6) {
            verifyCode();
        }
    };

    return (
        <div className="w-full h-screen bg-[#FFFDF7] flex items-center justify-center p-4">
            <div className="bg-[#FFFDF7] shadow-xl rounded-2xl p-10 w-full max-w-md text-center animate-fadeIn">

                {/* Icon */}
                <div className="mx-auto w-20 h-20 bg-[#D7263D1A] rounded-full flex items-center justify-center mb-6">
                    <span className="text-xl font-bold text-[#D7263D]">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.44784 23.2187C2.94771 23.7187 2.66665 24.3969 2.6665 25.104V28C2.6665 28.3537 2.80698 28.6928 3.05703 28.9429C3.30708 29.1929 3.64622 29.3334 3.99984 29.3334H7.99984C8.35346 29.3334 8.6926 29.1929 8.94265 28.9429C9.19269 28.6928 9.33317 28.3537 9.33317 28V26.6667C9.33317 26.3131 9.47365 25.974 9.72369 25.7239C9.97374 25.4739 10.3129 25.3334 10.6665 25.3334H11.9998C12.3535 25.3334 12.6926 25.1929 12.9426 24.9429C13.1927 24.6928 13.3332 24.3537 13.3332 24V22.6667C13.3332 22.3131 13.4736 21.974 13.7237 21.7239C13.9737 21.4739 14.3129 21.3334 14.6665 21.3334H14.8958C15.603 21.3332 16.2812 21.0522 16.7812 20.552L17.8665 19.4667C19.7196 20.1122 21.7369 20.1098 23.5885 19.4597C25.44 18.8097 27.0161 17.5505 28.059 15.8882C29.1018 14.2259 29.5497 12.2589 29.3293 10.309C29.1089 8.35912 28.2333 6.54172 26.8457 5.15414C25.4582 3.76657 23.6408 2.89096 21.6909 2.67057C19.7409 2.45018 17.774 2.89805 16.1117 3.94091C14.4494 4.98377 13.1902 6.55988 12.5402 8.41141C11.8901 10.2629 11.8876 12.2803 12.5332 14.1334L3.44784 23.2187Z" stroke="#D7263D" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22.0002 10.6667C22.3684 10.6667 22.6668 10.3682 22.6668 10C22.6668 9.63185 22.3684 9.33337 22.0002 9.33337C21.632 9.33337 21.3335 9.63185 21.3335 10C21.3335 10.3682 21.632 10.6667 22.0002 10.6667Z" fill="#D7263D" stroke="#D7263D" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold mb-2 text-[#001F3F]">
                    Verify Your Email
                </h2>

                <p className="text-gray-600 mb-2">
                    Enter the 6-digit verification code sent to:
                </p>
                <p className="text-gray-800 font-medium mb-6">{email}</p>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* OTP Inputs */}
                <div className="flex justify-between gap-2 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                if (el) inputRefs.current[index] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onPaste={handlePaste}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            disabled={loading}
                            className="w-12 h-14 border text-center text-lg font-semibold rounded-lg 
              focus:border-[#D7263D] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    ))}
                </div>

                {/* Verify button */}
                <button
                    onClick={verifyCode}
                    disabled={otp.join("").length !== 6 || loading}
                    className="w-full bg-[#D7263D] hover:bg-[#D7263D] disabled:bg-gray-300 disabled:cursor-not-allowed
                   text-white py-3 rounded-lg text-sm font-medium transition flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </>
                    ) : (
                        "Verify Code →"
                    )}
                </button>

                {/* Resend + Timer */}
                <p className="text-sm text-gray-500 mt-4">
                    Didn't receive the code?
                    {timer > 0 ? (
                        <span className="ms-2">{`00:${String(timer).padStart(2, "0")}`}</span>
                    ) : (
                        <button
                            onClick={resendCode}
                            disabled={loading}
                            className="text-[#D82236] hover:underline ms-2 disabled:text-gray-400"
                        >
                            Resend OTP
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
}