import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getCustomCategories, getProductsByCategory, formatCategoryLabel } from "../utils/categories";

function Navlists() {
  const { t } = useTranslation();
  const [customCategories, setCustomCategories] = useState([]);

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

  // "left-0" klassı ilə alt menyu birbaşa ana "li"-nin sol kənarından başlayır
  const dropdownClasses = "absolute top-full left-0 mt-1 bg-white/95 dark:bg-[#2c2c2e]/95 backdrop-blur-md rounded-xl w-52 shadow-2xl p-1.5 border border-gray-100 dark:border-gray-700/50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out transform scale-95 group-hover:scale-100 z-50";

  return (
    <div className="hidden md:block bg-gray-50/80 dark:bg-[#1c1c1e]/60 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 overflow-visible transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-12 relative">
        <ul className="flex justify-around items-center py-3 text-xs font-normal text-gray-600 dark:text-gray-300 text-[14px]">
          
          {/* MAC */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.mac")}</span>
            <ul className={dropdownClasses}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/macbook-neo" className="block">MacBook Neo</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/macbook-air" className="block">MacBook Air</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/macbook-pro" className="block">MacBook Pro</Link></li>
            </ul>
          </li>

          {/* IPAD */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.ipad")}</span>
            <ul className={dropdownClasses}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/ipad" className="block">{t("nav.all_ipads")}</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/ipad-air" className="block">iPad Air</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/ipad-pro" className="block">iPad Pro</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/ipad-mini" className="block">iPad Mini</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/ipad-base" className="block">iPad 11th</Link></li>
            </ul>
          </li>

          {/* IPHONE */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.iphone")}</span>
            <ul className={dropdownClasses}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/iphone" className="block">{t("nav.all_iphones")}</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/iphone17" className="block">iPhone 17</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/iphone-air" className="block">iPhone Air</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/iphone16" className="block">iPhone 16</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/iphone15" className="block">iPhone 15</Link></li>
            </ul>
          </li>

          {/* WATCH */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.watch")}</span>
            <ul className={dropdownClasses}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/watch" className="block">{t("nav.all_watches")}</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/watch-ultra2" className="block">Apple Watch Ultra</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/watch-series11" className="block">Series 11</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/watch-se" className="block">Apple Watch SE</Link></li>
            </ul>
          </li>

          {/* AIRPODS */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.airpods")}</span>
            <ul className={dropdownClasses}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/airpods" className="block">{t("nav.view_all_airpods")}</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/airpods2" className="block">AirPods 2</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/airpods3" className="block">AirPods 3</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/airpods4" className="block">AirPods 4</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/airpods-max" className="block">AirPods Max</Link></li>
            </ul>
          </li>

          {/* TV & HOME */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.tv_home")}</span>
            <ul className={dropdownClasses}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/tv-home2" className="block">{t("nav.view_all_tvs")}</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/tv/appletv" className="block">AppleTv</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/tv/remote" className="block">Tvremote</Link></li>
            </ul>
          </li>

          {/* VISION PRO */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.vision_pro")}</span>
            <ul className={dropdownClasses}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/vision" className="block">{t("nav.view_all_visions")}</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/vision-m5" className="block">Apple Vision M5</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/vision-m2" className="block">Apple Vision M2</Link></li>
            </ul>
          </li>

          {/* DISPLAY */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.display")}</span>
            <ul className={dropdownClasses}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/displays" className="block">{t("nav.view_all_displays")}</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/display-studio" className="block">Studio Display</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/display-xdr" className="block">Pro Display XDR</Link></li>
            </ul>
          </li>

          {/* SUPPORT */}
          <li className="py-2 hover:text-black dark:hover:text-white transition-colors">
            <Link to="/support">{t("nav.support")}</Link>
          </li>

          {/* ACCESSORIES - Siyahının sağ kənarında olduğu üçün ekran xaricinə çıxmaması üçün "right-0 left-auto" saxlanıldı */}
          <li className="group relative cursor-pointer py-2">
            <span className="hover:text-black dark:hover:text-white transition-colors">{t("nav.accessories")}</span>
            <ul className={`${dropdownClasses} left-auto right-0`}>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/accessories" className="block">{t("nav.view_all_accessories")}</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/accessories/keyboards" className="block">Apple Keyboard</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/accessories/mouse" className="block">Magic Mouse</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/accessories/pencil" className="block">Apple Pencil</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/accessories/trackpad" className="block">Magic Trackpad</Link></li>
              <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"><Link to="/accessories/power-adapter" className="block">Power Adapter</Link></li>
            </ul>
          </li>

          {/* DINAMIK KATEQORIYALAR - Bunlar da sağda yerləşdiyi üçün sağ kənara bərabərləndi */}
          {customCategories.map((cat) => {
            const products = getProductsByCategory(cat);
            return (
              <li key={cat} className="group relative cursor-pointer py-2">
                <span className="hover:text-black dark:hover:text-white transition-colors capitalize">
                  {formatCategoryLabel(cat)}
                </span>
                <ul className={`${dropdownClasses} left-auto right-0`}>
                  <li className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                    <Link to={`/category/${cat}`} className="block">
                      {t("nav.view_all", { category: formatCategoryLabel(cat) })}
                    </Link>
                  </li>
                  {products.map((p) => (
                    <li key={p.id} className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition truncate">
                      <Link to={`/category/${cat}/${p.id}`} className="block">{p.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}

        </ul>
      </div>
    </div>
  );
}

export default Navlists;