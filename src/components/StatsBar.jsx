import React from "react";
import pantryData from "../data/pantryData.json";

function getDaysUntilExpiry(expiryStr) {
  return Math.ceil((new Date(expiryStr) - new Date()) / (1000 * 60 * 60 * 24));
}

export default function StatsBar({ resultCount }) {
  const totalUnits   = pantryData.reduce((s, i) => s + i.qty, 0);
  const expiringSoon = pantryData.filter((i) => getDaysUntilExpiry(i.expiry) <= 7).length;
  const lowStock     = pantryData.filter((i) => i.qty < 10).length;

  const stats = [
    { label: "Expiring ≤ 7d",   value: expiringSoon, color: expiringSoon > 0 ? "#c62828" : "#2e7d32" },
    { label: "Low Stock Items", value: lowStock,     color: lowStock > 0     ? "#f57f17" : "#2e7d32" },
    { label: "Showing",         value: `${resultCount} items`,      color: "#6a7c5b" },
  ];

  return (
    <>
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <span className="stat-value" style={{ color: s.color }}>{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </>
  );
}
