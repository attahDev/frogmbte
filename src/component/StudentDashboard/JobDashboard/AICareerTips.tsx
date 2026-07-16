import React from "react";

type TipItemProps = {
  icon: React.ReactNode;
  text: string;
};

const tips: TipItemProps[] = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6023 18.3332 9.99996C18.3332 5.39759 14.6022 1.66663 9.99984 1.66663C5.39746 1.66663 1.6665 5.39759 1.6665 9.99996C1.6665 14.6023 5.39746 18.3333 9.99984 18.3333Z" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10.0002 11.6667C10.9206 11.6667 11.6668 10.9205 11.6668 10C11.6668 9.07957 10.9206 8.33337 10.0002 8.33337C9.07969 8.33337 8.3335 9.07957 8.3335 10C8.3335 10.9205 9.07969 11.6667 10.0002 11.6667Z" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,
    text: "Your profile matches 78% of UI/UX roles",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_214_505)">
        <path d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90937 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28004C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82016 18.3351 9.90884 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16.6665 2.5V5.83333" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.3333 4.16675H15" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M3.3335 14.1667V15.8334" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4.16667 15H2.5" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_214_505">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
    ,
    text: "Improve your chances by adding a portfolio",
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.3332 5.83325L11.2498 12.9166L7.08317 8.74992L1.6665 14.1666" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.3335 5.83325H18.3335V10.8333" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ,
    text: "Top skills in demand: Figma, UX Research, Prototyping",
  },
  {
    icon:<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.55664 17.5C8.70293 17.7533 8.91332 17.9637 9.16668 18.11C9.42003 18.2563 9.70743 18.3333 9.99997 18.3333C10.2925 18.3333 10.5799 18.2563 10.8333 18.11C11.0866 17.9637 11.297 17.7533 11.4433 17.5" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.71821 12.7717C2.60935 12.8911 2.53751 13.0394 2.51143 13.1988C2.48534 13.3582 2.50615 13.5218 2.5713 13.6696C2.63646 13.8174 2.74316 13.943 2.87843 14.0313C3.01369 14.1196 3.1717 14.1666 3.33321 14.1667H16.6665C16.828 14.1668 16.9861 14.1199 17.1214 14.0318C17.2568 13.9437 17.3636 13.8182 17.429 13.6705C17.4943 13.5228 17.5153 13.3593 17.4894 13.1999C17.4635 13.0405 17.3919 12.892 17.2832 12.7726C16.1749 11.6301 14.9999 10.4159 14.9999 6.66675C14.9999 5.34067 14.4731 4.0689 13.5354 3.13121C12.5977 2.19353 11.326 1.66675 9.99988 1.66675C8.6738 1.66675 7.40203 2.19353 6.46435 3.13121C5.52666 4.0689 4.99988 5.34067 4.99988 6.66675C4.99988 10.4159 3.82405 11.6301 2.71821 12.7717Z" stroke="#D7263D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    ,
    text: "15 new jobs posted in your area this week",
  },
];

function TipRow({ icon, text }: TipItemProps) {
  return (
    <div className="flex min-h-[50px] items-center gap-3 rounded-[14px] bg-[#FFFDF7] px-4 py-3 shadow-[inset_0_0_0_1px_rgba(217,222,232,1)] sm:gap-4 sm:rounded-[16px] sm:px-5 sm:py-3.5">
      <div className="shrink-0">{icon}</div>
      <p className="text-sm font-medium leading-[1.35] text-[#001F3F] sm:text-[14px]">
        {text}
      </p>
    </div>
  );
}

export default function AICareerTips() {
  return (
    <section className="w-full rounded-[20px] bg-[linear-gradient(135deg,_#001F3F_0%,_#002143_11.11%,_#002347_22.22%,_#00264C_33.33%,_#002850_44.44%,_#002A54_55.56%,_#002C59_66.67%,_#002E5D_77.78%,_#003162_88.89%,_#003366_100%)] px-4 pb-6 pt-6 shadow-[0px_10px_20px_rgba(0,0,0,0.16)] sm:rounded-[24px] sm:px-6 sm:pb-8 sm:pt-8 lg:px-8">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.93694 15.5C9.84766 15.1539 9.66728 14.8381 9.41456 14.5854C9.16184 14.3327 8.84601 14.1523 8.49994 14.063L2.36494 12.481C2.26027 12.4513 2.16815 12.3883 2.10255 12.3014C2.03696 12.2146 2.00146 12.1088 2.00146 12C2.00146 11.8912 2.03696 11.7854 2.10255 11.6986C2.16815 11.6118 2.26027 11.5487 2.36494 11.519L8.49994 9.93601C8.84589 9.84681 9.16163 9.66658 9.41434 9.41404C9.66705 9.16151 9.84751 8.84589 9.93694 8.50001L11.5189 2.36501C11.5483 2.25992 11.6113 2.16735 11.6983 2.1014C11.7852 2.03545 11.8913 1.99976 12.0004 1.99976C12.1096 1.99976 12.2157 2.03545 12.3026 2.1014C12.3896 2.16735 12.4525 2.25992 12.4819 2.36501L14.0629 8.50001C14.1522 8.84608 14.3326 9.1619 14.5853 9.41462C14.838 9.66734 15.1539 9.84773 15.4999 9.93701L21.6349 11.518C21.7404 11.5471 21.8335 11.61 21.8998 11.6971C21.9661 11.7841 22.002 11.8906 22.002 12C22.002 12.1094 21.9661 12.2159 21.8998 12.3029C21.8335 12.39 21.7404 12.4529 21.6349 12.482L15.4999 14.063C15.1539 14.1523 14.838 14.3327 14.5853 14.5854C14.3326 14.8381 14.1522 15.1539 14.0629 15.5L12.4809 21.635C12.4515 21.7401 12.3886 21.8327 12.3016 21.8986C12.2147 21.9646 12.1086 22.0003 11.9994 22.0003C11.8903 22.0003 11.7842 21.9646 11.6973 21.8986C11.6103 21.8327 11.5473 21.7401 11.5179 21.635L9.93694 15.5Z" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20 3V7" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M22 5H18" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4 17V19" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M5 18H3" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <h2 className="text-xl font-semibold leading-none tracking-[-0.02em] text-white sm:text-2xl lg:text-[28px]">
          AI Career Tips
        </h2>
      </div>

      <div className="mt-5 space-y-3 sm:mt-7 sm:space-y-5">
        {tips.map((tip) => (
          <TipRow key={tip.text} {...tip} />
        ))}
      </div>

      <button
        type="button"
        className="mt-5 flex h-12 w-full items-center justify-center rounded-[14px] bg-[#FFD700] text-sm font-semibold text-[#001F3F] transition hover:brightness-95 sm:mt-7 sm:h-[58px] sm:rounded-[16px] sm:text-base"
      >
        Improve My Profile
      </button>
    </section>
  );
}