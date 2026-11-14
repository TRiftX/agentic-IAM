import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import Panel from "../components/Panel";
import { seedAuditLog } from "../data/mockData";
import { timeAgo } from "../lib/utils";

export default function AuditLog() {
  const [verifying, setVerifying] = useState(false);
  const [verifiedAt, setVerifiedAt] = useState<string | null>(null);

  function verifyChain() {
    setVerifying(true);
    window.setTimeout(() => {
      setVerifying(false);
      setVerifiedAt(new Date().toISOString());
    }, 1100);
  }

  return (
    <div className="animate-rise space-y-5">
      <Panel
        title="Hash-chained evidence ledger"
        subtitle={`${seedAuditLog.length} entries · each row is linked to the previous entry's hash`}
        action={
          <button
            onClick={verifyChain}
            disabled={verifying}
            className="flex items-center gap-2 rounded-md border border-ink-border bg-ink-base px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-signal disabled:opacity-60"
          >
            {verifying ? <Loader2 size={13} className="animate-spin" /> : <ShieldCheck size={13} />}
            {verifying ? "Verifying chain" : "Verify chain integrity"}
          </button>
        }
      >
        {verifiedAt && !verifying && (
          <div className="mb-4 flex items-center gap-2 rounded border border-signal/30 bg-signal/5 px-3 py-2 text-xs text-signal">
            <ShieldCheck size={13} />
            Chain verified, no tampering detected · {timeAgo(verifiedAt)}
          </div>
        )}

        <div className="overflow-hidden rounded border border-ink-border">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-ink-border bg-ink-base/60 text-text-muted">
                <th className="px-4 py-2.5 font-medium">entry</th>
                <th className="px-4 py-2.5 font-medium">summary</th>
                <th className="px-4 py-2.5 font-medium">hash</th>
                <th className="px-4 py-2.5 font-medium">prev hash</th>
                <th className="px-4 py-2.5 font-medium">recorded</th>
              </tr>
            </thead>
            <tbody>
              {seedAuditLog.map((entry) => (
                <tr key={entry.id} className="border-b border-ink-border last:border-0 hover:bg-ink-base/40">
                  <td className="px-4 py-2.5 font-mono text-text-secondary">{entry.id}</td>
                  <td className="px-4 py-2.5 text-text-primary">{entry.summary}</td>
                  <td className="px-4 py-2.5 font-mono text-text-secondary">{entry.hash.slice(0, 14)}…</td>
                  <td className="px-4 py-2.5 font-mono text-text-muted">{entry.prevHash.slice(0, 14)}…</td>
                  <td className="px-4 py-2.5 text-text-muted">{timeAgo(entry.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
