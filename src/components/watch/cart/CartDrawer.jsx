import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCart, removeFromCart, updateCartQty, addToCart } from "../../../utils/cartUtils";
import { getDynamicProducts } from "../../../utils/dataLoader";
import staticMacbooks from "../../../data/macbook";
import CheckoutModal from "./CheckoutModal";
import AuthModal from "../../../pages/USER/AuthModal"; 

const STORAGE_CURRENT_USER = "ispectre_current_user";

function CartDrawer({ isOpen, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const refresh = () => setItems(getCart());

  const loadCurrentUser = () => {
    const stored = localStorage.getItem(STORAGE_CURRENT_USER);
    setCurrentUser(stored ? JSON.parse(stored) : null);
  };

  useEffect(() => {
    refresh();
    loadCurrentUser();
    const handler = () => refresh();
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      refresh();
      loadCurrentUser();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const total = items.reduce((sum, c) => sum + (c.qty || 1) * Number(c.price || 0), 0);

  const handleQty = (item, delta) => {
    updateCartQty(item.id, item.color, item.size, (item.qty || 1) + delta);
  };

  const handleRemove = (item) => {
    removeFromCart(item.id, item.color, item.size);
  };

  const handleCheckout = () => {
    if (!items.length) return;

    // Login yoxlanışı: hər dəfə checkout basılanda ən güncəl user-i localStorage-dan oxu
    const stored = localStorage.getItem(STORAGE_CURRENT_USER);
    const user = stored ? JSON.parse(stored) : null;

    if (!user) {
      // Login olmayıb -> AuthModal-ı aç, checkout-u dayandır
      setCurrentUser(null);
      setAuthOpen(true);
      return;
    }

    setCurrentUser(user);
    setCheckoutOpen(true);
  };

  const handleAuthSuccess = (user) => {
    // Login/qeydiyyat uğurlu oldu -> modalı bağla, avtomatik checkout-a keç
    setCurrentUser(user);
    setAuthOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCheckoutOpen(false);
    onClose();
    navigate("/account");
  };

  const suggested = getDynamicProducts("macbook", staticMacbooks)
    .filter((p) => !items.some((c) => c.id === p.id))
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      model: p.model || p.name,
      color: p.colors?.[0]?.name || "Standart",
      img: p.colors?.[0]?.images?.[0]?.url || p.img || "",
      price: p.colors?.[0]?.storage?.[0]?.price || p.price || 0,
    }));

  const handleAddSuggested = (item) => {
    addToCart({
      id: item.id,
      model: item.model,
      color: item.color,
      size: "Default",
      price: item.price,
      img: item.img,
    });
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white dark:bg-[#18181B] z-[101] shadow-[-8px_0_40px_rgba(0,0,0,0.15)] dark:shadow-[-8px_0_40px_rgba(0,0,0,0.5)] transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-[#3F3F46]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t("cart.title")} ({items.length})</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#232326]">
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400 dark:text-gray-500">
              <ShoppingBag size={40} />
              <p className="text-sm">{t("cart.empty")}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-[#3F3F46]">
              {items.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 px-6 py-5">
                  <img
                    src={item.img}
                    alt={item.model}
                    className="w-20 h-20 object-contain rounded-xl bg-gray-50 dark:bg-[#232326] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100">{item.model}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {item.color} · {item.size}
                    </p>
                    <p className="text-sm font-bold mt-1 text-gray-900 dark:text-gray-100">
                      {Number(item.price).toLocaleString()} ₼
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full overflow-hidden">
                        <button onClick={() => handleQty(item, -1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#232326]">
                          <Minus size={14} className="text-gray-700 dark:text-gray-300" />
                        </button>
                        <span className="px-3 text-sm font-medium text-gray-900 dark:text-gray-100">{item.qty || 1}</span>
                        <button onClick={() => handleQty(item, 1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#232326]">
                          <Plus size={14} className="text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item)}
                        className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {suggested.length > 0 && (
            <div className="px-6 py-6 border-t border-gray-100 dark:border-[#3F3F46]">
              <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">{t("cart.suggested")}</h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {suggested.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-36 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-3">
                    <div className="w-full h-24 flex items-center justify-center mb-2 bg-gray-50 dark:bg-[#232326] rounded-xl overflow-hidden">
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.model}
                          className="max-h-20 object-contain"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ) : (
                        <span className="text-[10px] text-gray-300 dark:text-gray-600">{t("product.not_found")}</span>
                      )}
                    </div>
                    <p className="text-xs font-medium line-clamp-2 text-gray-900 dark:text-gray-100">{item.model}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.color}</p>
                    <p className="text-sm font-bold mt-1 text-gray-900 dark:text-gray-100">
                      {Number(item.price || 0).toLocaleString()} ₼
                    </p>
                    <button
                      onClick={() => handleAddSuggested(item)}
                      className="w-full mt-2 py-2 rounded-full border border-black dark:border-white text-xs font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition text-gray-900 dark:text-gray-100"
                    >
                      {t("cart.add_to_cart")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 dark:border-[#3F3F46] px-6 py-5">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500 dark:text-gray-400">{t("cart.estimated_total")}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">{total.toLocaleString()} ₼</span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {t("cart.shipping_tax_info")}
            </p>
            <button
              onClick={handleCheckout}
              className="w-full py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              {t("cart.checkout")}
            </button>
          </div>
        )}
      </div>

      {/* İstifadəçi login deyilsə, checkout əvəzinə bu açılır */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={handleAuthSuccess}
        redirectOnLogin={false}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        user={currentUser}
        onSuccess={handleOrderSuccess}
      />
    </>
  );
}

export default CartDrawer;