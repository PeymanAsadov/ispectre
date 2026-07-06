import { getCart, clearCart } from "./cartUtils";

const ORDERS_KEY = "ispectre_orders";

export function getAllOrders() {
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getOrdersForUser(email) {
  if (!email) return [];
  return getAllOrders()
    .filter((o) => o.userEmail === email)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function createOrderFromCart(userEmail, shippingInfo = {}) {
  const cart = getCart();
  if (!cart.length) return null;

  const total = cart.reduce(
    (sum, c) => sum + (c.qty || 1) * Number(c.price || 0),
    0
  );

  const order = {
    id: Date.now().toString(),
    userEmail,
    items: cart,
    total,
    createdAt: new Date().toISOString(),
    status: "Gözləmədə",
    shipping: {
      name: shippingInfo.name || "",
      surname: shippingInfo.surname || "",
      address: shippingInfo.address || "",
      city: shippingInfo.city || "",
      postalCode: shippingInfo.postalCode || "",
      cardLast4: shippingInfo.cardNumber
        ? shippingInfo.cardNumber.replace(/\s/g, "").slice(-4)
        : "",
    },
  };

  const orders = getAllOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  clearCart();
  window.dispatchEvent(new Event("orders-updated"));

  return order;
}