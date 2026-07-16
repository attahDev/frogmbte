import React, { useMemo, useState } from "react";
import { Calculator, Leaf } from "lucide-react";

type FormValues = {
  travelDistance: string;
  energyUsage: string;
  eventsHosted: string;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat().format(Number(value.toFixed(2)));
}

export default function MeasureYourImpact() {
  const [values, setValues] = useState<FormValues>({
    travelDistance: "",
    energyUsage: "",
    eventsHosted: "",
  });

  const [hasCalculated, setHasCalculated] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  const result = useMemo(() => {
    const travel = Number(values.travelDistance) || 0;
    const energy = Number(values.energyUsage) || 0;
    const events = Number(values.eventsHosted) || 0;

    const travelImpact = travel * 0.21;
    const energyImpact = energy * 0.43;
    const eventsImpact = events * 25;
    const total = travelImpact + energyImpact + eventsImpact;

    return {
      travelImpact,
      energyImpact,
      eventsImpact,
      total,
    };
  }, [values]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHasCalculated(true);
  }

  return (
    <section className="w-full rounded-[18px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 lg:rounded-[20px] lg:px-10 lg:pb-[38px] lg:pt-[34px]">
      <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[#001F3F] sm:text-[25px]">
        Measure Your Impact
      </h2>

      <p className="mt-3 max-w-2xl text-[14px] leading-[1.45] text-[#6B7280] sm:mt-4 sm:text-[17px]">
        Calculate your carbon footprint and discover offset options
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 sm:mt-8 sm:space-y-6 lg:mt-[34px]">
        {[
          {
            id: "travelDistance",
            label: "Travel Distance (km/month)",
            placeholder: "e.g., 500",
            value: values.travelDistance,
          },
          {
            id: "energyUsage",
            label: "Energy Usage (kWh/month)",
            placeholder: "e.g., 300",
            value: values.energyUsage,
          },
          {
            id: "eventsHosted",
            label: "Events Hosted (count/month)",
            placeholder: "e.g., 5",
            value: values.eventsHosted,
          },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="mb-2.5 block text-[15px] font-medium leading-[1.3] text-[#001F3F] sm:mb-3 sm:text-[18px]"
            >
              {field.label}
            </label>

            <input
              id={field.id}
              name={field.id}
              type="text"
              inputMode="decimal"
              value={field.value}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="h-[54px] w-full rounded-[14px] border border-[#CBD5E1] bg-[#FFFDF7] px-4 text-[15px] text-[#0B2B50] outline-none placeholder:text-[#8B8B8B] focus:border-[#0B2B50] sm:h-[66px] sm:rounded-[16px] sm:px-6 sm:text-[18px]"
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-2 flex h-[56px] w-full items-center justify-center gap-3 rounded-[14px] bg-[#001F3F] text-[15px] font-medium text-white transition hover:opacity-95 sm:h-[68px] sm:gap-4 sm:rounded-[18px] sm:text-[16px] lg:h-[80px]"
        >
          <Calculator size={24} strokeWidth={2.2} className="sm:h-7 sm:w-7" />
          Calculate Footprint
        </button>
      </form>

      {hasCalculated && (
        <div className="mt-6 rounded-[18px] border border-[#D7E3D0] bg-[#F6FBF3] p-4 sm:mt-8 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5]">
              <Leaf size={20} className="text-[#2E7D32]" />
            </div>

            <div className="min-w-0">
              <h3 className="text-[18px] font-semibold leading-tight text-[#0B2B50] sm:text-[22px]">
                Your Estimated Monthly Footprint
              </h3>

              <p className="mt-1 text-[13px] text-[#6B7280] sm:text-[15px]">
                Based on the values you entered
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[14px] bg-white p-4">
              <p className="text-[13px] text-[#6B7280] sm:text-[14px]">Travel Impact</p>
              <p className="mt-2 break-words text-[19px] font-semibold text-[#0B2B50] sm:text-[22px]">
                {formatNumber(result.travelImpact)} kg CO₂
              </p>
            </div>

            <div className="rounded-[14px] bg-white p-4">
              <p className="text-[13px] text-[#6B7280] sm:text-[14px]">Energy Impact</p>
              <p className="mt-2 break-words text-[19px] font-semibold text-[#0B2B50] sm:text-[22px]">
                {formatNumber(result.energyImpact)} kg CO₂
              </p>
            </div>

            <div className="rounded-[14px] bg-white p-4 sm:col-span-2 lg:col-span-1">
              <p className="text-[13px] text-[#6B7280] sm:text-[14px]">Events Impact</p>
              <p className="mt-2 break-words text-[19px] font-semibold text-[#0B2B50] sm:text-[22px]">
                {formatNumber(result.eventsImpact)} kg CO₂
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[16px] bg-[#0B2B50] px-4 py-4 sm:px-5">
            <p className="text-[13px] text-white/75 sm:text-[14px]">
              Total Estimated Footprint
            </p>

            <p className="mt-2 break-words text-[23px] font-semibold leading-tight text-white sm:text-[30px]">
              {formatNumber(result.total)} kg CO₂ / month
            </p>
          </div>
        </div>
      )}
    </section>
  );
}