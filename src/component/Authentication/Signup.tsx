/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/mainuseAuth"; // Add this import

type Props = {
    isOpen?: boolean;
    onClose?: () => void;
    onSuccess?: (data: any) => void;
};

export default function SignupModal({ isOpen = true, onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        organization: "",
        role: "",
        password: "",
        confirmPassword: "",
        terms: false,
        newsletter: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    
    // ✅ Use auth context to check if user is already logged in
    const { isAuthenticated, isLoading: authLoading, user, register } = useAuth();

    const roles = [
        "STUDENT",
        "PROFESSIONAL",
        "ENGINEER",
        "OTHER",
    ];

    // ✅ Check if user is already logged in - REDIRECT IMMEDIATELY
    useEffect(() => {
        if (isAuthenticated && user) {
            console.log("User already authenticated, redirecting from signup...");
            if (onClose) {
                onClose(); // Close modal first
            }
            navigate('/', { replace: true }); // Force redirect to home
        }
    }, [isAuthenticated, user, onClose, navigate]);

    // ✅ Also check on component mount
    useEffect(() => {
        if (isAuthenticated && user && isOpen) {
            console.log("Signup modal opened but user is already authenticated");
            if (onClose) {
                onClose();
            }
            navigate('/', { replace: true });
        }
    }, [isOpen, isAuthenticated, user, onClose, navigate]);

    // If used as modal and not open, return null
    if (!isOpen) return null;

    // ✅ If user is authenticated, don't render the modal at all
    if (isAuthenticated && user) {
        return null;
    }

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
        }
    };

    const handleSignInClick = () => {
        if (onClose) {
            onClose();
        } else {
            navigate('/login');
        }
    };

    function handleChange(e: any) {
        const { name, value, type, checked } = e.target;
        setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setGeneralError(null);
    }

    function validate() {
        const next: any = {};
        if (!form.firstName.trim()) next.firstName = "First name is required";
        if (!form.lastName.trim()) next.lastName = "Last name is required";
        if (!form.email.trim()) next.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
        if (!form.role) next.role = "Please select your role";
        if (!form.password) next.password = "Password is required";
        else if (form.password.length < 6) next.password = "Password must be at least 6 characters";
        if (!form.confirmPassword) next.confirmPassword = "Please confirm your password";
        else if (form.password !== form.confirmPassword)
            next.confirmPassword = "Passwords do not match";

        if (!form.terms) next.terms = "You must accept the Terms";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setGeneralError(null);
        try {
            // ✅ Use the register function from auth context instead of direct axios call
            const userData = await register({
                firstname: form.firstName,
                lastname: form.lastName,
                email: form.email,
                organization: form.organization,
                role: form.role as any,
                password: form.password,
                agreedToTerms: form.terms,
                // subscribedToNews: form.newsletter,
            });

            console.log("Registration successful", userData);
            
            // Store email for OTP verification if needed
            localStorage.setItem('pendingVerificationEmail', form.email);
            
            // Call onSuccess callback
            onSuccess?.(userData);
            
            // Navigate to OTP verification
            navigate('/verify-otp');
            
            // Close modal if in modal mode
            if (onClose) {
                onClose();
            }
        } catch (err: any) {
            console.error("Registration error:", err);
            setGeneralError(
                err?.response?.data?.message || "Signup failed. Try again."
            );
        } finally {
            setLoading(false);
        }
    }

    // Show loading state while checking auth
    if (authLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3">
                <div className="bg-white w-full max-w-[488px] rounded-2xl shadow-xl relative p-8 flex items-center justify-center h-64">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D7263D]"></div>
                        <p className="text-gray-600">Checking authentication...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3">
            <div className="bg-white w-full max-w-[488px] rounded-2xl shadow-xl relative p-5 sm:p-6 md:p-8 max-h-[92vh] overflow-y-auto md:max-h-[770px] md:overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                <h2 className="text-center text-xl md:text-3xl font-semibold text-[#001F3F] backdrop-blur-sm">
                    Join the GMBTE Community
                </h2>
                <p className="text-center text-sm md:text-base text-[#6B7280] mt-2">
                    Create your account to start connecting with <br />
                    opportunities and people
                </p>

                {generalError && (
                    <p className="text-[#D7263D] text-center mt-4 text-sm">{generalError}</p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* First + Last */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-[#001F3F]">
                                First Name
                            </label>
                            <input
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-lg mt-1 bg-gray-50 text-sm outline-none border ${errors.firstName ? "border-red-500" : "border-gray-200"
                                    }`}
                            />
                            {errors.firstName && (
                                <p className="text-[#D7263D] text-xs mt-1">{errors.firstName}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-[#001F3F]">
                                Last Name
                            </label>
                            <input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 rounded-lg mt-1 bg-gray-50 text-sm outline-none border ${errors.lastName ? "border-red-500" : "border-gray-200"
                                    }`}
                            />
                            {errors.lastName && (
                                <p className="text-[#D7263D] text-xs mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-[#001F3F] font-medium block mb-1">
                            Email Address
                        </label>

                        <div
                            className={`flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-200"
                                }`}
                        >
                            <span className="text-gray-400 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.6668 4.66666L8.67283 8.48466C8.46942 8.6028 8.23839 8.66503 8.00316 8.66503C7.76794 8.66503 7.5369 8.6028 7.3335 8.48466L1.3335 4.66666" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.3335 2.66666H2.66683C1.93045 2.66666 1.3335 3.26361 1.3335 3.99999V12C1.3335 12.7364 1.93045 13.3333 2.66683 13.3333H13.3335C14.0699 13.3333 14.6668 12.7364 14.6668 12V3.99999C14.6668 3.26361 14.0699 2.66666 13.3335 2.66666Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>

                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>

                        {errors.email && (
                            <p className="text-[#D7263D] text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Organization */}
                    <div>
                        <label className="text-sm text-[#001F3F] font-medium block mb-1">
                            Organization (Optional)
                        </label>

                        <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200">
                            <span className="text-gray-400 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 6.66666H8.00667" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 9.33334H8.00667" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 4H8.00667" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.6665 6.66666H10.6732" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.6665 9.33334H10.6732" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.6665 4H10.6732" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.3335 6.66666H5.34016" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.3335 9.33334H5.34016" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.3335 4H5.34016" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 14.6667V12.6667C6 12.4899 6.07024 12.3203 6.19526 12.1953C6.32029 12.0702 6.48986 12 6.66667 12H9.33333C9.51014 12 9.67971 12.0702 9.80474 12.1953C9.92976 12.3203 10 12.4899 10 12.6667V14.6667" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.9998 1.33334H3.99984C3.26346 1.33334 2.6665 1.9303 2.6665 2.66668V13.3333C2.6665 14.0697 3.26346 14.6667 3.99984 14.6667H11.9998C12.7362 14.6667 13.3332 14.0697 13.3332 13.3333V2.66668C13.3332 1.9303 12.7362 1.33334 11.9998 1.33334Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <input
                                name="organization"
                                value={form.organization}
                                onChange={handleChange}
                                placeholder="Your organization or school"
                                className="w-full bg-transparent outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="text-sm text-[#001F3F] font-medium block mb-1">
                            Role
                        </label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 rounded-lg bg-gray-50 text-sm outline-none border ${errors.role ? "border-red-500" : "border-gray-200"
                                }`}
                        >
                            <option value="">Select your role</option>
                            {roles.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                        {errors.role && (
                            <p className="text-[#D7263D] text-xs mt-1">{errors.role}</p>
                        )}
                    </div>

                    {/* Password + Confirm */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Password */}
                        <div>
                            <label className="text-sm text-[#001F3F] font-medium">
                                Password
                            </label>

                            <div
                                className={`flex items-center px-4 py-2.5 bg-gray-50 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-200"
                                    }`}
                            >
                                <span className="text-gray-400 flex items-center">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.6667 7.33333H3.33333C2.59695 7.33333 2 7.93028 2 8.66666V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V8.66666C14 7.93028 13.403 7.33333 12.6667 7.33333Z" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.6665 7.33333V4.66666C4.6665 3.78261 5.01769 2.93476 5.64281 2.30964C6.26794 1.68452 7.11578 1.33333 7.99984 1.33333C8.88389 1.33333 9.73174 1.68452 10.3569 2.30964C10.982 2.93476 11.3332 3.78261 11.3332 4.66666V7.33333" stroke="#6B7280" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Create password"
                                    className="w-full bg-transparent outline-none ml-2 text-sm"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="flex items-center justify-center"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-sm text-[#001F3F] font-medium">
                                Confirm Password
                            </label>

                            <div
                                className={`flex items-center px-4 py-2.5 bg-gray-50 rounded-lg border ${errors.confirmPassword
                                    ? "border-red-500"
                                    : "border-gray-200"
                                    }`}
                            >
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className="w-full bg-transparent outline-none ml-2 text-sm"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((s) => !s)
                                    }
                                    className="flex items-center justify-center"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-2 text-sm text-[#001F3F]">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={form.terms}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 accent-[#D7263D]"
                        />
                        <span>
                            I agree to the{" "}
                            <span className="text-[#D7263D]">Terms of Service</span> and{" "}
                            <span className="text-[#D7263D]">Privacy Policy</span>
                        </span>
                    </label>
                    {errors.terms && (
                        <p className="text-[#D7263D] text-xs mt-1">{errors.terms}</p>
                    )}

                    {/* Newsletter */}
                    <label className="flex items-start gap-2 text-sm text-[#001F3F]">
                        <input
                            type="checkbox"
                            name="newsletter"
                            checked={form.newsletter}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 accent-red-500"
                        />
                        <span>Subscribe to our newsletter</span>
                    </label>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl text-white text-sm font-medium bg-[#D7263D] hover:bg-[#D7263D] disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Create Account →"}
                    </button>

                    <p className="text-center text-sm mt-2 text-gray-700">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={handleSignInClick}
                            className="text-[#D7263D] font-medium"
                        >
                            Sign in
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}