/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

interface ForgotPasswordProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordProps> = ({
    isOpen = true,
    onClose,
}) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [message, setMessage] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    // Timer for OTP resend
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    // Initialize OTP refs
    useEffect(() => {
        otpRefs.current = otpRefs.current.slice(0, 6);
    }, []);

    const handleClose = () => {
        if (onClose) onClose();
        else navigate(-1);
    };

    const goBack = () => {
        if (step === "otp") {
            setStep("email");
            setOtp(["", "", "", "", "", ""]);
        } else if (step === "reset") {
            setStep("otp");
        }
        setErrors({});
        setMessage("");
    };

    const validateEmail = () => {
        const newErrors: any = {};
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateOtp = () => {
        const newErrors: any = {};
        const otpString = otp.join("");
        if (otpString.length !== 6) newErrors.otp = "Please enter all 6 digits";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePassword = () => {
        const newErrors: any = {};
        if (!newPassword.trim()) newErrors.newPassword = "Password is required";
        else if (newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters";
        
        if (!confirmPassword.trim()) newErrors.confirmPassword = "Please confirm your password";
        else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // OTP input handlers
    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // Only allow numbers
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        
        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            // Move to previous input on backspace
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d+$/.test(pasteData)) {
            const newOtp = [...otp];
            pasteData.split("").forEach((char, index) => {
                if (index < 6) newOtp[index] = char;
            });
            setOtp(newOtp);
            
            // Focus the next empty input
            const nextIndex = Math.min(pasteData.length, 5);
            otpRefs.current[nextIndex]?.focus();
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail()) return;

        setLoading(true);
        setErrors({});
        setMessage("");

        try {
            const response = await api.post("/auth/forgot-password", { email });
            console.log("OTP sent response:", response.data);
            setMessage("OTP sent to your email successfully!");
            setStep("otp");
            setTimer(60); // 60 seconds timer
        } catch (err: any) {
            console.error("OTP send error:", err);
            const message = err.response?.data?.message || "Failed to send OTP. Please try again.";
            setErrors({ general: message });
        } finally {
            setLoading(false);
        }
    };

    // NEW: Directly move to password reset after OTP entry
    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateOtp()) return;
        
        setMessage("OTP entered successfully! Now set your new password.");
        setStep("reset");
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validatePassword()) return;

        setLoading(true);
        setErrors({});
        setMessage("");

        const otpCode = otp.join("");

        try {
            console.log("Resetting password:", { email, otpCode, newPassword });
            
            const response = await api.post("/auth/reset-password", { 
                email, 
                otpCode, 
                newPassword 
            });
            
            console.log("Password reset successful:", response.data);
            setMessage("Password reset successfully! Redirecting to login...");
            
            // Clear any stored tokens
            localStorage.removeItem('token');
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
                if (onClose) onClose();
            }, 2000);
        } catch (err: any) {
            console.error("Password reset error:", err);
            const errorMessage = err.response?.data?.message || "Failed to reset password. Please try again.";
            
            if (errorMessage.toLowerCase().includes("otp") || 
                errorMessage.toLowerCase().includes("invalid") || 
                errorMessage.toLowerCase().includes("expired")) {
                // OTP is invalid or expired, go back to OTP step
                setErrors({ general: `${errorMessage}. Please request a new OTP.` });
                setStep("otp");
                setOtp(["", "", "", "", "", ""]);
                otpRefs.current[0]?.focus();
            } else {
                setErrors({ general: errorMessage });
            }
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async () => {
        if (timer > 0) return;

        setLoading(true);
        setErrors({});
        setMessage("");

        try {
            await api.post("/auth/forgot-password", { email });
            setMessage("OTP resent successfully!");
            setTimer(60);
            setOtp(["", "", "", "", "", ""]);
            otpRefs.current[0]?.focus();
        } catch (err: any) {
            const message = err.response?.data?.message || "Failed to resend OTP. Please try again.";
            setErrors({ general: message });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50" onClick={handleClose} />

            {/* Modal */}
            <div className="relative z-50 w-full max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-2 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-600" />
                    </button>

                    {/* Back Button (for OTP and Reset steps) */}
                    {(step === "otp" || step === "reset") && (
                        <button
                            onClick={goBack}
                            className="absolute top-4 left-4 hover:bg-gray-100 rounded-full p-2 transition-colors"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                        </button>
                    )}

                    {/* Title */}
                    <h2 className="text-[20px] font-bold text-[#001F3F] text-center">
                        {step === "email" && "Forgot Password?"}
                        {step === "otp" && "Enter OTP Code"}
                        {step === "reset" && "Reset Password"}
                    </h2>

                    {/* Icon */}
                    <div className="flex justify-center mt-4 mb-4">
                        <div className="mx-auto w-20 h-20 bg-[#D7263D1A] rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold text-[#D7263D]">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.44784 23.2187C2.94771 23.7187 2.66665 24.3969 2.6665 25.104V28C2.6665 28.3537 2.80698 28.6928 3.05703 28.9429C3.30708 29.1929 3.64622 29.3334 3.99984 29.3334H7.99984C8.35346 29.3334 8.6926 29.1929 8.94265 28.9429C9.19269 28.6928 9.33317 28.3537 9.33317 28V26.6667C9.33317 26.3131 9.47365 25.974 9.72369 25.7239C9.97374 25.4739 10.3129 25.3334 10.6665 25.3334H11.9998C12.3535 25.3334 12.6926 25.1929 12.9426 24.9429C13.1927 24.6928 13.3332 24.3537 13.3332 24V22.6667C13.3332 22.3131 13.4736 21.974 13.7237 21.7239C13.9737 21.4739 14.3129 21.3334 14.6665 21.3334H14.8958C15.603 21.3332 16.2812 21.0522 16.7812 20.552L17.8665 19.4667C19.7196 20.1122 21.7369 20.1098 23.5885 19.4597C25.44 18.8097 27.0161 17.5505 28.059 15.8882C29.1018 14.2259 29.5497 12.2589 29.3293 10.309C29.1089 8.35912 28.2333 6.54172 26.8457 5.15414C25.4582 3.76657 23.6408 2.89096 21.6909 2.67057C19.7409 2.45018 17.774 2.89805 16.1117 3.94091C14.4494 4.98377 13.1902 6.55988 12.5402 8.41141C11.8901 10.2629 11.8876 12.2803 12.5332 14.1334L3.44784 23.2187Z" stroke="#D7263D" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22.0002 10.6667C22.3684 10.6667 22.6668 10.3682 22.6668 10C22.6668 9.63185 22.3684 9.33337 22.0002 9.33337C21.632 9.33337 21.3335 9.63185 21.3335 10C21.3335 10.3682 21.632 10.6667 22.0002 10.6667Z" fill="#D7263D" stroke="#D7263D" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#6B7280] text-base text-center mb-6">
                        {step === "email" && (
                            <>Enter your email address and we'll send you an OTP to reset your password.</>
                        )}
                        {step === "otp" && (
                            <>Enter the 6-digit OTP sent to <strong>{email}</strong></>
                        )}
                        {step === "reset" && (
                            <>Enter your new password below.</>
                        )}
                    </p>

                    {/* Success/Error Messages */}
                    {message && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
                            {message}
                        </div>
                    )}

                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                            {errors.general}
                        </div>
                    )}

                    {/* Step 1: Email Input */}
                    {step === "email" && (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <label className="text-[#001F3F] text-base font-medium block mb-2">
                                    Email Address
                                </label>
                                <div className={`flex items-center gap-3 border rounded-lg px-4 py-3 bg-gray-50 ${
                                    errors.email ? "border-red-500" : "border-gray-200"
                                }`}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6668 4.66663L8.67283 8.48463C8.46942 8.60277 8.23839 8.665 8.00316 8.665C7.76794 8.665 7.5369 8.60277 7.3335 8.48463L1.3335 4.66663" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.3335 2.66663H2.66683C1.93045 2.66663 1.3335 3.26358 1.3335 3.99996V12C1.3335 12.7363 1.93045 13.3333 2.66683 13.3333H13.3335C14.0699 13.3333 14.6668 12.7363 14.6668 12V3.99996C14.6668 3.26358 14.0699 2.66663 13.3335 2.66663Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your.email@example.com"
                                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#D7263D] hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors font-medium"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Sending OTP...</span>
                                ) : (
                                    <>
                                        Send OTP
                                        <span className="text-lg">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Step 2: OTP Verification */}
                    {step === "otp" && (
                        <form onSubmit={handleOtpSubmit} className="space-y-4">
                            <div>
                                <label className="text-[#001F3F] text-base font-medium block mb-2 text-center">
                                    Enter 6-digit OTP
                                </label>
                                
                                <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { otpRefs.current[index] = el; }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg bg-white focus:border-[#D7263D] focus:outline-none focus:ring-2 focus:ring-[#D7263D]/20 transition-colors"
                                            disabled={loading}
                                        />
                                    ))}
                                </div>
                                
                                {errors.otp && (
                                    <p className="text-red-500 text-xs text-center mt-1">{errors.otp}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || otp.join("").length !== 6}
                                    className="w-full bg-[#D7263D] hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors font-medium mt-4"
                                >
                                    {loading ? (
                                        <span className="animate-pulse">Continue...</span>
                                    ) : (
                                        <>
                                            Continue to Reset Password
                                            <span className="text-lg">→</span>
                                        </>
                                    )}
                                </button>

                                {/* Resend OTP */}
                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-600">
                                        Didn't receive the code?{" "}
                                        {timer > 0 ? (
                                            <span className="text-gray-500">
                                                Resend in 00:{String(timer).padStart(2, "0")}
                                            </span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={resendOtp}
                                                disabled={loading}
                                                className="text-[#D7263D] hover:underline font-medium"
                                            >
                                                Resend OTP
                                            </button>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Reset Password */}
                    {step === "reset" && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div>
                                <label className="text-[#001F3F] text-base font-medium block mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password (min 6 characters)"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 outline-none pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                                )}
                            </div>

                            <div>
                                <label className="text-[#001F3F] text-base font-medium block mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 outline-none pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#D7263D] hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors font-medium"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Resetting Password...</span>
                                ) : (
                                    <>
                                        Reset Password
                                        <span className="text-lg">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Back to Login */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => navigate("/login")}
                            className="text-[#6B7280] text-base hover:text-[#001F3F] transition-colors underline"
                        >
                            Back to login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordModal;