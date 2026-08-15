import Link from "next/link";
import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-surface rounded-(--radius-card) border border-line shadow-[0_1px_3px_rgba(0,0,0,0.05)] ${className}`}>
      {children}
    </div>
  );
}

export function Chip({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
}) {
  const tones: Record<string, string> = {
    muted: "bg-surface-muted text-ink-muted",
    primary: "bg-primary-soft text-primary-strong",
    secondary: "bg-secondary-soft text-warning",
    accent: "bg-accent-soft text-accent",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    danger: "bg-danger-soft text-danger",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-extrabold transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-12 px-5 text-base";

export const buttonStyles = {
  primary: `${buttonBase} bg-primary text-white hover:bg-primary-strong`,
  secondary: `${buttonBase} bg-secondary-soft text-warning hover:bg-secondary/30`,
  outline: `${buttonBase} border-2 border-line bg-surface text-ink hover:bg-surface-muted`,
  ghost: `${buttonBase} text-primary-strong hover:bg-primary-soft`,
  danger: `${buttonBase} bg-danger-soft text-danger hover:bg-danger/20`,
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonStyles;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function EmptyState({
  emoji = "🌱",
  title,
  description,
  action,
}: {
  emoji?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-14 px-6 text-center">
      <div className="text-5xl" aria-hidden>
        {emoji}
      </div>
      <h3 className="text-lg font-extrabold">{title}</h3>
      {description ? <p className="text-sm text-ink-muted max-w-sm">{description}</p> : null}
      {action}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-extrabold mt-6 mb-3">{children}</h2>;
}

export function ListBlock({ title, items, tone }: { title: string; items: string[]; tone?: "danger" | "primary" }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-4">
      <h4 className={`text-sm font-extrabold mb-1.5 ${tone === "danger" ? "text-danger" : "text-ink"}`}>{title}</h4>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed">
            <span className={tone === "danger" ? "text-danger" : "text-primary"} aria-hidden>
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
