import type { ElementType } from "react";
import {
  BookOpen,
  CheckCircle2,
  CircleHelp,
  Clock3,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Scale,
} from "lucide-react";

import type {
  CourseLesson,
  LessonSection,
  LessonSectionType,
  SustainabilityCourse,
} from "../types/sustainability";

type LessonContentProps = {
  course: SustainabilityCourse;
  lesson: CourseLesson;
};

type SectionStyle = {
  wrapper: string;
  iconWrapper: string;
  icon: ElementType;
  label: string;
};

const sectionStyles: Record<LessonSectionType, SectionStyle> = {
  content: {
    wrapper: "border-[#E2E5E9] bg-[#FFFDF7]",
    iconWrapper: "bg-[#E9EEF3] text-[#001F3F]",
    icon: BookOpen,
    label: "Lesson",
  },

  example: {
    wrapper: "border-[#E9D67A] bg-[#FFF9DD]",
    iconWrapper: "bg-[#FFD700] text-[#001F3F]",
    icon: Lightbulb,
    label: "Example",
  },

  "case-study": {
    wrapper: "border-[#D5DDEA] bg-[#F4F7FA]",
    iconWrapper: "bg-[#001F3F] text-white",
    icon: Scale,
    label: "Case study",
  },

  activity: {
    wrapper: "border-[#F1C5CB] bg-[#FFF3F5]",
    iconWrapper: "bg-[#D7263D] text-white",
    icon: ListChecks,
    label: "Activity",
  },

  summary: {
    wrapper: "border-[#D7E7DA] bg-[#F3FAF5]",
    iconWrapper: "bg-[#2D7A45] text-white",
    icon: CheckCircle2,
    label: "Summary",
  },

  questions: {
    wrapper: "border-[#DDD1F3] bg-[#F8F5FF]",
    iconWrapper: "bg-[#6B45A8] text-white",
    icon: CircleHelp,
    label: "Assessment",
  },
};

export function LessonContent({
  course,
  lesson,
}: LessonContentProps) {
  return (
    <div className="min-w-0 flex-1">
      <header className="rounded-[20px] bg-[#001F3F] px-5 py-8 text-white sm:px-8 lg:px-10 lg:py-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.13em] text-[#FFD700]">
          {course.title}
        </p>

        <h1 className="mt-3 max-w-[850px] text-[30px] font-semibold leading-[1.16] tracking-[-0.04em] sm:text-[38px] lg:text-[44px]">
          {lesson.title}
        </h1>

        <p className="mt-4 max-w-[780px] text-[15px] leading-7 text-white/70 sm:text-[16px]">
          {lesson.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-[9px] border border-white/10 bg-white/10 px-3 py-2 text-[13px] text-white/80">
            <Clock3 size={16} className="text-[#FFD700]" />
            {lesson.duration}
          </div>

          <div className="flex items-center gap-2 rounded-[9px] border border-white/10 bg-white/10 px-3 py-2 text-[13px] text-white/80">
            <GraduationCap size={16} className="text-[#FFD700]" />
            {lesson.shortTitle}
          </div>
        </div>
      </header>

      <section className="mt-6 rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-5 sm:p-7">
        <p className="text-[13px] font-semibold uppercase tracking-[0.13em] text-[#D7263D]">
          Learning outcomes
        </p>

        <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.03em] text-[#001F3F]">
          By the end of this session, you should be able to:
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {lesson.learningOutcomes.map((outcome) => (
            <div
              key={outcome}
              className="flex items-start gap-3 rounded-[12px] bg-[#F5F2EA] p-4"
            >
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0 text-[#D7263D]"
              />

              <p className="text-[14px] leading-6 text-[#4E5D6C]">
                {outcome}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 space-y-5">
        {lesson.sections.map((section) => (
          <LessonSectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

function LessonSectionCard({ section }: { section: LessonSection }) {
  const sectionType = section.type ?? "content";
  const style = sectionStyles[sectionType];
  const Icon = style.icon;
  const isQuestionSection = sectionType === "questions";

  return (
    <section
      id={section.id}
      className={`scroll-mt-6 rounded-[18px] border p-5 sm:p-7 ${style.wrapper}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${style.iconWrapper}`}
        >
          <Icon size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.13em] text-[#7E8794]">
            {style.label}
          </p>

          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.025em] text-[#001F3F]">
            {section.title}
          </h2>
        </div>
      </div>

      {section.paragraphs && (
        <div className="mt-5 space-y-4">
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[15px] leading-7 text-[#536170]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {section.points && !isQuestionSection && (
        <ul className="mt-5 space-y-3">
          {section.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-[15px] leading-7 text-[#536170]"
            >
              <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D7263D]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {section.points && isQuestionSection && (
        <div className="mt-6 space-y-5">
          {section.points.map((question, index) => (
            <div
              key={question}
              className="rounded-[14px] border border-[#E3DDF0] bg-white p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#001F3F] text-[13px] font-semibold text-white">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium leading-6 text-[#001F3F]">
                    {question}
                  </p>

                  <textarea
                    rows={4}
                    aria-label={`Answer to question ${index + 1}`}
                    placeholder="Enter your answer here..."
                    className="mt-4 w-full resize-y rounded-[12px] border border-[#D8DCE2] bg-[#FFFDF7] px-4 py-3 text-[14px] leading-6 text-[#334155] outline-none transition placeholder:text-[#98A2B3] focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/10"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#D7263D] px-5 text-[15px] font-semibold text-white transition hover:bg-[#BE1F34] sm:w-fit"
          >
            Submit Questionnaire
          </button>
        </div>
      )}
    </section>
  );
}