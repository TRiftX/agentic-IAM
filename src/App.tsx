import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Overview from "./pages/Overview";
import ReviewQueue from "./pages/ReviewQueue";
import Agents from "./pages/Agents";
import AuditLog from "./pages/AuditLog";
import Policies from "./pages/Policies";

const pageMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Overview", description: "Live risk posture across every agent and tenant" },
  "/review": { title: "Review queue", description: "Actions waiting on a human decision" },
  "/agents": { title: "Agents & trust", description: "Trust scores, drift signals, and scopes per agent" },
  "/audit": { title: "Audit ledger", description: "Tamper-evident record of every decision the gateway made" },
  "/policies": { title: "Policies & chaos", description: "Policy-as-code rules and adversarial replay probes" },
};

export default function App() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] ?? pageMeta["/"];

  return (
    <div className="flex h-screen overflow-hidden bg-ink-base">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title={meta.title} description={meta.description} />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/review" element={<ReviewQueue />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/audit" element={<AuditLog />} />
            <Route path="/policies" element={<Policies />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
