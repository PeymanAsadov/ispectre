// src/utils/cartUtils.js
const CART_KEY = "ispectre_cart";

export function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(item) {
  // item: { id, model, color, size, price, img, qty }
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (c) => c.id === item.id && c.color === item.color && c.size === item.size
  );

  if (existingIndex >= 0) {
    cart[existingIndex].qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(id, color, size) {
  const cart = getCart().filter(
    (c) => !(c.id === id && c.color === color && c.size === size)
  );
  saveCart(cart);
  return cart;
}

export function updateCartQty(id, color, size, qty) {
  const cart = getCart().map((c) =>
    c.id === id && c.color === color && c.size === size
      ? { ...c, qty: Math.max(1, qty) }
      : c
  );
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce((sum, c) => sum + (c.qty || 1), 0);
}

export function getCartTotal() {
  return getCart().reduce((sum, c) => sum + (c.qty || 1) * Number(c.price || 0), 0);
}