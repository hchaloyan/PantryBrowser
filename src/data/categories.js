export const CATEGORY_META = {
  Produce:   { icon: "🥦", accent: "#2e7d32", bg: "#e8f5e9" },
  Grains:    { icon: "🌾", accent: "#f57f17", bg: "#fff8e1" },
  Proteins:  { icon: "🥚", accent: "#c62828", bg: "#fce4ec" },
  Dairy:     { icon: "🥛", accent: "#1565c0", bg: "#e3f2fd" },
  Canned:    { icon: "🥫", accent: "#6a1b9a", bg: "#f3e5f5" },
  Pantry:    { icon: "🧂", accent: "#bf360c", bg: "#fff3e0" },
  Beverages: { icon: "🧃", accent: "#00695c", bg: "#e0f7fa" },
  Snacks:    { icon: "🍫", accent: "#558b2f", bg: "#f1f8e9" },
  Frozen:    { icon: "❄️", accent: "#283593", bg: "#e8eaf6" },
};

export const ALL_CATEGORIES = ["All", ...Object.keys(CATEGORY_META)];
