type Report = {
  title: string
  analyzedAt: string
  score: number
  scoreColor: string
  barColor: string
}

const reports: Report[] = [
  {
    title: 'Online Coaching Marketplace',
    analyzedAt: 'Analysed 3 days ago',
    score: 71,
    scoreColor: 'text-[#F5A623]',
    barColor: 'bg-[#F5A623]',
  },
  {
    title: 'Sustainable E-Commerce',
    analyzedAt: 'Analysed 5 days ago',
    score: 65,
    scoreColor: 'text-[#F5A623]',
    barColor: 'bg-[#F5A623]',
  },
  {
    title: 'EdTech Micro Learning Platform',
    analyzedAt: 'Analysed 1 week ago',
    score: 90,
    scoreColor: 'text-[#5AA34A]',
    barColor: 'bg-[#5AA34A]',
  },
]

function ReportCard({ report }: { report: Report }) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-[#E4E8ED] bg-white p-5 shadow-[0_4px_12px_rgba(15,23,42,0.05)] transition-transform duration-200 hover:-translate-y-0.5">
      <div>
        <p className="text-xs font-extrabold tracking-[0.08em] text-[#001F3F] uppercase">
          {report.title}
        </p>
        <p className="mt-1 text-xs text-[#8A94A0]">{report.analyzedAt}</p>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-extrabold ${report.scoreColor}`}>{report.score}</span>
          <span className="text-xs text-[#8A94A0]">/100 Market Score</span>
        </div>
        {/* Score bar */}
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#ECEEE8]">
          <div
            className={`h-full rounded-full ${report.barColor}`}
            style={{ width: `${report.score}%` }}
          />
        </div>
      </div>
    </article>
  )
}

type Props = {
  reports?: Report[]
}

export default function MRPreviousReports({ reports: data = reports }: Props) {
  return (
    <section>
      {/* Divider with label */}
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#D8D8D0]" />
        <span className="flex items-center gap-1.5 px-1 text-center text-[10px] font-medium text-[#8A94A0] sm:text-xs">
          🗂️ Previously Generated Reports
        </span>
        <div className="h-px flex-1 bg-[#D8D8D0]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {data.map((report) => (
          <ReportCard key={report.title} report={report} />
        ))}
      </div>
    </section>
  )
}