import React from "react";

const ServiceHeroSection: React.FC = () => {
    return (
        <section className="bg-[#E8DFC9] w-full overflow-hidden">
            <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12 py-12 sm:py-14 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center border-[0.67px] border-[#FFB9004D] gap-2 bg-[#FFB9001A] text-[#7B3306] px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-6">
                            <span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.13672 12.7931L9.81442 12.7842C9.76584 13.4297 8.47193 14.6407 7.9399 14.8656C7.82076 14.7228 7.57808 14.5587 7.41897 14.4326C6.96401 14.0719 6.24439 13.3863 6.13672 12.7931ZM10.2072 11.4316L5.87587 11.4136C5.5609 11.3173 5.68024 10.8694 5.72269 10.3367L10.242 10.3441C10.2981 10.7065 10.2801 11.1227 10.2072 11.4316ZM5.96326 8.96788C6.07093 8.42508 6.51117 8.02116 6.81122 7.78135C7.9028 6.90892 8.23899 6.97251 9.27359 7.82617C9.58932 8.08676 9.97391 8.40328 10.0869 8.96747L5.96326 8.96788ZM9.94369 7.10734C10.8842 6.58332 11.4049 6.05425 12.6067 5.62268C13.1307 5.43435 13.853 5.32332 14.376 5.53851C15.9346 6.17961 14.7866 8.41761 12.6233 8.53267C12.1093 8.56012 11.1278 8.56173 10.8492 8.24905L9.94388 7.10734H9.94369ZM6.12008 7.2C5.14955 7.86694 5.78369 8.69234 3.31462 8.52883C1.18595 8.38794 0.0190192 6.05143 1.72084 5.5052C3.22225 5.02337 5.89614 6.80618 6.12008 7.2ZM8.73889 4.42869C9.34014 5.22764 9.05501 4.75388 9.3652 5.10189C8.96666 6.45959 6.8946 6.27711 6.61233 5.10189L7.05065 4.71815C7.2176 4.13397 7.39029 4.05404 7.13154 3.40668C7.7873 3.08876 8.02825 3.07019 8.73334 3.3546C8.75266 3.79243 8.61019 3.85158 8.73889 4.42869ZM6.37596 2.8982C6.03287 3.12952 5.74411 3.61439 5.64237 4.1909C5.49837 5.0064 5.75921 5.3752 5.98105 5.89902C4.6726 5.15982 2.53915 3.74258 0.852627 4.92526C-0.50478 5.87723 -0.192101 7.73653 1.44011 8.82939C2.32306 9.42064 3.21843 9.46908 4.40028 9.40893C4.19986 9.91377 3.14499 10.6818 2.35748 10.7662C1.98361 10.8062 1.64014 10.7737 1.64951 11.2214C1.66481 11.941 2.86541 11.6286 3.32954 11.4439C4.01761 11.1701 4.27349 10.7953 4.72921 10.4818C4.73648 13.4108 6.2813 15.0093 7.96821 16C8.62396 15.7267 9.78267 14.6522 10.2428 13.9622C10.9198 12.9469 11.1716 12.049 11.2256 10.4873C11.4072 10.5878 11.6189 10.8195 11.8325 10.9808C12.5887 11.5515 14.1276 12.0494 14.2833 11.3482C14.3961 10.8399 14.0601 10.8084 13.703 10.7737C13.3385 10.7382 13.1024 10.6645 12.8006 10.499C12.328 10.2396 11.7465 9.77511 11.539 9.39057C13.7015 9.62492 15.999 8.60291 16 6.44787C16.0006 5.20079 14.712 4.34815 13.2653 4.50681C12.4154 4.60007 11.4962 5.08069 10.7605 5.49188C10.4862 5.64509 10.2768 5.82171 9.98519 5.91678C10.5687 4.78597 10.4891 3.6475 9.61782 2.91092C9.71153 2.3435 10.4319 1.63214 10.7413 1.36569C11.0441 1.10469 11.1888 1.06391 11.5562 0.882443C11.9683 0.678768 12.0138 0.24336 11.6612 0.0548244C11.1586 -0.213849 10.2338 0.60227 9.99055 0.84349C9.74136 1.09056 9.59621 1.26214 9.37304 1.5395C9.15943 1.80494 8.96322 2.1703 8.79684 2.34975C7.91007 2.17999 7.9988 2.24216 7.13727 2.34188C6.94833 1.82755 5.02544 -0.401376 4.21555 0.0633009C4.07499 0.144044 3.78641 0.571381 4.32245 0.873966C4.66514 1.06714 4.87474 1.11822 5.18895 1.37518C5.55842 1.67736 6.23999 2.36166 6.37577 2.89881L6.37596 2.8982Z" fill="#040404" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.96289 8.96829L10.0866 8.96789C9.97354 8.40389 9.58895 8.08718 9.27322 7.82658C8.23862 6.97292 7.90243 6.90933 6.81085 7.78176C6.51079 8.02157 6.07056 8.42549 5.96289 8.96829Z" fill="#FAD315" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.2063 11.4324C10.2792 11.1236 10.2972 10.7075 10.2411 10.345L5.72182 10.3375C5.67936 10.8702 5.56002 11.3182 5.87499 11.4144L10.2063 11.4324Z" fill="#FAD315" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.0516 4.71889L6.61328 5.10263C6.89574 6.27785 8.96761 6.46033 9.36614 5.10263C9.05596 4.75463 9.34128 5.22839 8.73984 4.42943C8.46599 4.24776 8.62223 3.92701 8.60177 3.48777C8.38108 3.30024 8.26596 3.24251 7.9703 3.29176C7.83739 3.31376 7.76472 3.3287 7.62798 3.34687C6.94201 3.43791 7.67025 4.54953 7.0516 4.71889Z" fill="#FAD315" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.13672 12.7922C6.24439 13.3855 6.96401 14.071 7.41896 14.4317C7.57788 14.5579 7.82076 14.722 7.9399 14.8647C8.47193 14.6396 9.76584 13.4287 9.81441 12.7833L6.13672 12.7922Z" fill="#FAD315" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.05078 4.71834C7.66944 4.54898 6.9412 3.43735 7.62717 3.34631C7.7639 3.32815 7.83658 3.31321 7.96949 3.29121C8.26514 3.24195 8.38027 3.29968 8.60096 3.48721C8.62142 3.92645 8.46517 4.2472 8.73903 4.42888C8.61032 3.85176 8.75279 3.79262 8.73348 3.35479C8.02819 3.07037 7.78724 3.08894 7.13167 3.40687C7.39042 4.05423 7.21773 4.13416 7.05078 4.71834Z" fill="#F8EA51" />
                                </svg>
                            </span>
                            <span>Business Support Service</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-[2rem] sm:text-5xl md:text-[56px] lg:text-6xl font-extrabold text-[#0A0A0A] leading-[1.1] sm:leading-tight">
                            Powering Inclusive <br />
                            Business Growth in{" "}
                            <span className="relative inline-block">
                                Greater Manchester
                                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-2 sm:h-3 bg-[#E2C47D] -z-10"></span>
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="open-sans mt-5 sm:mt-6 text-base sm:text-lg text-[#0A0A0A] max-w-2xl">
                            Start, structure, and scale your business with trusted community led support.
                        </p>

                        {/* Buttons */}
                        <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                            <button className="bg-[#D7263D] hover:bg-[#D7263D] text-white px-5 sm:px-6 py-3 rounded-lg font-medium transition-all w-full sm:w-auto text-sm sm:text-base">
                                <a href="#business">Apply for Business Support →</a>
                            </button>

                            <a href="#business" className="border-[1.5px] flex justify-center items-center border-[#001F3F4D] text-[#0A0A0A] px-5 sm:px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all w-full sm:w-auto text-sm sm:text-base">
                                View Packages
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl">
                            <div>
                                <h3 className="text-2xl sm:text-[30px] font-semibold text-[#7B3306]">250+</h3>
                                <p className="text-[#4A5565] text-xs sm:text-[15px]">Business Supported</p>
                            </div>

                            <div>
                                <h3 className="text-2xl sm:text-[30px] font-semibold text-[#7B3306]">98%</h3>
                                <p className="text-[#4A5565] text-xs sm:text-[15px]">Success Rate</p>
                            </div>

                            <div>
                                <h3 className="text-2xl sm:text-[30px] font-semibold text-[#7B3306]">15+</h3>
                                <p className="text-[#4A5565] text-xs sm:text-[15px]">Years Experience</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[548px]">
                            {/* Back Layer */}
                            <div className="absolute inset-0 sm:-left-3 lg:-left-4 sm:top-0 w-full h-full bg-[#D8CDB3] rounded-[24px] sm:rounded-[28px] rotate-[1.99deg]" />

                            {/* Front Card */}
                            <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden top-2 sm:top-[8.73px] left-2 sm:left-5">
                                <img
                                    src="/service/shi.jpg"
                                    alt="Business Team"
                                    className="w-full h-[320px] sm:h-[400px] lg:h-[470px] object-cover scale-110 sm:scale-[1.3]"
                                    style={{
                                        objectPosition: "50% 200%",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ServiceHeroSection;