import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const QUOTE_TEXT =
  "Technology is most powerful when it includes everyone. We’re committed to building a future where no one is left behind in the digital transformation. A future defined by inclusion, opportunity and shared progress.";

const features = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.42 10.9219C21.5991 10.8429 21.751 10.7131 21.857 10.5487C21.963 10.3842 22.0184 10.1923 22.0164 9.99661C22.0143 9.80095 21.955 9.61019 21.8456 9.44795C21.7362 9.28571 21.5817 9.15912 21.401 9.08387L12.83 5.17987C12.5695 5.06102 12.2864 4.99951 12 4.99951C11.7137 4.99951 11.4306 5.06102 11.17 5.17987L2.60004 9.07987C2.42201 9.15784 2.27056 9.286 2.16421 9.44868C2.05786 9.61136 2.00122 9.80151 2.00122 9.99587C2.00122 10.1902 2.05786 10.3804 2.16421 10.5431C2.27056 10.7057 2.42201 10.8339 2.60004 10.9119L11.17 14.8199C11.4306 14.9387 11.7137 15.0002 12 15.0002C12.2864 15.0002 12.5695 14.9387 12.83 14.8199L21.42 10.9219Z" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 10V16" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 12.5V16C6 16.7956 6.63214 17.5587 7.75736 18.1213C8.88258 18.6839 10.4087 19 12 19C13.5913 19 15.1174 18.6839 16.2426 18.1213C17.3679 17.5587 18 16.7956 18 16V12.5" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ,
    title: "Education",
    text: "Technology training and digital skills development opportunities",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 22V4C6 3.46957 6.21071 2.96086 6.58579 2.58579C6.96086 2.21071 7.46957 2 8 2H16C16.5304 2 17.0391 2.21071 17.4142 2.58579C17.7893 2.96086 18 3.46957 18 4V22H6Z" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 12H4C3.46957 12 2.96086 12.2107 2.58579 12.5858C2.21071 12.9609 2 13.4696 2 14V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H6" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H18" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 6H14" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 10H14" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 14H14" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 18H14" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ,
    title: "Business",
    text: "Supporting startups and growth stage companies with connections",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 3.12793C16.8578 3.3503 17.6174 3.85119 18.1597 4.55199C18.702 5.25279 18.9962 6.11382 18.9962 6.99993C18.9962 7.88604 18.702 8.74707 18.1597 9.44787C17.6174 10.1487 16.8578 10.6496 16 10.8719" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 20.9999V18.9999C21.9993 18.1136 21.7044 17.2527 21.1614 16.5522C20.6184 15.8517 19.8581 15.3515 19 15.1299" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ,
    title: "Jobs",
    text: "Connecting talent with career opportunities and transformation.",
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16H17C16.4477 16 16 16.4477 16 17V21C16 21.5523 16.4477 22 17 22H21C21.5523 22 22 21.5523 22 21V17C22 16.4477 21.5523 16 21 16Z" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 16H3C2.44772 16 2 16.4477 2 17V21C2 21.5523 2.44772 22 3 22H7C7.55228 22 8 21.5523 8 21V17C8 16.4477 7.55228 16 7 16Z" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 2H10C9.44772 2 9 2.44772 9 3V7C9 7.55228 9.44772 8 10 8H14C14.5523 8 15 7.55228 15 7V3C15 2.44772 14.5523 2 14 2Z" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 16V13C5 12.7348 5.10536 12.4804 5.29289 12.2929C5.48043 12.1054 5.73478 12 6 12H18C18.2652 12 18.5196 12.1054 18.7071 12.2929C18.8946 12.4804 19 12.7348 19 13V16" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 12V8" stroke="#D7263D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ,
    title: "Connection",
    text: "Building lasting professional networks that connect talents",
  },
];

const EmpowerSection: React.FC = () => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(quoteRef, { once: true, amount: 0.4 });
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    setDisplayedText("");
    setIsTypingDone(false);

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayedText(QUOTE_TEXT.slice(0, index));

      if (index >= QUOTE_TEXT.length) {
        window.clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 28);

    return () => window.clearInterval(interval);
  }, [isInView]);

  return (
    <section className="bg-[#FFFDF5] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 lg:px-24">
      <div className="mx-auto grid md:grid-cols-2 gap-10 sm:gap-14 items-start md:items-center">
        {/* LEFT SIDE */}
        <div className="min-w-0">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl md:text-[30px] font-extrabold text-[#001F3F] mb-6 text-center md:text-left"
          >
            Empowering Communities <br className="hidden sm:block" /> Through Tech and Opportunity
          </motion.h2>

          <p className="text-[#001F3F] text-sm sm:text-lg leading-relaxed mb-6 text-center md:text-left">
            Our mission is to create an inclusive ecosystem where everyone in Greater Manchester can access the
            resources, networks and opportunities they need to thrive in the digital economy. We believe that diversity
            drives innovation & that technology should be a force for positive change in our communities.
          </p>

          <p className="text-[#001F3F] text-sm sm:text-lg leading-relaxed mb-8 text-center md:text-left">
            Through targeted programs, mentorship, and strategic partnerships, we're building bridges between
            educational institutions, established businesses and emerging talent to create sustainable pathways to
            success. We’re connecting educational institutions, local businesses & emerging talent to create pathways to
            success, economic growth and a stronger, more connected future for all.
          </p>

          {/* QUOTE BOX */}
          <div
            ref={quoteRef}
            className="rounded-xl border-l-4 border-red-600 bg-[#FFF3C4] p-6 italic text-gray-600 shadow-sm"
          >
            <p className="min-h-[7.5rem] sm:min-h-[6.5rem]">
              <span className="mr-2 text-2xl italic text-red-600">“</span>
              {displayedText}
              {!isTypingDone && isInView && (
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-red-600 align-middle" />
              )}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#FFFDF7] border border-gray-100  rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-[#FFD84D] rounded-lg">
                {item.icon}
              </div>
              <h3 className="text-[#001F3F] font-semibold text-[18px]">{item.title}</h3>
              <p className="text-[#001F3F] text-[14px] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmpowerSection;
