import AIDashboardCard from '../ui/AIDashboardCard'

type ScoreCard = {
  label: string
  score: number
  description: string
  color: string
  bg: string
  border: string
}

const scores: ScoreCard[] = [
  {
    label: 'Market',
    score: 8.5,
    description: 'Strong demand and growing industry',
    color: '#2F6DB3',
    bg: 'bg-[#FAFBFD]',
    border: 'border-[#E4E8EE]',
  },
  {
    label: 'Profit',
    score: 7.5,
    description: 'Good margins with subscription model',
    color: '#4A9B52',
    bg: 'bg-[#FBFCFA]',
    border: 'border-[#E5EADF]',
  },
  {
    label: 'Execution',
    score: 7.0,
    description: 'Good margins with subscription model',
    color: '#D05C67',
    bg: 'bg-[#FFF9FA]',
    border: 'border-[#F0DADF]',
  },
  {
    label: 'Scalability',
    score: 8.0,
    description: 'High potential for growth',
    color: '#9A58A5',
    bg: 'bg-[#FCFAFD]',
    border: 'border-[#E9DDF0]',
  },
]

const R = 28
const CX = 36
const CY = 36
const SIZE = 72
const STROKE_W = 5
const CIRCUMFERENCE = 2 * Math.PI * R

function CircleProgress({
  score,
  color,
}: {
  score: number
  color: string
}) {
  const progress = (score / 10) * CIRCUMFERENCE
  const remaining = CIRCUMFERENCE - progress

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="drop-shadow-sm"
    >
      {/* Track */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="#E7EAF0"
        strokeWidth={STROKE_W}
      />

      {/* Progress */}
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke={color}
        strokeWidth={STROKE_W}
        strokeLinecap="round"
        strokeDasharray={`${progress} ${remaining}`}
        transform={`rotate(-90 ${CX} ${CY})`}
      />
    </svg>
  )
}

export default function IGScoreBreakdown() {
  return (
    <section className="min-w-0">
      <h3 className="mb-3 text-base font-semibold text-[#0B2545] sm:mb-4 sm:text-lg">
        Score Breakdown
      </h3>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {scores.map((s) => (
          <AIDashboardCard
            key={s.label}
            variant="default"
            padding="md"
            className={`
              flex min-w-0 flex-col items-center rounded-2xl border
              text-center shadow-[0_8px_18px_rgba(15,23,42,0.06)]
              ${s.bg} ${s.border}
            `}
          >
            {/* Progress Ring */}
            <div className="relative scale-90 sm:scale-100">
              <CircleProgress score={s.score} color={s.color} />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-extrabold tracking-tight text-[#0B2545] sm:text-[22px]">
                  {s.score}
                </span>
              </div>
            </div>

            {/* Label */}
            <h4 className="mt-1.5 text-xs font-bold text-[#0B2545] sm:mt-2 sm:text-sm">
              {s.label}
            </h4>

            {/* Description */}
            <p className="mt-1 max-w-[120px] text-[10px] leading-relaxed text-[#98A2B3] sm:max-w-[140px] sm:text-xs">
              {s.description}
            </p>
          </AIDashboardCard>
        ))}
      </div>
    </section>
  )
}