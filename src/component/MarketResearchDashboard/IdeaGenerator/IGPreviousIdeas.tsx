import AIDashboardButton from '../ui/AIDashboardButton';

type Tag = { label: string; bg: string; text: string }

type IdeaCard = {
  id: number
  title: string
  description: string
  whyItFits: string
  tags: Tag[]
}

const ideas: IdeaCard[] = [
  {
    id: 1,
    title: 'Online Coaching Marketplace',
    description:
      'A platform connecting certified coaches with clients across fitness, business, and life coaching — earning a commission per booking.',
    whyItFits:
      'Low startup cost, scalable model, and booming demand for remote coaching globally.',
    tags: [
      { label: 'Low Difficulty', bg: 'bg-[#EDF4FF]', text: 'text-[#3B6FD4]' },
      { label: 'High Revenue', bg: 'bg-[#F3ECF8]', text: 'text-[#9A63B0]' },
    ],
  },
  {
    id: 2,
    title: 'Online Coaching Marketplace',
    description:
      'Short, skill-based video courses targeting professionals who want to upskill fast with AI-curated learning paths.',
    whyItFits:
      'Education + tech is exploding. Your skills map directly to content creation and platform growth.',
    tags: [
      { label: 'Moderate', bg: 'bg-[#FFF4E5]', text: 'text-[#D48B3B]' },
      { label: 'High Revenue', bg: 'bg-[#F3ECF8]', text: 'text-[#9A63B0]' },
    ],
  },
]

function IdeaCardItem({ idea }: { idea: IdeaCard }) {
  return (
    <div className="min-w-0 w-full flex-1 rounded-[18px] border border-[#E8E8E0] bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.06)] sm:rounded-[22px] sm:p-5">
      <h4 className="text-sm font-extrabold leading-snug text-[#001F3F] sm:text-[15px]">
        {idea.title}
      </h4>
      <p className="mt-2 text-xs leading-relaxed text-[#5B6472]">
        {idea.description}
      </p>

      <div className="mt-3 rounded-xl bg-[#F0FAF0] px-3 py-2.5">
        <p className="text-xs leading-relaxed text-[#3D7A34]">
          <span className="font-semibold">Why it fits you:</span>{' '}
          {idea.whyItFits}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {idea.tags.map((t) => (
          <span
            key={t.label}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${t.bg} ${t.text}`}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-2">
        <button className="flex-1 rounded-xl border border-[#D7263D] px-3 py-2.5 text-xs font-semibold text-[#D7263D] transition hover:bg-[#D7263D]/5 sm:py-2">
          Validate
        </button>
        <AIDashboardButton
          variant="secondary"
          className="flex-1 py-2 text-xs"
        >
          Build Plan
        </AIDashboardButton>
      </div>
    </div>
  )
}

export default function IGPreviousIdeas() {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#E8E8E0]" />
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9AA3B2]">
          <span className="text-[10px]">📁 </span>
          Previously Generated Ideas
        </div>
        <div className="h-px flex-1 bg-[#E8E8E0]" />
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:gap-4">
        {ideas.map((idea) => (
          <IdeaCardItem key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  )
}
