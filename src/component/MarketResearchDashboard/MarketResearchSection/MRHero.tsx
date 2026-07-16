type StatTile = {
  label: string
  value: string
  valueClass: string
}

const stats: StatTile[] = [
  {
    label: 'MARKET DEMAND',
    value: 'High ↑',
    valueClass: 'text-[#5AA34A]',
  },
  {
    label: 'COMPETITION',
    value: 'Medium',
    valueClass: 'text-[#F5A623]',
  },
  {
    label: 'STARTUP COST',
    value: 'Low–Med',
    valueClass: 'text-[#4A9EE8]',
  },
  {
    label: 'PROFIT POTENTIAL',
    value: 'High ↑',
    valueClass: 'text-[#F5A623]',
  },
]

type Props = {
  title?: string
  subtitle?: string
  score?: number
  badge?: string
}

export default function MRResultHero({
  title = 'Market Validation Score',
  subtitle = 'AI Fitness Coaching App — Full market assessment',
  score = 78,
  badge = 'Strong Opportunity',
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0B2545] w-full min-w-0 px-4 py-5 shadow-[0_8px_32px_rgba(11,37,69,0.18)] sm:px-6 sm:py-7">
     <div className="pointer-events-none absolute -right-10 -bottom-16 z-0 sm:-right-6 sm:-bottom-10">
        <svg width="369" height="442" viewBox="0 0 369 442" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[220px] w-auto sm:h-[300px] lg:h-[360px]">
          <path opacity="0.05" fillRule="evenodd" clipRule="evenodd" d="M246.604 413.598L354.778 374.583C359.795 393.099 333.799 440.51 320.383 452.39C315.45 449.666 306.667 447.647 300.723 445.806C283.728 440.541 255.698 429.009 246.604 413.598ZM352.833 332.719L225.148 377.875C214.915 378.51 213.955 364.76 209.885 349.456L342.998 302.025C348.266 311.539 351.894 323.337 352.833 332.719ZM203.297 308.746C201.046 292.473 209.971 276.567 216.409 266.716C239.831 230.878 250.362 229.108 289.344 242.009C301.241 245.949 315.723 250.722 324.685 265.266L203.297 308.746ZM301.891 214.899C324.345 190.37 334.391 170.126 365.457 145.422C379.002 134.646 399.156 123.935 416.702 124.423C468.986 125.874 457.541 200.391 395.008 226.403C380.15 232.587 351.275 242.978 339.95 237.195L301.897 214.896L301.891 214.899ZM190.258 257.788C168.348 286.619 195.259 302.954 120.942 324.421C56.8715 342.93 -0.814186 290.068 43.8289 256.895C83.2152 227.631 179.733 249.165 190.258 257.788ZM239.674 152.894C265.353 168.838 252.228 158.631 264.834 165.066C266.661 207.132 203.842 223.885 183.796 194.085L192.867 178.763C191.947 160.711 196.233 156.661 182.151 141.334C198.28 125.555 205.188 122.497 228.784 122.997C233.725 135.004 230.122 138.155 239.674 152.894ZM154.83 135.118C147.041 145.186 143.382 161.752 146.145 178.903C150.05 203.164 161.411 210.7 173.173 222.971C127.273 216.148 50.3155 199.111 12.4788 249.873C-17.9734 290.731 9.79936 339.29 68.7622 352.563C100.659 359.745 127.5 351.658 161.69 337.522C160.832 353.714 137.45 386.255 115.11 396.909C104.503 401.965 94.0675 404.679 98.8146 417.067C106.452 436.975 138.674 415.605 150.492 405.561C168.014 390.674 171.803 377.523 182.088 363.976C211.552 445.585 272.992 473.882 332.545 483.73C349.12 469.195 372.499 427.015 379.154 402.922C388.943 367.469 387.39 339.774 373.381 295.649C379.733 296.537 388.279 300.768 396.178 303.015C424.136 310.959 474.411 308.625 471.99 287.427C470.236 272.062 460.03 274.726 449.173 277.522C438.088 280.373 430.4 280.808 419.863 279.372C403.362 277.119 381.604 270.296 371.655 261.759C437.656 245.499 495.084 192.778 473.59 132.666C461.153 97.8799 414.706 87.6835 373.702 107.359C349.615 118.918 327.353 142.012 309.803 161.235C303.26 168.399 298.859 175.532 291.223 181.258C297.106 143.57 283.395 112.658 250.391 101.3C247.482 84.4869 261.585 57.0541 268.033 46.3613C274.338 35.8911 278.193 33.2278 287.195 24.2943C297.293 14.2698 294.284 1.64694 282.02 0.106146C264.543 -2.08916 245.468 30.4204 240.716 39.712C235.848 49.2293 233.289 55.5445 229.489 65.6322C225.851 75.2869 223.724 87.5445 220.619 94.3031C192.819 98.9162 196.052 99.715 171.686 111.578C160.987 99.225 82.1223 57.3321 62.9213 78.8287C59.5899 82.5622 55.3624 97.5222 74.164 100.311C86.1815 102.086 92.8616 101.301 104.677 105.155C118.572 109.688 145.469 121.588 154.831 135.137L154.83 135.118Z" fill="#FFD700" />
        </svg>
      </div>

      <div className="relative z-10">
      <p className="text-base font-bold text-white sm:text-lg">{title}</p>
      <p className="mt-0.5 text-xs text-[#8AA4BF] break-words">{subtitle}</p>

      <div className="mt-5 flex flex-wrap items-end gap-3">
        <span className="text-5xl font-extrabold leading-none text-[#F6D04D] sm:text-[64px]">{score}</span>
        <div className="mb-2 space-y-1">
          <p className="text-xs text-[#8AA4BF]">out of 100</p>
          <span className="inline-block rounded-full border border-[#5AA34A] px-3 py-0.5 text-xs font-semibold text-[#5AA34A]">
            {badge}
          </span>
        </div>
          </div>
          
      <div className="mt-6 grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3">
            <p className="text-[9px] font-semibold tracking-widest text-[#8AA4BF] uppercase sm:text-[10px]">
              {stat.label}
            </p>
            <p className={`mt-1 text-xs font-bold sm:text-sm ${stat.valueClass}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}