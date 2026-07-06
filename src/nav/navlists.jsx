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

  return (
     <div className="hidden md:block bg-white/70 dark:text-white dark:bg-[#18181B]/70 backdrop-blur-xl border-b border-gray-200 dark:border-[#3F3F46] overflow-visible transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        <ul className="flex py-3 text-sm gap-4 lg:gap-0 lg:justify-between flex-wrap">
          {/* MAC */}
          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.mac")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/macbook">{t("nav.view_all_mac")}</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/macbook-neo">MacBook Neo</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/macbook-air">MacBook Air</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/macbook-pro">MacBook Pro</Link>
              </li>
            </ul>
          </li>

          {/* IPAD*/}
          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.ipad")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/ipad">{t("nav.all_ipads")}</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/ipad-air">iPad Air</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/ipad-pro">iPad Pro</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/ipad-mini">iPad Mini</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/ipad-base">iPad 11th</Link>
              </li>

            </ul>
          </li>

          {/* IPHONE */}
          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.iphone")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/iphone">{t("nav.all_iphones")}</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/iphone17">iPhone 17</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/iphone-air">iPhone Air</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/iphone16">iPhone 16</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/iphone15">iPhone 15</Link>
              </li>
            </ul>
          </li>

          {/* WATCH*/}
          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.watch")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/watch">{t("nav.all_watches")}</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/watch-ultra2">Apple Watch Ultra</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/watch-series11">Series 11</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/watch-se">Apple Watch SE</Link>
              </li>

            </ul>
          </li>

          {/* OTHER */}
          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.airpods")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/airpods">{t("nav.view_all_airpods")}</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/airpods2">AirPods 2</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/airpods3">AirPods 3</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/airpods4">AirPods 4</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/airpods-max">AirPods Max</Link>
              </li>

            </ul>
          </li>




          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.tv_home")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/tv-home2">{t("nav.view_all_tvs")}</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/tv/appletv">AppleTv</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/tv/remote">Tvremote</Link>
              </li>
            </ul>
          </li>






          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.vision_pro")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/vision">{t("nav.view_all_visions")}</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/vision-m5">Apple Vision M5</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/vision-m2">Apple Vision M2</Link>
              </li>
            </ul>
          </li>

          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.display")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/displays">{t("nav.view_all_displays")}</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/display-studio">Studio Display</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/display-xdr">Pro Display XDR</Link>
              </li>
            </ul>
          </li>


          <li className="text-black dark:text-white hover:text-black transition cursor-pointer">
            <Link to="/support">{t("nav.support")}</Link>
          </li>

          <li className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3">
            <span className="hover:text-black transition">{t("nav.accessories")}</span>

            <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/accessories">{t("nav.view_all_accessories")}</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/accessories/keyboards">Apple Keyboard</Link>
              </li>

              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/accessories/mouse">Magic Mouse</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/accessories/pencil">Apple Pencil</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/accessories/trackpad">Magic Trackpad</Link>
              </li>
              <li className="px-4 py-2 text-white hover:bg-gray-700">
                <Link to="/accessories/power-adapter">Power Adapter</Link>
              </li>
            </ul>
          </li>

          {/* For Admin Dashboard */}
          {customCategories.map((cat) => {
            const products = getProductsByCategory(cat);
            return (
              <li
                key={cat}
                className="group relative cursor-pointer text-black dark:text-white text-[15px] pb-3"
              >
                <span className="hover:text-black transition capitalize">
                  {formatCategoryLabel(cat)}
                </span>

                <ul className="absolute top-7 bg-gray-800 rounded w-44 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition">
                  <li className="px-4 py-2 text-white hover:bg-gray-700">
                    <Link to={`/category/${cat}`}>
                      {t("nav.view_all", { category: formatCategoryLabel(cat) })}
                    </Link>
                  </li>

                  {products.map((p) => (
                    <li key={p.id} className="px-4 py-2 text-white hover:bg-gray-700 truncate">
                      <Link to={`/category/${cat}/${p.id}`}>{p.name}</Link>
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