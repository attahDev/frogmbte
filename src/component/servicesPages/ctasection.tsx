const CTASection = () => {
  return (
    <section className="relative bg-[#FFF9E7] py-14 sm:py-16 lg:py-28 overflow-hidden">
      {/* CENTERED CONTAINER */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-6 grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
        {/* LEFT CONTENT */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center border-[0.67px] border-[#FFB9004D] gap-2 px-3 sm:px-4 py-2
            bg-[#FFB9001A] rounded-full text-[#7B3306]
            text-xs sm:text-sm font-medium"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.13672 12.7931L9.81442 12.7842C9.76584 13.4297 8.47193 14.6407 7.9399 14.8656C7.82076 14.7228 7.57808 14.5587 7.41897 14.4326C6.96401 14.0719 6.24439 13.3863 6.13672 12.7931ZM10.2072 11.4316L5.87587 11.4136C5.5609 11.3173 5.68024 10.8694 5.72269 10.3367L10.242 10.3441C10.2981 10.7065 10.2801 11.1227 10.2072 11.4316ZM5.96326 8.96788C6.07093 8.42508 6.51117 8.02116 6.81122 7.78135C7.9028 6.90892 8.23899 6.97251 9.27359 7.82617C9.58932 8.08676 9.97391 8.40328 10.0869 8.96747L5.96326 8.96788ZM9.94369 7.10734C10.8842 6.58332 11.4049 6.05425 12.6067 5.62268C13.1307 5.43435 13.853 5.32332 14.376 5.53851C15.9346 6.17961 14.7866 8.41761 12.6233 8.53267C12.1093 8.56012 11.1278 8.56173 10.8492 8.24905L9.94388 7.10734H9.94369ZM6.12008 7.2C5.14955 7.86694 5.78369 8.69234 3.31462 8.52883C1.18595 8.38794 0.0190192 6.05143 1.72084 5.5052C3.22225 5.02337 5.89614 6.80618 6.12008 7.2ZM8.73889 4.42869C9.34014 5.22764 9.05501 4.75388 9.3652 5.10189C8.96666 6.45959 6.8946 6.27711 6.61233 5.10189L7.05065 4.71815C7.2176 4.13397 7.39029 4.05404 7.13154 3.40668C7.7873 3.08876 8.02825 3.07019 8.73334 3.3546C8.75266 3.79243 8.61019 3.85158 8.73889 4.42869ZM6.37596 2.8982C6.03287 3.12952 5.74411 3.61439 5.64237 4.1909C5.49837 5.0064 5.75921 5.3752 5.98105 5.89902C4.6726 5.15982 2.53915 3.74258 0.852627 4.92526C-0.50478 5.87723 -0.192101 7.73653 1.44011 8.82939C2.32306 9.42064 3.21843 9.46908 4.40028 9.40893C4.19986 9.91377 3.14499 10.6818 2.35748 10.7662C1.98361 10.8062 1.64014 10.7737 1.64951 11.2214C1.66481 11.941 2.86541 11.6286 3.32954 11.4439C4.01761 11.1701 4.27349 10.7953 4.72921 10.4818C4.73648 13.4108 6.2813 15.0093 7.96821 16C8.62396 15.7267 9.78267 14.6522 10.2428 13.9622C10.9198 12.9469 11.1716 12.049 11.2256 10.4873C11.4072 10.5878 11.6189 10.8195 11.8325 10.9808C12.5887 11.5515 14.1276 12.0494 14.2833 11.3482C14.3961 10.8399 14.0601 10.8084 13.703 10.7737C13.3385 10.7382 13.1024 10.6645 12.8006 10.499C12.328 10.2396 11.7465 9.77511 11.539 9.39057C13.7015 9.62492 15.999 8.60291 16 6.44787C16.0006 5.20079 14.712 4.34815 13.2653 4.50681C12.4154 4.60007 11.4962 5.08069 10.7605 5.49188C10.4862 5.64509 10.2768 5.82171 9.98519 5.91678C10.5687 4.78597 10.4891 3.6475 9.61782 2.91092C9.71153 2.3435 10.4319 1.63214 10.7413 1.36569C11.0441 1.10469 11.1888 1.06391 11.5562 0.882443C11.9683 0.678768 12.0138 0.24336 11.6612 0.0548244C11.1586 -0.213849 10.2338 0.60227 9.99055 0.84349C9.74136 1.09056 9.59621 1.26214 9.37304 1.5395C9.15943 1.80494 8.96322 2.1703 8.79684 2.34975C7.91007 2.17999 7.9988 2.24216 7.13727 2.34188C6.94833 1.82755 5.02544 -0.401376 4.21555 0.0633009C4.07499 0.144044 3.78641 0.571381 4.32245 0.873966C4.66514 1.06714 4.87474 1.11822 5.18895 1.37518C5.55842 1.67736 6.23999 2.36166 6.37577 2.89881L6.37596 2.8982Z"
                fill="#040404"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.96289 8.96829L10.0866 8.96789C9.97354 8.40389 9.58895 8.08718 9.27322 7.82658C8.23862 6.97292 7.90243 6.90933 6.81085 7.78176C6.51079 8.02157 6.07056 8.42549 5.96289 8.96829Z"
                fill="#FAD315"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2063 11.4323C10.2792 11.1234 10.2972 10.7074 10.2411 10.3449L5.72182 10.3374C5.67936 10.8701 5.56002 11.318 5.87499 11.4143L10.2063 11.4323Z"
                fill="#FAD315"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.0516 4.71877L6.61328 5.10251C6.89574 6.27773 8.96761 6.46021 9.36614 5.10251C9.05596 4.75451 9.34128 5.22826 8.73984 4.42931C8.46599 4.24764 8.62223 3.92689 8.60177 3.48764C8.38108 3.30012 8.26596 3.24239 7.9703 3.29164C7.83739 3.31364 7.76472 3.32858 7.62798 3.34675C6.94201 3.43779 7.67025 4.54941 7.0516 4.71877Z"
                fill="#FAD315"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.13672 12.7921C6.24439 13.3854 6.96401 14.0709 7.41896 14.4316C7.57788 14.5577 7.82076 14.7219 7.9399 14.8646C8.47193 14.6395 9.76584 13.4285 9.81441 12.7832L6.13672 12.7921Z"
                fill="#FAD315"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.05078 4.71846C7.66944 4.5491 6.9412 3.43747 7.62717 3.34644C7.7639 3.32827 7.83658 3.31333 7.96949 3.29133C8.26514 3.24208 8.38027 3.29981 8.60096 3.48733C8.62142 3.92658 8.46517 4.24733 8.73903 4.429C8.61032 3.85189 8.75279 3.79274 8.73348 3.35491C8.02819 3.07049 7.78724 3.08907 7.13167 3.40699C7.39042 4.05435 7.21773 4.13428 7.05078 4.71846Z"
                fill="#F8EA51"
              />
            </svg>

            Join the GMBTE Community
          </div>

          {/* Heading */}
          <h2 className="mt-6 sm:mt-7 lg:mt-8 text-[30px] sm:text-[38px] md:text-[42px] lg:text-[45px] leading-tight sm:leading-tight lg:leading-[64px] font-semibold text-black">
            Ready to Launch or <br />
            <span className="relative inline-block">
              <span className="relative z-10">Structure Your Business?</span>
              <span className="w-full absolute left-0 bottom-1 sm:bottom-2 h-2 sm:h-3 lg:h-4 bg-[#E9D088] -z-0"></span>
            </span>
          </h2>

          {/* Paragraph */}
          <p className="mt-5 sm:mt-6 lg:mt-8 text-[15px] sm:text-[17px] lg:text-[18px] leading-6 sm:leading-7 text-black/80 max-w-[550px]">
            Get started with transparent pricing, expert guidance, and community
            support that puts your success first.
          </p>

          {/* Buttons */}
          <div className="mt-8 sm:mt-9 lg:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <button
              className="bg-[#D7263D] text-white px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl
              font-medium text-[15px] sm:text-[16px]
              hover:bg-[#D7263D] transition w-full sm:w-auto"
            >
              <a href="#business">Apply for Business Support →</a>
            </button>

            <button
              className="border border-black/30 text-black
              px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl font-medium
              hover:bg-black hover:text-white transition w-full sm:w-auto"
            >
              <a href="/partners">Partner with Us</a>
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative order-last lg:order-none">
          <img
            src="/service/sec.jpg"
            alt="Business Community"
            className="rounded-2xl sm:rounded-3xl object-cover w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-auto"
          />

          {/* Decorative Shape */}
          <div
            className="absolute -bottom-10 -right-10 sm:-bottom-12 sm:-right-12 lg:-bottom-16 lg:-right-16
            w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[300px] lg:h-[300px]
            bg-black/5 rounded-full blur-2xl"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;