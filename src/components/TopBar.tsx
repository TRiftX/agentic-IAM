import { Search, Bell } from "lucide-react";

export default function TopBar({ title, description }: { title: string; description?: string }) {
  return (
    <header className="flex items-center justify-between border-b border-ink-border bg-ink-base/80 px-8 py-5 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-text-secondary">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-md border border-ink-border bg-ink-surface px-3 py-1.5">
          <Search size={14} className="text-text-muted" />
          <input
            placeholder="Search agents, actions, hashes"
            className="w-56 bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </div>
        <button className="relative flex h-8 w-8 items-center justify-center rounded-md border border-ink-border bg-ink-surface text-text-secondary hover:text-text-primary">
          <Bell size={15} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-risk-high" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-signal/40 to-signal/10 border border-ink-border" />
      </div>
    </header>
  );
}
