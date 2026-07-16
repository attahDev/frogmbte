/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/mainuseAuth";


interface LoginModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onSuccess?: (data: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen = false, onClose, onSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();

    // ✅ Use useAuth hook to get state and function
    const { login, isAuthenticated, isLoading: authLoading, user } = useAuth();

    // Combine loading states
    const loading = authLoading;

    // Helper to extract error message from the context's thrown error
    const extractErrorMessage = (error: unknown): string => {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message;
            if (typeof message === 'string') return message;
            if (Array.isArray(message)) return message.join(', ');
            return 'Server communication failed (Axios Error)';
        }
        return error instanceof Error ? error.message : 'Unknown authentication error';
    };

    // ✅ Check if user is already logged in - REDIRECT IMMEDIATELY
    useEffect(() => {
        if (isAuthenticated && user) {
            console.log("User already authenticated, redirecting...");
            if (onClose) {
                onClose(); // Close modal first
            }
            navigate('/dashboard'); // Force redirect to home
        }
    }, [isAuthenticated, user, onClose, navigate]);

    useEffect(() => {
        if (isAuthenticated && user) {
            if (onClose) {
                onClose();
            }
            navigate('/dashboard');
        }
    }, [isAuthenticated, user, onClose, navigate]);
    const handleClose = () => {
        if (onClose) {
            onClose();
            return;
        }

        navigate("/", { replace: true });
    };
    const handleSignUpClick = () => {
        if (onClose) {
            onClose();
        } else {
            navigate('/signup');
        }
    };

    const validate = () => {
        const newErrors: any = {};

        if (!email || !email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Enter a valid email";

        if (!password || !password.trim()) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setErrors({});

        try {
            const userData = await login(email, password);

            onSuccess?.({ user: userData });
            onClose?.();

            navigate("/dashboard", { replace: true });
        } catch (err: any) {
            const errorMessage = extractErrorMessage(err);
            setErrors({ general: errorMessage });
        }
    };

    // ✅ If user is authenticated, don't render the modal at all
    if (isAuthenticated && user) {
        return null;
    }

    // If used as modal and not open, return null
    if (onClose && !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Background Overlay */}
            <div
                className="fixed inset-0 bg-black/50"
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div className="relative z-50 w-full max-w-md">
                <div className="bg-white rounded-2xl p-8 shadow-xl animate-[scaleIn_0.25s_ease]">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-1 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-600 hover:text-gray-800" />
                    </button>

                    {/* Title */}
                    <h2 className="text-center text-[20px] font-bold text-[#001F3F]">Welcome Back</h2>
                    <p className="text-center text-[#6B7280] mt-1 text-base">
                        Sign in to access your dashboard and
                        <br />
                        connect with the community
                    </p>

                    {/* General error */}
                    {errors.general && (
                        <p className="text-red-500 text-center text-sm mt-3">{errors.general}</p>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        {/* Email */}
                        <div>
                            <label className="text-base text-[#001F3F] mb-4">Email Address</label>
                            <div
                                className={
                                    "mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 bg-gray-50" +
                                    (errors.email ? " border-red-500" : " border-gray-200")
                                }
                            >
                                <span className="flex-shrink-0">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6668 4.66663L8.67283 8.48463C8.46942 8.60277 8.23839 8.665 8.00316 8.665C7.76794 8.665 7.5369 8.60277 7.3335 8.48463L1.3335 4.66663" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13.3335 2.66663H2.66683C1.93045 2.66663 1.3335 3.26358 1.3335 3.99996V12C1.3335 12.7363 1.93045 13.3333 2.66683 13.3333H13.3335C14.0699 13.3333 14.6668 12.7363 14.6668 12V3.99996C14.6668 3.26358 14.0699 2.66663 13.3335 2.66663Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-base text-[#001F3F] mb-4">Password</label>
                            <div
                                className={
                                    "mt-1 flex items-center gap-3 border rounded-lg px-3 py-2 bg-gray-50" +
                                    (errors.password ? " border-[#D7263D]" : " border-gray-200")
                                }
                            >
                                <span className="flex-shrink-0">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.6667 7.33337H3.33333C2.59695 7.33337 2 7.93033 2 8.66671V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V8.66671C14 7.93033 13.403 7.33337 12.6667 7.33337Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.6665 7.33337V4.66671C4.6665 3.78265 5.01769 2.93481 5.64281 2.30968C6.26794 1.68456 7.11578 1.33337 7.99984 1.33337C8.88389 1.33337 9.73174 1.68456 10.3569 2.30968C10.982 2.93481 11.3332 3.78265 11.3332 4.66671V7.33337" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="flex-shrink-0 p-1 text-gray-500 hover:text-gray-800 transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-[#D7263D] text-xs mt-1">{errors.password}</p>}
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-sm mt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to='/reset-password' type="button" className="text-[#D7263D] hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#D7263D] hover:bg-red-700 text-white py-2 rounded-xl mt-4 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </>
                            ) : (
                                "Sign In →"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm mt-4">
                        Don't have an account?
                        <button
                            type="button"
                            onClick={handleSignUpClick}
                            className="text-[#D7263D] hover:underline ml-1"
                        >
                            Sign up here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;