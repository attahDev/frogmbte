import React from "react";

type StatCardProps = {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: string;
};

const TrendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M14.6666 4.66667L8.99992 10.3333L5.66659 7.00001L1.33325 11.3333"
      stroke="#00A63E"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.6667 4.66667H14.6667V8.66667"
      stroke="#00A63E"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StatCard = ({ icon, value, label, change }: StatCardProps) => {
  return (
    <div className="w-full rounded-[16px] border border-[#F3F4F6] bg-[#FFFDF7] px-4 py-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] sm:px-5 lg:px-[22px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[11px] bg-[#FFD700]">
          {icon}
        </div>

        <div className="flex shrink-0 items-center gap-1 pt-1 text-[#16A34A]">
          <TrendIcon />
          <span className="text-[15px] font-medium leading-none sm:text-[18px] lg:text-[20px]">
            {change}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="break-words text-[24px] font-semibold leading-none tracking-[-0.03em] text-[#001F3F] sm:text-[26px] lg:text-[28px]">
          {value}
        </h3>

        <p className="mt-2 text-[14px] leading-[1.35] text-[#4A5565] sm:text-[15px] lg:text-[16px]">
          {label}
        </p>
      </div>
    </div>
  );
};

export default function SustainabilityStats() {
  const stats = [
    {
      value: "12,456",
      label: "Total CO₂ Tracked (kg)",
      change: "+12%",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2C9.43223 4.69615 8 8.27674 8 12C8 15.7233 9.43223 19.3038 12 22C14.5678 19.3038 16 15.7233 16 12C16 8.27674 14.5678 4.69615 12 2Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12H22" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      value: "8,932",
      label: "CO₂ Offset Achieved (kg)",
      change: "+8%",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 17L13.5 8.5L8.5 13.5L2 7" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 17H22V11" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      value: "15,680",
      label: "Green Points Earned",
      change: "+15%",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9.93694 15.5C9.84766 15.1539 9.66728 14.8381 9.41456 14.5854C9.16184 14.3327 8.84601 14.1523 8.49994 14.063L2.36494 12.481C2.26027 12.4513 2.16815 12.3883 2.10255 12.3014C2.03696 12.2146 2.00146 12.1088 2.00146 12C2.00146 11.8912 2.03696 11.7854 2.10255 11.6986C2.16815 11.6118 2.26027 11.5487 2.36494 11.519L8.49994 9.93601C8.84589 9.84681 9.16163 9.66658 9.41434 9.41404C9.66705 9.16151 9.84751 8.84589 9.93694 8.50001L11.5189 2.36501C11.5483 2.25992 11.6113 2.16735 11.6983 2.1014C11.7852 2.03545 11.8913 1.99976 12.0004 1.99976C12.1096 1.99976 12.2157 2.03545 12.3026 2.1014C12.3896 2.16735 12.4525 2.25992 12.4819 2.36501L14.0629 8.50001C14.1522 8.84608 14.3326 9.1619 14.5853 9.41462C14.838 9.66734 15.1539 9.84773 15.4999 9.93701L21.6349 11.518C21.7404 11.5471 21.8335 11.61 21.8998 11.6971C21.9661 11.7841 22.002 11.8906 22.002 12C22.002 12.1094 21.9661 12.2159 21.8998 12.3029C21.8335 12.39 21.7404 12.4529 21.6349 12.482L15.4999 14.063C15.1539 14.1523 14.838 14.3327 14.5853 14.5854C14.3326 14.8381 14.1522 15.1539 14.0629 15.5L12.4809 21.635C12.4515 21.7401 12.3886 21.8327 12.3016 21.8986C12.2147 21.9646 12.1086 22.0003 11.9994 22.0003C11.8903 22.0003 11.7842 21.9646 11.6973 21.8986C11.6103 21.8327 11.5473 21.7401 11.5179 21.635L9.93694 15.5Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 3V7" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 5H18" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 17V19" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 18H3" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      value: "#47",
      label: "Sustainability Ranking",
      change: "+15%",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15.477 12.89L16.992 21.416C17.009 21.5164 16.9949 21.6196 16.9516 21.7118C16.9084 21.8039 16.838 21.8807 16.7499 21.9318C16.6619 21.9829 16.5603 22.0059 16.4588 21.9977C16.3573 21.9895 16.2607 21.9506 16.182 21.886L12.602 19.199C12.4292 19.0699 12.2192 19.0001 12.0035 19.0001C11.7878 19.0001 11.5778 19.0699 11.405 19.199L7.819 21.885C7.74032 21.9494 7.64386 21.9883 7.54249 21.9965C7.44112 22.0047 7.33967 21.9818 7.25166 21.9309C7.16365 21.8799 7.09327 21.8033 7.04991 21.7113C7.00656 21.6193 6.99228 21.5163 7.009 21.416L8.523 12.89" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#FFFDF7] px-4 py-4 sm:px-6 lg:px-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4 xl:gap-[25px]">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}