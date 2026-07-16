import type { ElementType } from "react";
import {
    ArrowRight,
    Award,
    BookOpen,
    CheckCircle2,
    Clock3,
    GraduationCap,
    MonitorPlay,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { SustainabilityCourse } from "../types/sustainability";

type CourseOverviewProps = {
    course: SustainabilityCourse;
};

export function CourseOverview({ course }: CourseOverviewProps) {
    const firstLesson = course.lessons[0];
    const safeProgress = Math.min(Math.max(course.progress, 0), 100);

    return (
        <div className="min-w-0 flex-1">
            <section className="overflow-hidden rounded-[20px] bg-[#001F3F] text-white">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="flex flex-col justify-center px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
                        <span className="w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[12px] font-medium uppercase tracking-[0.12em] text-[#FFD700]">
                            Sustainability course
                        </span>

                        <h1 className="mt-5 max-w-[700px] text-[31px] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[40px] lg:text-[48px]">
                            {course.title}
                        </h1>

                        <p className="mt-5 max-w-[660px] text-[15px] leading-7 text-white/75 sm:text-[17px]">
                            {course.fullDescription}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <CourseMeta icon={Clock3} label={course.duration} />
                            <CourseMeta
                                icon={GraduationCap}
                                label={course.contactHours}
                            />
                            <CourseMeta icon={MonitorPlay} label={course.mode} />
                            <CourseMeta icon={BookOpen} label={course.level} />
                        </div>

                        {firstLesson && (
                            <Link
                               to={`/dashboard/green-impact/${course.slug}/${firstLesson.slug}`}
                                className="mt-8 flex h-[50px] w-fit items-center justify-center gap-2 rounded-[12px] bg-[#D7263D] px-6 text-[15px] font-semibold text-white transition hover:bg-[#BE1F34]"
                            >
                                {safeProgress > 0 ? "Continue Learning" : "Start Course"}
                                <ArrowRight size={18} />
                            </Link>
                        )}
                    </div>

                    <div className="relative min-h-[290px] overflow-hidden lg:min-h-full">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#001F3F]/25 lg:to-transparent" />
                    </div>
                </div>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_330px]">
                <div className="rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-5 sm:p-7">
                    <h2 className="text-[23px] font-semibold tracking-[-0.03em] text-[#001F3F] sm:text-[27px]">
                        What you will learn
                    </h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {course.learningOutcomes.map((outcome) => (
                            <div
                                key={outcome}
                                className="flex items-start gap-3 rounded-[13px] bg-[#F5F2EA] p-4"
                            >
                                <CheckCircle2
                                    size={20}
                                    className="mt-0.5 shrink-0 text-[#D7263D]"
                                />

                                <p className="text-[14px] leading-6 text-[#4E5D6C]">
                                    {outcome}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-5 sm:p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3C4] text-[#001F3F]">
                        <Award size={22} />
                    </div>

                    <h2 className="mt-4 text-[20px] font-semibold text-[#001F3F]">
                        Course certificate
                    </h2>

                    <p className="mt-3 text-[14px] leading-6 text-[#687384]">
                        Complete every session, questionnaire and final project to become
                        eligible for a course certificate.
                    </p>

                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#E7E8EA]">
                        <div
                            className="h-full rounded-full bg-[#FFD700]"
                            style={{ width: `${safeProgress}%` }}
                        />
                    </div>

                    <div className="mt-2 flex justify-between text-[13px] text-[#687384]">
                        <span>Course progress</span>
                        <span>{safeProgress}%</span>
                    </div>
                </div>
            </section>

            <section className="mt-6 rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-5 sm:p-7">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D7263D]">
                    Curriculum
                </p>

                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-[#001F3F] sm:text-[28px]">
                    Course content
                </h2>

                <p className="mt-2 text-[14px] leading-6 text-[#687384]">
                    {course.lessons.length} learning sections that take you from
                    foundational knowledge to practical application.
                </p>

                <div className="mt-6 space-y-3">
                    {course.lessons.map((lesson, index) => (
                        <Link
                            key={lesson.slug}
                            to={`/dashboard/green-impact/${course.slug}/${lesson.slug}`}
                            className="group flex flex-col gap-4 rounded-[15px] border border-[#E6E8EB] p-4 transition hover:border-[#D7B900] hover:bg-[#FFFDF1] sm:flex-row sm:items-center sm:p-5"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#001F3F] text-[14px] font-semibold text-white">
                                {lesson.slug === "questionnaire" ? (
                                    <Award size={19} />
                                ) : (
                                    index + 1
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#8A94A2]">
                                    {lesson.shortTitle}
                                </p>

                                <h3 className="mt-1 text-[17px] font-semibold text-[#001F3F]">
                                    {lesson.title}
                                </h3>

                                <p className="mt-1 text-[14px] leading-6 text-[#687384]">
                                    {lesson.description}
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-3 text-[13px] text-[#687384]">
                                <Clock3 size={16} />

                                {lesson.duration}

                                <ArrowRight
                                    size={18}
                                    className="ml-2 text-[#001F3F] transition group-hover:translate-x-1"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {course.finalProject && (
                <section className="mt-6 rounded-[18px] border border-[#E2E5E9] bg-[#FFF9DD] p-5 sm:p-7">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#D7263D]">
                        Final project
                    </p>

                    <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-[#001F3F]">
                        {course.finalProject.title}
                    </h2>

                    <p className="mt-3 max-w-[800px] text-[15px] leading-7 text-[#5F6977]">
                        {course.finalProject.description}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {course.finalProject.deliverables.map((deliverable) => (
                            <div
                                key={deliverable}
                                className="flex items-start gap-3 rounded-[12px] bg-white/70 p-4"
                            >
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-[#D7263D]"
                                />

                                <span className="text-[14px] text-[#4E5D6C]">
                                    {deliverable}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

type CourseMetaProps = {
    icon: ElementType;
    label: string;
};

function CourseMeta({ icon: Icon, label }: CourseMetaProps) {
    return (
        <div className="flex items-center gap-2 rounded-[9px] border border-white/10 bg-white/10 px-3 py-2 text-[13px] text-white/80">
            <Icon size={16} className="text-[#FFD700]" />
            {label}
        </div>
    );
}