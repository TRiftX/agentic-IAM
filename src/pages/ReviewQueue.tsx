import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import Panel from "../components/Panel";
import RiskBadge from "../components/RiskBadge";
import { seedActions } from "../data/mockData";
import { timeAgo, riskColor } from "../lib/utils";
import type { AgentAction } from "../types";

type LocalVerdict = AgentAction["verdict"];

export default function ReviewQueue() {
  const [actions, setActions] = useState<AgentAction[]>(
    seedActions.filter((a) => a.verdict === "pending_review" || a.verdict === "blocked")
  );
  const [expanded, setExpanded] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function resolve(id: string, verdict: LocalVerdict) {
    setActions((prev) => prev.filter((a) => a.id !== id));
    setToast(verdict === "approved" ? "Action approved and released to the gateway" : "Action denied, agent notified");
    window.setTimeout(() => setToast(null), 2600);
  }

  return (
    <div className="animate-rise space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          {actions.length} action{actions.length !== 1 ? "s" : ""} waiting on a decision
        </p>
      </div>

      {actions.length === 0 && (
        <Panel>
          <div className="py-10 text-center">
            <p className="text-sm font-medium text-text-primary">Queue is clear</p>
            <p className="mt-1 text-sm text-text-muted">Every flagged action has a reviewer decision recorded.</p>
          </div>
        </Panel>
      )}

      <div className="space-y-3">
        {actions.map((action) => {
          const isOpen = expanded === action.id;
          const color = riskColor[action.riskLevel];
          return (
            <div
              key={action.id}
              className="rounded-md border border-ink-border bg-ink-surface"
              style={{ borderLeft: `2px solid ${color}` }}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <button
                  onClick={() => setExpanded(isOpen ? null : action.id)}
                  className="flex flex-1 items-center gap-4 text-left"
                >
                  <RiskBadge level={action.riskLevel} score={action.riskScore} />
                  <div>
                    <p className="text-sm text-text-primary">
                      <span className="font-mono text-xs text-text-secondary">{action.agentName}</span>{" "}
                      requests <span className="font-medium">{action.actionType}</span> on{" "}
                      <span className="font-mono">{action.targetTable}</span>
                    </p>
                    <p className="mt-0.5 text-[11px] text-text-muted">
                      {timeAgo(action.timestamp)} · {action.tenant} · {action.blastRadiusRows.toLocaleString()} rows affected
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={15} className="ml-auto shrink-0 text-text-muted" />
                  ) : (
                    <ChevronDown size={15} className="ml-auto shrink-0 text-text-muted" />
                  )}
                </button>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => resolve(action.id, "denied")}
                    className="flex items-center gap-1.5 rounded-md border border-ink-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-risk-critical/50 hover:text-risk-critical"
                  >
                    <X size={13} /> Deny
                  </button>
                  <button
                    onClick={() => resolve(action.id, "approved")}
                    className="flex items-center gap-1.5 rounded-md bg-signal/10 px-3 py-1.5 text-xs font-medium text-signal transition-colors hover:bg-signal/20"
                  >
                    <Check size={13} /> Approve
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-ink-border px-5 py-4 text-sm">
                  <p className="text-text-secondary">{action.explanation}</p>
                  <div className="mt-3 grid grid-cols-4 gap-4 font-mono text-xs">
                    <div>
                      <p className="text-text-muted">agent id</p>
                      <p className="mt-0.5 text-text-primary">{action.agentId}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">intent aligned</p>
                      <p className="mt-0.5 text-text-primary">{action.intentAligned ? "yes" : "no"}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">target</p>
                      <p className="mt-0.5 text-text-primary">{action.targetTable}</p>
                    </div>
                    <div>
                      <p className="text-text-muted">action id</p>
                      <p className="mt-0.5 text-text-primary">{action.id}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-8 rounded-md border border-ink-border bg-ink-surface px-4 py-3 text-sm text-text-primary shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
