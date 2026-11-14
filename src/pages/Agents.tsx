import { seedAgents } from "../data/mockData";
import Panel from "../components/Panel";
import Sparkline from "../components/Sparkline";
import { timeAgo } from "../lib/utils";

function trustColor(score: number) {
  if (score >= 75) return "#5FD89A";
  if (score >= 50) return "#F3B643";
  return "#FF7A5C";
}

export default function Agents() {
  return (
    <div className="animate-rise space-y-5">
      <div className="grid grid-cols-2 gap-5">
        {seedAgents.map((agent) => {
          const color = trustColor(agent.trustScore);
          return (
            <Panel key={agent.id} accent={color}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-sm text-text-primary">{agent.name}</p>
                  <p className="mt-0.5 text-[11px] text-text-muted">{agent.id} · {agent.tenant}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xl font-semibold" style={{ color }}>
                    {agent.trustScore}
                  </p>
                  <p className="text-[11px] text-text-muted">trust score</p>
                </div>
              </div>

              <div className="mt-4">
                <Sparkline data={agent.trustTrend} color={color} />
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-ink-border pt-4 text-xs">
                <div>
                  <p className="text-text-muted">total actions</p>
                  <p className="mt-0.5 font-mono text-text-primary">{agent.totalActions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-text-muted">blocked</p>
                  <p className="mt-0.5 font-mono text-text-primary">{agent.blockedActions}</p>
                </div>
                <div>
                  <p className="text-text-muted">last seen</p>
                  <p className="mt-0.5 font-mono text-text-primary">{timeAgo(agent.lastSeen)}</p>
                </div>
                {agent.driftFlag && (
                  <span className="rounded bg-risk-high/10 px-2 py-1 text-[11px] font-medium text-risk-high">
                    drift flagged
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {agent.scopes.map((scope) => (
                  <span
                    key={scope}
                    className="rounded border border-ink-border px-2 py-0.5 font-mono text-[11px] text-text-secondary"
                  >
                    {scope}
                  </span>
                ))}
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
