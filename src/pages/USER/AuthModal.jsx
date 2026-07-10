import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, AlertCircle, CheckCircle2, ChevronDown } from "lucide-react";
import {
  COUNTRIES,
  PLACEHOLDERS,
  getCountryById,
  extractDigits,
  formatLocal,
  formatFull,
  isCompletePhone,
} from "../../utils/phoneUtils";

const STORAGE_USERS = "ispectre_users";
const STORAGE_CURRENT_USER = "ispectre_current_user";

const getUsers = () => JSON.parse(localStorage.getItem(STORAGE_USERS) || "[]");
const saveUsers = (users) => localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
const saveCurrentUser = (user) => localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(user));

const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

const findUser = (identifier, password) => {
  const users = getUsers();
  return users.find(
    (u) =>
      (u.email.toLowerCase() === identifier.toLowerCase().trim() || u.phone === identifier.trim()) &&
      u.password === password
  );
};

const userExists = (email, phone) => {
  const users = getUsers();
  return users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim() || u.phone === phone.trim()
  );
};

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

function CountryPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const country = getCountryById(value);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-full border border-gray-200 dark:border-[#3F3F46] rounded-xl px-3 py-3 text-sm bg-white dark:bg-[#27272A] hover:bg-gray-50 dark:hover:bg-[#323236] text-gray-800 dark:text-white transition"
      >
        <span>{country.flag}</span>
        <span className="text-gray-600 dark:text-gray-300">{country.dial}</span>
        <ChevronDown size={14} className="text-gray-400 dark:text-gray-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul className="absolute top-full mt-1 left-0 bg-white dark:bg-[#27272A] rounded-xl w-52 shadow-xl border border-gray-200 dark:border-[#3F3F46] p-1 z-20">
            {COUNTRIES.map((c) => (
              <li
                key={c.id}
                onClick={() => {
                  onChange(c.id);
                  setOpen(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#3F3F46] rounded-lg cursor-pointer text-sm flex items-center gap-2 text-gray-800 dark:text-white"
              >
                <span>{c.flag}</span>
                <span className="flex-1">{c.name}</span>
                <span className="text-gray-400 dark:text-gray-400 text-xs">{c.dial}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function AuthModal({ isOpen, onClose, onLoginSuccess, redirectOnLogin = true }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [loginMethod, setLoginMethod] = useState("email");
  const [loginPhoneCountry, setLoginPhoneCountry] = useState("AZ");
  const [loginPhoneDigits, setLoginPhoneDigits] = useState("");

  const [loginForm, setLoginForm] = useState({ identifier: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phoneCountry: "AZ",
    phoneDigits: "",
  });

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const loginCountry = getCountryById(loginPhoneCountry);
  const registerCountry = getCountryById(registerForm.phoneCountry);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    const identifier =
      loginMethod === "phone"
        ? formatFull(loginCountry, loginPhoneDigits)
        : loginForm.identifier.trim();

    const user = findUser(identifier, loginForm.password);

    if (!user) {
      setLoginError(t("auth.errors.invalid_credentials"));
      setLoading(false);
      return;
    }

    saveCurrentUser(user);
    onLoginSuccess?.(user);
    setLoading(false);
    onClose();
    if (redirectOnLogin) navigate("/account");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterError("");
    setSuccessMsg("");

    if (!registerForm.name.trim() || !registerForm.surname.trim()) {
      setRegisterError(t("auth.errors.name_surname_empty"));
      return;
    }
    if (!isValidEmail(registerForm.email)) {
      setRegisterError(t("auth.errors.email_invalid"));
      return;
    }
    if (!isCompletePhone(registerCountry, registerForm.phoneDigits)) {
      setRegisterError(
        t("auth.errors.phone_incomplete", { placeholder: PLACEHOLDERS[registerCountry.id] })
      );
      return;
    }
    if (!registerForm.password || registerForm.password.length < 8) {
      setRegisterError(t("auth.errors.password_min_length"));
      return;
    }

    const phone = formatFull(registerCountry, registerForm.phoneDigits);

    if (userExists(registerForm.email, phone)) {
      setRegisterError(t("auth.errors.account_exists"));
      return;
    }

    setLoading(true);

    const newUser = {
      _id: Date.now().toString(),
      name: registerForm.name.trim(),
      surname: registerForm.surname.trim(),
      email: registerForm.email.trim(),
      password: registerForm.password,
      phone,
      phoneCountry: registerForm.phoneCountry,
      role: "user",
    };

    saveUser(newUser);
    saveCurrentUser(newUser);
    onLoginSuccess?.(newUser);
    setSuccessMsg(t("auth.register_success"));
    setLoading(false);

    setTimeout(() => {
      onClose();
      if (redirectOnLogin) navigate("/account");
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 dark:bg-black/60 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/60 dark:border-[#3F3F46]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {mode === "login" ? t("auth.login_title") : t("auth.register_title")}
        </h2>

        {successMsg && (
          <div className="mb-4 flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 p-3 rounded-xl text-sm">
            <CheckCircle2 size={16} className="shrink-0" />
            {successMsg}
          </div>
        )}

        {mode === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-[#27272A] rounded-xl mb-2">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("email");
                  setLoginForm({ identifier: "", password: loginForm.password });
                }}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition ${
                  loginMethod === "email"
                    ? "bg-white dark:bg-[#3F3F46] shadow text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {t("auth.email_tab")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("phone");
                  setLoginPhoneDigits("");
                }}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition ${
                  loginMethod === "phone"
                    ? "bg-white dark:bg-[#3F3F46] shadow text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {t("auth.phone_tab")}
              </button>
            </div>

            {loginMethod === "email" ? (
              <input
                type="email"
                autoComplete="email"
                placeholder={t("auth.email_placeholder")}
                value={loginForm.identifier}
                onChange={(e) => {
                  setLoginForm({ ...loginForm, identifier: e.target.value });
                  setLoginError("");
                }}
                className="w-full border border-gray-200 dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                required
              />
            ) : (
              <div className="flex gap-2">
                <CountryPicker
                  value={loginPhoneCountry}
                  onChange={(id) => {
                    const c = getCountryById(id);
                    setLoginPhoneCountry(id);
                    setLoginPhoneDigits((d) => d.slice(0, c.groups.reduce((a, b) => a + b, 0)));
                  }}
                />
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder={PLACEHOLDERS[loginCountry.id]}
                  value={formatLocal(loginCountry, loginPhoneDigits)}
                  onChange={(e) =>
                    setLoginPhoneDigits(extractDigits(loginCountry, e.target.value))
                  }
                  className="flex-1 min-w-0 border border-gray-200 dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  required
                />
              </div>
            )}

            <input
              type="password"
              autoComplete="current-password"
              placeholder={t("auth.password_placeholder")}
              value={loginForm.password}
              onChange={(e) => {
                setLoginForm({ ...loginForm, password: e.target.value });
                setLoginError("");
              }}
              className="w-full border border-gray-200 dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              required
            />
            {loginError && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {loginError}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1D2530] dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 disabled:bg-[#1d2530]/50 dark:disabled:bg-white/50 disabled:cursor-not-allowed text-white dark:text-[#18181B] py-3 rounded-xl font-medium text-sm transition"
            >
              {loading ? t("auth.logging_in") : t("auth.login_button")}
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
              {t("auth.no_account")}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setSuccessMsg("");
                }}
                className="text-[#1D2530] dark:text-white font-semibold hover:underline"
              >
                {t("auth.go_to_register")}
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                autoComplete="given-name"
                placeholder={t("auth.name_placeholder")}
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                className="w-1/2 border border-gray-200 dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                required
              />
              <input
                type="text"
                autoComplete="family-name"
                placeholder={t("auth.surname_placeholder")}
                value={registerForm.surname}
                onChange={(e) => setRegisterForm({ ...registerForm, surname: e.target.value })}
                className="w-1/2 border border-gray-200 dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                required
              />
            </div>
            <input
              type="email"
              autoComplete="email"
              placeholder={t("auth.email_placeholder")}
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              className="w-full border border-gray-200 dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              required
            />

            <div className="flex gap-2">
              <CountryPicker
                value={registerForm.phoneCountry}
                onChange={(id) => {
                  const c = getCountryById(id);
                  setRegisterForm({
                    ...registerForm,
                    phoneCountry: id,
                    phoneDigits: registerForm.phoneDigits.slice(0, c.groups.reduce((a, b) => a + b, 0)),
                  });
                }}
              />
              <input
                type="tel"
                autoComplete="tel"
                placeholder={PLACEHOLDERS[registerCountry.id]}
                value={formatLocal(registerCountry, registerForm.phoneDigits)}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    phoneDigits: extractDigits(registerCountry, e.target.value),
                  })
                }
                className="flex-1 min-w-0 border border-gray-200 dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                required
              />
            </div>

            <input
              type="password"
              autoComplete="new-password"
              placeholder={t("auth.password_placeholder")}
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              className="w-full border border-gray-200 dark:border-[#3F3F46] bg-white dark:bg-[#27272A] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              required
            />
            {registerError && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {registerError}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1D2530] dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 disabled:bg-[#1d2530]/50 dark:disabled:bg-white/50 disabled:cursor-not-allowed text-white dark:text-[#18181B] py-3 rounded-xl font-medium text-sm transition"
            >
              {loading ? t("auth.creating_account") : t("auth.create_account_button")}
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
              {t("auth.have_account")}{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-[#1D2530] dark:text-white font-semibold hover:underline"
              >
                {t("auth.go_to_login")}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;