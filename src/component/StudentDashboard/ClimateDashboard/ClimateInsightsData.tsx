import { useEffect, useState } from "react";
import { FileText, X } from "lucide-react";
import { fetchClimateInsights, type ClimateInsights } from "../../../lib/greenImpactApi";
import { onGreenImpactUpdate } from "../../../lib/greenImpactEvents";

type ReportCardProps = {
  title: string;
  description: React.ReactNode;
  link: string | null;
};

function InsightCard({
  value,
  label,
  status,
  statusColor,
}: {
  value: string;
  label: string;
  status: string;
  statusColor: string;
}) {
  return (
    <div className="rounded-[12px] border border-[#E5E7EB] bg-[#F5F7FB] px-4 py-4">
      <p className="text-[20px] font-semibold leading-none text-[#001F3F] sm:text-[22px]">
        {value}
      </p>
      <p className="mt-3 text-[13px] leading-[1.35] text-[#5F6C80] sm:text-[14px]">
        {label}
      </p>
      <p className={`mt-2 text-[13px] leading-none ${statusColor}`}>{status}</p>
    </div>
  );
}

function EmissionsOffsetChart({ trend }: { trend: ClimateInsights["trend"] }) {
  const width = 820;
  const height = 300;
  const chartLeft = 48;
  const chartRight = 22;
  const chartTop = 18;
  const chartBottom = 48;
  const plotWidth = width - chartLeft - chartRight;
  const plotHeight = height - chartTop - chartBottom;

  const emissionsVals = trend.map((t) => t.emissionsGCO2PerKWh ?? 0);
  const offsetVals = trend.map((t) => t.offsetKg);
  const maxY = Math.max(1, ...emissionsVals, ...offsetVals) * 1.1;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxY * f));

  const getX = (index: number) =>
    chartLeft + (index / Math.max(1, trend.length - 1)) * plotWidth;
  const getY = (value: number) => chartTop + plotHeight - (value / maxY) * plotHeight;

  const buildPath = (values: number[]) =>
    values
      .map((value, index) => `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(value)}`)
      .join(" ");

  return (
    <div className="overflow-x-auto rounded-[12px] bg-[#F5F7FB] px-2 py-3 scrollbar-hide sm:px-4 sm:py-4">
      <div className="min-w-[480px] sm:min-w-0">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="CO2 emissions vs offset trends">
          {yTicks.map((tick) => (
            <line key={`y-${tick}`} x1={chartLeft} y1={getY(tick)} x2={width - chartRight} y2={getY(tick)} stroke="#D9DEE8" strokeDasharray="4 4" strokeWidth="1" />
          ))}
          {trend.map((_, index) => (
            <line key={`x-${index}`} x1={getX(index)} y1={chartTop} x2={getX(index)} y2={chartTop + plotHeight} stroke="#D9DEE8" strokeDasharray="4 4" strokeWidth="1" />
          ))}
          <line x1={chartLeft} y1={chartTop + plotHeight} x2={width - chartRight} y2={chartTop + plotHeight} stroke="#98A2B3" strokeWidth="1.5" />
          <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartTop + plotHeight} stroke="#98A2B3" strokeWidth="1.5" />
          {yTicks.map((tick) => (
            <text key={`label-y-${tick}`} x={chartLeft - 10} y={getY(tick) + 4} textAnchor="end" fontSize="13" fill="#6B7280">{tick}</text>
          ))}
          {trend.map((t, index) => (
            <text key={`label-x-${t.month}`} x={getX(index)} y={height - 12} textAnchor="middle" fontSize="13" fill="#6B7280">{t.month}</text>
          ))}
          <path d={buildPath(emissionsVals)} fill="none" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d={buildPath(offsetVals)} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {trend.map((t, index) =>
            t.emissionsGCO2PerKWh === null ? null : (
              <circle key={`e-dot-${index}`} cx={getX(index)} cy={getY(t.emissionsGCO2PerKWh)} r="4.5" fill="#E11D48" />
            ),
          )}
          {offsetVals.map((value, index) => (
            <circle key={`o-dot-${index}`} cx={getX(index)} cy={getY(value)} r="4.5" fill="#10B981" />
          ))}
        </svg>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[12px]">
          <div className="flex items-center gap-2 text-[#E11D48]">
            <span className="inline-block h-[2px] w-3 rounded-full bg-[#E11D48]" />
            <span>Grid emissions (gCO₂/kWh, regional)</span>
          </div>
          <div className="flex items-center gap-2 text-[#10B981]">
            <span className="inline-block h-[2px] w-3 rounded-full bg-[#10B981]" />
            <span>Offset logged by users (kg)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactBarChart({ data }: { data: ClimateInsights["impactByArea"] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-[12px] bg-[#F5F7FB] px-4 py-8 text-center text-[13px] text-[#6B7280]">
        No area-tagged actions logged yet. Once members log actions with a borough selected, this chart fills in.
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.co2OffsetKg)) * 1.1;
  const ticks = [1, 0.75, 0.5, 0.25, 0].map((f) => Math.round(max * f));

  return (
    <div className="overflow-x-auto rounded-[12px] bg-[#F5F7FB] px-2 py-3 scrollbar-hide sm:px-4 sm:py-4">
      <div className="grid min-w-[480px] grid-cols-[28px_1fr] gap-2 sm:min-w-0 sm:grid-cols-[32px_1fr] sm:gap-3">
        <div className="flex h-[210px] flex-col justify-between text-[11px] text-[#6B7280]">
          {ticks.map((tick, i) => (
            <span key={`${tick}-${i}`}>{tick}</span>
          ))}
        </div>
        <div className="flex h-[210px] items-end gap-4 border-b border-l border-[#9CA3AF] pl-3 pr-2">
          {data.map((item) => (
            <div key={item.area} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full max-w-[92px] rounded-t-[8px] bg-[#FFD700]"
                style={{ height: `${(item.co2OffsetKg / max) * 168}px` }}
              />
              <span className="whitespace-nowrap text-[11px] text-[#6B7280]">{item.area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportCard({ title, description, link }: ReportCardProps) {
  return (
    <div className="flex w-full items-start rounded-[12px] border border-[#E5E7EB] bg-[#FFFDF7] px-4 py-4">
      <div className="flex min-w-0 items-start gap-3">
        <FileText size={18} className="mt-0.5 shrink-0 text-[#001F3F]" />
        <div className="min-w-0">
          <h4 className="text-[14px] font-semibold leading-[1.35] text-[#111827]">{title}</h4>
          <p className="mt-2 text-[13px] leading-[1.45] text-[#5F6C80]">{description}</p>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[13px] font-medium text-[#001F3F]"
            >
              Read Report →
            </a>
          ) : (
            <span className="mt-3 inline-block text-[13px] font-medium text-[#9CA3AF]">
              Report coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function buildInsightCards(data: ClimateInsights) {
  return [
    {
      value: data.avgTemperatureRiseC === null ? "—" : `${data.avgTemperatureRiseC > 0 ? "+" : ""}${data.avgTemperatureRiseC}°C`,
      label: "Avg. Temperature Rise (5yr vs 1991-2020 baseline)",
      status: data.avgTemperatureRiseC === null ? "Data unavailable" : "⚠️ Monitor",
      statusColor: data.avgTemperatureRiseC === null ? "text-[#9CA3AF]" : "text-[#F59E0B]",
    },
    {
      value: data.treesPlanted.toLocaleString(),
      label: "Trees Planted (est. from logged actions)",
      status: data.treesPlanted > 0 ? "↑ Improving" : "No data yet",
      statusColor: data.treesPlanted > 0 ? "text-[#22C55E]" : "text-[#9CA3AF]",
    },
    {
      value: data.renewableEnergyPct === null ? "—" : `${data.renewableEnergyPct}%`,
      label: "Renewable Energy % (regional grid mix)",
      status: data.renewableEnergyPct === null ? "Data unavailable" : "↑ Improving",
      statusColor: data.renewableEnergyPct === null ? "text-[#9CA3AF]" : "text-[#22C55E]",
    },
  ];
}

function ExploreDataModal({ data, onClose }: { data: ClimateInsights; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[18px] bg-[#FFFDF7] p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[20px] font-semibold text-[#001F3F] sm:text-[22px]">
              Climate Insights & Data
            </h2>
            <p className="mt-1 text-[13px] text-[#6B7280]">
              Live regional data for Greater Manchester · updated {new Date(data.updatedAt).toLocaleString()}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="shrink-0 rounded-full p-1 text-[#6B7280] hover:bg-[#F3F4F6]">
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {buildInsightCards(data).map((card) => (
            <InsightCard key={card.label} {...card} />
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-[16px] font-semibold text-[#001F3F]">Month-by-month trend</h3>
          <div className="mt-3 space-y-2">
            {data.trend.map((t) => (
              <div key={t.month} className="flex items-center justify-between rounded-[10px] bg-[#F5F7FB] px-3 py-2 text-[13px]">
                <span className="font-medium text-[#001F3F]">{t.month}</span>
                <span className="text-[#E11D48]">
                  {t.emissionsGCO2PerKWh === null ? "emissions: n/a" : `${t.emissionsGCO2PerKWh} gCO₂/kWh`}
                </span>
                <span className="text-[#10B981]">{t.offsetKg}kg offset</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-[16px] font-semibold text-[#001F3F]">Impact by borough</h3>
          <div className="mt-3">
            <ImpactBarChart data={data.impactByArea} />
          </div>
        </div>

        <p className="mt-6 text-[12px] text-[#9CA3AF]">
          Temperature and renewable-mix figures via Open-Meteo and the UK Carbon Intensity API.
          Trees planted, borough breakdown, and offset totals reflect actions logged on this platform.
        </p>
      </div>
    </div>
  );
}

export default function ClimateInsightsData() {
  const [data, setData] = useState<ClimateInsights | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetchClimateInsights()
        .then((d) => {
          if (!cancelled) setData(d);
        })
        .catch(() => {
          if (!cancelled) setData(null);
        });
    };
    load();
    const unsubscribe = onGreenImpactUpdate(load);
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return (
    <section className="w-full overflow-hidden rounded-[18px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 md:px-6 md:py-6">
      <h2 className="text-[21px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#001F3F] sm:text-[24px]">
        Climate Insights & Data
      </h2>

      <p className="mt-3 text-[13px] leading-[1.5] text-[#6B7280] sm:text-[14px]">
        Real time climate data and research for Greater Manchester
      </p>

      {data === null ? (
        <p className="mt-6 text-[13px] text-[#8B93A1]">Loading live climate data…</p>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {buildInsightCards(data).map((card) => (
              <InsightCard key={card.label} {...card} />
            ))}
          </div>

          <div className="mt-7">
            <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#001F3F] sm:text-[20px]">
              CO₂ Emissions vs Offset Trends
            </h3>
            <div className="mt-4">
              <EmissionsOffsetChart trend={data.trend} />
            </div>
          </div>

          <div className="mt-7">
            <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#001F3F] sm:text-[20px]">
              Greater Manchester Impact by Area
            </h3>
            <div className="mt-4">
              <ImpactBarChart data={data.impactByArea} />
            </div>
          </div>
        </>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
        {data?.reports.length ? (
          data.reports.map((report) => (
            <ReportCard
              key={report.id}
              title={report.title}
              description={report.description ?? ""}
              link={report.link}
            />
          ))
        ) : (
          <p className="text-[13px] text-[#9CA3AF]">No reports published yet.</p>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          disabled={!data}
          onClick={() => setShowModal(true)}
          className="flex h-[44px] w-full max-w-[220px] items-center justify-center rounded-[12px] bg-[#DF223C] px-6 text-[15px] font-medium text-white transition hover:opacity-95 disabled:opacity-50 sm:h-[46px] sm:w-auto sm:px-8 sm:text-[16px]"
        >
          Explore Data
        </button>
      </div>

      {showModal && data && <ExploreDataModal data={data} onClose={() => setShowModal(false)} />}
    </section>
  );
}
