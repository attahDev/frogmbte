import { motion, type Transition } from "framer-motion";
import { Play } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

// ✅ Create typed transitions so TS knows what to expect
const floatTransition: Transition = {
  duration: 8,
  ease: "easeInOut",
  repeat: Infinity,
};

const floatTop = {
  y: [-12, 12, -12],
  transition: floatTransition,
};

const floatBottom = {
  y: [12, -12, 12],
  transition: {
    ...floatTransition,
    delay: 1,
  },
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#001F3F] text-white overflow-hidden min-h-[90vh] sm:min-h-[95vh] flex items-center">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_28%_50%,rgba(250,211,21,0.07)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-24 sm:h-28 bg-gradient-to-t from-yellow-500/75 via-yellow-200/10 to-transparent z-0 pointer-events-none" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-4 sm:px-6 md:px-8 lg:px-9 xl:px-14 py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[6%]">
        {/* Left text section */}
        <div className="flex flex-col justify-center gap-4 lg:gap-5 w-full lg:w-[44%] text-center lg:text-left lg:self-center">
          {/* Badge */}
          <div className="inline-flex items-center self-center lg:self-start px-2 py-1 rounded-full max-w-full sm:max-w-fit bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
            <span className="mr-1.5 shrink-0">
              {/* Logo SVG */}
              <svg width="13" height="13" viewBox="0 0 690 690" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M264.646 551.702L423.247 551.318C421.152 579.157 365.352 631.38 342.408 641.077C337.27 634.923 326.805 627.845 319.943 622.405C300.323 606.849 269.289 577.286 264.646 551.702ZM440.186 492.986L253.397 492.211C239.814 488.058 244.96 468.742 246.791 445.769L441.687 446.091C444.104 461.717 443.329 479.667 440.186 492.986ZM257.166 386.74C261.809 363.332 280.794 345.912 293.734 335.571C340.808 297.947 355.307 300.689 399.924 337.503C413.54 348.742 430.125 362.391 434.999 386.722L257.166 386.74ZM428.822 306.504C469.381 283.906 491.838 261.09 543.663 242.478C566.26 234.356 597.409 229.568 619.965 238.848C687.18 266.496 637.672 363.009 544.38 367.971C522.212 369.155 479.888 369.225 467.872 355.74L428.83 306.504H428.822ZM263.928 310.5C222.074 339.262 249.422 374.857 142.943 367.806C51.1441 361.73 0.820202 260.968 74.2114 237.412C138.96 216.633 254.271 293.516 263.928 310.5ZM376.865 190.987C402.794 225.442 390.497 205.011 403.874 220.019C386.687 278.57 297.33 270.7 285.157 220.019L304.059 203.47C311.259 178.278 318.706 174.831 307.548 146.913C335.827 133.203 346.218 132.402 376.625 144.667C377.458 163.549 371.314 166.099 376.865 190.987ZM274.963 124.985C260.168 134.961 247.715 155.871 243.327 180.732C237.117 215.901 248.366 231.805 257.933 254.395C201.506 222.517 109.501 161.399 36.7695 212.402C-21.7686 253.455 -8.28438 333.638 62.1049 380.768C100.182 406.265 138.795 408.354 189.762 405.76C181.119 427.532 135.628 460.655 101.666 464.294C85.543 466.017 70.7312 464.615 71.1353 483.923C71.795 514.957 123.571 501.482 143.586 493.517C173.26 481.712 184.294 465.547 203.947 452.028C204.261 578.34 270.881 647.275 343.629 690C371.908 678.213 421.878 631.876 441.72 602.122C470.915 558.335 481.777 519.615 484.102 452.263C491.937 456.598 501.066 466.592 510.279 473.547C542.888 498.156 609.252 519.632 615.965 489.39C620.831 467.471 606.341 466.113 590.944 464.616C575.225 463.084 565.04 459.906 552.026 452.768C531.647 441.582 506.567 421.551 497.619 404.968C590.878 415.075 689.959 371 690 278.064C690.025 224.284 634.456 187.514 572.066 194.356C535.416 198.378 495.772 219.105 464.045 236.837C452.219 243.444 443.188 251.061 430.611 255.161C455.773 206.395 452.342 157.298 414.768 125.533C418.81 101.063 449.876 70.3861 463.22 58.8954C476.276 47.6396 482.519 45.8813 498.362 38.0553C516.134 29.2719 518.097 10.4949 502.889 2.3643C481.216 -9.22223 441.333 25.9729 430.842 36.3755C420.096 47.0306 413.837 54.4299 404.212 66.3908C395 77.838 386.539 93.594 379.364 101.333C341.122 94.0119 344.948 96.6934 307.795 100.994C299.647 78.813 216.722 -17.3094 181.795 2.72985C175.734 6.2119 163.289 24.6408 186.405 37.6898C201.184 46.0206 210.223 48.2231 223.773 59.3047C239.707 72.3363 269.1 101.847 274.955 125.011L274.963 124.985Z" fill="#040404" /> <path fillRule="evenodd" clipRule="evenodd" d="M257.143 386.73L434.976 386.713C430.102 362.391 413.517 348.732 399.901 337.494C355.284 300.68 340.785 297.938 293.711 335.561C280.771 345.903 261.786 363.322 257.143 386.73Z" fill="#FAD315" /> <path fillRule="evenodd" clipRule="evenodd" d="M440.176 492.981C443.318 479.663 444.093 461.721 441.677 446.087L246.781 445.765C244.95 468.737 239.803 488.054 253.386 492.207L440.176 492.981Z" fill="#FAD315" /> <path fillRule="evenodd" clipRule="evenodd" d="M304.059 203.461L285.157 220.01C297.338 270.691 386.687 278.561 403.874 220.01C390.497 205.002 402.802 225.433 376.865 190.978C365.055 183.144 371.793 169.311 370.91 150.369C361.393 142.282 356.428 139.792 343.678 141.916C337.947 142.865 334.812 143.509 328.916 144.293C299.333 148.219 330.739 196.158 304.059 203.461Z" fill="#FAD315" /> <path fillRule="evenodd" clipRule="evenodd" d="M264.632 551.702C269.275 577.287 300.309 606.849 319.929 622.405C326.782 627.846 337.256 634.923 342.394 641.078C365.338 631.372 421.138 579.149 423.232 551.319L264.632 551.702Z" fill="#FAD315" /> <path fillRule="evenodd" clipRule="evenodd" d="M304.051 203.463C330.73 196.16 299.325 148.221 328.907 144.295C334.804 143.511 337.938 142.867 343.67 141.918C356.42 139.794 361.385 142.284 370.902 150.371C371.785 169.313 365.046 183.146 376.856 190.98C371.306 166.092 377.45 163.542 376.617 144.66C346.202 132.395 335.81 133.196 307.539 146.906C318.698 174.824 311.251 178.271 304.051 203.463Z" fill="#F8EA51" /> </svg>

            </span>
            <span className="text-xs sm:text-xs text-white/95 leading-tight tracking-wide">
              Empowering Black Tech Excellence in Greater Manchester
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-white font-open-sans text-3xl sm:text-5xl md:text-[64px] font-semibold leading-[1.1] tracking-wide">
            Empowering Communities
            <br /> Through Tech
            <br /> & Connection
          </h1>

          {/* Description */}
          <p className="text-[#DBEAFE]/90 text-base text-center lg:text-left leading-[1.65] tracking-wide max-w-lg mx-auto lg:mx-0">
            Bringing Greater Manchester&apos;s diverse talent closer to {" "}<br className="hidden sm:block" />  mentorship, jobs, and innovation in technology.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mt-1 mb-8 lg:mb-12">
            <Link to="/login" className="bg-[#D7263D] hover:bg-[#c41f35] text-white text-[13px] font-medium sm:px-8 px-6 py-3 rounded-lg transition-all shadow-md whitespace-nowrap">
              Join the Movement →
            </Link>
            <a href="#events" className="flex items-center justify-center gap-2 hover:bg-white/10 border border-white/30 text-[13px] sm:px-8 px-6 py-3 rounded-lg transition-all whitespace-nowrap">
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Explore Events
            </a>
          </div>
        </div>

        {/* Right image section — wider column */}
        <div className="relative w-full lg:w-[64%] flex items-center justify-center lg:justify-end">
          {/* Container for images - hidden on mobile, shown on tablet+ */}
          <div className="hidden md:block relative w-full aspect-[16/10] lg:aspect-[3/2]">
            <img
              src="/images/impacts.jpg"
              alt="A diverse group of people sitting in a room, wearing winter clothing."
              className="absolute inset-0 w-full h-full rounded-2xl object-cover shadow-xl"
            />

            {/* Impact badge — flush top-right edge of image */}
            <div className="absolute top-4 right-0 z-20">
              <div className="bg-[#FFD700] text-black text-xs font-medium px-3 py-2 rounded-l-md flex items-center gap-2 shadow-md">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.98609 10.3944L7.97421 10.3872C7.93475 10.9117 6.88344 11.8956 6.45117 12.0783C6.35437 11.9623 6.15719 11.829 6.02791 11.7265C5.65826 11.4334 5.07357 10.8764 4.98609 10.3944ZM8.29337 9.28813L4.77414 9.27354C4.51823 9.1953 4.61519 8.83136 4.64969 8.39854L8.32164 8.40461C8.36717 8.69901 8.35257 9.0372 8.29337 9.28813ZM4.84515 7.2864C4.93263 6.84538 5.29032 6.51719 5.53411 6.32235C6.42103 5.6135 6.69418 5.66516 7.53479 6.35876C7.79133 6.5705 8.1038 6.82766 8.19563 7.28607L4.84515 7.2864ZM8.07925 5.77471C8.84341 5.34895 9.26651 4.91908 10.2429 4.56843C10.6687 4.41541 11.2555 4.3252 11.6805 4.50004C12.9469 5.02093 12.0141 6.83931 10.2564 6.93279C9.83878 6.9551 9.04137 6.95641 8.81498 6.70235L8.07941 5.77471H8.07925ZM4.97257 5.85C4.18401 6.39189 4.69925 7.06253 2.69313 6.92968C0.963584 6.8152 0.0154531 4.91679 1.39819 4.47298C2.61808 4.08148 4.79062 5.53002 4.97257 5.85ZM7.10035 3.59831C7.58887 4.24746 7.35719 3.86253 7.60922 4.14528C7.28541 5.24841 5.60186 5.10015 5.37252 4.14528L5.72865 3.8335C5.8643 3.35885 6.00461 3.29391 5.79438 2.76793C6.32718 2.50962 6.52295 2.49453 7.09584 2.72562C7.11154 3.08135 6.99578 3.12941 7.10035 3.59831ZM5.18046 2.35478C4.90171 2.54274 4.66709 2.93669 4.58442 3.4051C4.46742 4.0677 4.67936 4.36735 4.8596 4.79295C3.79649 4.19235 2.06306 3.04084 0.692759 4.00178C-0.410133 4.77525 -0.156082 6.28593 1.17009 7.17388C1.88749 7.65427 2.61497 7.69363 3.57522 7.64475C3.41238 8.05494 2.55531 8.679 1.91545 8.74756C1.61168 8.78003 1.33262 8.75362 1.34023 9.1174C1.35266 9.70209 2.32814 9.44821 2.70525 9.29814C3.26431 9.07574 3.47221 8.77118 3.84248 8.51647C3.84839 10.8963 5.10355 12.195 6.47417 13C7.00697 12.7779 7.94842 11.9049 8.32226 11.3443C8.87231 10.5194 9.07695 9.78984 9.12077 8.5209C9.26838 8.60258 9.44038 8.79086 9.61394 8.9219C10.2283 9.38556 11.4787 9.79017 11.6051 9.2204C11.6968 8.80742 11.4238 8.78184 11.1337 8.75363C10.8376 8.72476 10.6457 8.66489 10.4005 8.53041C10.0165 8.31965 9.54402 7.94227 9.37543 7.62983C11.1325 7.82025 12.9992 6.98986 13 5.2389C13.0005 4.22564 11.9535 3.53287 10.7781 3.66178C10.0875 3.73756 9.34063 4.12806 8.74288 4.46215C8.52006 4.58663 8.34992 4.73014 8.11296 4.80739C8.58703 3.8886 8.52239 2.96359 7.81448 2.36512C7.89061 1.90409 8.47593 1.32612 8.72734 1.10962C8.97331 0.897558 9.09094 0.864429 9.38942 0.716985C9.72427 0.551499 9.76124 0.19773 9.47472 0.0445449C9.06638 -0.173752 8.31496 0.489344 8.11732 0.685336C7.91486 0.886084 7.79692 1.02549 7.61559 1.25084C7.44203 1.46651 7.28261 1.76337 7.14743 1.90917C6.42693 1.77124 6.49903 1.82176 5.79904 1.90278C5.64552 1.48488 4.08317 -0.326118 3.42513 0.051432C3.31093 0.117036 3.07645 0.464247 3.51199 0.710098C3.79043 0.867055 3.96073 0.908551 4.21602 1.11733C4.51621 1.36286 5.06999 1.91885 5.18031 2.35528L5.18046 2.35478Z" fill="#040404" />
                </svg>
                <span>Over 2,000+ local students impacted</span>
              </div>
            </div>

            {/* Floating top image */}
            <motion.img
              src="/hero/hero2.jpg"
              alt="A group of five women sitting on a panel."
              initial={{ y: 0 }}
              animate={floatTop}
              className="absolute -top-5 left-4 w-20 h-20 md:w-24 md:h-20 lg:w-42 lg:h-35 object-cover rounded-xl border-4 border-white shadow-lg z-10"
            />

            {/* Floating bottom image — centered, wider rectangle */}
            <motion.img
              src="/hero/hero1.jpeg"
              alt="A diverse group of 13 people smiling and posing indoors at Black Tech Expo."
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-28 h-20 md:w-32 md:h-24 lg:w-38 lg:h-35 object-cover rounded-xl border-4 shadow-lg border-white z-10"
            />
          </div>

          {/* Mobile view - single centered image */}
          <div className="md:hidden w-full max-w-sm mx-auto">
            <img
              src="/images/impacts.jpg"
              alt="A diverse group of people sitting in a room, wearing winter clothing."
              className="w-full h-auto rounded-2xl object-cover shadow-xl"
            />
            <div className="mt-4 flex w-full justify-center">
              <div className="bg-[#FFD700] text-black text-xs font-medium px-3 py-2 rounded-lg shadow-md flex items-center gap-2">
                <span>Over 2,000+ local students impacted</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
