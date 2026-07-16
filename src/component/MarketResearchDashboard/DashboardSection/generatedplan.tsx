/* eslint-disable @typescript-eslint/no-explicit-any */
export function GeneratedPlanResult({ plan }: { plan: any }) {
  const summary = plan?.summary_card;
  const market = plan?.market_insights;
  const feasibility = plan?.feasibility_card;
  const revenue = plan?.revenue_chart;
  const scores = plan?.score_breakdown;
  const nextSteps = plan?.next_steps || [];

  return (
    <section className="mt-8 space-y-5 rounded-[28px] border border-white/10 bg-white/[0.07] p-5 text-white shadow-2xl backdrop-blur-xl">
      <div>
        <span className="inline-flex rounded-full bg-[#FFD23F]/15 px-4 py-2 text-xs font-semibold text-[#FFD23F]">
          ✨ AI Generated Business Plan
        </span>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          {summary?.title || "Business Plan Result"}
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
          {summary?.description ||
            "Your AI-powered business analysis is ready."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <ResultStat
          label="Confidence"
          value={`${summary?.confidence_score || 0}%`}
          hint="Overall strength"
        />
        <ResultStat
          label="Market Demand"
          value={market?.demand?.label || "N/A"}
          hint={`${market?.demand?.score || 0}/10 score`}
        />
        <ResultStat
          label="Difficulty"
          value={feasibility?.difficulty || "N/A"}
          hint="Execution level"
        />
        <ResultStat
          label="Scalability"
          value={revenue?.scalability || "N/A"}
          hint={revenue?.model || "Revenue model"}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ResultPanel title="Market Insights">
          <InfoRow
            label="Demand"
            value={`${market?.demand?.label || "N/A"} ${
              market?.demand?.score ? `(${market.demand.score}/10)` : ""
            }`}
          />
          <InfoRow
            label="Competition"
            value={`${market?.competition?.label || "N/A"} ${
              market?.competition?.score
                ? `(${market.competition.score}/10)`
                : ""
            }`}
          />

          {market?.opportunity && (
            <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/75">
              <span className="font-semibold text-[#FFD23F]">
                Opportunity:
              </span>{" "}
              {market.opportunity}
            </div>
          )}
        </ResultPanel>

        <ResultPanel title="Feasibility Analysis">
          <InfoRow
            label="Fit Score"
            value={`${feasibility?.fit_score || 0}%`}
          />
          <InfoRow
            label="Difficulty"
            value={feasibility?.difficulty || "N/A"}
          />

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-emerald-300">
              Strengths
            </p>
            <ul className="space-y-2 text-sm leading-6 text-white/75">
              {(feasibility?.strengths || []).map(
                (item: string, index: number) => (
                  <li key={index}>✓ {item}</li>
                )
              )}
            </ul>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-red-300">Risks</p>
            <ul className="space-y-2 text-sm leading-6 text-white/75">
              {(feasibility?.risks || []).map(
                (item: string, index: number) => (
                  <li key={index}>• {item}</li>
                )
              )}
            </ul>
          </div>
        </ResultPanel>

        <ResultPanel title="Revenue Projection">
          <InfoRow label="Model" value={revenue?.model || "N/A"} />
          <InfoRow label="Scalability" value={revenue?.scalability || "N/A"} />

          <div className="mt-5 space-y-4">
            {(revenue?.projection || []).map((item: any, index: number) => {
              const amount = Number(item?.revenue || 0);
              const maxRevenue = Math.max(
                ...(revenue?.projection || []).map((p: any) =>
                  Number(p?.revenue || 0)
                ),
                1
              );

              return (
                <div key={index}>
                  <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                    <span>{item?.month}</span>
                    <span className="font-semibold text-white">
                      {formatMoney(amount)}
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#FFD23F]"
                      style={{
                        width: `${Math.min(100, (amount / maxRevenue) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ResultPanel>
      </div>

      {scores && (
        <ResultPanel title="Score Breakdown">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ScoreCard label="Market" value={scores.market} />
            <ScoreCard label="Profit" value={scores.profit} />
            <ScoreCard label="Execution" value={scores.execution} />
            <ScoreCard label="Scalability" value={scores.scalability} />
          </div>
        </ResultPanel>
      )}

      {nextSteps.length > 0 && (
        <ResultPanel title="Recommended Next Steps">
          <div className="grid gap-3 md:grid-cols-3">
            {nextSteps.map((step: string, index: number) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/10 p-4"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD23F] text-sm font-bold text-[#07294A]">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-white/80">{step}</p>
              </div>
            ))}
          </div>
        </ResultPanel>
      )}
    </section>
  );
}

function ResultPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ResultStat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p className="mt-2 text-xl font-bold text-[#FFD23F]">{value}</p>
      <p className="mt-1 text-xs text-white/55">{hint}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4 text-sm">
      <span className="text-white/60">{label}</span>
      <span className="text-right font-semibold text-white">{value}</span>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  const score = Number(value || 0);

  return (
    <div className="rounded-2xl bg-white/10 p-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#FFD23F] text-xl font-bold text-white">
        {score}
      </div>
      <p className="mt-3 text-sm font-semibold text-white">{label}</p>
      <p className="mt-1 text-xs text-white/50">out of 10</p>
    </div>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}