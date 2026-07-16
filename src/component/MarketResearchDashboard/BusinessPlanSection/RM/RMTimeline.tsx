type CheckItem = {
  text: string
  done: boolean
}

type Phase = {
  tag: string
  title: string
  items: CheckItem[]
  isActive?: boolean
}

const phases: Phase[] = [
  {
    tag: 'WEEK 1-2',
    title: 'Foundation & Validation',
    isActive: false,
    items: [
      { text: 'Define core value proposition', done: true },
      { text: 'Conduct 10 customer interviews', done: true },
      { text: 'Research top 5 competitors', done: true },
      { text: 'Set up basic landing page', done: true },
    ],
  },
  {
    tag: 'MONTH 1 — ACTIVE',
    title: 'Month 1 — Active',
    isActive: true,
    items: [
      { text: 'Design core user flows', done: true },
      { text: 'Build MVP with core AI feature', done: false },
      { text: 'Recruit 20 beta testers', done: false },
      { text: 'Launch email waitlist campaign', done: false },
    ],
  },
  {
    tag: 'MONTH 2-3',
    title: 'Beta Launch & Iteration',
    isActive: false,
    items: [
      { text: 'Launch closed beta to 500 users', done: false },
      { text: 'Collect feedback and iterate weekly', done: false },
      { text: 'Set up Stripe payments', done: false },
      { text: 'Target first 50 paying customers', done: false },
    ],
  },
  {
    tag: '90-DAY GOAL',
    title: 'Public Launch',
    isActive: false,
    items: [
      { text: 'Full public launch on Product Hunt', done: false },
      { text: 'Scale to 200 paying subscribers', done: false },
      { text: 'Reach $4,000 MRR', done: false },
      { text: 'Begin investor outreach', done: false },
    ],
  },
]

function Checkbox({ done }: { done: boolean }) {
  return (
    <span
      className={[
        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded',
        done
          ? 'bg-[#5AA34A] text-white'
          : 'border border-[#CBD2DB] bg-white',
      ].join(' ')}
    >
      {done && (
        <svg viewBox="0 0 10 8" className="h-2.5 w-2.5" fill="none">
          <path
            d="M1 4l3 3 5-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  )
}

export default function RoadmapTimeline() {
  return (
    <section>
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-3 top-4 bottom-4 w-px bg-[#D6DAE3]" />

        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.tag} className="flex gap-5">
              {/* dot */}
              <div className="relative z-10 mt-4 flex h-6 w-6 shrink-0 items-center justify-center">
                <span
                  className={[
                    'h-3 w-3 rounded-full',
                    phase.isActive ? 'bg-[#5AA34A]' : 'bg-[#CBD2DB]',
                  ].join(' ')}
                />
              </div>

              <div className="flex-1 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)] sm:p-5">
                <p
                  className={[
                    'mb-0.5 text-[10px] font-bold tracking-[0.1em] uppercase',
                    phase.isActive ? 'text-[#5AA34A]' : 'text-[#9CA3AF]',
                  ].join(' ')}
                >
                  {phase.tag}
                </p>
                <h4 className="mb-3 text-sm font-bold text-[#001F3F]">{phase.title}</h4>

                <div className="space-y-2">
                  {phase.items.map((item) => (
                    <div key={item.text} className="flex items-start gap-2.5">
                      <Checkbox done={item.done} />
                      <span
                        className={[
                          'text-sm',
                          item.done ? 'text-[#5B6472]' : 'text-[#374151]',
                        ].join(' ')}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}