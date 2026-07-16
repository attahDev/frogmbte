type PreviousIdea = {
  title: string
  createdAt: string
  progress: string
  progressWidth: string
  progressColor: string
}

const ideas: PreviousIdea[] = [
  {
    title: 'ONLINE COACHING MARKETPLACE',
    createdAt: 'Created 3 days ago',
    progress: 'Progress: Month 1 - MVP',
    progressWidth: 'w-1/4',
    progressColor: 'bg-[#F5A623]',
  },
  {
    title: 'SUSTAINABLE E-COMMERCE',
    createdAt: 'Created 5 days ago',
    progress: 'Progress: Week 1-2 Done',
    progressWidth: 'w-2/5',
    progressColor: 'bg-[#F5A623]',
  },
  {
    title: 'EDTECH MICRO LEARNING PLATFORM',
    createdAt: 'Created 1 week ago',
    progress: 'Progress: Beta Launch',
    progressWidth: 'w-3/5',
    progressColor: 'bg-[#F5A623]',
  },
]

export default function RoadmapPreviousIdeas() {
  return (
    <section>
      {/* divider with label */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#D6DAE3]" />
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#5B6472]">
          <span>🏷</span> Previously Generated Ideas
        </span>
        <div className="h-px flex-1 bg-[#D6DAE3]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {ideas.map((idea) => (
          <div
            key={idea.title}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.05)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <h4 className="mb-1 text-xs font-extrabold tracking-wide text-[#001F3F]">
              {idea.title}
            </h4>
            <p className="mb-3 text-xs text-[#9CA3AF]">{idea.createdAt}</p>
            <p className="mb-1.5 text-xs text-[#5B6472]">{idea.progress}</p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F2F2EE]">
              <div className={`h-full rounded-full ${idea.progressWidth} ${idea.progressColor}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}