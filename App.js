import React, { useMemo, useState } from "react";

const starterIdeas = [
  {
    title: "Find buyer-intent affiliate topics",
    type: "Affiliate SEO",
    risk: "Low",
    next: "Research topics like 'best cheap tools', 'coupon codes', and 'product comparisons'.",
    score: 78
  },
  {
    title: "Create a simple printable product",
    type: "Digital Product",
    risk: "Low",
    next: "Research printable planners, savings trackers, and budget templates.",
    score: 65
  },
  {
    title: "Build a coupon/deal page",
    type: "Affiliate Deals",
    risk: "Low",
    next: "Organize affiliate offers by best discount and demand.",
    score: 72
  }
];

const rules = [
  "Spend $0 unless I approve it.",
  "Never publish scams or misleading content.",
  "Create drafts first, then approve.",
  "Focus on clicks, traffic, and commissions.",
  "Drop ideas with no results after 30 days.",
  "Reinvest profits only after tracking results."
];

function scoreExperiment(exp) {
  const traffic = Number(exp.traffic || 0);
  const clicks = Number(exp.clicks || 0);
  const earnings = Number(exp.earnings || 0);
  const cost = Number(exp.cost || 0);

  return Math.max(
    0,
    Math.round(
      Math.min(clicks * 4, 40) +
      Math.min(traffic / 10, 25) +
      Math.min(earnings * 8, 40) -
      Math.min(cost * 2, 20)
    )
  );
}

function getDecision(score) {
  if (score >= 70) return { label: "SCALE", color: "green" };
  if (score >= 35) return { label: "IMPROVE", color: "orange" };
  return { label: "DROP", color: "red" };
}

export default function App() {
  const [tab, setTab] = useState("today");
  const [ideas, setIdeas] = useState(starterIdeas);
  const [newIdea, setNewIdea] = useState("");
  const [notes, setNotes] = useState("");
  const [profit, setProfit] = useState(0);

  const [experiments, setExperiments] = useState([
    { title: "Test Post", method: "SEO", traffic: 0, clicks: 0, earnings: 0, cost: 0 }
  ]);

  const bestIdea = useMemo(() => [...ideas].sort((a, b) => b.score - a.score)[0], [ideas]);

  const addIdea = () => {
    if (!newIdea) return;
    setIdeas([{ title: newIdea, type: "New", risk: "Unknown", next: "Test it.", score: 50 }, ...ideas]);
    setNewIdea("");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Profit Pilot</h1>

      {/* Tabs */}
      <div style={{ marginBottom: 20 }}>
        {["today", "ideas", "tests", "rules"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ marginRight: 5 }}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TODAY */}
      {tab === "today" && (
        <>
          <h2>Bot Decision</h2>
          <p><b>{bestIdea.title}</b></p>
          <p>{bestIdea.next}</p>

          <button onClick={() => alert("Use this idea: " + bestIdea.title)}>
            Create Draft
          </button>

          <h3>Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: "100%", height: 100 }}
          />

          <h3>Profit</h3>
          <input
            type="number"
            value={profit}
            onChange={(e) => setProfit(e.target.value)}
          />
        </>
      )}

      {/* IDEAS */}
      {tab === "ideas" && (
        <>
          <h2>Add Idea</h2>
          <input
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
          />
          <button onClick={addIdea}>Add</button>

          {ideas.map((idea, i) => (
            <div key={i}>
              <h3>{idea.title}</h3>
              <p>{idea.next}</p>
            </div>
          ))}
        </>
      )}

      {/* TESTS */}
      {tab === "tests" && (
        <>
          {experiments.map((exp, i) => {
            const score = scoreExperiment(exp);
            const decision = getDecision(score);

            return (
              <div key={i}>
                <h3>{exp.title}</h3>
                <p>Score: {score}</p>
                <p style={{ color: decision.color }}>{decision.label}</p>
              </div>
            );
          })}
        </>
      )}

      {/* RULES */}
      {tab === "rules" && (
        <>
          <h2>Rules</h2>
          {rules.map((r, i) => (
            <p key={i}>- {r}</p>
          ))}
        </>
      )}
    </div>
  );
                       }
