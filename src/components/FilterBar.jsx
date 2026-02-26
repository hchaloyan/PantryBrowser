import React from "react";
import { ALL_CATEGORIES, CATEGORY_META } from "../data/categories.js";

export default function FilterBar({ category, onCategory, sortBy, onSort, stockFilter, onStock }) {
  return (
    <div className="filter-bar">
      <div className="category-pills">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`pill ${category === cat ? "pill-active" : ""}`}
            onClick={() => onCategory(cat)}
          >
            {cat !== "All" && <span>{CATEGORY_META[cat]?.icon}</span>}
            {cat}
          </button>
        ))}
      </div>
      <div className="filter-selects">
        <select className="filter-select" value={sortBy} onChange={(e) => onSort(e.target.value)}>
          <option value="name">Sort: A–Z</option>
          <option value="qty">Sort: Qty ↓</option>
          <option value="expiry">Sort: Expiry</option>
        </select>
        <select className="filter-select" value={stockFilter} onChange={(e) => onStock(e.target.value)}>
          <option value="All">All Stock</option>
          <option value="Low">Low Stock</option>
          <option value="Expiring">Expiring Soon</option>
        </select>
      </div>
    </div>
  );
}
