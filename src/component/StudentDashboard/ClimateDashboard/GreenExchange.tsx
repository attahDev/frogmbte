import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import {
  buyCredits,
  fetchListings,
  fetchTransactions,
  sellCredits,
  type CreditListing,
  type Transaction,
} from "../../../lib/greenImpactApi";
import { onGreenImpactUpdate } from "../../../lib/greenImpactEvents";

function formatPoints(value: number) {
  return `${value > 0 ? "+" : ""}${value.toLocaleString()} bal`;
}

function CreditMarketCard({
  listing,
  onBuy,
  onSell,
  busy,
}: {
  listing: CreditListing;
  onBuy: () => void;
  onSell: () => void;
  busy: boolean;
}) {
  return (
    <article className="w-full rounded-[18px] border border-[#E5E7EB] bg-[#FFFDF7] p-4 sm:p-5 lg:px-[26px] lg:pb-[22px] lg:pt-[24px]">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <h3 className="min-w-0 flex-1 text-sm font-semibold leading-[1.25] tracking-[-0.02em] text-[#001F3F] sm:text-[14px]">
          {listing.title}
        </h3>
        {listing.ownedByMe > 0 && (
          <span className="shrink-0 rounded-full bg-[#F3F4F6] px-2 py-1 text-[11px] font-medium text-[#4B5563]">
            You own {listing.ownedByMe}
          </span>
        )}
      </div>

      {listing.description && (
        <p className="mt-2 text-[12px] leading-[1.4] text-[#6B7280]">{listing.description}</p>
      )}

      <div className="mt-6 lg:mt-[28px]">
        <p className="text-[22px] font-semibold leading-none tracking-[-0.04em] text-[#001F3F] sm:text-[24px]">
          {listing.pointsPerCredit}
        </p>

        <p className="mt-3 text-[12px] leading-[1.3] text-[#6A7282] sm:mt-4">
          Balance per credit
        </p>

        <p className="mt-2 text-[12px] leading-[1.3] text-[#99A1AF]">
          {listing.availableQuantity} available
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-[26px]">
        <button
          type="button"
          onClick={onBuy}
          disabled={busy || listing.availableQuantity < 1}
          className="flex h-10 w-full items-center justify-center rounded-xl bg-[#E51F3D] text-[14px] font-medium text-white transition hover:opacity-95 disabled:opacity-50"
        >
          Buy
        </button>

        <button
          type="button"
          onClick={onSell}
          disabled={busy || listing.ownedByMe < 1}
          className="flex h-10 w-full items-center justify-center rounded-xl border-2 border-[#D7263D] bg-transparent text-[14px] font-medium text-[#001F3F] transition hover:bg-[#fff7f8] disabled:opacity-50"
        >
          Sell
        </button>
      </div>
    </article>
  );
}

function TransactionRow({ title, date, points, type }: Transaction) {
  const isSell = type === "sell";
  const iconBg = isSell ? "bg-[#DDF7E8]" : "bg-[#FDE2E2]";
  const iconColor = isSell ? "text-[#16A34A]" : "text-[#FF2D2D]";
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
            {new Date(date).toLocaleDateString()}
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
  const [balance, setBalance] = useState<number | null>(null);
  const [listings, setListings] = useState<CreditListing[] | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [busyListingId, setBusyListingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAll = () => {
    fetchListings()
      .then(setListings)
      .catch(() => setListings([]));
    fetchTransactions()
      .then((res) => {
        setBalance(res.balance);
        setTransactions(res.transactions);
      })
      .catch(() => {
        setBalance(null);
        setTransactions([]);
      });
  };

  useEffect(() => {
    loadAll();
    const unsubscribe = onGreenImpactUpdate(loadAll);
    return unsubscribe;
  }, []);

  const handleTrade = async (listingId: string, action: "buy" | "sell") => {
    setBusyListingId(listingId);
    setError(null);
    try {
      if (action === "buy") {
        await buyCredits(listingId, 1);
      } else {
        await sellCredits(listingId, 1);
      }
      loadAll();
    } catch (err: any) {
      setError(err?.response?.data?.message || "That trade couldn't be completed.");
    } finally {
      setBusyListingId(null);
    }
  };

  return (
    <section className="w-full rounded-[20px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 lg:rounded-[24px] lg:px-9 lg:pb-[38px] lg:pt-[34px]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.04em] text-[#001F3F] sm:text-[25px]">
            Green Exchange
          </h2>

          <p className="mt-3 max-w-2xl text-[14px] leading-[1.45] text-[#6B7280] sm:mt-4 sm:text-[16px]">
            Trade your Green Exchange balance for credits — an in-platform reward, not real currency
          </p>
        </div>

        <div className="w-full rounded-[16px] bg-[#F9FAFB] p-4 text-left sm:w-fit sm:min-w-[220px] lg:bg-transparent lg:p-0 lg:text-right">
          <p className="text-[13px] leading-none text-[#4A5565] sm:text-[14px]">
            Wallet Balance
          </p>
          <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-0.04em] text-[#D7263D] sm:mt-3 sm:text-[24px]">
            {balance === null ? "—" : balance.toLocaleString()}
          </p>
          <p className="mt-2 text-[15px] leading-none text-[#6A7282] sm:mt-3 sm:text-[18px]">
            1 green point = 0.1 balance
          </p>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-[10px] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#DC2626]">{error}</p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-[34px] xl:grid-cols-2 xl:gap-[30px] 2xl:grid-cols-3">
        {listings === null ? (
          <p className="text-[13px] text-[#8B93A1]">Loading listings…</p>
        ) : listings.length === 0 ? (
          <p className="text-[13px] text-[#8B93A1]">No credit listings published yet.</p>
        ) : (
          listings.map((listing) => (
            <CreditMarketCard
              key={listing.id}
              listing={listing}
              busy={busyListingId === listing.id}
              onBuy={() => handleTrade(listing.id, "buy")}
              onSell={() => handleTrade(listing.id, "sell")}
            />
          ))
        )}
      </div>

      <div className="mt-8 lg:mt-[42px]">
        <h3 className="text-[21px] font-semibold leading-tight tracking-[-0.04em] text-[#001F3F] sm:text-[25px]">
          Recent Transactions
        </h3>

        <div className="mt-5 space-y-3 sm:space-y-4 lg:mt-[26px]">
          {transactions === null ? (
            <p className="text-[13px] text-[#8B93A1]">Loading…</p>
          ) : transactions.length === 0 ? (
            <p className="text-[13px] text-[#8B93A1]">No trades yet.</p>
          ) : (
            transactions.map((transaction) => (
              <TransactionRow key={transaction.id} {...transaction} />
            ))
          )}
        </div>
      </div>

      <div className="mt-7 flex justify-center lg:mt-[34px]">
        <div className="flex h-12 w-full max-w-[280px] items-center justify-center gap-3 rounded-[14px] bg-[#F3F4F6] px-5 text-[14px] font-medium text-[#4B5563] sm:w-auto sm:max-w-none sm:px-7">
          <Wallet size={22} strokeWidth={2.2} />
          Buy/Sell above — 1 credit per click
        </div>
      </div>
    </section>
  );
}
