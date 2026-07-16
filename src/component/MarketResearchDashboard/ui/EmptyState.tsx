import { ArrowRight } from 'lucide-react'
import React from 'react'

type EmptyStateProps = {
  title: string
  description: string
  icon?: React.ReactNode

  buttonText?: string
  onButtonClick?: () => void
  buttonHref?: string
}

export default function EmptyState({
  title,
  description,
  icon,
  buttonText,
  onButtonClick,
  buttonHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {icon && <div className="mb-6">{icon}</div>}

      <h3 className="text-xl font-bold text-[#0B2545]">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-[#667085]">
        {description}
      </p>

      {buttonText &&
        (buttonHref ? (
          <a
            href={buttonHref}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D7263D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b91f33]"
          >
            {buttonText}
            <ArrowRight size={16} />
          </a>
        ) : (
          <button
            onClick={onButtonClick}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D7263D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b91f33]"
          >
            {buttonText}
            <ArrowRight size={16} />
          </button>
        ))}
    </div>
  )
}