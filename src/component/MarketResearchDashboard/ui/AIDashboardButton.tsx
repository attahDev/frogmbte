import type { LucideIcon } from 'lucide-react';
import React from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'text' | 'ghost';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-[#D7263D] text-white hover:bg-[#c41f34] shadow-sm',
  secondary: 'bg-[#0B3158] text-white hover:bg-[#0a2747] border border-white/10',
  outline: 'border border-white/15 bg-white/5 text-white hover:bg-white/10',
  text: 'border border-white/15 bg-white/5 text-[#D7263D] hover:bg-white/10',
  ghost: 'bg-transparent text-white hover:bg-white/5',
};

export default function AIDashboardButton({
  variant = 'primary',
  icon: Icon,
  iconPosition = 'right',
  fullWidth,
  className = '',
  children,
  ...props
}: Props) {
  return (
   <button className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
  {Icon && iconPosition === 'left' && (
    <span className="flex items-center">
      <Icon className="h-4 w-4 shrink-0" />
    </span>
  )}

  <span className="flex items-center leading-none">
    {children}
  </span>

  {Icon && iconPosition === 'right' && (
    <span className="flex items-center">
      <Icon className="h-4 w-4 shrink-0" />
    </span>
  )}
</button>
  );
}