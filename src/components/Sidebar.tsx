import { NavLink } from "react-router-dom";
import { LayoutGrid, ShieldCheck, Users, ScrollText, Settings2, Radio } from "lucide-react";
import { cx } from "../lib/utils";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/review", label: "Review queue", icon: ShieldCheck },
  { to: "/agents", label: "Agents & trust", icon: Users },
  { to: "/audit", label: "Audit ledger", icon: ScrollText },
  { to: "/policies", label: "Policies & chaos", icon: Settings2 },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-ink-border bg-ink-surface">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="relative flex h-7 w-7 items-center justify-center rounded-md bg-signal/10">
          <Radio size={15} className="text-signal" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none text-text-primary">Agentic IAM</p>
          <p className="mt-1 text-[11px] leading-none text-text-muted">command center</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cx(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-signal/10 text-signal"
                  : "text-text-secondary hover:bg-ink-border/60 hover:text-text-primary"
              )
            }
          >
            <Icon size={16} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-ink-border px-5 py-4">
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulsering rounded-full bg-signal" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          Gateway healthy
        </div>
        <p className="mt-1 text-[11px] text-text-muted">tenant: acme-corp</p>
      </div>
    </aside>
  );
}
