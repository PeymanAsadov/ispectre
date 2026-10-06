import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import newProducts from "../data/newproducts";
import iphones from "../data/iphones";
import macbooks from "../data/macbook";
import iPad from "../data/ipad";
import Watches from "../data/watch";
import { useTranslation } from "react-i18next";
import { addToCart } from "../utils/cartUtils";

// ───────────── HELPERS ─────────────
const parsePrice = (value) => {
  if (typeof value === "number") return value;
  const n = parseFloat(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

// Data strukturundan asılı olmayaraq ən aşağı qiyməti tapır ("price" açarı olan bütün yerlərdə axtarır)
const findMinPrice = (node) => {
  let min = Infinity;
  const walk = (value) => {
    if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, v]) => {
        if (key === "price") {
          const n = parsePrice(v);
          if (n > 0 && n < min) min = n;
        } else {
          walk(v);
        }
      });
    }
  };
  walk(node);
  return min === Infinity ? 0 : Math.round(min);
};

// ───────────── STATIC DATA (no text here, all text comes from locale files) ─────────────

const heroBase = [
  {
    id: 1,
    brand: "iPhone 17 Pro Max",
    subtitle: "2 999 ₼",
    link: "/iphone17",
    image: "https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-17-pro-max-cosmic-orange-b?wid=400&hei=400&fmt=webp-alpha",
    bg: "from-amber-500/10 via-zinc-100 to-zinc-200 dark:from-amber-950/20 dark:via-zinc-900 dark:to-black",
  },
  {
    id: 2,
    brand: "Apple MacBook Pro M5",
    subtitle: "4 200 ₼",
    link: "/macbook-pro",
    image: "https://storage.irshad.az/products/resized/y2iE1eNm7GjzCC00aWLg9r2YtWB2pA0toPdse3d5.png",
    bg: "from-blue-500/10 via-zinc-100 to-zinc-200 dark:from-blue-950/20 dark:via-zinc-900 dark:to-black",
  },
  {
    id: 3,
    brand: "AirPods Max",
    subtitle: "1 519 ₼",
    link: "/airpods-max",
    image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/ca/92/ca92de81804d93d655f5b235cf8c0a6a/260317150014868397.webp",
    bg: "from-cyan-500/10 via-zinc-100 to-zinc-200 dark:from-cyan-950/20 dark:via-zinc-900 dark:to-black",
  },
  {
    id: 4,
    brand: "Apple Vision Pro",
    subtitle: "6 499 ₼",
    link: "/vision",
    image: "https://alasil.ae/cdn/shop/files/apple-vision-pro-glass-front.webp?v=1774533974&width=1000",
    bg: "from-purple-500/10 via-zinc-100 to-zinc-200 dark:from-purple-950/20 dark:via-zinc-900 dark:to-black",
  },
];

const promoBase = [
  {
    id: 1,
    ctaLink: "/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
    gradient: "from-blue-600/10 via-indigo-600/5 to-transparent dark:from-blue-600/20 dark:via-indigo-900/10",
  },
  {
    id: 2,
    ctaLink: "/",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&auto=format&fit=crop&q=80",
    gradient: "from-purple-600/10 via-pink-600/5 to-transparent dark:from-purple-600/20 dark:via-pink-900/10",
  },
  {
    id: 3,
    ctaLink: "/",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    gradient: "from-emerald-600/10 via-teal-600/5 to-transparent dark:from-emerald-600/20 dark:via-teal-900/10",
  },
];

const servicesBase = [
  { id: 1, icon: "⚡" },
  { id: 2, icon: "💳" },
  { id: 3, icon: "🛡️" },
  { id: 4, icon: "🔄" },
];

const featuredBase = {
  large: {
    price: "1 799 ₼",
    image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/72/38/7238e36f7f59ad1c9824aa518449cba0/260305150018795522.webp",
    link: "/macbook-neo",
  },
  small: [
    {
      price: "1 519 ₼",
      image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/ca/92/ca92de81804d93d655f5b235cf8c0a6a/260317150014868397.webp",
      link: "/airpods",
    },
    {
      price: "3 250 ₼",
      image: "https://storage.irshad.az/products/resized/EpEkMw1yMU6081k2meTvefdTdr7LxXbuB7Eq6sZV.png",
      link: "/iphone17",
    },
  ],
};

const carouselBase = [
  {
    id: 101,
    price: "2 490 ₼",
    category: "iPhone",
    image: "https://storage.irshad.az/products/resized/EpEkMw1yMU6081k2meTvefdTdr7LxXbuB7Eq6sZV.png",
    link: "/iphone17",
  },
  {
    id: 102,
    price: "1 990 ₼",
    category: "iPhone",
    image: "https://cuongmobilecantho.com/wp-content/uploads/2025/03/01-510x510.png",
    link: "/iphone15",
  },
  {
    id: 103,
    price: "2 799 ₼",
    category: "iPhone",
    image: "https://assets.smartelectronics.az/Assets/cdn-cgi?path=4c921eb1-6eef-4619-bcb6-f0e42394806a.webp",
    link: "/iphone16",
  },
  {
    id: 104,
    price: "3 999 ₼",
    category: "Mac",
    image: "https://epalle.co.il/wp-content/uploads/2023/11/macbook-pro-16-m3-space-black-0.webp",
    link: "/macbook-pro",
  },
  {
    id: 105,
    price: "1 899 ₼",
    category: "iPad",
    image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/db/49/db49ff604ed6cdafc401f0e6c6d78d75/260303190021288559.webp",
    link: "/ipad",
  },
];

function Home() {
  const { t } = useTranslation();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [addedIds, setAddedIds] = useState(new Set());
  const [toastMessage, setToastMessage] = useState(null);

  const scrollContainerRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const addedTimersRef = useRef({});

  // ───────────── Translated content (merged with static data) ─────────────
  const list = (key) => {
    const v = t(key, { returnObjects: true });
    return Array.isArray(v) ? v : [];
  };

  const heroT = list("home.hero");
  const promoT = list("home.promo_blocks");
  const servicesT = list("home.services");
  const featuredT = list("home.featured");
  const carouselT = list("home.carousel");

  const heroSlides = heroBase.map((s, i) => ({ ...s, ...(heroT[i] || {}) }));
  const promoBlocks = promoBase.map((s, i) => ({ ...s, ...(promoT[i] || {}) }));
  const services = servicesBase.map((s, i) => ({ ...s, ...(servicesT[i] || {}) }));
  const featuredProducts = {
    large: { ...featuredBase.large, ...(featuredT[0] || {}) },
    small: featuredBase.small.map((s, i) => ({ ...s, ...(featuredT[i + 1] || {}) })),
  };
  const carouselProducts = carouselBase.map((s, i) => ({ ...s, ...(carouselT[i] || {}) }));

  // Səbətə əlavə et + bildiriş (cartUtils istifadə edir, "cart-updated" eventini özü göndərir)
  const triggerAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const title = product.title || product.name || "";

    addToCart({
      id: product.id ?? title,
      model: title,
      color: product.color || "Standart",
      size: product.storage || product.variant || "Default",
      price: parsePrice(product.price),
      img: product.image || product.img || "",
      qty: 1,
    });

    // Düymə 2 saniyə yaşıl "Added" qalır, sonra əvvəlki görünüşə qayıdır
    const addedKey = product.id || product.title;
    setAddedIds((prev) => new Set([...prev, addedKey]));

    if (addedTimersRef.current[addedKey]) clearTimeout(addedTimersRef.current[addedKey]);
    addedTimersRef.current[addedKey] = setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(addedKey);
        return next;
      });
      delete addedTimersRef.current[addedKey];
    }, 2000);

    setToastMessage(t("home.toast_added", { title }));

    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 2600);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      Object.values(addedTimersRef.current).forEach(clearTimeout);
    };
  }, []);

  // Hero auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBase.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const fromPrice = (value) => (value > 0 ? t("home.from_category_price", { price: `${value} ₼` }) : "");

  const categories = [
    {
      id: 1,
      name: t("nav.mac"),
      image:
        macbooks[0]?.colors?.[0]?.images?.[0]?.url ||
        "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/72/38/7238e36f7f59ad1c9824aa518449cba0/260305150018795522.webp",
      priceRange: fromPrice(findMinPrice(macbooks)),
      link: "/macbook-air",
      badge: "M5 Series",
    },
    {
      id: 2,
      name: t("nav.iphone"),
      image:
        "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/product/41/49/4149198f1713e718ba920b85acffb4f4/250915140038367093.webp",
      priceRange: fromPrice(findMinPrice(iphones)),
      link: "/iphone",
      badge: "Titanium",
    },
    {
      id: 3,
      name: t("nav.ipad"),
      image:
        iPad[0]?.colors?.[0]?.images?.[0]?.url ||
        "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/db/49/db49ff604ed6cdafc401f0e6c6d78d75/260303190021288559.webp",
      priceRange: fromPrice(findMinPrice(iPad)),
      link: "/ipad",
      badge: "M4 Ultra",
    },
    {
      id: 4,
      name: t("nav.watch"),
      image:
        Watches[0]?.colors?.[0]?.images?.[0]?.url ||
        "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/bc/3f/bc3fb7567983ebcddc53de661d353ba9/store_card_13_accessories_nav_202603_1_1.webp",
      priceRange: fromPrice(findMinPrice(Watches)),
      link: "/watch",
      badge: "Series 11",
    },
    {
      id: 5,
      name: t("nav.airpods"),
      image:
        "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/ca/92/ca92de81804d93d655f5b235cf8c0a6a/260317150014868397.webp",
      priceRange: fromPrice(289),
      link: "/airpods",
      badge: "Max 2",
    },
    {
      id: 6,
      name: t("nav.tv_home"),
      image:
        "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/h:120/rt:fill/plain/s3://cms/category/3e/88/3e883cdf3760b0cb09265079691bb409/6lob_tv_home.webp",
      priceRange: fromPrice(199),
      link: "/tv-home",
      badge: "4K HDR",
    },
    {
      id: 7,
      name: t("nav.accessories"),
      image:
        "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/h:120/rt:fill/plain/s3://cms/category/bc/3f/bc3fb7567983ebcddc53de661d353ba9/store_card_13_accessories_nav_202603_1_1.webp",
      priceRange: fromPrice(79),
      link: "/accessories",
      badge: "MagSafe",
    },
  ];

  // Filter tabs: "key" is used for filtering, "label" is translated
  const filterTabs = [
    { key: "All", label: t("home.filters.all") },
    { key: "Mac", label: t("nav.mac") },
    { key: "iPhone", label: t("nav.iphone") },
    { key: "iPad", label: t("nav.ipad") },
    { key: "AirPods", label: t("nav.airpods") },
  ];

  const filteredProducts = newProducts.filter((p) => {
    if (activeCategoryFilter === "All") return true;
    return p.title.toLowerCase().includes(activeCategoryFilter.toLowerCase());
  });

  const getProductLink = (title) => {
    if (title.includes("MacBook Neo")) return "/macbook-neo";
    if (title.includes("MacBook Air")) return "/macbook-air";
    if (title.includes("MacBook Pro M5")) return "/macbook-pro";
    if (title.includes("iPad")) return "/ipad";
    if (title.includes("iPhone")) return "/iphone";
    if (title.includes("AirPods")) return "/airpods";
    return "/";
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  const carouselScroll = (direction) => {
    carouselContainerRef.current?.scrollBy({
      left: direction === "next" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-[#fafafa] dark:bg-[#08080a] text-zinc-900 dark:text-zinc-100 min-h-screen font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300 overflow-x-hidden">

      {/* Toast: navbar-dan və səbət düyməsindən aşağıda */}
      {toastMessage && (
        <div className="pointer-events-none fixed z-[60] top-32 md:top-36 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 w-[calc(100%-2rem)] max-w-sm animate-fadeIn">
          <div className="flex items-center gap-3 bg-zinc-900/95 dark:bg-white/95 backdrop-blur-xl text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-white/10 dark:border-black/10">
            <span className="w-6 h-6 flex-none rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">✓</span>
            <p className="text-xs font-semibold tracking-wide line-clamp-2">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden min-h-[36rem] sm:min-h-[32rem] md:min-h-[34rem]">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${i === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"
              }`}
          >
            <div className={`w-full h-full bg-gradient-to-br ${slide.bg} flex items-center`}>
              <div className="max-w-[1240px] mx-auto w-full px-5 sm:px-8 md:px-12 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-5 md:gap-8 pt-6 pb-16 md:py-8">

                {/* Text Content */}
                <div className="w-full md:w-[50%] text-center md:text-left space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/10">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-zinc-600 dark:text-zinc-300">
                      {slide.badge}
                    </span>
                  </div>

                  <h1 className="text-[1.75rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white drop-shadow-sm">
                    {slide.tagline}
                  </h1>

                  <p className="text-base sm:text-xl font-semibold text-zinc-700 dark:text-zinc-300">
                    {slide.brand} · <span className="text-blue-600 dark:text-blue-400">{slide.subtitle}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto md:mx-0 leading-relaxed">
                    {slide.promo}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
                    <Link
                      to={slide.link}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 text-xs sm:text-sm font-semibold px-7 py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
                    >
                      <span>{slide.cta}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>

                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 max-w-[16rem] sm:max-w-none">
                      {slide.note}
                    </span>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="w-full md:w-[50%] flex justify-center items-center relative group">
                  <div className="absolute inset-0 bg-blue-500/10 rounded-full filter blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                  <img
                    src={slide.image}
                    alt={slide.brand}
                    className="max-h-[190px] sm:max-h-[300px] md:max-h-[400px] w-auto object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* Hero Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-white/40 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 dark:border-white/10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${i === currentSlide
                ? "bg-zinc-900 dark:bg-white w-7 h-2 shadow-sm"
                : "bg-zinc-400/50 dark:bg-zinc-600/50 w-2 h-2 hover:bg-zinc-700 dark:hover:bg-zinc-300"
                }`}
              aria-label={t("home.slide_n", { n: i + 1 })}
            />
          ))}
        </div>
      </section>

      {/* ANNOUNCEMENT BANNER */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-y border-zinc-200/80 dark:border-zinc-800/80 py-2.5 text-center text-[11px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-300 px-4 flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 flex-none rounded-full bg-emerald-500"></span>
        <span>{t("home.announcement")}</span>
      </div>

      {/* EXPLORE APPLE CATEGORIES */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 sm:pt-12 pb-6 sm:pb-8">
        <div className="mb-5 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {t("home.categories_title")}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md">
            {t("home.categories_subtitle")}
          </p>
        </div>

        {/* Mobil: 2 sütun, sonuncu kart tam en. Tablet: 4. Desktop: 7 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {categories.map((cat, idx) => {
            const isLast = idx === categories.length - 1;
            return (
              <Link
                key={cat.id}
                to={cat.link}
                className={`group relative flex flex-col p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.98] sm:hover:-translate-y-1 transition-all duration-300 ease-out ${isLast ? "col-span-2 sm:col-span-1" : ""
                  }`}
              >
                {/* Şəkil sahəsi */}
                <div className="relative flex items-center justify-center h-40 sm:h-40 rounded-xl sm:rounded-2xl bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-800/60 dark:to-zinc-900/30 overflow-hidden">
                  <span className="absolute top-2 left-2 text-[9px] font-semibold tracking-wide px-2 py-0.5 rounded-full bg-white/90 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/60 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors">
                    {cat.badge}
                  </span>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-28 sm:h-28 w-auto max-w-[85%] object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Mətn */}
                <div className="flex items-center justify-between gap-2 px-1 pt-3 pb-1">
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cat.name}
                    </h3>
                    {cat.priceRange && (
                      <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                        {cat.priceRange}
                      </p>
                    )}
                  </div>
                  <span className="flex-none w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SEE WHAT'S NEW */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {t("home.see_whats_new")}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {t("home.new_subtitle")}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-zinc-200/60 dark:bg-zinc-900/80 backdrop-blur-md p-1.5 rounded-full border border-zinc-300/50 dark:border-zinc-800/80 overflow-x-auto scrollbar-hide max-w-full self-start">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategoryFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${activeCategoryFilter === tab.key
                  ? "bg-white dark:bg-zinc-100 text-zinc-900 dark:text-zinc-900 shadow-md font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-full items-center justify-center hover:scale-110 active:scale-95 transition-all text-zinc-700 dark:text-zinc-200"
            aria-label={t("home.prev")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-6 pt-2 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {filteredProducts.map((product) => {
              const isAdded = addedIds.has(product.id || product.title);
              return (
                <div
                  key={product.id}
                  className="group relative flex-none w-[250px] sm:w-[300px] snap-start flex flex-col justify-between bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
                >
                  <div className="flex items-center justify-between w-full mb-3 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                      {t("home.new_release")}
                    </span>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="text-[11px] font-semibold text-zinc-500 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 bg-zinc-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-full transition-colors flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      {t("home.quick_view")}
                    </button>
                  </div>

                  <Link to={getProductLink(product.title)} className="block relative aspect-square mb-4 overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 p-4 flex items-center justify-center group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800/70 transition-colors">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  <div className="space-y-2">
                    <Link to={getProductLink(product.title)}>
                      <h3 className="font-bold text-base text-zinc-900 dark:text-white leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 h-8 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60">
                      <div>
                        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t("home.price")}</p>
                        <p className="text-base font-extrabold text-zinc-900 dark:text-white">
                          {product.price} ₼
                        </p>
                      </div>

                      <button
                        onClick={(e) => triggerAddToCart(e, product)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-md active:scale-90 ${isAdded
                          ? "bg-emerald-600 text-white shadow-emerald-500/20"
                          : "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                          }`}
                      >
                        {isAdded ? (
                          <>
                            <span>{t("home.added")}</span>
                            <span className="text-sm">✓</span>
                          </>
                        ) : (
                          <>
                            <span>{t("home.add")}</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-full items-center justify-center hover:scale-110 active:scale-95 transition-all text-zinc-700 dark:text-zinc-200"
            aria-label={t("home.next")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* PROMOTIONAL BENTO BANNER SECTIONS */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-5 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          {t("home.why_choose")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {promoBlocks.map((block) => (
            <div
              key={block.id}
              className="group relative overflow-hidden rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${block.gradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10 space-y-3">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-3 py-1 rounded-full">
                  {block.tag}
                </span>

                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white pt-1">
                  {block.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {block.desc}
                </p>
              </div>

              <div className="relative z-10 pt-5 sm:pt-6">
                <div className="w-full h-36 sm:h-44 rounded-2xl overflow-hidden mb-4 sm:mb-5 border border-zinc-200/50 dark:border-zinc-800/50">
                  <img
                    src={block.image}
                    alt={block.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <Link
                  to={block.ctaLink}
                  className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <span>{block.cta}</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREMIUM SERVICES */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <h2 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-5 sm:mb-6">
          {t("home.premium_services")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group flex sm:block items-start gap-4 p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-10 h-10 flex-none rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-xl sm:mb-4 group-hover:scale-110 transition-transform">
                {svc.icon}
              </div>
              <div>
                <p className="text-[10px] font-extrabold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-1">
                  {svc.label}
                </p>
                <p className="text-xs font-semibold leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {svc.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCT SHOWCASE */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 group relative rounded-3xl bg-gradient-to-br from-zinc-100 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900/90 dark:to-black backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                {featuredProducts.large.badge}
              </span>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {featuredProducts.large.badgeSub}
              </span>
            </div>

            <div className="space-y-2 max-w-lg">
              <h3 className="text-xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {featuredProducts.large.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {featuredProducts.large.desc}
              </p>
            </div>

            <div className="my-5 sm:my-6 flex justify-center">
              <img
                src={featuredProducts.large.image}
                alt={featuredProducts.large.title}
                loading="lazy"
                className="h-44 sm:h-64 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-5 sm:pt-6">
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase">{t("home.starting_at")}</p>
                <p className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-white">
                  {featuredProducts.large.price}
                </p>
              </div>

              <Link
                to={featuredProducts.large.link}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-blue-500/25 active:scale-95 transition-all"
              >
                {t("home.buy_now")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            {featuredProducts.small.map((item, idx) => (
              <div
                key={idx}
                className="group flex-1 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-6 flex items-center justify-between gap-4 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <span className="inline-block bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-orange-200 dark:border-orange-950">
                    {item.badge}
                  </span>
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
                    {item.price}
                  </p>
                  <Link
                    to={item.link}
                    className="inline-block bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[11px] font-bold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                  >
                    {t("home.quick_order")}
                  </Link>
                </div>

                <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center flex-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CAROUSEL - "Magic on the Outside" */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {t("home.magic_outside")}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              {t("home.magic_subtitle")}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 flex-none">
            <button
              onClick={() => carouselScroll("prev")}
              className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-sm"
              aria-label={t("home.prev")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => carouselScroll("next")}
              className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-sm"
              aria-label={t("home.next")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div
          ref={carouselContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {carouselProducts.map((item) => {
            const isAdded = addedIds.has(item.id);
            return (
              <div
                key={item.id}
                className="group flex-none w-[260px] sm:w-[320px] snap-start rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    {item.sub}
                  </span>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>
                </div>

                <div className="my-5 sm:my-6 aspect-square bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-4 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/60 pt-4">
                  <p className="text-base font-extrabold text-zinc-900 dark:text-white">
                    {item.price}
                  </p>

                  <button
                    onClick={(e) => triggerAddToCart(e, item)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 shadow-md active:scale-90 ${isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900"
                      }`}
                  >
                    {isAdded ? `${t("home.added")} ✓` : t("home.quick_buy")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              aria-label={t("home.close")}
            >
              ✕
            </button>

            <div className="flex items-center gap-2 pr-10">
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {t("home.quick_preview")}
              </span>
              <span className="text-xs text-zinc-400 font-semibold uppercase truncate">{t("home.official_specs")}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
              <div className="w-36 h-36 sm:w-44 sm:h-44 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-3 flex items-center justify-center flex-none border border-zinc-100 dark:border-zinc-800">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="max-h-32 sm:max-h-36 w-auto object-contain"
                />
              </div>

              <div className="space-y-3 flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-white leading-snug">
                  {quickViewProduct.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {quickViewProduct.description}
                </p>
                <div className="pt-1">
                  <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                    {quickViewProduct.price} ₼
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase">{t("home.chipset")}</p>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t("home.chipset_value")}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase">{t("home.display")}</p>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t("home.display_value")}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase">{t("home.warranty")}</p>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{t("home.warranty_value")}</p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-1 sm:pt-2">
              <Link
                to={getProductLink(quickViewProduct.title)}
                className="flex-1 text-center bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-bold py-3 rounded-full transition-colors"
                onClick={() => setQuickViewProduct(null)}
              >
                {t("home.view_details")}
              </Link>
              <button
                onClick={(e) => {
                  triggerAddToCart(e, quickViewProduct);
                  setQuickViewProduct(null);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-full shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                {t("home.add_to_bag")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;