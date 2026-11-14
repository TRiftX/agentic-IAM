import type { AgentAction, AgentProfile, AuditEntry, CommandCenterSummary } from "../types";

const agents = [
  { id: "agent-42", name: "billing-reconciler", tenant: "acme-corp" },
  { id: "agent-07", name: "support-triage-bot", tenant: "acme-corp" },
  { id: "agent-19", name: "data-migration-agent", tenant: "northwind" },
  { id: "agent-23", name: "inventory-sync", tenant: "globex" },
  { id: "agent-31", name: "email-outreach-agent", tenant: "acme-corp" },
];

const tables = ["customers", "payments", "inventory", "audit_events", "user_sessions", "invoices"];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function riskLevelFromScore(score: number): AgentAction["riskLevel"] {
  if (score >= 85) return "critical";
  if (score >= 60) return "high";
  if (score >= 30) return "medium";
  return "low";
}

export function generateAction(idSeed: number): AgentAction {
  const agent = pick(agents);
  const actionType = pick(["DELETE", "UPDATE", "INSERT", "EMAIL", "EXPORT", "SCHEMA_CHANGE"] as const);
  const riskScore = Math.floor(Math.random() * 100);
  const riskLevel = riskLevelFromScore(riskScore);
  const blastRadiusRows =
    actionType === "DELETE" || actionType === "UPDATE"
      ? Math.floor(Math.random() * 5000)
      : Math.floor(Math.random() * 20);

  const verdict: AgentAction["verdict"] =
    riskLevel === "critical" ? "blocked" : riskLevel === "high" ? "pending_review" : "auto_allowed";

  const table = pick(tables);

  return {
    id: `act-${idSeed}`,
    agentId: agent.id,
    agentName: agent.name,
    tenant: agent.tenant,
    actionType,
    targetTable: table,
    riskScore,
    riskLevel,
    blastRadiusRows,
    intentAligned: Math.random() > 0.15,
    verdict,
    timestamp: new Date(Date.now() - idSeed * 1000 * 60 * 3).toISOString(),
    explanation:
      riskLevel === "critical"
        ? `Blast radius ${blastRadiusRows.toLocaleString()} rows is far above this agent's 30-day baseline. Blocked pending manual review.`
        : riskLevel === "high"
        ? `Row count exceeds the sensitive-table threshold for ${table}. Routed to human approval.`
        : "Within normal bounds for this agent and table. Auto-allowed.",
  };
}

export const seedActions: AgentAction[] = Array.from({ length: 24 }, (_, i) => generateAction(i + 1));

export const seedAgents: AgentProfile[] = agents.map((a, i) => {
  const base = 60 + Math.floor(Math.random() * 35);
  return {
    id: a.id,
    name: a.name,
    tenant: a.tenant,
    trustScore: base,
    trustTrend: Array.from({ length: 14 }, (_, j) =>
      Math.max(20, base - 20 + Math.floor(Math.sin(j / 2 + i) * 15) + j)
    ),
    totalActions: 400 + Math.floor(Math.random() * 3000),
    blockedActions: Math.floor(Math.random() * 12),
    lastSeen: new Date(Date.now() - Math.random() * 1000 * 60 * 40).toISOString(),
    driftFlag: Math.random() > 0.7,
    scopes: ["read:customers", "write:invoices", "send:email"].slice(0, 1 + Math.floor(Math.random() * 3)),
  };
});

function fakeHash(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i);
  return Math.abs(h).toString(16).padStart(8, "0") + Math.abs(h * 31).toString(16).padStart(8, "0");
}

export const seedAuditLog: AuditEntry[] = seedActions.map((action, i) => {
  const hash = fakeHash(action.id + action.timestamp + i);
  const prevHash = i === 0 ? "genesis0000000000" : fakeHash(seedActions[i - 1].id);
  return {
    id: `ledger-${i + 1}`,
    actionId: action.id,
    timestamp: action.timestamp,
    summary: `${action.agentName} -> ${action.actionType} on ${action.targetTable} (${action.verdict.replace("_", " ")})`,
    hash,
    prevHash,
    verified: true,
  };
});

export const actionVolumeByMonth = [
  { label: "Jun", value: 1240 },
  { label: "Jul", value: 980 },
  { label: "Aug", value: 1640 },
  { label: "Sep", value: 1410 },
  { label: "Oct", value: 2380 },
  { label: "Nov", value: 1890 },
  { label: "Dec", value: 1120 },
];

export const riskVsTrustTrend = Array.from({ length: 14 }, (_, i) => ({
  i,
  trust: 60 + Math.round(Math.sin(i / 2) * 14 + i * 0.6),
  risk: 35 + Math.round(Math.cos(i / 2.3) * 18 + (i > 8 ? (i - 8) * 2 : 0)),
}));

export const commandCenterSummary: CommandCenterSummary = {
  activeRiskScore: 42,
  gatewayStatus: "healthy",
  pendingReviews: seedActions.filter((a) => a.verdict === "pending_review").length,
  blockedToday: seedActions.filter((a) => a.verdict === "blocked").length,
  autoApprovedToday: seedActions.filter((a) => a.verdict === "auto_allowed").length,
  criticalAgents: seedAgents.filter((a) => a.driftFlag).length,
  environments: [
    { name: "production", actions: 1240, risk: 38 },
    { name: "staging", actions: 560, risk: 22 },
    { name: "sandbox", actions: 310, risk: 61 },
  ],
};
