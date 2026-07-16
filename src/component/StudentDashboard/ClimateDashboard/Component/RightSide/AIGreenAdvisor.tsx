type AdvisorCardProps = {
    title: string;
    description: string;
    variant: "danger" | "info" | "neutral";
    badge?: string;
};

function AdvisorCard({ title, description, variant, badge }: AdvisorCardProps) {
    const styles = {
        danger:
            "border-2 border-[#FFC9C9] bg-[#FEF2F2]",
        info:
            "border-2 border-[#BEDBFF] bg-[#EFF6FF]",
        neutral:
            "border-2 border-[#E5E7EB] bg-[#FFFFFF]",
    };

    return (
        <div className={`rounded-[12px] px-4 py-4 ${styles[variant]}`}>
            <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 flex-1 text-base font-semibold leading-[1.2] text-[#0B2B50] sm:text-[17px]">
                    {title}
                </h3>

                {badge && (
                    <span className="shrink-0 rounded-[999px] bg-[#FDD5D5] px-2.5 py-1 text-[11px] font-medium text-[#DC2138] sm:px-3 sm:text-[12px]">
                        {badge}
                    </span>
                )}
            </div>

            <p className="mt-3 text-[14px] leading-[1.6] text-[#4B5563]">
                {description}
            </p>

            <button className="mt-4 text-[14px] font-medium text-[#0B2B50]">
                Take Action &nbsp;›
            </button>
        </div>
    );
}

export default function AIGreenAdvisor() {
    return (
        <section className="rounded-[14px] border-2 border-[#FFF085] bg-gradient-to-r from-[#FEFCE8] to-[#FFFBEB] p-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10),0px_1px_3px_0px_rgba(0,0,0,0.10)] sm:p-5 lg:p-[26px]">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1112 6.889V3.55566H6.77783" stroke="#001F3F" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.111 6.88892H5.111C4.19053 6.88892 3.44434 7.63511 3.44434 8.55558V15.2222C3.44434 16.1427 4.19053 16.8889 5.111 16.8889H15.111C16.0315 16.8889 16.7777 16.1427 16.7777 15.2222V8.55558C16.7777 7.63511 16.0315 6.88892 15.111 6.88892Z" stroke="#001F3F" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1.77783 11.8889H3.4445" stroke="#001F3F" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16.7778 11.8889H18.4445" stroke="#001F3F" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.6111 11.0557V12.7223" stroke="#001F3F" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.61108 11.0557V12.7223" stroke="#001F3F" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>

                <div>
                    <h2 className="text-[20px] font-semibold leading-[1.15] text-[#0B2B50]">
                        AI Green Advisor
                    </h2>
                    <p className="mt-1 text-[14px] text-[#6B7280]">
                        Personalized sustainability insights
                    </p>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <AdvisorCard
                    title="Reduce Travel Emissions"
                    description="Based on your activity, reduce travel emissions by 12% this month by using public transport twice weekly."
                    variant="danger"
                    badge="High Priority"
                />
                <AdvisorCard
                    title="Energy Optimization"
                    description="Switch to LED lighting to save 15% on energy costs and reduce your carbon footprint."
                    variant="info"
                />
                <AdvisorCard
                    title="Green Credits Opportunity"
                    description="Forest Conservation Credits are trending up 5.1%. Consider investing now."
                    variant="neutral"
                />
            </div>
        </section>
    );
}