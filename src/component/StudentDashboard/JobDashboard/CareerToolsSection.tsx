import React from "react";
import { ArrowRight } from "lucide-react";

type ToolCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
};

const tools: ToolCardProps[] = [
    {
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0002 2.66663H8.00016C7.29292 2.66663 6.61464 2.94758 6.11454 3.44767C5.61445 3.94777 5.3335 4.62605 5.3335 5.33329V26.6666C5.3335 27.3739 5.61445 28.0521 6.11454 28.5522C6.61464 29.0523 7.29292 29.3333 8.00016 29.3333H24.0002C24.7074 29.3333 25.3857 29.0523 25.8858 28.5522C26.3859 28.0521 26.6668 27.3739 26.6668 26.6666V9.33329L20.0002 2.66663Z" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.6665 2.66663V7.99996C18.6665 8.7072 18.9475 9.38548 19.4476 9.88558C19.9477 10.3857 20.6259 10.6666 21.3332 10.6666H26.6665" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.3332 12H10.6665" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M21.3332 17.3334H10.6665" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M21.3332 22.6666H10.6665" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        ,
        title: "AI CV Builder",
        description: "Generate or improve your CV with AI assistance",
        buttonText: "Create CV",
    },
    {
        icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.6665 5.33337H5.33317C3.86041 5.33337 2.6665 6.52728 2.6665 8.00004V24C2.6665 25.4728 3.86041 26.6667 5.33317 26.6667H26.6665C28.1393 26.6667 29.3332 25.4728 29.3332 24V8.00004C29.3332 6.52728 28.1393 5.33337 26.6665 5.33337Z" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M29.3332 9.33337L17.3732 16.9334C16.9615 17.1913 16.4856 17.3281 15.9998 17.3281C15.5141 17.3281 15.0381 17.1913 14.6265 16.9334L2.6665 9.33337" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        ,
        title: "Cover Letter Generator",
        description: "Tailored cover letters for each job application",
        buttonText: "Generate Letter",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3332 26.6666V5.33329C21.3332 4.62605 21.0522 3.94777 20.5521 3.44767C20.052 2.94758 19.3737 2.66663 18.6665 2.66663H13.3332C12.6259 2.66663 11.9477 2.94758 11.4476 3.44767C10.9475 3.94777 10.6665 4.62605 10.6665 5.33329V26.6666" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26.6665 8H5.33317C3.86041 8 2.6665 9.19391 2.6665 10.6667V24C2.6665 25.4728 3.86041 26.6667 5.33317 26.6667H26.6665C28.1393 26.6667 29.3332 25.4728 29.3332 24V10.6667C29.3332 9.19391 28.1393 8 26.6665 8Z" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        ),
        title: "Portfolio Guide",
        description: "Tips and structure for building your portfolio",
        buttonText: "Build Portfolio",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.3332 26.6666V5.33329C21.3332 4.62605 21.0522 3.94777 20.5521 3.44767C20.052 2.94758 19.3737 2.66663 18.6665 2.66663H13.3332C12.6259 2.66663 11.9477 2.94758 11.4476 3.44767C10.9475 3.94777 10.6665 4.62605 10.6665 5.33329V26.6666" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M26.6665 8H5.33317C3.86041 8 2.6665 9.19391 2.6665 10.6667V24C2.6665 25.4728 3.86041 26.6667 5.33317 26.6667H26.6665C28.1393 26.6667 29.3332 25.4728 29.3332 24V10.6667C29.3332 9.19391 28.1393 8 26.6665 8Z" stroke="#FFD700" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
        ),
        title: "Skill Gap Analyzer",
        description: "Identify missing skills for your target roles",
        buttonText: "Analyze Skills",
    },
];

function ToolCard({ icon, title, description, buttonText }: ToolCardProps) {
    return (
        <article className="w-full rounded-[18px] border-[0.67px] border-transparent bg-[#FFFDF7] px-5 py-6 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] sm:rounded-[22px] sm:px-6 sm:pb-7 sm:pt-8 lg:px-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#001F3F] sm:h-[60px] sm:w-[60px] sm:rounded-[20px]">
                {icon}
            </div>

            <h3 className="mt-5 text-base font-semibold leading-[1.2] tracking-[-0.02em] text-[#001F3F] sm:mt-7 sm:text-[18px]">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-[1.55] text-[#4A5565] sm:mt-4 sm:text-[14px]">
                {description}
            </p>

            <button
                type="button"
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-[#D7263D] bg-transparent px-4 text-sm font-medium text-[#001F3F] transition hover:bg-[#fff7f8] sm:mt-5 sm:h-[58px] sm:gap-3 sm:rounded-[18px] sm:px-5 sm:text-[14px]"
            >
                <span>{buttonText}</span>
                <ArrowRight size={20} strokeWidth={2.2} className="sm:h-[22px] sm:w-[22px]" />
            </button>
        </article>
    );
}

export default function CareerToolsSection() {
    return (
        <section className="w-full rounded-[20px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-6 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:rounded-[24px] sm:px-6 sm:py-8 lg:px-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                {tools.map((tool) => (
                    <ToolCard key={tool.title} {...tool} />
                ))}
            </div>
        </section>
    );
}