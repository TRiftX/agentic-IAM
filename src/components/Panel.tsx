import type { ReactNode } from "react";
import { cx } from "../lib/utils";

export default function Panel({
  title,
  subtitle,
  action,
  children,
  className,
  accent,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={cx("rounded-md border border-ink-border bg-ink-surface", className)}
      style={accent ? { borderLeft: `2px solid ${accent}` } : undefined}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-ink-border px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-text-secondary">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
