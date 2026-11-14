import { useMemo } from "react";
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, ChevronDown } from "lucide-react";
import Panel from "../components/Panel";
import RiskBadge from "../components/RiskBadge";
import Gauge from "../components/Gauge";
import VolumeBarChart from "../components/VolumeBarChart";
import BreakdownChart from "../components/BreakdownChart";
import {
  commandCenterSummary,
  seedActions,
  seedAgents,
  actionVolumeByMonth,
  riskVsTrustTrend,
} from "../data/mockData";
import { timeAgo } from "../lib/utils";

export default function Overview() {
  const recentCritical = useMemo(
    () =>
      seedActions
        .filter((a) => a.riskLevel === "high" || a.riskLevel === "critical")
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 5),
    []
  );
  const driftingAgents = seedAgents.filter((a) => a.driftFlag);

  return (
    <div className="animate-rise space-y-6">
      <div>
        <p className="text-sm text-text-secondary">Command center</p>
        <h2 className="mt-1 text-4xl font-semibold text-text-primary">
          Welcome <span className="text-signal">Back</span>
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Here is what your agents have been doing across every tenant today.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-signal p-5 text-signal-ink">
          <div className="flex items-center justify-between">
            <ShieldAlert size={18} />
            <span className="rounded-full bg-signal-ink/10 px-2 py-0.5 text-[11px] font-semibold">+3.2%</span>
          </div>
          <p className="mt-5 text-sm font-medium">Active risk score</p>
          <p className="mt-1 font-mono text-3xl font-semibold">{commandCenterSummary.activeRiskScore}</p>
        </div>

        <div className="rounded-xl bg-signal p-5 text-signal-ink">
          <div className="flex items-center justify-between">
            <Clock size={18} />
            <span className="rounded-full bg-signal-ink/10 px-2 py-0.5 text-[11px] font-semibold">+25%</span>
          </div>
          <p className="mt-5 text-sm font-medium">Pending review</p>
          <p className="mt-1 font-mono text-3xl font-semibold">{commandCenterSummary.pendingReviews}</p>
        </div>

        <div className="rounded-xl border border-ink-border bg-ink-surface p-5">
          <div className="flex items-center justify-between">
            <AlertTriangle size={18} className="text-risk-high" />
            <span className="rounded-full bg-risk-high/10 px-2 py-0.5 text-[11px] font-semibold text-risk-high">
              +12%
            </span>
          </div>
          <p className="mt-5 text-sm font-medium text-text-secondary">Blocked today</p>
          <p className="mt-1 font-mono text-3xl font-semibold text-text-primary">
            {commandCenterSummary.blockedToday}
          </p>
        </div>

        <div className="rounded-xl border border-ink-border bg-ink-surface p-5">
          <div className="flex items-center justify-between">
            <CheckCircle2 size={18} className="text-signal" />
            <span className="rounded-full bg-signal/10 px-2 py-0.5 text-[11px] font-semibold text-signal">+15%</span>
          </div>
          <p className="mt-5 text-sm font-medium text-text-secondary">Auto-allowed today</p>
          <p className="mt-1 font-mono text-3xl font-semibold text-text-primary">
            {commandCenterSummary.autoApprovedToday}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Panel title="Gateway load">
          <Gauge value={commandCenterSummary.activeRiskScore} label="risk capacity used" delta="+65%" />
        </Panel>

        <Panel
          title="Action volume"
          action={
            <button className="flex items-center gap-1 rounded-md border border-ink-border px-2.5 py-1 text-xs text-text-secondary">
              Month <ChevronDown size={12} />
            </button>
          }
        >
          <VolumeBarChart data={actionVolumeByMonth} />
        </Panel>

        <Panel
          title="Breakdown"
          subtitle="Trust vs. risk"
          action={
            <button className="flex items-center gap-1 rounded-md border border-ink-border px-2.5 py-1 text-xs text-text-secondary">
              Week <ChevronDown size={12} />
            </button>
          }
        >
          <BreakdownChart data={riskVsTrustTrend} />
          <div className="mt-2 flex items-center gap-4 text-[11px] text-text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-text-primary" /> Trust
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Risk
            </span>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Panel
          title="Highest risk actions"
          subtitle="Needs attention, sorted by risk score"
          className="col-span-2"
        >
          <div className="divide-y divide-ink-border">
            {recentCritical.map((action) => (
              <div key={action.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <RiskBadge level={action.riskLevel} score={action.riskScore} />
                  <div>
                    <p className="text-sm text-text-primary">
                      <span className="font-mono text-xs text-text-secondary">{action.agentName}</span>{" "}
                      {action.actionType.toLowerCase()} on{" "}
                      <span className="font-mono">{action.targetTable}</span>
                    </p>
                    <p className="text-[11px] text-text-muted">{timeAgo(action.timestamp)} · {action.tenant}</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted">{action.blastRadiusRows.toLocaleString()} rows</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel title="Agent drift" subtitle={`${driftingAgents.length} flagged by shadow mode`}>
            <div className="space-y-2.5">
              {driftingAgents.length === 0 && (
                <p className="text-sm text-text-muted">No drift detected.</p>
              )}
              {driftingAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between rounded border border-ink-border px-3 py-2">
                  <p className="font-mono text-xs text-text-primary">{agent.name}</p>
                  <span className="rounded bg-risk-high/10 px-2 py-0.5 text-[11px] font-medium text-risk-high">
                    trust {agent.trustScore}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
