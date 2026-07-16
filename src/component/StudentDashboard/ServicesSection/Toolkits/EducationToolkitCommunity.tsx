import {
    Calendar,
    Clock,
    ArrowRight,
} from "lucide-react";

export default function EducationToolkitCommunity() {
    return (
        <div className="px-10 py-16 bg-[#FFFDF7] space-y-16">
            {/* ---------------- Related Events ---------------- */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[28px] font-semibold text-[#001F3F]">
                        Related Events
                    </h2>

                    <button className="border border-[#001F3F] px-6 py-2 rounded-full text-[#001F3F] font-medium hover:bg-[#001F3F] hover:text-white transition">
                        View All Events
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <EventCard
                        icon={
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1126_4294)">
                                    <path d="M9.33301 7.58333L12.3798 9.61449C12.4237 9.64372 12.4747 9.66049 12.5274 9.66301C12.5801 9.66553 12.6325 9.65371 12.679 9.62881C12.7255 9.60391 12.7644 9.56685 12.7915 9.5216C12.8186 9.47635 12.833 9.42458 12.833 9.37183V4.59083C12.833 4.53951 12.8195 4.48909 12.7938 4.44467C12.7681 4.40025 12.7311 4.3634 12.6866 4.33783C12.6421 4.31227 12.5917 4.2989 12.5404 4.29907C12.489 4.29925 12.4387 4.31296 12.3943 4.33883L9.33301 6.12499" stroke="#001F3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8.16699 3.5H2.33366C1.68933 3.5 1.16699 4.02233 1.16699 4.66667V9.33333C1.16699 9.97767 1.68933 10.5 2.33366 10.5H8.16699C8.81132 10.5 9.33366 9.97767 9.33366 9.33333V4.66667C9.33366 4.02233 8.81132 3.5 8.16699 3.5Z" stroke="#001F3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1126_4294">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        }
                        tag="Virtual"
                        title="AI Skills Bootcamp"
                        desc="Master the fundamentals of AI and machine learning in this intensive 2-day workshop."
                        date="Nov 15, 2025"
                        time="6:00 PM - 9:00 PM"
                        image="/dashboard/toolkits/img-1.jpg"
                    />

                    <EventCard
                        icon={
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1126_4327)">
                                    <path d="M11.6663 5.83341C11.6663 8.746 8.43526 11.7793 7.35026 12.7162C7.24918 12.7922 7.12614 12.8333 6.99967 12.8333C6.87321 12.8333 6.75017 12.7922 6.64909 12.7162C5.56409 11.7793 2.33301 8.746 2.33301 5.83341C2.33301 4.59574 2.82467 3.40875 3.69984 2.53358C4.57501 1.65841 5.762 1.16675 6.99967 1.16675C8.23735 1.16675 9.42434 1.65841 10.2995 2.53358C11.1747 3.40875 11.6663 4.59574 11.6663 5.83341Z" stroke="#001F3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 7.58325C7.9665 7.58325 8.75 6.79975 8.75 5.83325C8.75 4.86675 7.9665 4.08325 7 4.08325C6.0335 4.08325 5.25 4.86675 5.25 5.83325C5.25 6.79975 6.0335 7.58325 7 7.58325Z" stroke="#001F3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1126_4327">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        }
                        tag="In-Person"
                        title="Women Empowerment"
                        desc="Network with female leaders and peers in Greater Manchester's tech community."
                        date="Nov 18, 2025"
                        time="10:00 AM - 2:30 PM"
                        image="/dashboard/toolkits/img-2.jpg"
                    />

                    <EventCard
                        icon={
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1126_4361)">
                                    <path d="M9.33366 12.25V11.0833C9.33366 10.4645 9.08783 9.871 8.65024 9.43342C8.21266 8.99583 7.61916 8.75 7.00033 8.75H3.50033C2.88149 8.75 2.28799 8.99583 1.85041 9.43342C1.41282 9.871 1.16699 10.4645 1.16699 11.0833V12.25" stroke="#001F3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.33301 1.82471C9.83337 1.95442 10.2765 2.24661 10.5928 2.65541C10.9092 3.06421 11.0808 3.56648 11.0808 4.08337C11.0808 4.60027 10.9092 5.10254 10.5928 5.51134C10.2765 5.92014 9.83337 6.21232 9.33301 6.34204" stroke="#001F3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.833 12.2501V11.0834C12.8326 10.5664 12.6605 10.0642 12.3438 9.65561C12.0271 9.24701 11.5836 8.95518 11.083 8.82593" stroke="#001F3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.25033 6.41667C6.53899 6.41667 7.58366 5.372 7.58366 4.08333C7.58366 2.79467 6.53899 1.75 5.25033 1.75C3.96166 1.75 2.91699 2.79467 2.91699 4.08333C2.91699 5.372 3.96166 6.41667 5.25033 6.41667Z" stroke="#001F3F" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1126_4361">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        }
                        tag="Hybrid"
                        title="Learn a skill"
                        desc="Hands-on coding session for beginners learning web development fundamentals."
                        date="Nov 25, 2025"
                        time="12:00 PM - 7:00 PM"
                        image="/dashboard/toolkits/img-3.jpg"
                    />
                </div>
            </section>


        </div>
    );
}

/* ---------------- Components ---------------- */

function EventCard({
    tag,
    icon,
    title,
    desc,
    date,
    time,
    image,
}: {
    tag: string;
    icon?: React.ReactNode;
    title: string;
    desc: string;
    date: string;
    time: string;
    image: string;
}) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="h-48 w-full object-cover"
                />

                <span className="absolute top-4 right-4 bg-[#FFD700] text-[#001F3F] px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <span className="flex items-center">{icon}</span>
                    <span>{tag}</span>
                </span>

            </div>

            <div className="p-6">
                <h3 className="text-[20px] font-semibold text-[#001F3F] mb-2">
                    {title}
                </h3>

                <p className="text-[#64748B] text-sm mb-4">
                    {desc}
                </p>

                <div className="flex flex-col gap-2 text-sm text-[#001F3F] mb-6">
                    <span className="flex items-center gap-2">
                        <Calendar size={16} className="text-[#D7263D]" />
                        {date}
                    </span>

                    <span className="flex items-center gap-2">
                        <Clock size={16} className="text-[#D7263D]" />
                        {time}
                    </span>
                </div>

                <button className="w-full bg-[#D7263D] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                    View Details <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}
