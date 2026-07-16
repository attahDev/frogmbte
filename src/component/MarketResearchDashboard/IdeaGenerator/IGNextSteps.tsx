
type Step = {
  number: number
  title: string
  description: string
  bgClass: string
  borderClass: string
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Validate the Idea',
    description:
      'Conduct surveys and interviews with target audience to validate demand and features.',
    bgClass: 'bg-[#FFF5F6]',
    borderClass: 'border-[#F2C7CC]',
  },
  {
    number: 2,
    title: 'Build MVP',
    description:
      'Create a minimum viable product with core features and test with early users.',
    bgClass: 'bg-[#F2F7FF]',
    borderClass: 'border-[#C8DBFA]',
  },
  {
    number: 3,
    title: 'Launch & Market',
    description:
      'Launch the platform, gather feedback, and scale marketing to grow user base.',
    bgClass: 'bg-[#FFFDF4]',
    borderClass: 'border-[#E7DFC2]',
  },
]

export default function IGNextSteps() {
  return (
    <section className="min-w-0">
      <h3 className="mb-3 text-sm font-semibold text-[#001F3F] sm:mb-4 sm:text-base">
        Next Steps
      </h3>

      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <article
            key={step.number}
            className={[
              'rounded-2xl border p-4 sm:p-5',
              'shadow-[0_8px_18px_rgba(15,23,42,0.06)]',
              'transition-transform duration-200 hover:-translate-y-0.5',
              step.bgClass,
              step.borderClass,
            ].join(' ')}
          >
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B3158] text-xs font-extrabold text-[#F6D04D] shadow-sm">
              {step.number}
            </div>

            <h4 className="text-sm font-bold text-[#0B2545]">
              {step.title}
            </h4>

            <p className="mt-1.5 text-xs leading-relaxed text-[#6C7480]">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}