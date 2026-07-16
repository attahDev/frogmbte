import { ChevronDown } from 'lucide-react';

type Props = {
  label: string;
  placeholder: string;
  type?: 'input' | 'select' | 'textarea';
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function InputField({
  label,
  placeholder,
  type = 'input',
  options = [],
  value,
  onChange,
}: Props) {
  const base =
    'mt-2 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 transition focus:border-[#FFD23F]/60 focus:ring-2 focus:ring-[#FFD23F]/15';

  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {label}
      </span>
      {type === 'select' ? (
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`${base} appearance-none pr-10`}
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt} value={opt} className="text-black">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
        </div>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={base}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
        </label>
  )
}