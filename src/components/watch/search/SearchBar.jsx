import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getDynamicProducts } from "../../../utils/dataLoader";

import staticIphones from "../../../data/iphones";
import staticMacbooks from "../../../data/macbook";
import staticAirpods from "../../../data/airpods";
import staticWatches from "../../../data/watch";
import staticVisions from "../../../data/vision";
import staticDisplays from "../../../data/display";
import staticTvs from "../../../data/appletv";
import staticAccessories from "../../../data/accessories";
import staticIpad from "../../../data/ipad";
const PAGE_ROUTES = {
  "view all mac": "/macbook",
  "macbook neo": "/macbook-neo",
  "macbook air": "/macbook-air",
  "macbook pro": "/macbook-pro",
  "all ipads": "/ipad",
  "ipad air": "/ipad-air",
  "ipad pro": "/ipad-pro",
  "ipad mini": "/ipad-mini",
  "ipad 11th": "/ipad-base",
  "all iphones": "/iphone",
  "iphone 17": "/iphone17",
  "iphone air": "/iphone-air",
  "iphone 16": "/iphone16",
  "iphone 15": "/iphone15",
  "all watches": "/watch",
  "apple watch ultra": "/watch-ultra2",
  "series 11": "/watch-series11",
  "apple watch se": "/watch-se",
  "view all airpods": "/airpods",
  "airpods 2": "/airpods2",
  "airpods 3": "/airpods3",
  "airpods 4": "/airpods4",
  "airpods max": "/airpods-max",
  "view all tvs": "/tv-home2",
  "appletv": "/tv/appletv",
  "tvremote": "/tv/remote",
  "tv remote": "/tv/remote",
  "view all visions": "/vision",
  "apple vision m5": "/vision-m5",
  "apple vision m2": "/vision-m2",
  "view all displays": "/displays",
  "studio display": "/display-studio",
  "pro display xdr": "/display-xdr",
  "view all accessories": "/accessories",
  "apple keyboard": "/accessories/keyboards",
  "magic mouse": "/accessories/mouse",
  "apple pencil": "/accessories/pencil",
  "magic trackpad": "/accessories/trackpad",
  "power adapter": "/accessories/power-adapter",
  "isupport": "/support",
};

const PAGE_ENTRIES = [
  { label: "View all Mac", route: "/macbook", category: "Mac" },
  { label: "MacBook Neo", route: "/macbook-neo", category: "Mac" },
  { label: "MacBook Air", route: "/macbook-air", category: "Mac" },
  { label: "MacBook Pro", route: "/macbook-pro", category: "Mac" },
  { label: "All iPads", route: "/ipad", category: "iPad" },
  { label: "iPad Air", route: "/ipad-air", category: "iPad" },
  { label: "iPad Pro", route: "/ipad-pro", category: "iPad" },
  { label: "iPad Mini", route: "/ipad-mini", category: "iPad" },
  { label: "iPad 11th", route: "/ipad-base", category: "iPad" },
  { label: "All iPhones", route: "/iphone", category: "iPhone" },
  { label: "iPhone 17", route: "/iphone17", category: "iPhone" },
  { label: "iPhone Air", route: "/iphone-air", category: "iPhone" },
  { label: "iPhone 16", route: "/iphone16", category: "iPhone" },
  { label: "iPhone 15", route: "/iphone15", category: "iPhone" },
  { label: "All Watches", route: "/watch", category: "Watch" },
  { label: "Apple Watch Ultra", route: "/watch-ultra2", category: "Watch" },
  { label: "Series 11", route: "/watch-series11", category: "Watch" },
  { label: "Apple Watch SE", route: "/watch-se", category: "Watch" },
  { label: "View All AirPods", route: "/airpods", category: "AirPods" },
  { label: "AirPods 2", route: "/airpods2", category: "AirPods" },
  { label: "AirPods 3", route: "/airpods3", category: "AirPods" },
  { label: "AirPods 4", route: "/airpods4", category: "AirPods" },
  { label: "AirPods Max", route: "/airpods-max", category: "AirPods" },
  { label: "View All TVs", route: "/tv-home2", category: "Apple TV" },
  { label: "AppleTv", route: "/tv/appletv", category: "Apple TV" },
  { label: "Tv Remote", route: "/tv/remote", category: "Apple TV" },
  { label: "View All Visions", route: "/vision", category: "Vision Pro" },
  { label: "Apple Vision M5", route: "/vision-m5", category: "Vision Pro" },
  { label: "Apple Vision M2", route: "/vision-m2", category: "Vision Pro" },
  { label: "View All Displays", route: "/displays", category: "Display" },
  { label: "Studio Display", route: "/display-studio", category: "Display" },
  { label: "Pro Display XDR", route: "/display-xdr", category: "Display" },
  { label: "View All Accessories", route: "/accessories", category: "Accessories" },
  { label: "Apple Keyboard", route: "/accessories/keyboards", category: "Accessories" },
  { label: "Magic Mouse", route: "/accessories/mouse", category: "Accessories" },
  { label: "Apple Pencil", route: "/accessories/pencil", category: "Accessories" },
  { label: "Magic Trackpad", route: "/accessories/trackpad", category: "Accessories" },
  { label: "Power Adapter", route: "/accessories/power-adapter", category: "Accessories" },
];

const CATEGORY_MAP = [
  { key: "iphone", staticData: staticIphones, routeBase: "/detail", label: "iPhone" },
  { key: "macbook", staticData: staticMacbooks, routeBase: "/macbook", label: "Mac" },
  { key: "ipad", staticData: staticIpad, routeBase: "/ipad", label: "iPad" },
  { key: "airpods", staticData: staticAirpods, routeBase: "/airpods", label: "AirPods" },
  { key: "watch", staticData: staticWatches, routeBase: "/watch", label: "Watch" },
  { key: "vision", staticData: staticVisions, routeBase: "/vision", label: "Vision Pro" },
  { key: "display", staticData: staticDisplays, routeBase: "/display", label: "Display" },
  { key: "appletv", staticData: staticTvs, routeBase: "/tv", label: "Apple TV" },
  { key: "accessories", staticData: staticAccessories, routeBase: "/accessories", label: "Accessories" },
];

function normalize(str = "") {
  return str.toString().toLocaleLowerCase("az").trim();
}


let cachedSearchIndex = null;

function buildSearchIndex() {
  const index = [];

  // 1. Səhifələri əlavə edirik
  PAGE_ENTRIES.forEach((entry) => {
    index.push({
      pageRoute: entry.route,
      id: entry.route,
      model: entry.label,
      color: "",
      img: "",
      price: null,
      routeBase: null,
      categoryLabel: entry.category,
      searchText: normalize(`${entry.label} ${entry.category}`),
      isPage: true,
    });
  });

  CATEGORY_MAP.forEach(({ key, staticData, routeBase, label }) => {
    let allItems = staticData;
    try {
      allItems = getDynamicProducts(key, staticData) || staticData;
    } catch {
      allItems = staticData;
    }

    allItems.forEach((product) => {
      const defaultColor = product.colors?.[0] || { name: "", images: [], storage: [] };
      const firstStorage = defaultColor.storage?.[0];

      index.push({
        pageRoute: PAGE_ROUTES[normalize(product.model || product.name || "")] || null,
        id: product.id,
        model: product.model || product.name || "",
        color: "",
        img: defaultColor.images?.[0]?.url || defaultColor.img || product.img || "",
        price: firstStorage?.price ?? product.price ?? 0,
        routeBase,
        categoryLabel: label,
        searchText: normalize(`${product.model || product.name || ""} ${label}`),
        isPage: false,
      });
    });
  });

  return index;
}

function getSearchIndex() {
  if (!cachedSearchIndex) {
    cachedSearchIndex = buildSearchIndex();
  }
  return cachedSearchIndex;
}

function invalidateSearchIndex() {
  cachedSearchIndex = null;
}

// Admin paneldən məhsul əlavə/silinəndə keşi etibarsız sayırıq
if (typeof window !== "undefined") {
  window.addEventListener("ispectre-products-updated", invalidateSearchIndex);
}

function SearchBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  // Keşlənmiş indeksi oxuyuruq — heç bir yeni sorğu getmir
  const searchIndex = useMemo(() => getSearchIndex(), []);

  // Yazı zamanı debounce — hər hərfdə deyil, 200ms fasilədən sonra filtr işə düşür
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(handle);
  }, [query]);

  const filteredProducts = useMemo(() => {
    const q = normalize(debouncedQuery);
    if (!q) return [];
    const terms = q.split(/\s+/).filter(Boolean);

    return searchIndex
      .filter((item) => terms.every((term) => item.searchText.includes(term)))
      .slice(0, 10);
  }, [debouncedQuery, searchIndex]);

  // Dropdown menyuda görünəcək elementlərin siyahısı (Suggestions + Products)
  const dropdownItems = useMemo(() => {
    const items = [];
    const uniqueModels = [];

    filteredProducts.forEach((item) => {
      if (!uniqueModels.includes(item.model)) {
        uniqueModels.push(item.model);
      }
    });

    uniqueModels.slice(0, 3).forEach((modelName) => {
      let matchItem = filteredProducts.find((p) => p.model === modelName && p.isPage);
      if (!matchItem) {
        matchItem = filteredProducts.find((p) => p.model === modelName);
      }

      items.push({
        type: "suggestion",
        label: modelName,
        matchItem: matchItem,
      });
    });

    filteredProducts.forEach((prod) => {
      if (!prod.isPage && prod.img) {
        items.push({
          type: "product",
          ...prod,
        });
      }
    });

    return items;
  }, [filteredProducts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const goToProductDetail = (item) => {
    navigate(`${item.routeBase}/${item.id}${item.color ? `?color=${encodeURIComponent(item.color)}` : ""}`);
    clearSearch();
  };

  const goToPageRoute = (item) => {
    if (item.pageRoute) {
      navigate(item.pageRoute);
    } else if (item.isPage) {
      navigate(item.id);
    } else {
      navigate(`${item.routeBase}/${item.id}${item.color ? `?color=${encodeURIComponent(item.color)}` : ""}`);
    }
    clearSearch();
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    setOpen(false);
    setActiveIdx(-1);
  };

  const handleSelection = (item) => {
    if (item.type === "suggestion") {
      if (item.matchItem) {
        goToPageRoute(item.matchItem);
      } else {
        setQuery(item.label);
        setActiveIdx(-1);
      }
    } else {
      goToProductDetail(item);
    }
  };

  // Enter düyməsi ilə axtarış ikonuna klik eyni məntiqi paylaşır.
  // Nəticə yoxdursa istifadəçini 404 (Notfound) səhifəsinə yönləndiririk,
  // çünki "/search-not-found" heç bir Route ilə uyğun gəlmir və
  // <Route path="*" element={<Notfound />} /> onu tutur.
  const performSearch = () => {
    if (!query) return;

    if (dropdownItems.length === 0) {
      navigate("/search-not-found", { state: { query } });
      clearSearch();
      return;
    }

    const target =
      activeIdx >= 0 && dropdownItems[activeIdx] ? dropdownItems[activeIdx] : dropdownItems[0];
    handleSelection(target);
  };

  const handleKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (dropdownItems.length > 0) {
        setActiveIdx((prev) => (prev + 1 >= dropdownItems.length ? 0 : prev + 1));
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (dropdownItems.length > 0) {
        setActiveIdx((prev) => (prev - 1 < 0 ? dropdownItems.length - 1 : prev - 1));
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  };

  const renderedSuggestions = [];
  const renderedProducts = [];

  dropdownItems.forEach((item, globalIdx) => {
    if (item.type === "suggestion") {
      renderedSuggestions.push({ ...item, globalIdx });
    } else {
      renderedProducts.push({ ...item, globalIdx });
    }
  });

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <button
          type="button"
          onClick={performSearch}
          aria-label={t("nav.search_placeholder")}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <Search size={16} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIdx(-1);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t("nav.search_placeholder")}
          className="w-full bg-gray-50 dark:bg-[#232326] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-full pl-10 pr-10 py-2.5 text-sm outline-none focus:border-gray-400 dark:focus:border-gray-500"
        />

        {query && (
          <button
            onClick={() => {
              setQuery("");
              setDebouncedQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {open && query && (
        <div className="absolute top-full mt-3 left-0 w-full bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden z-50">
          {dropdownItems.length === 0 ? (
            <div className="py-10 text-center text-gray-400 dark:text-gray-500 text-sm">
              {t("nav.no_products_found")}
            </div>
          ) : (
            <>
              {/* Section 1: Suggestions */}
              {renderedSuggestions.length > 0 && (
                <>
                  <div className="px-5 py-3 bg-gray-50 dark:bg-[#232326] text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t("nav.suggestions")}
                  </div>
                  {renderedSuggestions.map((item) => (
                    <div
                      key={`sug-${item.globalIdx}`}
                      onClick={() => handleSelection(item)}
                      onMouseEnter={() => setActiveIdx(item.globalIdx)}
                      className={`px-5 py-3 cursor-pointer text-sm border-b border-gray-100 dark:border-gray-700/50 flex items-center transition
                        ${activeIdx === item.globalIdx ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white" : "hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300"}`}
                    >
                      <Search size={14} className="mr-2 text-gray-400 dark:text-gray-500 shrink-0" />
                      {item.label}
                    </div>
                  ))}
                </>
              )}

              {/* Section 2: Products */}
              {renderedProducts.length > 0 && (
                <>
                  <div className="px-5 py-3 bg-gray-50 dark:bg-[#232326] text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {t("nav.products")}
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {renderedProducts.map((item) => (
                      <div
                        key={`prod-${item.globalIdx}`}
                        onClick={() => handleSelection(item)}
                        onMouseEnter={() => setActiveIdx(item.globalIdx)}
                        className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition border-b border-gray-100 dark:border-gray-700/50
                          ${activeIdx === item.globalIdx ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800/60"}`}
                      >
                        <img src={item.img} alt={item.model} className="w-12 h-12 object-contain shrink-0" />

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">{item.model}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {item.categoryLabel}
                            {item.color && ` · ${item.color}`}
                          </p>
                          {item.price && (
                            <p className="text-sm font-semibold mt-0.5 text-gray-900 dark:text-gray-100">
                              {t("nav.from_price", { price: Number(item.price).toLocaleString() })}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;