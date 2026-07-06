import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrdersForUser } from "../../../utils/orderUtils";
import { useTranslation } from "react-i18next";

import { Mail, Phone, Package, LogOut, Pencil, Check, ChevronDown } from "lucide-react";
import {
  COUNTRIES,
  PLACEHOLDERS,
  getCountryById,
  extractDigits,
  formatLocal,
  formatFull,
  isCompletePhone,
  detectCountryFromPhone,
  extractDigitsFromFullPhone,
} from "../../../utils/phoneUtils";

const STORAGE_USERS = "ispectre_users";
const STORAGE_CURRENT_USER = "ispectre_current_user";

const DATE_LOCALES = {
  en: "en-US",
  az: "az-AZ",
  ru: "ru-RU",
  es: "es-ES",
};

function CountryPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const country = getCountryById(value);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#232326] hover:bg-gray-50 dark:hover:bg-[#2a2a2d] transition"
      >
        <span>{country.flag}</span>
        <span className="text-gray-600 dark:text-gray-300">{country.dial}</span>
        <ChevronDown size={14} className="text-gray-400 dark:text-gray-500" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul className="absolute top-full mt-1 left-0 bg-white dark:bg-[#232326] rounded-xl w-52 shadow-xl border border-gray-200 dark:border-gray-700 p-1 z-20">
            {COUNTRIES.map((c) => (
              <li
                key={c.id}
                onClick={() => {
                  onChange(c.id);
                  setOpen(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2d] rounded-lg cursor-pointer text-sm flex items-center gap-2 text-gray-800 dark:text-gray-200"
              >
                <span>{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-gray-400 dark:text-gray-500 text-xs">{c.dial}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Account() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phoneCountry: "AZ",
    phoneDigits: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_CURRENT_USER);
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const countryId = parsed.phoneCountry || detectCountryFromPhone(parsed.phone).id;
    const country = getCountryById(countryId);

    setUser(parsed);
    setForm({
      name: parsed.name || "",
      surname: parsed.surname || "",
      email: parsed.email || "",
      phoneCountry: countryId,
      phoneDigits: parsed.phone ? extractDigitsFromFullPhone(country, parsed.phone) : "",
    });
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    const refresh = () => setOrders(getOrdersForUser(user.email));
    refresh();
    window.addEventListener("orders-updated", refresh);
    return () => window.removeEventListener("orders-updated", refresh);
  }, [user]);

  if (!user) return null;

  const country = getCountryById(form.phoneCountry);
  const currentPhone = formatFull(country, form.phoneDigits);
  const dateLocale = DATE_LOCALES[i18n.language] || "en-US";

  const hasChanges =
    form.name !== user.name ||
    form.surname !== user.surname ||
    form.email !== user.email ||
    currentPhone !== user.phone;

  const handleSave = () => {
    setError("");

    if (!form.name.trim()) {
      setError(t("account.errors.name_empty"));
      return;
    }

    if (!form.surname.trim()) {
      setError(t("account.errors.surname_empty"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError(t("account.errors.email_invalid"));
      return;
    }

    if (!isCompletePhone(country, form.phoneDigits)) {
      setError(t("account.errors.phone_incomplete", { placeholder: PLACEHOLDERS[country.id] }));
      return;
    }

    const updatedUser = {
      ...user,
      name: form.name.trim(),
      surname: form.surname.trim(),
      email: form.email.trim(),
      phone: currentPhone,
      phoneCountry: form.phoneCountry,
    };

    // Persist to localStorage users list
    const users = JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");
    const idx = users.findIndex((u) => u._id === user._id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updatedUser };
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    }

    localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_CURRENT_USER);
    navigate("/", { replace: true, state: { loggedOut: true } });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0f0f13] text-[#1D1D1F] dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium mb-1">{t("account.title")}</p>
          <h1 className="text-4xl font-bold tracking-tight">{t("account.greeting", { name: user.name })}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 flex flex-col items-center text-center shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#1D2530] dark:bg-slate-700 flex items-center justify-center text-white text-2xl font-bold mb-4">
                {user.name?.charAt(0).toUpperCase()}
                {user.surname?.charAt(0).toUpperCase()}
              </div>

              <h2 className="font-semibold text-lg">
                {user.name} {user.surname}
              </h2>

              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">{user.email}</p>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-red-600 dark:text-red-400 hover:border-red-200 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 transition focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800"
              >
                <LogOut size={16} />
                {t("account.logout")}
              </button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-semibold text-lg">{t("account.personal_info")}</h3>

                <button
                  onClick={() => (editMode ? handleSave() : setEditMode(true))}
                  disabled={editMode && !hasChanges}
                  className="flex items-center gap-2 text-sm font-medium text-[#1D2530] dark:text-gray-200 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editMode ? <Check size={15} /> : <Pencil size={15} />}
                  {editMode ? t("account.save") : t("account.edit")}
                </button>
              </div>

              {error && (
                <div className="mb-5 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 dark:text-gray-500 font-medium">{t("account.first_name")}</label>
                  {editMode ? (
                    <input
                      type="text"
                      autoComplete="given-name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full mt-1 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-400 dark:text-gray-500 font-medium">{t("account.last_name")}</label>
                  {editMode ? (
                    <input
                      type="text"
                      autoComplete="family-name"
                      value={form.surname}
                      onChange={(e) => setForm({ ...form, surname: e.target.value })}
                      className="w-full mt-1 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium">{user.surname}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1">
                    <Mail size={12} />
                    {t("account.email")}
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full mt-1 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                  ) : (
                    <p className="mt-1 text-sm font-medium">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1">
                    <Phone size={12} />
                    {t("account.phone")}
                  </label>
                  {editMode ? (
                    <div className="flex gap-2 mt-1">
                      <CountryPicker
                        value={form.phoneCountry}
                        onChange={(id) => {
                          const c = getCountryById(id);
                          setForm({
                            ...form,
                            phoneCountry: id,
                            phoneDigits: form.phoneDigits.slice(0, c.groups.reduce((a, b) => a + b, 0)),
                          });
                        }}
                      />
                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder={PLACEHOLDERS[country.id]}
                        value={formatLocal(country, form.phoneDigits)}
                        onChange={(e) =>
                          setForm({ ...form, phoneDigits: extractDigits(country, e.target.value) })
                        }
                        className="flex-1 min-w-0 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-sm font-medium">{user.phone}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                <Package size={18} />
                {t("account.orders")}
              </h3>

              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-[#232326] flex items-center justify-center mb-3">
                    <Package size={22} className="text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t("account.no_orders_title")}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t("account.no_orders_subtitle")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 dark:border-gray-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-semibold">
                            {t("account.order_number", { id: order.id.slice(-6) })}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString(dateLocale, {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <span className="text-xs font-medium bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full">
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={`${item.id}-${item.color}-${item.size}`}
                            className="flex items-center gap-3"
                          >
                            <img
                              src={item.img}
                              alt={item.model}
                              className="w-10 h-10 object-contain rounded-lg bg-gray-50 dark:bg-[#232326]"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{item.model}</p>
                              <p className="text-[11px] text-gray-400 dark:text-gray-500">
                                {item.color} · {item.size} · {item.qty || 1} {t("account.qty_suffix")}
                              </p>
                            </div>
                            <p className="text-xs font-semibold">
                              {((item.qty || 1) * Number(item.price)).toLocaleString()} ₼
                            </p>
                          </div>
                        ))}
                      </div>

                      {order.shipping && (order.shipping.address || order.shipping.cardLast4) && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                          <p className="font-medium text-gray-700 dark:text-gray-300">
                            {order.shipping.name} {order.shipping.surname}
                          </p>
                          {order.shipping.address && (
                            <p>
                              {order.shipping.address}
                              {order.shipping.city ? `, ${order.shipping.city}` : ""}{" "}
                              {order.shipping.postalCode}
                            </p>
                          )}
                          {order.shipping.cardLast4 && (
                            <p>
                              {t("account.card_label")}: **** **** **** {order.shipping.cardLast4}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t("checkout.total")}</span>
                        <span className="font-bold">{order.total.toLocaleString()} ₼</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;