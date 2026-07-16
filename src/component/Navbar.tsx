import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/mainuseAuth"; // Updated import path
import LoginModal from "./Authentication/Login";
import SignupModal from './Authentication/Signup';

const NavBar = () => {
    // Separate state for each modal
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
    const profileDesktopRef = useRef<HTMLDivElement>(null);
    const profileMobileRef = useRef<HTMLDivElement>(null);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth(); // Get auth state from new context

    const handleLinkClick = () => {
        setIsMenuOpen(false);
        setIsMobileProfileOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const clickedInsideDesktop = profileDesktopRef.current?.contains(target);
            const clickedInsideMobile = profileMobileRef.current?.contains(target);

            if (!clickedInsideDesktop && !clickedInsideMobile) {
                setIsProfileOpen(false);
            }
        };

        if (isProfileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isProfileOpen]);

    const isActive = (path: string) => location.pathname === path;

    // Handle modal open with route navigation
    const handleOpenSignup = () => {
        if (isMenuOpen) setIsMenuOpen(false);
        navigate('/signup');
    };

    const handleOpenLogin = () => {
        if (isMenuOpen) setIsMenuOpen(false);
        navigate('/login');
    };

    // Handle modal close with route navigation
    const handleCloseSignup = () => {
        setIsSignupOpen(false);
        navigate('/dashboard'); // Go back to previous page
    };

    const handleCloseLogin = () => {
        setIsLoginOpen(false);
        navigate('/dashboard'); // Go back to previous page
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout();
            setIsMenuOpen(false);
            setIsProfileOpen(false);
            setIsMobileProfileOpen(false);
            navigate('/'); // Redirect to home after logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const profileMenuLinks = (
        <>
            {/* <Link
                to="/profile"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                onClick={() => {
                    setIsProfileOpen(false);
                    handleLinkClick();
                }}
            >
                My Profile
            </Link> */}
            <Link
                to="/dashboard"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                onClick={() => {
                    setIsProfileOpen(false);
                    handleLinkClick();
                }}
            >
                Dashboard
            </Link>
            {/* <Link
                to="/dashboard/idea-generator"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                onClick={() => {
                    setIsProfileOpen(false);
                    handleLinkClick();
                }}
            >
                AI Dashboard
            </Link>
            <Link
                to="/dashboard/brand-identity"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                onClick={() => {
                    setIsProfileOpen(false);
                    handleLinkClick();
                }}
            >
                Brand Builder
            </Link> 
            <Link
                to="/settings"
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                onClick={() => {
                    setIsProfileOpen(false);
                    handleLinkClick();
                }}
            >
                Settings
            </Link>*/}
            <hr className="my-1" />
            <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition duration-150"
            >
                Sign Out
            </button>
        </>
    );

    // Generate random avatar with user's initials
    const getUserInitials = () => {
        if (!user?.firstname && !user?.lastname) return "U";
        
        const firstInitial = user.firstname ? user.firstname[0] : '';
        const lastInitial = user.lastname ? user.lastname[0] : '';
        
        return `${firstInitial}${lastInitial}`.toUpperCase();
    };

    // Generate random color based on user name for consistent avatar
    const getAvatarColor = () => {
        const name = `${user?.firstname}${user?.lastname}`;
        if (!name) return "#D7263D";
        
        const colors = [
            "#D7263D", "#001F3F", "#FF6B6B", "#4ECDC4", "#45B7D1", 
            "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F"
        ];
        
        const index = name.length % colors.length;
        return colors[index];
    };

    // Get user display name
    const getUserDisplayName = () => {
        if (!user) return { firstName: "User", lastName: "" };
        
        return { 
            firstName: user.firstname || "User", 
            lastName: user.lastname || "" 
        };
    };

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About GMBTE" },
        { path: "/partners", label: "Partners" },
          { path: "/services", label: "Services" },
        { path: "/events", label: "Events" },
        { path: "/contact", label: "Contact Us" },
    ];

    const { firstName, lastName } = getUserDisplayName();

    return (
        <>
            {/* Header */}
            <header className="h-[65px] flex justify-between items-center px-3 sm:px-6 md:px-8 xl:px-[49.67px] py-3 sticky top-0 z-50 w-full mx-auto bg-[#FFFDF7]/70 backdrop-blur-lg backdrop-saturate-150 supports-backdrop-filter:bg-[#FFFDF7]/70 border-b border-gray-200 transition-all duration-300">

                {/* Left Section */}
                <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 shrink-0">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="bg-[#FFD700] p-1.5 sm:p-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg mr-1.5 sm:mr-2 shrink-0">
                            <svg width="20" height="19" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.37631 12.5932L10.1976 12.5844C10.1471 13.2199 8.80268 14.4119 8.24989 14.6333C8.1261 14.4928 7.87394 14.3313 7.70862 14.2071C7.2359 13.852 6.48818 13.1772 6.37631 12.5932ZM10.6057 11.2529L6.10527 11.2352C5.77801 11.1405 5.902 10.6995 5.94612 10.1752L10.6419 10.1825C10.7001 10.5392 10.6814 10.9489 10.6057 11.2529ZM6.19608 8.82775C6.30795 8.29344 6.76537 7.89583 7.07714 7.65977C8.21134 6.80097 8.56066 6.86356 9.63565 7.70388C9.96371 7.96041 10.3633 8.27198 10.4807 8.82736L6.19608 8.82775ZM10.3319 6.99629C11.3091 6.48045 11.8502 5.95965 13.0989 5.53482C13.6433 5.34943 14.3938 5.24015 14.9373 5.45197C16.5567 6.08305 15.3639 8.28609 13.1161 8.39935C12.582 8.42637 11.5623 8.42795 11.2728 8.12016L10.3321 6.99629H10.3319ZM6.35902 7.0875C5.3506 7.74402 6.00949 8.55652 3.44403 8.39557C1.23225 8.25688 0.0197617 5.95688 1.78803 5.41918C3.34806 4.94488 6.12634 6.69983 6.35902 7.0875ZM9.08007 4.35949C9.7048 5.14596 9.40853 4.67961 9.73083 5.02217C9.31673 6.35866 7.16377 6.17903 6.87049 5.02217L7.32592 4.64443C7.49938 4.06938 7.67881 3.9907 7.40997 3.35346C8.09132 3.0405 8.34169 3.02221 9.07431 3.30219C9.09438 3.73318 8.94634 3.7914 9.08007 4.35949ZM6.62488 2.85291C6.26841 3.08063 5.96837 3.55791 5.86266 4.12541C5.71303 4.92818 5.98406 5.29121 6.21456 5.80685C4.85503 5.0792 2.63829 3.6841 0.885915 4.84831C-0.524487 5.78539 -0.199601 7.61565 1.49634 8.69144C2.41375 9.27344 3.34408 9.32113 4.57207 9.26191C4.36383 9.75887 3.26778 10.5149 2.44952 10.598C2.06105 10.6373 1.70418 10.6054 1.71391 11.0461C1.72981 11.7545 2.97728 11.4469 3.45953 11.2651C4.17447 10.9956 4.44033 10.6266 4.91384 10.318C4.92139 13.2012 6.52653 14.7748 8.2793 15.75C8.96065 15.481 10.1646 14.4233 10.6427 13.7441C11.3461 12.7446 11.6078 11.8608 11.6638 10.3234C11.8526 10.4224 12.0726 10.6505 12.2945 10.8092C13.0802 11.371 14.6792 11.8612 14.8409 11.1709C14.9581 10.6705 14.609 10.6395 14.238 10.6054C13.8593 10.5704 13.6139 10.4979 13.3003 10.3349C12.8094 10.0796 12.2051 9.62237 11.9895 9.24384C14.2364 9.47453 16.6237 8.46849 16.6247 6.34712C16.6253 5.11953 15.2864 4.28021 13.7832 4.43639C12.9002 4.52819 11.945 5.0013 11.1806 5.40606C10.8956 5.55688 10.678 5.73074 10.375 5.82433C10.9813 4.71119 10.8986 3.59051 9.99331 2.86544C10.0907 2.30688 10.8392 1.60664 11.1607 1.34435C11.4752 1.08743 11.6257 1.04729 12.0074 0.868655C12.4356 0.668162 12.4829 0.239557 12.1165 0.0539678C11.5943 -0.210507 10.6333 0.59286 10.3806 0.830311C10.1217 1.07352 9.97086 1.24242 9.73898 1.51544C9.51702 1.77674 9.31316 2.13639 9.14028 2.31303C8.21889 2.14592 8.31109 2.20713 7.41592 2.30529C7.2196 1.79899 5.22164 -0.395105 4.38013 0.0623118C4.23408 0.141793 3.93423 0.562453 4.4912 0.860311C4.84728 1.05047 5.06506 1.10074 5.39153 1.35369C5.77543 1.65115 6.48361 2.32476 6.62469 2.85351L6.62488 2.85291Z" fill="#040404" />
                            </svg>
                        </div>

                        <Link to="/" className="flex flex-col leading-none font-bold text-[16px] sm:text-[16px]">
                            <span className="text-[#001F3F] font-extrabold">GM BLACK</span>
                            <span className="text-[#001F3F] font-extrabold ">TECH <span className="text-[#D7263D]">EXPO</span></span>
                        </Link>
                    </div>

                    {/* Search (desktop only) */}
<div className="ml-2 hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-3xl px-5 py-2.5 min-w-[220px] xl:min-w-[260px] 2xl:min-w-[320px] shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input type="text" placeholder="Search opportunities, events..." className="bg-transparent text-sm xl:text-base text-gray-700 placeholder-gray-500 focus:outline-none w-full" />
                    </div>
                </div>

                {/* Center Nav Links (DESKTOP/LARGE SCREEN) */}
              <nav className="hidden lg:flex items-center space-x-4 xl:space-x-5 2xl:space-x-8 font-medium">
                    {navLinks.map(({ path, label }) => (
                        <Link key={path} to={path} className={`transition duration-150 whitespace-nowrap ${isActive(path) ? "text-black font-[#001F3F] text-base" : "text-[#6B7280] text-sm hover:text-black"}`}>
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Right Buttons - Conditionally render based on authentication */}
             <div className="hidden lg:flex items-center space-x-4 2xl:space-x-6 shrink-0">
                    {/* Dark Mode Icon - Always visible */}
                    {/* <button type="button" aria-label="Set dark theme" className="flex items-center text-black p-2 hover:bg-gray-50 rounded-full transition duration-150">
                        <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9901 8.32394C13.9276 9.48137 13.5312 10.5959 12.8488 11.5329C12.1664 12.4698 11.2272 13.1891 10.1447 13.6036C9.0623 14.0182 7.88294 14.1104 6.74924 13.869C5.61554 13.6276 4.57603 13.063 3.75636 12.2434C2.9367 11.4238 2.37198 10.3844 2.13047 9.25068C1.88895 8.117 1.98099 6.93764 2.39544 5.85515C2.8099 4.77266 3.52903 3.8334 4.46591 3.1509C5.40279 2.4684 6.5173 2.07188 7.67472 2.00927C7.94472 1.99461 8.08606 2.31594 7.94272 2.54461C7.46332 3.31164 7.25804 4.21852 7.36039 5.11724C7.46274 6.01596 7.86667 6.85346 8.50627 7.49306C9.14587 8.13266 9.98337 8.53659 10.8821 8.63894C11.7808 8.74129 12.6877 8.53601 13.4547 8.05661C13.6841 7.91327 14.0047 8.05394 13.9901 8.32394Z" stroke="#001F3F" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button> */}

                    {isAuthenticated && user ? (
                        // User is logged in - Show profile icons
                        <div className="flex items-center space-x-4 xl:space-x-6">
                            {/* Notification Icon */}
                            {/* <button type="button" aria-label="Notifications" className="relative flex items-center text-black p-2 hover:bg-gray-50 rounded-full transition duration-150">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-[#D7263D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </button> */}

                            {/* Message Icon
                            <button type="button" aria-label="Messages" className="relative flex items-center text-black p-2 hover:bg-gray-50 rounded-full transition duration-150">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-[#D7263D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    1
                                </span>
                            </button> */}

                            {/* User Profile Dropdown */}
                            <div ref={profileDesktopRef} className="flex items-center space-x-3 relative">
                                <button
                                    type="button"
                                    onClick={() => setIsProfileOpen((open) => !open)}
                                    className="flex items-center space-x-3 rounded-lg transition duration-150 hover:bg-gray-50/80"
                                    aria-expanded={isProfileOpen}
                                    aria-haspopup="true"
                                    aria-label="Open profile menu"
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-sm"
                                        style={{ backgroundColor: getAvatarColor() }}
                                    >
                                        {getUserInitials()}
                                    </div>

                                    <div className="hidden lg:block text-right max-w-[180px]">
                                        <div className="text-sm font-semibold text-[#001F3F] leading-tight truncate">
                                            {firstName} {lastName}
                                        </div>
                                        <div className="text-xs text-gray-500 leading-tight truncate">
                                            {user.email}
                                        </div>
                                    </div>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className={`hidden lg:block w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                                        aria-hidden
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                <div
                                    className={`absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                                        isProfileOpen
                                            ? "opacity-100 visible translate-y-0"
                                            : "opacity-0 invisible -translate-y-1 pointer-events-none"
                                    }`}
                                >
                                    <div className="p-2">{profileMenuLinks}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // User is not logged in - Show login/join buttons
                        <div className="flex items-center space-x-1.5 xl:space-x-2">
                            {/* Login Button - Navigates to Login Route */}
                            <button 
                                onClick={handleOpenLogin}
                                className="flex items-center bg-white text-black px-3 xl:px-6 py-1.5 xl:py-2.5 rounded-2xl text-xs xl:text-base border border-[#001F3F1A] hover:bg-gray-50 transition duration-150 whitespace-nowrap"
                            >
                                Login
                            </button>

                            {/* Join Now Button - Navigates to Signup Route */}
                            <button 
                                onClick={handleOpenSignup}
                                className="bg-[#D7263D] text-white px-3 xl:px-6 py-1.5 xl:py-2.5 rounded-2xl text-xs xl:text-base border-2 hover:bg-red-700 transition duration-200 whitespace-nowrap"
                            >
                                Join Now
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 lg:hidden shrink-0">
                    {isAuthenticated && user && (
                        <div ref={profileMobileRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setIsProfileOpen((open) => !open)}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-sm"
                                style={{ backgroundColor: getAvatarColor() }}
                                aria-expanded={isProfileOpen}
                                aria-haspopup="true"
                                aria-label="Open profile menu"
                            >
                                {getUserInitials()}
                            </button>

                            <div
                                className={`absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-[60] ${
                                    isProfileOpen
                                        ? "opacity-100 visible translate-y-0"
                                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                                }`}
                            >
                                <div className="px-3 py-2 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-[#001F3F] truncate">
                                        {firstName} {lastName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <div className="p-2">{profileMenuLinks}</div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            setIsProfileOpen(false);
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className="p-2 text-black font-bold transition duration-150"
                        aria-label="Toggle menu"
                    >
                        {!isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
           <div className={`fixed inset-0 bg-[#FFFDF7] z-40 lg:hidden transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-6 pt-24 flex flex-col space-y-6 min-h-screen overflow-y-auto">
                    {/* Search (Mobile only) */}
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-inner mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input type="text" placeholder="Search opportunities, events..." className="bg-transparent text-base text-gray-700 placeholder-gray-500 focus:outline-none w-full" />
                    </div>

                    <nav className="flex flex-col space-y-4 text-lg font-medium text-black font-bold">
                        {navLinks.map(({ path, label }) => (
                            <Link key={path} to={path} onClick={handleLinkClick} className={`block py-3 px-4 rounded-xl transition duration-150 ${isActive(path) ? "bg-gray-100 font-semibold text-base" : "text-sm hover:bg-gray-50"}`}>
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex flex-col space-y-3 mt-8">
                        {isAuthenticated && user ? (
                            // Mobile - User is logged in
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsMobileProfileOpen((open) => !open)}
                                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl w-full text-left"
                                    aria-expanded={isMobileProfileOpen}
                                >
                                    <div
                                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-medium border-2 border-white shadow-sm shrink-0"
                                        style={{ backgroundColor: getAvatarColor() }}
                                    >
                                        {getUserInitials()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-[#001F3F] text-base truncate">
                                            {firstName} {lastName}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {user.role || "Member"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${isMobileProfileOpen ? "rotate-180" : ""}`}
                                        aria-hidden
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>

                                {isMobileProfileOpen && (
                                    <div className="flex flex-col space-y-2 mt-2">
                                        <Link
                                            to="/profile"
                                            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                                            onClick={handleLinkClick}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/dashboard"
                                            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                                            onClick={handleLinkClick}
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/dashboard/idea-generator"
                                            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                                            onClick={handleLinkClick}
                                        >
                                            AI Dashboard
                                        </Link>
                                        <Link
                                            to="/dashboard/brand-identity"
                                            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                                            onClick={handleLinkClick}
                                        >
                                            Brand Builder
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-150"
                                            onClick={handleLinkClick}
                                        >
                                            Settings
                                        </Link>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-md transition duration-150 text-left"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            // Mobile - User is not logged in
                            <>
                                {/* Mobile Login Button */}
                                <button 
                                    onClick={handleOpenLogin}
                                    className="w-full bg-white text-black px-4 py-3.5 rounded-lg text-base font-semibold border border-gray-400 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-150 shadow-sm"
                                >
                                    Login
                                </button>
                                
                                {/* Mobile Join Now Button */}
                                <button 
                                    onClick={handleOpenSignup}
                                    className="w-full bg-[#D7263D] text-white px-4 py-3.5 rounded-lg text-base font-semibold hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-[#D7263D]/50 transition duration-200 shadow-md"
                                >
                                    Join Now
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals for direct URL access - only render when on the specific route */}
            {location.pathname === '/signup' && (
                <SignupModal 
                    isOpen={true} 
                    onClose={handleCloseSignup}
                />
            )}
            {location.pathname === '/login' && (
                <LoginModal 
                    isOpen={true} 
                    onClose={handleCloseLogin}
                />
            )}

            {/* Legacy modals for existing usage - only render when state is true but NOT on the route */}
            {isSignupOpen && location.pathname !== '/signup' && (
                <SignupModal 
                    isOpen={isSignupOpen} 
                    onClose={handleCloseSignup}
                />
            )}
            {isLoginOpen && location.pathname !== '/login' && (
                <LoginModal 
                    isOpen={isLoginOpen} 
                    onClose={handleCloseLogin}
                />
            )}
        </>
    );
};

export default NavBar;