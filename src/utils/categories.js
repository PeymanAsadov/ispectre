const STORAGE_PRODUCTS = "ispectre_products";

// Naveldə artıq öz statik dropdown-u olan kateqoriyalar (bunlara toxunulmur)
export const FIXED_CATEGORIES = [
  "iphone",
  "macbook",
  "ipad",
  "watch",
  "airpods",
  "display",
  "vision",
  "accessories",
  "tv",
];

export function getAllAdminProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_PRODUCTS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getCustomCategories() {
  const products = getAllAdminProducts();
  const set = new Set(
    products
      .map((p) => p.category)
      .filter((c) => c && !FIXED_CATEGORIES.includes(c))
  );
  return Array.from(set).sort();
}


export function getProductsByCategory(categoryName) {
  return getAllAdminProducts().filter((p) => p.category === categoryName);
}


export function getProductById(id) {
  return getAllAdminProducts().find((p) => p.id === id) || null;
}


export function formatCategoryLabel(cat) {
  if (!cat) return "";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}