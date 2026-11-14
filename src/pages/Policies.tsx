import { useState } from "react";
import { Flame, FileCode2, Fingerprint, PlayCircle } from "lucide-react";
import Panel from "../components/Panel";

const policyRules = [
  { id: "r1", rule: "block when action = DELETE and rows > 500", status: "active" },
  { id: "r2", rule: "review when table in [payments, customers] and risk >= 60", status: "active" },
  { id: "r3", rule: "block when intent_alignment = false", status: "active" },
  { id: "r4", rule: "allow when agent_trust >= 80 and rows < 50", status: "draft" },
];

const scenarios = [
  { id: "s1", name: "bulk delete on payments", severity: "critical" },
  { id: "s2", name: "prompt injection in tool call", severity: "high" },
  { id: "s3", name: "token budget exhaustion", severity: "medium" },
];

export default function Policies() {
  const [chaosArmed, setChaosArmed] = useState(false);
  const [running, setRunning] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, "blocked" | "allowed">>({});

  function runScenario(id: string) {
    setRunning(id);
    window.setTimeout(() => {
      setResults((prev) => ({ ...prev, [id]: Math.random() > 0.2 ? "blocked" : "allowed" }));
      setRunning(null);
    }, 1200);
  }

  return (
    <div className="animate-rise grid grid-cols-2 gap-5">
      <Panel
        title="Policy bundle"
        subtitle="opa/agentic_iam.rego, signed and version-pinned"
        action={
          <span className="flex items-center gap-1.5 rounded border border-ink-border px-2 py-1 text-[11px] text-text-secondary">
            <Fingerprint size={12} /> bundle v14, signature valid
          </span>
        }
      >
        <div className="space-y-2">
          {policyRules.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded border border-ink-border px-3 py-2">
              <div className="flex items-center gap-2">
                <FileCode2 size={13} className="text-text-muted" />
                <code className="font-mono text-xs text-text-primary">{r.rule}</code>
              </div>
              <span
                className={
                  "rounded px-2 py-0.5 text-[11px] font-medium " +
                  (r.status === "active" ? "bg-signal/10 text-signal" : "bg-risk-medium/10 text-risk-medium")
                }
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        title="Chaos mode"
        subtitle="Replay adversarial scenarios against the live rule set"
        action={
          <button
            onClick={() => setChaosArmed((v) => !v)}
            className={
              "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors " +
              (chaosArmed
                ? "border-risk-high/50 bg-risk-high/10 text-risk-high"
                : "border-ink-border text-text-secondary hover:text-text-primary")
            }
          >
            <Flame size={13} />
            {chaosArmed ? "Armed" : "Disarmed"}
          </button>
        }
      >
        <div className="space-y-2">
          {scenarios.map((s) => {
            const result = results[s.id];
            return (
              <div key={s.id} className="flex items-center justify-between rounded border border-ink-border px-3 py-2">
                <div>
                  <p className="text-sm text-text-primary">{s.name}</p>
                  <p className="text-[11px] text-text-muted">severity: {s.severity}</p>
                </div>
                <div className="flex items-center gap-2">
                  {result && (
                    <span
                      className={
                        "rounded px-2 py-0.5 text-[11px] font-medium " +
                        (result === "blocked" ? "bg-signal/10 text-signal" : "bg-risk-critical/10 text-risk-critical")
                      }
                    >
                      {result}
                    </span>
                  )}
                  <button
                    onClick={() => runScenario(s.id)}
                    disabled={!chaosArmed || running === s.id}
                    className="flex items-center gap-1.5 rounded-md border border-ink-border px-2.5 py-1 text-[11px] text-text-secondary transition-colors hover:text-signal disabled:opacity-40"
                  >
                    <PlayCircle size={13} />
                    {running === s.id ? "Running" : "Run probe"}
                  </button>
                </div>
              </div>
            );
          })}
          {!chaosArmed && (
            <p className="pt-1 text-[11px] text-text-muted">Arm chaos mode to run probes against sandbox.</p>
          )}
        </div>
      </Panel>
    </div>
  );
}
