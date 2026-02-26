import React, { useState, useMemo } from "react";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import StatsBar from "../components/StatsBar";
import pantryData from "../data/pantryData.json";
import { CATEGORY_META, ALL_CATEGORIES } from "../data/categories.js";

function getDaysUntilExpiry(expiryStr) {
  return Math.ceil((new Date(expiryStr) - new Date()) / (1000 * 60 * 60 * 24));
}

export default function PantryBrowser() {
  const [search,      setSearch]      = useState("");
  const [category,    setCategory]    = useState("All");
  const [sortBy,      setSortBy]      = useState("name");
  const [stockFilter, setStockFilter] = useState("All");

  const filtered = useMemo(() => {
    let data = [...pantryData];

    // Category
    if (category !== "All") {
      data = data.filter((i) => i.category === category);
    }

    // Stock / expiry quick filters
    if (stockFilter === "Low") {
      data = data.filter((i) => i.qty < 10);
    } else if (stockFilter === "Expiring") {
      data = data.filter((i) => getDaysUntilExpiry(i.expiry) <= 7);
    }

    // Search (name, category, type, tags)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      data = data.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.type.toLowerCase().includes(q) ||
          i.tags.some((t) => t.includes(q))
      );
    }

    // Sort
    data.sort((a, b) => {
      if (sortBy === "name")   return a.name.localeCompare(b.name);
      if (sortBy === "qty")    return b.qty - a.qty;
      if (sortBy === "expiry") return new Date(a.expiry) - new Date(b.expiry);
      return 0;
    });

    return data;
  }, [search, category, sortBy, stockFilter]);

  return (
    <>
      {/* ── Header ── */}
      <header className="site-header">
        <div className="header-inner">
          <div className="header-title-row">
            <img
              src="/logo.svg"
              alt="Cal Poly logo"
              className="header-logo"
            />
            <h1>Poly Pantry</h1>
            <span className="header-subtitle">Food Browser</span>
          </div>

          <SearchBar value={search} onChange={setSearch} />

          <FilterBar
            category={category}    onCategory={setCategory}
            sortBy={sortBy}        onSort={setSortBy}
            stockFilter={stockFilter} onStock={setStockFilter}
          />
        </div>
      </header>

      {/* ── Stats ── */}
      <div className="stats-bar">
        <div className="stats-bar-inner">
          <StatsBar resultCount={filtered.length} />
        </div>
      </div>

      {/* ── Grid ── */}
      <main>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h2>No items found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="pantry-grid">
            {filtered.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}