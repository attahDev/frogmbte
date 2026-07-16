const CommunityImpact = () => {
  return (
    <section className="relative bg-[#FFD700] py-14 sm:py-16 lg:py-28 overflow-hidden">
      {/* CENTERED CONTAINER */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-6">
        {/* HEADER */}
        <div className="text-center max-w-[800px] mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold text-[#001F3F]">
            Community Impact
          </h2>
          <p className="mt-3 sm:mt-4 text-[15px] sm:text-[17px] lg:text-[18px] leading-7 sm:leading-[28px] text-[#001F3F]">
            Real numbers, real impact. See how we&apos;re transforming lives
            <br className="hidden sm:block" />
            and businesses across Greater Manchester.
          </p>
        </div>

        {/* TESTIMONIAL WRAPPER */}
        <div className="relative mt-12 sm:mt-16 lg:mt-24 flex justify-center items-center">
          {/* LEFT CARD */}
          <div
            className="hidden xl:block absolute -left-20 2xl:-left-32 w-[320px] 2xl:w-[380px]
            bg-[#F7EFCF] rounded-2xl p-6 2xl:p-8
            shadow-xl opacity-60 scale-95"
          >
            {/* QUOTE BADGE */}
            <div
              className="absolute -top-5 left-10 2xl:left-14 w-12 h-12 2xl:w-14 2xl:h-14
              bg-[#E31C23] rounded-full
              flex items-center justify-center
              text-white shadow-lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V11C14 11.5304 14.2107 12.0391 14.5858 12.4142C14.9609 12.7893 15.4696 13 16 13C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4804 17 13.7348 17 14V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C16.5913 21 18.1174 20.3679 19.2426 19.2426C20.3679 18.1174 21 16.5913 21 15V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V11C3 11.5304 3.21071 12.0391 3.58579 12.4142C3.96086 12.7893 4.46957 13 5 13C5.26522 13 5.51957 13.1054 5.70711 13.2929C5.89464 13.4804 6 13.7348 6 14V15C6 15.5304 5.78929 16.0391 5.41421 16.4142C5.03914 16.7893 4.53043 17 4 17C3.73478 17 3.48043 17.1054 3.29289 17.2929C3.10536 17.4804 3 17.7348 3 18V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C5.5913 21 7.11742 20.3679 8.24264 19.2426C9.36786 18.1174 10 16.5913 10 15V5C10 4.46957 9.78929 3.96086 9.41421 3.58579C9.03914 3.21071 8.53043 3 8 3H5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="text-[#001F3F] text-base 2xl:text-[18px] leading-7">
              &quot;GMBTE changed my career trajectory completely...&quot;
            </p>

            <div className="mt-8 flex items-center gap-4">
              <img
                src="/service/dev/dev-2.png"
                alt="Daniel"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#001F3F]">Daniel Aam</p>
                <p className="text-sm text-[#001F3F]/70">Junior Developer</p>
              </div>
            </div>
          </div>

          {/* CENTER CARD */}
          <div
            className="relative z-10 w-full max-w-[850px]
            bg-white rounded-[24px] sm:rounded-[28px] lg:rounded-3xl
            p-6 sm:p-8 md:p-10 lg:p-14
            shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
          >
            {/* QUOTE BADGE */}
            <div
              className="absolute -top-5 sm:-top-6 left-6 sm:left-10 lg:left-14 w-12 h-12 sm:w-14 sm:h-14
              bg-[#E31C23] rounded-full
              flex items-center justify-center
              text-white shadow-lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V11C14 11.5304 14.2107 12.0391 14.5858 12.4142C14.9609 12.7893 15.4696 13 16 13C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4804 17 13.7348 17 14V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C16.5913 21 18.1174 20.3679 19.2426 19.2426C20.3679 18.1174 21 16.5913 21 15V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V11C3 11.5304 3.21071 12.0391 3.58579 12.4142C3.96086 12.7893 4.46957 13 5 13C5.26522 13 5.51957 13.1054 5.70711 13.2929C5.89464 13.4804 6 13.7348 6 14V15C6 15.5304 5.78929 16.0391 5.41421 16.4142C5.03914 16.7893 4.53043 17 4 17C3.73478 17 3.48043 17.1054 3.29289 17.2929C3.10536 17.4804 3 17.7348 3 18V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C5.5913 21 7.11742 20.3679 8.24264 19.2426C9.36786 18.1174 10 16.5913 10 15V5C10 4.46957 9.78929 3.96086 9.41421 3.58579C9.03914 3.21071 8.53043 3 8 3H5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mt-8 text-[#001F3F] text-[16px] sm:text-[18px] lg:text-[20px] leading-7 sm:leading-8">
              &quot;GMBTE changed my career trajectory completely. Through their mentorship
              program, I connected with industry leaders who helped me transition
              from hospitality into tech. Today, I&apos;m a senior developer at a
              Manchester startup, and I&apos;m passionate about giving back to the
              community that supported me.&quot;
            </p>

            <div className="mt-8 sm:mt-10 lg:mt-12 flex items-center gap-4">
              <img
                src="/service/dev/dev-3.png"
                alt="Aisha"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#001F3F]">Aisha Patel</p>
                <p className="text-sm text-[#001F3F]/70">
                  Senior Developer · TechStart Manchester
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            className="hidden xl:block absolute -right-20 2xl:-right-32 w-[320px] 2xl:w-[380px]
            bg-[#F7EFCF] rounded-2xl p-6 2xl:p-8
            shadow-xl opacity-60 scale-95"
          >
            {/* QUOTE BADGE */}
            <div
              className="absolute -top-5 left-10 2xl:left-14 w-12 h-12 2xl:w-14 2xl:h-14
              bg-[#E31C23] rounded-full
              flex items-center justify-center
              text-white shadow-lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V11C14 11.5304 14.2107 12.0391 14.5858 12.4142C14.9609 12.7893 15.4696 13 16 13C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4804 17 13.7348 17 14V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C16.5913 21 18.1174 20.3679 19.2426 19.2426C20.3679 18.1174 21 16.5913 21 15V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V11C3 11.5304 3.21071 12.0391 3.58579 12.4142C3.96086 12.7893 4.46957 13 5 13C5.26522 13 5.51957 13.1054 5.70711 13.2929C5.89464 13.4804 6 13.7348 6 14V15C6 15.5304 5.78929 16.0391 5.41421 16.4142C5.03914 16.7893 4.53043 17 4 17C3.73478 17 3.48043 17.1054 3.29289 17.2929C3.10536 17.4804 3 17.7348 3 18V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C5.5913 21 7.11742 20.3679 8.24264 19.2426C9.36786 18.1174 10 16.5913 10 15V5C10 4.46957 9.78929 3.96086 9.41421 3.58579C9.03914 3.21071 8.53043 3 8 3H5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="text-[#001F3F] text-base 2xl:text-[18px] leading-7">
              &quot;GMBTE gave me clarity and direction in my tech journey...&quot;
            </p>

            <div className="mt-8 flex items-center gap-4">
              <img
                src="/service/dev/dev-1.png"
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#001F3F]">Daniel Aam</p>
                <p className="text-sm text-[#001F3F]/70">Junior Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGES SECTION */}
        <div className="mt-14 sm:mt-16 lg:mt-28 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-[1200px] mx-auto">
          <img
            src="/service/tes-1.jpg"
            alt="Office"
            className="rounded-2xl shadow-lg object-cover h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] w-full"
          />

          <img
            src="/service/tes2.jpg"
            alt="Event"
            className="rounded-2xl shadow-lg object-cover h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;