// @ts-nocheck
const STEPS = [
  'Searching live market databases',
  'Gathering recent news & trends',
  'Analysing competitor landscape',
  'Generating insights & opportunities',
]

function resolveLevel(status) {
  switch (status) {
    case 'pending':    return 0
    case 'processing': return 2
    case 'complete':   return 4
    default:           return 1
  }
}

function SkeletonBar({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-[#E0E5EC] ${className}`} />
}

export default function AnalyzingPanel({ query, status, onCancel }) {
  const level = resolveLevel(status)

  return (
    <div className="flex flex-col gap-4">

      <div className="rounded-2xl border border-[#E0E5EC] bg-white p-6 shadow-sm sm:px-8">
        <div className="flex items-start gap-5 sm:gap-6">

          <div className="shrink-0 pt-0.5">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#FFD700]/25 border-t-[#FFD700]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-4 text-[15px] font-semibold text-[#001F3F]">
              Analysing:{' '}
              <span className="italic text-[#4A5568]">&quot;{query}&quot;</span>...
            </p>
            <div className="flex flex-col gap-2.5">
              {STEPS.map((step, i) => {
                const done   = i < level - 1
                const active = i === level - 1
                return (
                  <div key={step} className="flex items-center gap-2.5">
                    <div
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        done
                          ? 'bg-green-500'
                          : active
                            ? 'animate-pulse bg-[#FFD700]'
                            : 'bg-[#E0E5EC]'
                      }`}
                    />
                    <span
                      className={`text-[13.5px] ${
                        done
                          ? 'font-normal text-green-600'
                          : active
                            ? 'font-semibold text-[#001F3F]'
                            : 'font-normal text-[#8A94A6]'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            onClick={onCancel}
            className="shrink-0 rounded-lg border border-[#E0E5EC] bg-transparent px-3.5 py-1.5 text-xs font-medium text-[#4A5568] transition hover:border-[#001F3F]/20 hover:bg-[#F4F6F9]"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map(n => (
          <div key={n} className="rounded-2xl border border-[#E0E5EC] bg-white p-5 shadow-sm">
            <SkeletonBar className="mb-3 h-3.5 w-1/2" />
            <SkeletonBar className="mb-2 h-2.5 w-4/5" />
            <SkeletonBar className="h-2.5 w-3/5" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[#E0E5EC] bg-white p-6 shadow-sm">
        <SkeletonBar className="mb-4 h-3.5 w-[35%]" />
        <SkeletonBar className="mb-2.5 h-2.5 w-full" />
        <SkeletonBar className="mb-2.5 h-2.5 w-[88%]" />
        <SkeletonBar className="h-2.5 w-[70%]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2].map(n => (
          <div key={n} className="rounded-2xl border border-[#E0E5EC] bg-white p-5 shadow-sm sm:p-6">
            <SkeletonBar className="mb-3.5 h-3.5 w-2/5" />
            <SkeletonBar className="mb-2 h-2.5 w-[90%]" />
            <SkeletonBar className="mb-2 h-2.5 w-3/4" />
            <SkeletonBar className="h-2.5 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  )
}
