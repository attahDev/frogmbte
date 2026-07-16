export default function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl sm:rounded-2xl bg-[#FFFDF7] shadow-sm p-5 sm:p-6 ${className}`}
      aria-hidden="true"
    >
      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gray-200 mb-4" />
      <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
      <div className="h-3 w-full bg-gray-100 rounded mb-1" />
      <div className="h-3 w-1/2 bg-gray-100 rounded" />
    </div>
  );
}

export function InlineSkeleton({ className = "" }: { className?: string }) {
  return <span className={`inline-block h-4 w-10 animate-pulse rounded bg-gray-200 align-middle ${className}`} />;
}
