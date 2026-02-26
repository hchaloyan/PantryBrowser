import React from "react";
import { CATEGORY_META } from "../data/categories.js";

function getDaysUntilExpiry(expiryStr) {
  return Math.ceil((new Date(expiryStr) - new Date()) / (1000 * 60 * 60 * 24));
}

function getStockClass(qty) {
  if (qty >= 10) return { cls: "stock-in",       label: "In Stock" };
  return { cls: "stock-low",      label: "Low Stock" };
}

function ExpiryBadge({ expiry }) {
  const days  = getDaysUntilExpiry(expiry);
  const cls   = days <= 3 ? "expiry-urgent" : days <= 7 ? "expiry-soon" : "expiry-ok";
  const label = days <= 0 ? "Expired" : days === 1 ? "1 day left" : `${days}d left`;
  return <span className={`expiry-badge ${cls}`}>{label}</span>;
}

export default function ItemCard({ item, index }) {
  const meta  = CATEGORY_META[item.category] ?? { icon: "📦", className: "cat-default" };
  const stock = getStockClass(item.qty);

  return (
    <div
      className="item-card"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.6)}s` }}
    >
      <div className={`card-header ${meta.className}-bg`}>
        <span className="card-icon">{meta.icon}</span>
        <div className="card-title-block">
          <span className={`card-category ${meta.className}-accent`}>
            {item.category} · {item.type}
          </span>
          <h3 className="card-name">{item.name}</h3>
        </div>
      </div>

      <div className="card-body">
        <div className="card-row">
          <div className="card-qty">
            <span className="qty-number">{item.qty}</span>
            <span className="qty-unit">{item.unit}</span>
          </div>
          <div className="card-badges">
            <span className={`stock-badge ${stock.cls}`}>{stock.label}</span>
            <ExpiryBadge expiry={item.expiry} />
          </div>
        </div>
        <div className="card-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
