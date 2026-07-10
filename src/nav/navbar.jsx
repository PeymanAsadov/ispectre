import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2, Sun, Moon, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import AuthModal from "../pages/USER/AuthModal";
import CartButton from "../components/watch/cart/CartButton";
import SearchBar from "../components/watch/search/SearchBar";
import { useTheme } from "../context/ThemeContext";
import { getCustomCategories, getProductsByCategory, formatCategoryLabel } from "../utils/categories";
import { createPortal } from "react-dom";

const STORAGE_CURRENT_USER = "ispectre_current_user";
const LANGUAGES = ["English", "Azərbaycan", "Русский"];
const LANG_CODE_MAP = {
  "English": "en",
  "Azərbaycan": "az",
  "Русский": "ru",
};

function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("English");
  const [authOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [logoutToast, setLogoutToast] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customCategories, setCustomCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("i18nextLng") || "en";
    const mapped = Object.keys(LANG_CODE_MAP).find(k => LANG_CODE_MAP[k] === saved);
    if (mapped) setLang(mapped);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_CURRENT_USER);
    setCurrentUser(stored ? JSON.parse(stored) : null);
  }, [authOpen, location.pathname]);

  useEffect(() => {
    if (location.state?.loggedOut) {
      setLogoutToast(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    if (logoutToast) {
      const timer = setTimeout(() => setLogoutToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [logoutToast]);

  useEffect(() => {
    const loadCategories = () => setCustomCategories(getCustomCategories());
    loadCategories();
    window.addEventListener("storage", loadCategories);
    window.addEventListener("ispectre-products-updated", loadCategories);
    return () => {
      window.removeEventListener("storage", loadCategories);
      window.removeEventListener("ispectre-products-updated", loadCategories);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleUserClick = () => {
    if (currentUser) {
      navigate("/account");
    } else {
      setAuthOpen(true);
    }
  };

  const navGroups = [
    {
      titleKey: "nav.mac",
      links: [
        { labelKey: "nav.view_all_mac", path: "/macbook" },
        { label: "MacBook Neo", path: "/macbook-neo" },
        { label: "MacBook Air", path: "/macbook-air" },
        { label: "MacBook Pro", path: "/macbook-pro" },
      ]
    },
    {
      titleKey: "nav.ipad",
      links: [
        { labelKey: "nav.all_ipads", path: "/ipad" },
        { label: "iPad Air", path: "/ipad-air" },
        { label: "iPad Pro", path: "/ipad-pro" },
        { label: "iPad Mini", path: "/ipad-mini" },
        { label: "iPad 11th", path: "/ipad-base" },
      ]
    },
    {
      titleKey: "nav.iphone",
      links: [
        { labelKey: "nav.all_iphones", path: "/iphone" },
        { label: "iPhone 17", path: "/iphone17" },
        { label: "iPhone Air", path: "/iphone-air" },
        { label: "iPhone 16", path: "/iphone16" },
        { label: "iPhone 15", path: "/iphone15" },
      ]
    },
    {
      titleKey: "nav.watch",
      links: [
        { labelKey: "nav.all_watches", path: "/watch" },
        { label: "Apple Watch Ultra", path: "/watch-ultra2" },
        { label: "Series 11", path: "/watch-series11" },
        { label: "Apple Watch SE", path: "/watch-se" },
      ]
    },
    {
      titleKey: "nav.airpods",
      links: [
        { labelKey: "nav.view_all_airpods", path: "/airpods" },
        { label: "AirPods 2", path: "/airpods2" },
        { label: "AirPods 3", path: "/airpods3" },
        { label: "AirPods 4", path: "/airpods4" },
        { label: "AirPods Max", path: "/airpods-max" },
      ]
    },
    {
      titleKey: "nav.tv_home",
      links: [
        { labelKey: "nav.view_all_tvs", path: "/tv-home2" },
        { label: "AppleTv", path: "/tv/appletv" },
        { label: "Tvremote", path: "/tv/remote" },
      ]
    },
    {
      titleKey: "nav.vision_pro",
      links: [
        { labelKey: "nav.view_all_visions", path: "/vision" },
        { label: "Apple Vision M5", path: "/vision-m5" },
        { label: "Apple Vision M2", path: "/vision-m2" },
      ]
    },
    {
      titleKey: "nav.display",
      links: [
        { labelKey: "nav.view_all_displays", path: "/displays" },
        { label: "Studio Display", path: "/display-studio" },
        { label: "Pro Display XDR", path: "/display-xdr" },
      ]
    },
    {
      titleKey: "nav.accessories",
      links: [
        { labelKey: "nav.view_all_accessories", path: "/accessories" },
        { label: "Apple Keyboard", path: "/accessories/keyboards" },
        { label: "Magic Mouse", path: "/accessories/mouse" },
        { label: "Apple Pencil", path: "/accessories/pencil" },
        { label: "Magic Trackpad", path: "/accessories/trackpad" },
        { label: "Power Adapter", path: "/accessories/power-adapter" },
      ]
    }
  ];

  return (
    <div className="text-[#1D1D1F] dark:text-[#F5F5F7] bg-white/80 dark:bg-[#1c1c1e]/85 backdrop-blur-md w-full border-b border-gray-100 dark:border-gray-800/60 sticky top-0 z-50 transition-colors duration-300">
      {logoutToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
          <CheckCircle2 size={16} className="text-green-400" />
          {t("nav.logout_success")}
        </div>
      )}

      <nav className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-3 flex flex-col gap-3">
        {/* ROW 1: Üst Bar (Logo və İkonlar) */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/" className="flex gap-2 items-center select-none">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight font-bold">iSpectre</h1>
              <img
                src="https://cdn0.it4profit.com/s3/cms/site/4d/50/4d5038f7350e6de2a4eb74059ff152bc/apple_premium_partner.svg"
                alt="Partner"
                className="hidden md:block h-6 dark:invert dark:opacity-80 object-contain"
              />
            </Link>
          </div>

          {/* DESKTOP SEARCH BAR (Böyük ekranlarda loqo ilə yan-yana qalır) */}
          <div className="hidden md:block flex-1 max-w-[400px] mx-8">
            <SearchBar />
          </div>

          {/* Sağ tərəf düymələri */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center justify-center w-8 h-8 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Dil Seçimi */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-xs font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {LANG_CODE_MAP[lang]?.toUpperCase()}
              </button>

              {open && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                  <ul className="absolute top-10 right-0 bg-white dark:bg-[#2c2c2e] text-gray-900 dark:text-gray-100 rounded-xl w-32 shadow-2xl p-1 border border-gray-100 dark:border-gray-700 z-20">
                    {LANGUAGES.map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          setLang(item);
                          setOpen(false);
                          const code = LANG_CODE_MAP[item];
                          if (code) {
                            i18n.changeLanguage(code);
                            localStorage.setItem("i18nextLng", code);
                          }
                        }}
                        className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-xs"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="scale-95">
              <CartButton />
            </div>

            <button
              onClick={handleUserClick}
              className="flex items-center justify-center w-8 h-8 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              title={currentUser ? `${currentUser.name} ${currentUser.surname}` : t("nav.login")}
            >
              <i className="fa-regular fa-user text-base"></i>
            </button>
          </div>
        </div>

        {/* ROW 2: MOBİL AXTARIŞ (Yalnız mobil ekranlarda tam enində çıxır) */}
        <div className="block md:hidden w-full pb-1">
          <SearchBar />
        </div>
      </nav>

      {/* MOBILE DRAWER*/}
      {createPortal(
        <div className={`fixed inset-0 z-[9999] md:hidden transition-all duration-300 ${mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className={`fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-[#1c1c1e] text-[#1D1D1F] dark:text-[#F5F5F7] shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out flex flex-col justify-between border-r border-gray-200 dark:border-gray-800 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div>
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-1">
                {navGroups.map((group) => {
                  const isExpanded = expandedCategory === group.titleKey;
                  return (
                    <div key={group.titleKey} className="border-b border-gray-100 dark:border-gray-800 py-1">
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : group.titleKey)}
                        className="w-full flex justify-between items-center py-2.5 text-left font-medium hover:text-blue-500 transition"
                      >
                        <span>{t(group.titleKey)}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {isExpanded && (
                        <ul className="pl-4 space-y-2 pb-2">
                          {group.links.map((link) => (
                            <li key={link.path}>
                              <Link
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                              >
                                {link.label || t(link.labelKey)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}

                {customCategories.map((cat) => {
                  const products = getProductsByCategory(cat);
                  const isExpanded = expandedCategory === cat;
                  return (
                    <div key={cat} className="border-b border-gray-100 dark:border-gray-800 py-1">
                      <button
                        onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                        className="w-full flex justify-between items-center py-2.5 text-left font-medium hover:text-blue-500 transition capitalize"
                      >
                        <span>{formatCategoryLabel(cat)}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {isExpanded && (
                        <ul className="pl-4 space-y-2 pb-2">
                          <li>
                            <Link
                              to={`/category/${cat}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1 text-sm font-medium text-blue-500"
                            >
                              {t("nav.view_all", { category: formatCategoryLabel(cat) })}
                            </Link>
                          </li>
                          {products.map((p) => (
                            <li key={p.id}>
                              <Link
                                to={`/category/${cat}/${p.id}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition truncate"
                              >
                                {p.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}

                <div className="py-3 border-b border-gray-100 dark:border-gray-800">
                  <Link to="/support" onClick={() => setMobileMenuOpen(false)} className="block font-medium hover:text-blue-500 transition">
                    {t("nav.support")}
                  </Link>
                </div>
              </nav>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-8 text-center text-xs text-gray-400">
              <p>© {new Date().getFullYear()} iSpectre</p>
            </div>
          </div>
        </div>,
        document.body
      )}

      {createPortal(
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} onLoginSuccess={(user) => setCurrentUser(user)} />,
        document.body
      )}
    </div>
  );
}

export default Navbar;