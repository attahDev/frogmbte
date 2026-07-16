import { FileText } from "lucide-react";

type InsightCardProps = {
  value: string;
  label: string;
  status: string;
  statusColor: string;
};

type ReportCardProps = {
  title: string;
  description: React.ReactNode;
};

const insightCards: InsightCardProps[] = [
  {
    value: "+1.2°C",
    label: "Avg. Temperature Rise",
    status: "⚠️ Monitor",
    statusColor: "text-[#F59E0B]",
  },
  {
    value: "45,230",
    label: "Trees Planted (2026)",
    status: "↑ Improving",
    statusColor: "text-[#22C55E]",
  },
  {
    value: "38%",
    label: "Renewable Energy %",
    status: "↑ Improving",
    statusColor: "text-[#22C55E]",
  },
];

const barData = [
  { area: "City Centre", value: 15 },
  { area: "Salford", value: 12 },
  { area: "Trafford", value: 10 },
  { area: "Stockport", value: 8 },
  { area: "Oldham", value: 7 },
];

const reports: ReportCardProps[] = [
  {
    title: "Manchester Climate Action Plan 2026",
    description: "Latest updates on the city's carbon neutrality roadmap",
  },
  {
    title: "Green Economy Growth Report",
    description: "Analysis of sustainable business trends in the region",
  },
];

function InsightCard({ value, label, status, statusColor }: InsightCardProps) {
  return (
    <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F5F7FB] px-4 py-4">
      <p className="text-[20px] font-semibold leading-none text-[#001F3F] sm:text-[22px]">
        {value}
      </p>

      <p className="mt-3 text-[13px] leading-[1.35] text-[#5F6C80] sm:text-[14px]">
        {label}
      </p>

      <p className={`mt-2 text-[13px] leading-none ${statusColor}`}>
        {status}
      </p>
    </div>
  );
}

function EmissionsOffsetChart() {
  const width = 820;
  const height = 300;

  const chartLeft = 48;
  const chartRight = 22;
  const chartTop = 18;
  const chartBottom = 48;

  const plotWidth = width - chartLeft - chartRight;
  const plotHeight = height - chartTop - chartBottom;

  const labels = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const yTicks = [0, 150, 300, 450, 600];
  const offsetData = [450, 420, 480, 390, 360, 340];

  const maxY = 600;

  const getX = (index: number) =>
    chartLeft + (index / (labels.length - 1)) * plotWidth;

  const getY = (value: number) =>
    chartTop + plotHeight - (value / maxY) * plotHeight;

  const offsetPath = offsetData
    .map((value, index) => {
      const x = getX(index);
      const y = getY(value);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="overflow-x-auto rounded-[12px] bg-[#F5F7FB] px-2 py-3 scrollbar-hide sm:px-4 sm:py-4">
      <div className="min-w-[480px] sm:min-w-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full"
          role="img"
          aria-label="CO2 emissions vs offset trends"
        >
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <line
                key={`y-${tick}`}
                x1={chartLeft}
                y1={y}
                x2={width - chartRight}
                y2={y}
                stroke="#D9DEE8"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          {labels.map((_, index) => {
            const x = getX(index);
            return (
              <line
                key={`x-${index}`}
                x1={x}
                y1={chartTop}
                x2={x}
                y2={chartTop + plotHeight}
                stroke="#D9DEE8"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            );
          })}

          <line
            x1={chartLeft}
            y1={chartTop + plotHeight}
            x2={width - chartRight}
            y2={chartTop + plotHeight}
            stroke="#98A2B3"
            strokeWidth="1.5"
          />

          <line
            x1={chartLeft}
            y1={chartTop}
            x2={chartLeft}
            y2={chartTop + plotHeight}
            stroke="#98A2B3"
            strokeWidth="1.5"
          />

          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <text
                key={`label-y-${tick}`}
                x={chartLeft - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="13"
                fill="#6B7280"
              >
                {tick}
              </text>
            );
          })}

          {labels.map((label, index) => {
            const x = getX(index);
            return (
              <text
                key={`label-x-${label}`}
                x={x}
                y={height - 12}
                textAnchor="middle"
                fontSize="13"
                fill="#6B7280"
              >
                {label}
              </text>
            );
          })}

          <path
            d={offsetPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {offsetData.map((value, index) => {
            const x = getX(index);
            const y = getY(value);
            return (
              <circle
                key={`dot-${index}`}
                cx={x}
                cy={y}
                r="4.5"
                fill="#10B981"
              />
            );
          })}
        </svg>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[12px]">
          <div className="flex items-center gap-2 text-[#E11D48]">
            <span className="inline-block h-[2px] w-3 rounded-full bg-[#E11D48]" />
            <span>Emissions (kg)</span>
          </div>

          <div className="flex items-center gap-2 text-[#10B981]">
            <span className="inline-block h-[2px] w-3 rounded-full bg-[#10B981]" />
            <span>Offset (kg)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactBarChart() {
  const max = 16;
  const ticks = [16, 12, 8, 4, 0];

  return (
    <div className="overflow-x-auto rounded-[12px] bg-[#F5F7FB] px-2 py-3 scrollbar-hide sm:px-4 sm:py-4">
      <div className="grid min-w-[480px] grid-cols-[28px_1fr] gap-2 sm:min-w-0 sm:grid-cols-[32px_1fr] sm:gap-3">
        <div className="flex h-[210px] flex-col justify-between text-[11px] text-[#6B7280]">
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <div className="flex h-[210px] items-end gap-4 border-b border-l border-[#9CA3AF] pl-3 pr-2">
          {barData.map((item) => (
            <div
              key={item.area}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className="w-full max-w-[92px] rounded-t-[8px] bg-[#FFD700]"
                style={{ height: `${(item.value / max) * 168}px` }}
              />

              <span className="whitespace-nowrap text-[11px] text-[#6B7280]">
                {item.area}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportCard({ title, description }: ReportCardProps) {
  return (
    <div className="flex w-full items-start rounded-[12px] border border-[#E5E7EB] bg-[#FFFDF7] px-4 py-4">
      <div className="flex min-w-0 items-start gap-3">
        <FileText size={18} className="mt-0.5 shrink-0 text-[#001F3F]" />

        <div className="min-w-0">
          <h4 className="text-[14px] font-semibold leading-[1.35] text-[#111827]">
            {title}
          </h4>

          <p className="mt-2 text-[13px] leading-[1.45] text-[#5F6C80]">
            {description}
          </p>

          <button
            type="button"
            className="mt-3 text-[13px] font-medium text-[#001F3F]"
          >
            Read Report →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClimateInsightsData() {
  return (
    <section className="w-full overflow-hidden rounded-[18px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 md:px-6 md:py-6">
      <h2 className="text-[21px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#001F3F] sm:text-[24px]">
        Climate Insights & Data
      </h2>

      <p className="mt-3 text-[13px] leading-[1.5] text-[#6B7280] sm:text-[14px]">
        Real time climate data and research for Greater Manchester
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {insightCards.map((card) => (
          <InsightCard key={card.label} {...card} />
        ))}
      </div>

      <div className="mt-7">
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#001F3F] sm:text-[20px]">
          CO₂ Emissions vs Offset Trends
        </h3>

        <div className="mt-4">
          <EmissionsOffsetChart />
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#001F3F] sm:text-[20px]">
          Greater Manchester Impact by Area
        </h3>

        <div className="mt-4">
          <ImpactBarChart />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {reports.map((report) => (
          <ReportCard key={report.title} {...report} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="flex h-[44px] w-full max-w-[220px] items-center justify-center rounded-[12px] bg-[#DF223C] px-6 text-[15px] font-medium text-white transition hover:opacity-95 sm:h-[46px] sm:w-auto sm:px-8 sm:text-[16px]"
        >
          Explore Data
        </button>
      </div>
    </section>
  );
}