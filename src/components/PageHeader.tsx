export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
}

export function Card({
  title,
  sub,
  children,
  className = "",
}: {
  title?: string;
  sub?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] ${className}`}
    >
      {title && <h3 className="font-display font-bold">{title}</h3>}
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      <div className={title ? "mt-4" : ""}>{children}</div>
    </div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-2xl font-display font-bold mt-1">{value}</p>
      {sub && <p className="text-[11px] text-accent mt-1">{sub}</p>}
    </div>
  );
}
