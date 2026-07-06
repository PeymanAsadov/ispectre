import { useState, useEffect } from "react";
import { X, CreditCard, MapPin, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCart, getCartTotal } from "../../../utils/cartUtils";
import { createOrderFromCart } from "../../../utils/orderUtils";

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}

function CheckoutModal({ isOpen, onClose, user, onSuccess }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && user) {
      setForm((f) => ({
        ...f,
        name: user.name || "",
        surname: user.surname || "",
      }));
      setError("");
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const items = getCart();
  const total = getCartTotal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.surname.trim()) {
      setError(t("checkout.errors.name_surname_empty"));
      return;
    }
    if (!form.address.trim()) {
      setError(t("checkout.errors.address_empty"));
      return;
    }
    if (!form.postalCode.trim()) {
      setError(t("checkout.errors.postal_code_empty"));
      return;
    }
    if (form.cardNumber.replace(/\s/g, "").length < 16) {
      setError(t("checkout.errors.card_incomplete"));
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) {
      setError(t("checkout.errors.expiry_invalid"));
      return;
    }
    if (form.cvv.length < 3) {
      setError(t("checkout.errors.cvv_incomplete"));
      return;
    }

    const order = createOrderFromCart(user.email, form);
    if (order) onSuccess?.(order);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700/50 sticky top-0 bg-white dark:bg-[#1c1c1e] z-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t("checkout.title")}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#232326]">
            <X size={18} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-6 space-y-2">
            {items.map((item) => (
              <div key={`${item.id}-${item.color}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {item.model} × {item.qty || 1}
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {((item.qty || 1) * Number(item.price)).toLocaleString()} ₼
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-100 dark:border-gray-700/50 text-gray-900 dark:text-gray-100">
              <span>{t("checkout.total")}</span>
              <span>{total.toLocaleString()} ₼</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder={t("checkout.first_name")}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <input
                type="text"
                placeholder={t("checkout.last_name")}
                value={form.surname}
                onChange={(e) => setForm({ ...form, surname: e.target.value })}
                className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-2">
              <MapPin size={14} /> {t("checkout.shipping_address")}
            </div>

            <input
              type="text"
              placeholder={t("checkout.address")}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder={t("checkout.city")}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <input
                type="text"
                placeholder={t("checkout.postal_code")}
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-2">
              <CreditCard size={14} /> {t("checkout.payment_info")}
            </div>

            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              value={form.cardNumber}
              onChange={(e) => setForm({ ...form, cardNumber: formatCardNumber(e.target.value) })}
              maxLength={19}
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder={t("checkout.expiry_placeholder")}
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                maxLength={5}
                className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <input
                type="text"
                placeholder="CVV"
                value={form.cvv}
                onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                maxLength={3}
                className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              {t("checkout.confirm_order", { total: total.toLocaleString() })}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;