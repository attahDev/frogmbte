import React from 'react';

type Variant =
  | 'default'
  | 'soft'
  | 'panel'
  | 'smpanel'
  | 'stat'
  | 'project'
  | 'activity'
  | 'recommendation'
  | 'mentor'
  | 'empty'
  | 'action';

type Padding = 'none' | 'sm' | 'md' | 'lg';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: Variant;
  padding?: Padding;
  children: React.ReactNode;
};

const variantStyles: Record<Variant, string> = {
  default: 'border border-white/10 bg-[#FFF] shadow-sm',
  soft: 'border border-white/10 bg-white/5 shadow-sm',
  panel: 'border border-white/10 bg-[#001F3F]',
  smpanel: 'border border-white/10 bg-[#FFF]',
  stat: 'border border-white/10 bg-[#FFF] shadow-sm',
  project: 'border border-white/10 bg-[#FFF] shadow-sm',
  activity: ' border-[#1A202C]/10 rounded-none border-b-1',
  recommendation: 'border border-white/10 bg-[#07294A]',
  mentor: 'border border-white/10 bg-[#FFF] shadow-[0_10px_30px_rgba(0,0,0,0.08)]',
  empty: 'border border-dashed border-white/15 bg-white/5',
  action: 'border border-white/10 bg-[#FFF] shadow-sm',
};

const paddingStyles: Record<Padding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
};

export default function AIDashboardCard({
  id,
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: Props) {
  return (
    <div
      id={id}
      className={`rounded-3xl transition ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}