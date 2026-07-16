import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";

type CreditCardItem = {
  title: string;
  pointsPerCredit: number;
  available: number;
  trend: number;
};

type TransactionItem = {
  title: string;
  date: string;
  points: number;
  type: "buy" | "sell";
};

const credits: CreditCardItem[] = [
  {
    title: "Forest Conservation Credits",
    pointsPerCredit: 8,
    available: 500,
    trend: 5.1,
  },
  {
    title: "Clean Water Credits",
    pointsPerCredit: 4,
    available: 750,
    trend: -1.2,
  },
  {
    title: "Renewable Energy Credits",
    pointsPerCredit: 5,
    available: 1000,
    trend: 2.5,
  },
];

const transactions: TransactionItem[] = [
  {
    title: "Purchased 50 credits",
    date: "2026-03-20",
    points: -250,
    type: "buy",
  },
  {
    title: "Sold 30 credits",
    date: "2026-03-18",
    points: 180,
    type: "sell",
  },
  {
    title: "Purchased 100 credits",
    date: "2026-03-15",
    points: -500,
    type: "buy",
  },
];

function formatPoints(value: number) {
  return `${value > 0 ? "+" : ""}${value} pts`;
}

function CreditMarketCard({
  title,
  pointsPerCredit,
  available,
  trend,
}: CreditCardItem) {
  const isPositive = trend >= 0;

  return (
    <article className="w-full rounded-[18px] border border-[#E5E7EB] bg-[#FFFDF7] p-4 sm:p-5 lg:px-[26px] lg:pb-[22px] lg:pt-[24px]">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <h3 className="min-w-0 flex-1 text-sm font-semibold leading-[1.25] tracking-[-0.02em] text-[#001F3F] sm:text-[14px]">
          {title}
        </h3>

        <div
          className={`mt-0.5 flex shrink-0 items-center gap-1.5 text-[15px] font-medium sm:text-[18px] ${
            isPositive ? "text-[#00A63E]" : "text-[#E7000B]"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={18} strokeWidth={2.2} />
          ) : (
            <ArrowDownRight size={18} strokeWidth={2.2} />
          )}
          <span>{`${isPositive ? "+" : ""}${trend}%`}</span>
        </div>
      </div>

      <div className="mt-6 lg:mt-[28px]">
        <p className="text-[22px] font-semibold leading-none tracking-[-0.04em] text-[#001F3F] sm:text-[24px]">
          {pointsPerCredit}
        </p>

        <p className="mt-3 text-[12px] leading-[1.3] text-[#6A7282] sm:mt-4">
          Points per credit
        </p>

        <p className="mt-2 text-[12px] leading-[1.3] text-[#99A1AF]">
          {available} available
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-[26px]">
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center rounded-xl bg-[#E51F3D] text-[14px] font-medium text-white transition hover:opacity-95"
        >
          Buy
        </button>

        <button
          type="button"
          className="flex h-10 w-full items-center justify-center rounded-xl border-2 border-[#D7263D] bg-transparent text-[14px] font-medium text-[#001F3F] transition hover:bg-[#fff7f8]"
        >
          Sell
        </button>
      </div>
    </article>
  );
}

function TransactionRow({ title, date, points, type }: TransactionItem) {
  const isSell = type === "sell";
  const iconBg = isSell ? "bg-[#FDE2E2]" : "bg-[#DDF7E8]";
  const iconColor = isSell ? "text-[#FF2D2D]" : "text-[#16A34A]";
  const pointsColor = isSell ? "text-[#16A34A]" : "text-[#FF2D2D]";

  return (
    <div className="flex items-center justify-between gap-4 rounded-[16px] bg-[#F9FAFB] px-4 py-4 sm:rounded-[18px] sm:px-[22px] sm:py-[20px]">
      <div className="flex min-w-0 items-center gap-3 sm:gap-[18px]">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${iconBg}`}
        >
          {isSell ? (
            <ArrowUpRight size={21} className={iconColor} strokeWidth={2.2} />
          ) : (
            <ArrowDownRight size={21} className={iconColor} strokeWidth={2.2} />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#0A0A0A] sm:text-[14px]">
            {title}
          </p>
          <p className="mt-1.5 text-[12px] leading-none text-[#6A7282] sm:mt-2">
            {date}
          </p>
        </div>
      </div>

      <p className={`shrink-0 text-[13px] font-medium sm:text-[14px] ${pointsColor}`}>
        {formatPoints(points)}
      </p>
    </div>
  );
}

export default function GreenExchange() {
  return (
    <section className="w-full rounded-[20px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 lg:rounded-[24px] lg:px-9 lg:pb-[38px] lg:pt-[34px]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.04em] text-[#001F3F] sm:text-[25px]">
            Green Exchange
          </h2>

          <p className="mt-3 max-w-2xl text-[14px] leading-[1.45] text-[#6B7280] sm:mt-4 sm:text-[16px]">
            Trade carbon credits and grow your green portfolio
          </p>
        </div>

        <div className="w-full rounded-[16px] bg-[#F9FAFB] p-4 text-left sm:w-fit sm:min-w-[220px] lg:bg-transparent lg:p-0 lg:text-right">
          <p className="text-[13px] leading-none text-[#4A5565] sm:text-[14px]">
            Wallet Balance
          </p>
          <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.04em] text-[#D7263D] sm:mt-3 sm:text-[24px]">
            15,680
          </p>
          <p className="mt-2 text-[15px] leading-none text-[#6A7282] sm:mt-3 sm:text-[18px]">
            Green Points
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-[34px] xl:grid-cols-2 xl:gap-[30px] 2xl:grid-cols-3">
        {credits.map((credit) => (
          <CreditMarketCard key={credit.title} {...credit} />
        ))}
      </div>

      <div className="mt-8 lg:mt-[42px]">
        <h3 className="text-[21px] font-semibold leading-tight tracking-[-0.04em] text-[#001F3F] sm:text-[25px]">
          Recent Transactions
        </h3>

        <div className="mt-5 space-y-3 sm:space-y-4 lg:mt-[26px]">
          {transactions.map((transaction) => (
            <TransactionRow
              key={`${transaction.title}-${transaction.date}`}
              {...transaction}
            />
          ))}
        </div>
      </div>

      <div className="mt-7 flex justify-center lg:mt-[34px]">
        <button
          type="button"
          className="flex h-12 w-full max-w-[240px] items-center justify-center gap-3 rounded-[14px] bg-[#D7263D] px-5 text-[15px] font-medium text-white transition hover:opacity-95 sm:w-auto sm:max-w-none sm:px-7 sm:text-[16px]"
        >
          <Wallet size={24} strokeWidth={2.2} />
          Trade Credits
        </button>
      </div>
    </section>
  );
}