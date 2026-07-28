import { ArrowRight, Cookie, FileText, Heart, Lock, Mail, MapPin, Phone, X } from 'lucide-react';
import React, { useState } from 'react';
import { AiOutlineX } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
// =====================================================================
// === 1. POLICY TEXTS & CONFIGURATION (Used by the Modal) =============
// =====================================================================

const COOKIE_POLICY_TEXT = `
This platform uses cookies to enhance performance and provide personalised services.

Types of cookies used
● Strictly necessary
● Performance & analytics
● Functional
● Marketing (optional)

You can change preferences anytime through our Cookie Settings tool.
`;

const TERMS_OF_SERVICE_TEXT = `
1. Acceptance
By using the GMBTE CIC platform, you agree to these Terms of Service.

2. User Responsibilities
● Provide accurate information
● Do not misuse platform tools
● No harassment or harmful behaviour

3. Intellectual Property
All content is owned by Greater Manchester Black Tech Expo CIC unless otherwise stated.

4. Events
Ticket sales are non-transferable unless otherwise stated.

5. Liability
We are not liable for damage caused by:
● Third-party systems
● Service downtime
● User misuse
`;

const PRIVACY_POLICY_TEXT = `
Greater Manchester Black Tech Expo CIC ("GMBTE CIC") — Privacy Policy
Last Updated: January 2025
This Privacy Policy explains how Greater Manchester Black Tech Expo CIC ("we", "us", "our") collects, uses, stores and protects personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.

1. WHO WE ARE
Greater Manchester Black Tech Expo CIC
Registered in England & Wales
Email: info@gmblacktechexpo.co.uk
Role: Data Controller

2. DATA WE COLLECT
a. Personal Information
● Full name
● Email address
● Phone number
● City / region
● Organisation or company
● Role / job title
b. Event Registration Data
● Ticket information
● Attendance history
● Accessibility requirements
c. Platform Usage Data
● User login details
● Preferences
● Profile information
● Saved content
● Device type and browser
d. Automatic Data
● IP address
● Cookies
● Analytics data

3. HOW WE USE YOUR DATA
We use personal data to:
● Provide access to events, tools and platform services
● Issue newsletters, updates and event announcements
● Manage ticketing, registrations and app features
● Improve our platform and communication
● Meet legal obligations for a CIC

4. LEGAL BASIS FOR PROCESSING
Processing is based on:
● Consent
● Contractual necessity
● Legitimate interest
● Legal compliance

5. WHO WE SHARE YOUR DATA WITH
We may share personal data with:
● Service providers (e.g., payment, hosting, CRM)
● Event partners (where consent applies)
● Regulators (ICO) if required by law
We never sell personal information.

6. INTERNATIONAL TRANSFERS
Some services may store data in the EU or US under appropriate safeguards (UK IDTA, SCCs).

7. DATA RETENTION
We keep:
● Event attendee data — 3 years
● Account profiles — active + 2 years
● Financial records — 6 years (HMRC)

8. YOUR RIGHTS
You have the right to:
● Access your information
● Correct inaccurate data
● Request deletion
● Withdraw consent
● Object to processing
● Data portability
Requests: privacy@gmblacktechexpo.co.uk

9. CHILDREN
We do not knowingly collect data from children under 13.

10. CONTACT
privacy@gmblacktechexpo.co.uk
`;

// Configuration for the tabs/policies, defining the order and content
const POLICY_TABS = [
  { id: 'cookie', label: 'Cookie Policy', icon: Cookie, content: COOKIE_POLICY_TEXT, order: 1 },
  { id: 'terms', label: 'Terms of Service', icon: FileText, content: TERMS_OF_SERVICE_TEXT, order: 2 },
  { id: 'privacy', label: 'Privacy Policy', icon: Lock, content: PRIVACY_POLICY_TEXT, order: 3 },
];

// =====================================================================
// === 2. POLICY MODAL COMPONENT (Only renders when needed) ============
// =====================================================================

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, initialTab = 'cookie' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  const currentPolicy = POLICY_TABS.find(tab => tab.id === activeTab);

  // Helper function to render the policy text with basic formatting
  const renderPolicyContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return null;

      if (trimmedLine.startsWith('●')) {
        return <li key={index} className="ml-5 list-disc text-sm text-gray-700">{trimmedLine.substring(1).trim()}</li>;
      }
      if (trimmedLine.match(/^\d+\.\s/)) { 
        return <h4 key={index} className="font-semibold text-lg mt-4 mb-2 text-[#001F3F]">{trimmedLine}</h4>;
      }
      return <p key={index} className="mb-2 text-gray-700 text-sm">{trimmedLine}</p>;
    });
  };

  return (
    // Backdrop: p-0 on mobile, sm:p-4 on desktop
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 flex justify-center items-center p-0 sm:p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Container: Full width/height on mobile, sm:rounded-xl on desktop */}
      <div
        className="relative bg-white shadow-2xl w-full h-full max-w-full max-h-full sm:max-w-4xl sm:max-h-[90vh] sm:rounded-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header: Fixed top */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white z-20 flex-shrink-0">
          <h3 className="text-xl font-bold text-[#001F3F]">Compliance Documents</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation: Reduced padding and hidden icon on mobile */}
        <div className="flex border-b border-gray-200 bg-white z-10 flex-shrink-0">
          {POLICY_TABS.sort((a, b) => a.order - b.order).map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-3 sm:px-6 py-3 text-sm font-medium transition-colors border-b-2 
                  ${isActive
                    ? 'border-[#FFD700] text-[#001F3F] bg-gray-50'
                    : 'border-transparent text-gray-500 hover:text-[#FFD700] hover:border-gray-300'
                  }`
                }
              >
                <tab.icon className="w-4 h-4 hidden sm:block" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Content - Scrollable area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow">
          {currentPolicy ? (
            <div className="policy-content">
              <h2 className='text-xl sm:text-2xl font-bold mb-4 text-[#001F3F]'>{currentPolicy.label}</h2>
              {/* Note: I'm keeping the original rendering structure which handles the list/paragraph separation */}
              {currentPolicy.id === 'privacy' ? <ul className='list-none'>{renderPolicyContent(currentPolicy.content)}</ul> : <div>{renderPolicyContent(currentPolicy.content)}</div>}
            </div>
          ) : (
            <p className="text-red-500">Content not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};


// =====================================================================
// === 3. THE MAIN FOOTER COMPONENT (With State) =======================
// =====================================================================

const Footer = () => {
    // State to control modal visibility and which tab is initially selected
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialTab, setInitialTab] = useState('cookie'); 

    const openModal = (tabId: React.SetStateAction<string>) => {
        setInitialTab(tabId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Social Media Icons (unchanged from your original code)
    const TwitterIcon = () => (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6668 2.6666C14.6668 2.6666 14.2002 4.0666 13.3335 4.93327C14.4002 11.5999 7.06683 16.4666 1.3335 12.6666C2.80016 12.7333 4.26683 12.2666 5.3335 11.3333C2.00016 10.3333 0.333496 6.39993 2.00016 3.33327C3.46683 5.0666 5.7335 6.0666 8.00016 5.99993C7.40016 3.19993 10.6668 1.59993 12.6668 3.4666C13.4002 3.4666 14.6668 2.6666 14.6668 2.6666Z"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const InstagramIcon = () => (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3335 1.33325H4.66683C2.82588 1.33325 1.3335 2.82564 1.3335 4.66658V11.3333C1.3335 13.1742 2.82588 14.6666 4.66683 14.6666H11.3335C13.1744 14.6666 14.6668 13.1742 14.6668 11.3333V4.66658C14.6668 2.82564 13.1744 1.33325 11.3335 1.33325Z"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.6668 7.57996C10.7491 8.13479 10.6543 8.70143 10.396 9.1993C10.1376 9.69717 9.72889 10.1009 9.22788 10.3531C8.72687 10.6052 8.1591 10.693 7.60532 10.6039C7.05155 10.5148 6.53997 10.2533 6.14336 9.85673C5.74674 9.46012 5.48528 8.94854 5.39618 8.39477C5.30707 7.84099 5.39484 7.27322 5.64701 6.77221C5.89919 6.27119 6.30292 5.86245 6.80079 5.60412C7.29865 5.34579 7.8653 5.25102 8.42013 5.33329C8.98608 5.41721 9.51003 5.68093 9.91459 6.08549C10.3192 6.49006 10.5829 7.01401 10.6668 7.57996Z"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.6665 4.33325H11.6732"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const LinkedInIcon = () => (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.6665 5.33325C11.7274 5.33325 12.7448 5.75468 13.4949 6.50482C14.2451 7.25497 14.6665 8.27239 14.6665 9.33325V13.9999H11.9998V9.33325C11.9998 8.97963 11.8594 8.64049 11.6093 8.39044C11.3593 8.14039 11.0201 7.99992 10.6665 7.99992C10.3129 7.99992 9.97374 8.14039 9.7237 8.39044C9.47365 8.64049 9.33317 8.97963 9.33317 9.33325V13.9999H6.6665V9.33325C6.6665 8.27239 7.08793 7.25497 7.83808 6.50482C8.58822 5.75468 9.60564 5.33325 10.6665 5.33325Z"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.00016 6H1.3335V14H4.00016V6Z"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.66683 3.99992C3.40321 3.99992 4.00016 3.40297 4.00016 2.66659C4.00016 1.93021 3.40321 1.33325 2.66683 1.33325C1.93045 1.33325 1.3335 1.93021 1.3335 2.66659C1.3335 3.40297 1.93045 3.99992 2.66683 3.99992Z"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    const YouTubeIcon = () => (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.66667 11.3333C1.20095 9.13551 1.20095 6.86449 1.66667 4.66667C1.72786 4.44347 1.8461 4.24005 2.00974 4.0764C2.17339 3.91276 2.37681 3.79453 2.6 3.73333C6.17564 3.14097 9.82437 3.14097 13.4 3.73333C13.6232 3.79453 13.8266 3.91276 13.9903 4.0764C14.1539 4.24005 14.2721 4.44347 14.3333 4.66667C14.7991 6.86449 14.7991 9.13551 14.3333 11.3333C14.2721 11.5565 14.1539 11.7599 13.9903 11.9236C13.8266 12.0872 13.6232 12.2055 13.4 12.2667C9.82438 12.8591 6.17563 12.8591 2.6 12.2667C2.37681 12.2055 2.17339 12.0872 2.00974 11.9236C1.8461 11.7599 1.72786 11.5565 1.66667 11.3333Z"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.6665 10L9.99984 8L6.6665 6V10Z"
                stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    

    return (
        <footer className="bg-[#001F3F] text-white">
            {/* Main Footer Content */}
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Section - Full width on mobile, spans 2 cols on desktop */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-[#FFD700] rounded-xl p-2.5 w-12 h-12 flex items-center justify-center flex-shrink-0">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.37631 12.5932L10.1976 12.5844C10.1471 13.2199 8.80268 14.4119 8.24989 14.6333C8.1261 14.4928 7.87394 14.3313 7.70862 14.2071C7.2359 13.852 6.48818 13.1772 6.37631 12.5932ZM10.6057 11.2529L6.10527 11.2352C5.77801 11.1405 5.902 10.6995 5.94612 10.1752L10.6419 10.1825C10.7001 10.5392 10.6814 10.9489 10.6057 11.2529ZM6.19608 8.82775C6.30795 8.29344 6.76537 7.89583 7.07714 7.65977C8.21134 6.80097 8.56066 6.86356 9.63565 7.70388C9.96371 7.96041 10.3633 8.27198 10.4807 8.82736L6.19608 8.82775ZM10.3319 6.99629C11.3091 6.48045 11.8502 5.95965 13.0989 5.53482C13.6433 5.34943 14.3938 5.24015 14.9373 5.45197C16.5567 6.08305 15.3639 8.28609 13.1161 8.39935C12.582 8.42637 11.5623 8.42795 11.2728 8.12016L10.3321 6.99629H10.3319ZM6.35902 7.0875C5.3506 7.74402 6.00949 8.55652 3.44403 8.39557C1.23225 8.25688 0.0197617 5.95688 1.78803 5.41918C3.34806 4.94488 6.12634 6.69983 6.35902 7.0875ZM9.08007 4.35949C9.7048 5.14596 9.40853 4.67961 9.73083 5.02217C9.31673 6.35866 7.16377 6.17903 6.87049 5.02217L7.32592 4.64443C7.49938 4.06938 7.67881 3.9907 7.40997 3.35346C8.09132 3.0405 8.34169 3.02221 9.07431 3.30219C9.09438 3.73318 8.94634 3.7914 9.08007 4.35949ZM6.62488 2.85291C6.26841 3.08063 5.96837 3.55791 5.86266 4.12541C5.71303 4.92818 5.98406 5.29121 6.21456 5.80685C4.85503 5.0792 2.63829 3.6841 0.885915 4.84831C-0.524487 5.78539 -0.199601 7.61565 1.49634 8.69144C2.41375 9.27344 3.34408 9.32113 4.57207 9.26191C4.36383 9.75887 3.26778 10.5149 2.44952 10.598C2.06105 10.6373 1.70418 10.6054 1.71391 11.0461C1.72981 11.7545 2.97728 11.4469 3.45953 11.2651C4.17447 10.9956 4.44033 10.6266 4.91384 10.318C4.92139 13.2012 6.52653 14.7748 8.2793 15.75C8.96065 15.481 10.1646 14.4233 10.6427 13.7441C11.3461 12.7446 11.6078 11.8608 11.6638 10.3234C11.8526 10.4224 12.0726 10.6505 12.2945 10.8092C13.0802 11.371 14.6792 11.8612 14.8409 11.1709C14.9581 10.6705 14.609 10.6395 14.238 10.6054C13.8593 10.5704 13.6139 10.4979 13.3003 10.3349C12.8094 10.0796 12.2051 9.62237 11.9895 9.24384C14.2364 9.47453 16.6237 8.46849 16.6247 6.34712C16.6253 5.11953 15.2864 4.28021 13.7832 4.43639C12.9002 4.52819 11.945 5.0013 11.1806 5.40606C10.8956 5.55688 10.678 5.73074 10.375 5.82433C10.9813 4.71119 10.8986 3.59051 9.99331 2.86544C10.0907 2.30688 10.8392 1.60664 11.1607 1.34435C11.4752 1.08743 11.6257 1.04729 12.0074 0.868655C12.4356 0.668162 12.4829 0.239557 12.1165 0.0539678C11.5943 -0.210507 10.6333 0.59286 10.3806 0.830311C10.1217 1.07352 9.97086 1.24242 9.73898 1.51544C9.51702 1.77674 9.31316 2.13639 9.14028 2.31303C8.21889 2.14592 8.31109 2.20713 7.41592 2.30529C7.2196 1.79899 5.22164 -0.395105 4.38013 0.0623118C4.23408 0.141793 3.93423 0.562453 4.4912 0.860311C4.84728 1.05047 5.06506 1.10074 5.39153 1.35369C5.77543 1.65115 6.48361 2.32476 6.62469 2.85351L6.62488 2.85291Z" fill="#040404" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-lg leading-tight">GM BLACK</div>
                                <div className="font-bold text-lg leading-tight">
                                    TECH <span className="text-[#FFD700]">EXPO</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                            Connecting and empowering underrepresented, underserved communities across Greater Manchester through mentorship, opportunities, and collaboration.
                        </p>

                        <div className="space-y-3">
                          <a
                            href="mailto:info@gmblacktechexpo.co.uk"
                            className="flex items-center gap-3 text-sm hover:text-[#FFD700] transition"
                          >
                            <Mail className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                            <span className="text-gray-300">info@gmblacktechexpo.co.uk</span>
                          </a>

                          <a
                            href="tel:+447405230017"
                            className="flex items-center gap-3 text-sm hover:text-[#FFD700] transition"
                          >
                            <Phone className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                            <span className="text-gray-300">+447405230017</span>
                          </a>

                          <div className="flex items-center gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
                            <span className="text-gray-300">Manchester, Greater Manchester</span>
                          </div>
                        </div>
                        {/* Social Links */}
                        <div className="flex gap-3 mt-6">
                            {[
                                { icon: AiOutlineX, href: "https://x.com/gmblacktechexpo?s=11" },
                                { icon: InstagramIcon, href: "https://www.instagram.com/gm_black_tech_expo_?igsh=MWo5a2ZrcHJiaHRoZA%3D%3D&utm_source=qr" },
                                { icon: LinkedInIcon, href: "https://www.linkedin.com/company/greater-manchester-black-tech-expo/ " },
                                { icon: FaFacebookF, href: "https://www.facebook.com/share/1DXy711A8V/?mibextid=wwXIfr" },
                                { icon: FaTiktok, href: "https://www.tiktok.com/@gm.blacktechexpo?_r=1&_t=ZN-96IdJpzjBZf" }
                            ].map((Social, index) => (
                                <a
                                    key={index}
                                    href={Social.href}
                                    target='_blank'
                                    className="text-white hover:text-[#FFD700] bg-[#05427e]/75 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#05427e]"
                                >
                                    <Social.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Sections - Responsive grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 lg:col-span-4">
                        {/* About Section */}
                        <div>
                            <h3 className="text-[#FFD700] font-bold text-base sm:text-lg mb-3 sm:mb-4 lg:mt-17">About</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {['Our Mission', 'Leadership Team', 'Annual Report', 'Press & Media'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm block py-1">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Programs Section */}
                        <div>
                            <h3 className="text-[#FFD700] font-bold text-base sm:text-lg mb-3 sm:mb-4 lg:mt-17">Programs</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {['Education & Skills', 'Business Support', 'Jobs & Careers', 'Charity & Community'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm block py-1">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Section */}
                        <div>
                            <h3 className="text-[#FFD700] font-bold text-base sm:text-lg mb-3 sm:mb-4 lg:mt-17">Resources</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {['Event Calendar', 'Job Board', 'Training Courses', 'Funding Directory'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm block py-1">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Section */}
                        <div>
                            <h3 className="text-[#FFD700] font-bold text-base sm:text-lg mb-3 sm:mb-4 lg:mt-17">Support</h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {['Help Center', 'Contact Us', 'Technical Support', 'Accessibility'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-300 hover:text-[#FFD700] transition-colors text-sm block py-1">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="w-3/4 mx-auto my-4 border-0 h-[0.5px] bg-linear-to-r from-transparent via-yellow-400 to-transparent" />

            {/* CTA Section */}
            <div className="bg-[#001F3F] py-8 sm:py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-light mb-5 leading-tight sm:leading-normal">
                        Be part of empowering our community through tech and connection join our next event or become a sponsor.
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                        <button className="w-full sm:w-auto bg-[#D7263D] hover:bg-[#c41e35] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 justify-center hover:scale-105">
                            Join Next Event
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button className="w-full sm:w-auto border-2 border-gray-600 hover:border-[#FFD700] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                            Become a Sponsor
                        </button>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="w-3/4 mx-auto my-4 border-0 h-[0.5px] bg-linear-to-r from-transparent via-yellow-400 to-transparent" />

            {/* Bottom Bar */}
            <div className="bg-[#001F3F]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

                        {/* Legal Text */}
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed md:max-w-lg text-center md:text-left">
                            ©️ Black Tech Expo Global Ltd. All Rights Reserved. <br />
                            Black Tech Expo™️ is a trademark claimed by Black Tech Expo Global Ltd. <br />
                            Unauthorised use of this name, brand, platform, or materials is strictly prohibited.
                        </p>

                        {/* Links Section - UPDATED TO USE BUTTONS AND OPEN MODAL */}
                        <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
                            {[
                                { label: 'Cookie Policy', tab: 'cookie' },
                                { label: 'Terms of Service', tab: 'terms' },
                                { label: 'Privacy Policy', tab: 'privacy' },
                            ].map(({ label, tab }) => (
                                <button
                                    key={label}
                                    onClick={() => openModal(tab)}
                                    className="text-gray-300 hover:text-[#FFD700] transition-colors whitespace-nowrap"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* Built With Love */}
                        <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-1">
                            Built with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#D7263D] fill-current" /> for Manchester
                        </p>

                    </div>
                </div>
            </div>
            
            {/* RENDER THE MODAL AT THE END OF THE FOOTER */}
            <PolicyModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                initialTab={initialTab} 
            />

        </footer>
    );
};

export default Footer;
