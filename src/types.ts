export type RiskLevel = "low" | "medium" | "high" | "critical";

export type ActionType = "DELETE" | "UPDATE" | "INSERT" | "EMAIL" | "EXPORT" | "SCHEMA_CHANGE";

export type Verdict = "auto_allowed" | "pending_review" | "approved" | "denied" | "blocked";

export interface AgentAction {
  id: string;
  agentId: string;
  agentName: string;
  tenant: string;
  actionType: ActionType;
  targetTable: string;
  riskScore: number;
  riskLevel: RiskLevel;
  blastRadiusRows: number;
  intentAligned: boolean;
  verdict: Verdict;
  reviewer?: string;
  timestamp: string;
  explanation: string;
}

export interface AgentProfile {
  id: string;
  name: string;
  tenant: string;
  trustScore: number;
  trustTrend: number[];
  totalActions: number;
  blockedActions: number;
  lastSeen: string;
  driftFlag: boolean;
  scopes: string[];
}

export interface AuditEntry {
  id: string;
  actionId: string;
  timestamp: string;
  summary: string;
  hash: string;
  prevHash: string;
  verified: boolean;
}

export interface CommandCenterSummary {
  activeRiskScore: number;
  gatewayStatus: "healthy" | "degraded" | "down";
  pendingReviews: number;
  blockedToday: number;
  autoApprovedToday: number;
  criticalAgents: number;
  environments: { name: string; actions: number; risk: number }[];
}
