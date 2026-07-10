import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import newProducts from "../data/newproducts";
import iphones from "../data/iphones";
import macbooks from "../data/macbook";
import iPad from "../data/ipad";
import Watches from "../data/watch";
import { useTranslation } from "react-i18next";

  //  HERO BANNER DATA


const heroSlides = [
  {
    id: 1,
    brand: "iPhone 17 Pro Max",
    tagline: "Titanium Camera. Action.",
    subtitle: "2 999 ₼",
    promo: "Get up to 300 ₼ trade-in credit towards your new iPhone.",
    note: "Available in Cosmic Orange and Desert Titanium",
    cta: "Buy Now",
    link: "/iphone17",
    image: "https://ss7.vzw.com/is/image/VerizonWireless/apple-iphone-17-pro-max-cosmic-orange-b?wid=400&hei=400&fmt=webp-alpha",
    bg: "bg-[#f5f5f7] dark:bg-gray-900",
    textDark: true,
  },
  {
    id: 2,
    brand: "Apple MacBook Pro M5",
    tagline: "Mind-blowing. Power-loaded.",
    subtitle: "4 200 ₼",
    promo: "Built for pro workflows. Experience up to 22 hours of battery life.",
    note: "Available in Space Black and Silver",
    cta: "Buy Now",
    link: "/macbook-pro",
    image: "https://storage.irshad.az/products/resized/y2iE1eNm7GjzCC00aWLg9r2YtWB2pA0toPdse3d5.png",
    bg: "bg-[#f5f5f7] dark:bg-gray-900",
    textDark: true,
  },
  {
    id: 3,
    brand: "AirPods Max",
    tagline: "Symphony in Blue. Sound remastered.",
    subtitle: "1 519 ₼",
    promo: "Get 6 months of Apple Music for free with your new AirPods Max Sky Blue.",
    note: "Now with USB-C and Pro-level Active Noise Cancellation",
    cta: "Buy Now",
    link: "/airpods-max",
    image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/ca/92/ca92de81804d93d655f5b235cf8c0a6a/260317150014868397.webp",
    bg: "bg-[#eef4f8] dark:bg-slate-900",
    textDark: true,
  },
  {
    id: 4,
    brand: "Apple Vision Pro",
    tagline: "Welcome to the era of spatial computing.",
    subtitle: "6 499 ₼",
    promo: "Experience digital content that blends seamlessly with your physical space.",
    note: "Demo sessions available in-store now",
    cta: "Learn more",
    link: "/vision",
    image: "https://alasil.ae/cdn/shop/files/apple-vision-pro-glass-front.webp?v=1774533974&width=1000",
    bg: "bg-[#f3f0f7] dark:bg-purple-950/40",
    textDark: true,
  },
  {
    id: 5,
    brand: "MacBook Air M5",
    tagline: "Sunlit. Supercharged.",
    subtitle: "2 600 ₼",
    promo: "The thinnest MacBook Air ever. With M5.",
    note: "Now available",
    cta: "Explore",
    link: "macbook-air",
    image: "https://www.apple.com/v/macbook-air/y/images/overview/hero/hero_static__c9sislzzicq6_large.png",
    bg: "bg-[#f5f5f7] dark:bg-gray-900",
    textDark: true,
  },
];

  //  PROMO BLOCKS
const promoBlocks = [
  {
    id: 1,
    title: "Trade-In",
    desc: "Upgrade your MacBook or iPhone for the best price. Trade In your old device and get a discount.",
    cta: "Submit",
    ctaLink: "/",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
    imageLeft: false,
  },
  {
    id: 2,
    title: "Loyalty Program",
    desc: "Get exclusive benefits — get more bonuses with every purchase. Points can be exchanged for up to 10%.",
    cta: "Submit",
    ctaLink: "/",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&auto=format&fit=crop&q=80",
    imageLeft: true,
  },
  {
    id: 3,
    title: "Blog",
    desc: "News, product releases, lifestyle, company stories and innovations.",
    cta: "Submit",
    ctaLink: "/",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    imageLeft: false,
  },
];

  //  SERVICES
const services = [
  {
    id: 1,
    label: "DELIVERY AND PICKUP",
    title: "Order online and get home delivery.",
    color: "text-gray-800 dark:text-gray-200",
  },
  {
    id: 2,
    label: "FINANCING",
    title: "Get special financing. Pay over time, interest-free.",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: 3,
    label: "SALE",
    title: "Find low everyday prices and buy online for delivery or in-store pick-up.",
    color: "text-gray-800 dark:text-gray-200",
  },
  {
    id: 4,
    label: "TRADE-IN",
    title: "Upgrade your iPhone 11 / iPhone 12.",
    color: "text-gray-800 dark:text-gray-200",
  },
];

  //  FEATURED PRODUCTS

const featuredProducts = {
  large: {
    badge: "SALE",
    badgeSub: "10% · 15% · 20%",
    title: 'MacBook Neo 13" A18 Pro',
    desc: "Lightning fast. 13-inch display, 512GB.",
    price: "1 799 ₼",
    image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/72/38/7238e36f7f59ad1c9824aa518449cba0/260305150018795522.webp",
    link: "/macbook-neo",
  },
  small: [
    {
      badge: "SALE",
      badgeSub: "10% · 15% · 20%",
      title: "Headphones APPLE AirPods Max 2",
      desc: "Listening. Remastered.",
      price: "1 519 ₼",
      image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/category/ca/92/ca92de81804d93d655f5b235cf8c0a6a/260317150014868397.webp",
      link: "/airpods",
    },
    {
      badge: "SALE",
      badgeSub: "10% · 20% · 30%",
      title: "iPhone 17 Pro Max",
      desc: "Feature stacked. Value packed.",
      price: "3250 ₼",
      image: "https://storage.irshad.az/products/resized/EpEkMw1yMU6081k2meTvefdTdr7LxXbuB7Eq6sZV.png",
      link: "/iphone17",
    },
  ],
};

  //  PRODUCT CAROUSEL DATA

  const carouselProducts = [
  {
    id: 1,
    sub: "13.6 IN · 256GB · ORANGE",
    title: "iPhone 17 Pro, 256 GB, Cosmic Orange",
    price: "5 390 ₼",
    image: iphones[0]?.colors?.[0]?.img || "https://storage.irshad.az/products/resized/EpEkMw1yMU6081k2meTvefdTdr7LxXbuB7Eq6sZV.png",
    link: "/iphone17",
  },
  {
    id: 2,
    sub: "6.1 IN · 128GB · Gray",
    title: "iPhone 15 Pro, 256 GB, Gray",
    price: "1 990 ₼",
    image: iphones[1]?.colors?.[1]?.img || "https://cuongmobilecantho.com/wp-content/uploads/2025/03/01-510x510.png",
    link: "/iphone15",
  },
  {
    id: 3,
    sub: "6.7 IN · 128GB · TEAL",
    title: "iPhone 16 Pro Max, 512 GB, Teal",
    price: "2 799 ₼",
    image: iphones[2]?.colors?.[2]?.img || "https://assets.smartelectronics.az/Assets/cdn-cgi?path=4c921eb1-6eef-4619-bcb6-f0e42394806a.webp",
    link: "/iphone16",
  },
  {
    id: 4,
    sub: "13.6 IN · 256GB BLACK",
    title: "MacBook PRO M5",
    price: "3 999 ₼",
    image: macbooks[3]?.colors?.[0]?.img || "https://epalle.co.il/wp-content/uploads/2023/11/macbook-pro-16-m3-space-black-0.webp",
    link: "/macbook-pro",
  },
];

  //  MAIN COMPONENT

   function Home() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [carouselIdx, setCarouselIdx] = useState(0);
  const scrollContainerRef = useRef(null);
  const categoryScrollRef = useRef(null);

  // ── Arrow visibility state (left arrow hidden until scrolled, right arrow hidden at the end) ──
  const [newArrows, setNewArrows] = useState({ left: false, right: true });
  const [catArrows, setCatArrows] = useState({ left: false, right: true });

  const updateNewArrows = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setNewArrows({
      left: el.scrollLeft > 5,
      right: el.scrollLeft < maxScroll - 5,
    });
  };

  const updateCatArrows = () => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCatArrows({
      left: el.scrollLeft > 5,
      right: el.scrollLeft < maxScroll - 5,
    });
  };

  // Eased smooth-scroll (same 500ms feel as the "magic on the outside" carousel's slide transition)
  const smoothScrollBy = (el, distance, duration = 500) => {
    if (!el) return;
    const start = el.scrollLeft;
    const startTime = performance.now();
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollLeft = start + distance * easeInOutQuad(progress);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const categoryScrollLeft = () => smoothScrollBy(categoryScrollRef.current, -160);
  const categoryScrollRight = () => smoothScrollBy(categoryScrollRef.current, 160);

  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
      updateNewArrows();
      updateCatArrows();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Re-check arrow visibility once images/content have laid out (widths depend on loaded images)
  useEffect(() => {
    updateNewArrows();
    updateCatArrows();
    const t1 = setTimeout(() => {
      updateNewArrows();
      updateCatArrows();
    }, 500);
    return () => clearTimeout(t1);
  }, []);

  const translatedHeroSlides = heroSlides.map((slide, i) => ({
    ...slide,
    tagline: t(`home.hero.${i}.tagline`),
    promo: t(`home.hero.${i}.promo`),
    note: t(`home.hero.${i}.note`),
    cta: t(`home.hero.${i}.cta`)
  }));

  const translatedPromoBlocks = promoBlocks.map((block, i) => ({
    ...block,
    title: t(`home.promo_blocks.${i}.title`),
    desc: t(`home.promo_blocks.${i}.desc`),
    cta: t(`home.promo_blocks.${i}.cta`)
  }));

  const translatedServices = services.map((svc, i) => ({
    ...svc,
    label: t(`home.services.${i}.label`),
    title: t(`home.services.${i}.title`)
  }));

  const translatedFeaturedLarge = {
    ...featuredProducts.large,
    badge: t('home.sale'),
    title: t('home.featured.0.title'),
    desc: t('home.featured.0.desc')
  };

  const translatedFeaturedSmall = featuredProducts.small.map((item, i) => ({
    ...item,
    badge: t('home.sale'),
    title: t(`home.featured.${i + 1}.title`),
    desc: t(`home.featured.${i + 1}.desc`)
  }));

  const translatedCarousel = carouselProducts.map((item, i) => ({
    ...item,
    sub: t(`home.carousel.${i}.sub`),
    title: t(`home.carousel.${i}.title`)
  }));

  /* ── Price helpers ── */
  const getMinPrice = (dataArray, type = "phone") => {
    let minPrice = Infinity;

    dataArray.forEach(item =>
      item.colors?.forEach(color => {
        const variantsList = type === "watch" ? color.storage : color.variants;
        variantsList?.forEach(variant => {
          if (variant.price < minPrice) minPrice = variant.price;
        });
      })
    );

    return minPrice === Infinity ? 0 : Math.round(minPrice);
  };

  /* ── Categories ── */
  const categories = [
    {
      id: 1, name: "Mac",
      image: macbooks[0]?.colors?.[0]?.images?.[0]?.url,
      priceRange: t('home.from_category_price', { price: getMinPrice(macbooks, "macbook") + " ₼" }),
      link: "/macbook-air",
    },
    {
      id: 2, name: "iPhone",
      image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/w:512/plain/s3://cms/product/41/49/4149198f1713e718ba920b85acffb4f4/250915140038367093.webp",
      priceRange: t('home.from_category_price', { price: getMinPrice(iphones, "iphone") + " ₼" }),
      link: "/iphone",
    },
    {
      id: 3, name: "iPad",
      image: iPad[0]?.colors?.[0]?.images?.[0]?.url,
      priceRange: t('home.from_category_price', { price: getMinPrice(iPad, "ipad") + " ₼" }),
      link: "/ipad",
    },
    {
      id: 4, name: "Watch",
      image: Watches[0]?.colors?.[0]?.images?.[0]?.url,
      priceRange: t('home.from_category_price', { price: getMinPrice(Watches, "watch") + " ₼" }),
      link: "/watch",
    },
    {
      id: 5, name: "AirPods",
      image: newProducts.find(p => p.title.includes("AirPods"))?.image || "https://www.macysdigital.com/wp-content/uploads/2025/09/Apple-iPhone-17-Pro-Max-256GB-Plata-A3526.png",
      priceRange: t('home.from_category_price', { price: "289 ₼" }),
      link: "/airpods",
    },
    {
      id: 6, name: "TV & Home",
      image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/h:120/rt:fill/plain/s3://cms/category/3e/88/3e883cdf3760b0cb09265079691bb409/6lob_tv_home.webp",
      priceRange: t('home.from_category_price', { price: "199 ₼" }),
      link: "/tv-home",
    },
    {
      id: 7, name: "Accessories",
      image: "https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/h:120/rt:fill/plain/s3://cms/category/bc/3f/bc3fb7567983ebcddc53de661d353ba9/store_card_13_accessories_nav_202603_1_1.webp",
      priceRange: t('home.from_category_price', { price: "79 ₼" }),
      link: "/accessories",
    },
  ];

  const getProductLink = (title) => {
    if (title.includes("MacBook Neo")) return "/macbook-neo";
    if (title.includes("MacBook Air")) return "/macbook-air";
    if (title.includes("MacBook Pro M5")) return "/macbook-pro";
    if (title.includes("MacBook") && title.includes("M5")) return "/macbook-m5";
    if (title.includes("iPad")) return "/ipad";
    if (title.includes("iPhone")) return "/iphone";
    if (title.includes("AirPods")) return "/airpods";
    return "/";
  };

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  /* ── "See what's new" scroll helpers ── */
  const scrollLeft = () => smoothScrollBy(scrollContainerRef.current, -320);
  const scrollRight = () => smoothScrollBy(scrollContainerRef.current, 320);

  /* ── Carousel helpers ── */
  const maxIdx = carouselProducts.length - visibleCount;
  const carouselPrev = () => setCarouselIdx(i => Math.max(0, i - 1));
  const carouselNext = () => setCarouselIdx(i => Math.min(maxIdx, i + 1));

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-300">

          {/* HERO SECTION */}

<div className="relative w-full overflow-hidden pt-6 sm:pt-0 min-h-[37rem] sm:min-h-[32rem] md:min-h-[30rem] lg:min-h-[31.25rem]">        {translatedHeroSlides.map((slide, i) => (
          <Link
            key={slide.id}
            to={slide.link}
             className={`absolute inset-0 flex items-center transition-opacity duration-700 ${slide.bg} ${i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <div className="max-w-[1100px] mx-auto w-full px-5 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-center md:justify-between h-full pt-0 pb-8 sm:pt-7 sm:pb-10 md:py-0 gap-4 sm:gap-5 md:gap-8">
              {/* Left: Content */}
              <div className="w-full md:w-[46%] lg:flex-1 text-center md:text-left order-2 md:order-1 space-y-2 sm:space-y-2">
                <p className="text-[11px] sm:text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                  {slide.brand}
                </p>
                <h1 className={`text-[1.65rem] leading-[1.15] sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold ${slide.textDark ? "text-gray-900 dark:text-white" : "text-white"}`}>
                  {slide.tagline}
                </h1>
                <p className={`text-sm sm:text-base font-medium ${slide.textDark ? "text-gray-700 dark:text-gray-300" : "text-white/90"}`}>
                  {slide.subtitle}
                </p>
                {slide.promo && (
                  <p className={`text-xs sm:text-sm max-w-[19rem] md:max-w-xs mx-auto md:mx-0 ${slide.textDark ? "text-gray-600 dark:text-gray-400" : "text-white/80"}`}>
                    {slide.promo}
                  </p>
                )}
                {slide.note && (
                  <p className={`text-[10px] sm:text-xs ${slide.textDark ? "text-gray-500 dark:text-gray-400" : "text-white/70"}`}>
                    {slide.note}
                  </p>
                )}
                <div className="pt-2 sm:pt-2.5">
                  <button className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs sm:text-sm font-semibold px-6 py-2.5 sm:px-7 sm:py-3 rounded-full shadow-sm hover:shadow-md hover:bg-gray-700 dark:hover:bg-gray-200 active:scale-95 transition-all">
                    {slide.cta}
                  </button>
                </div>
              </div>
              {/* Right: Image */}
              <div className="w-full md:w-[54%] lg:flex-1 flex justify-center items-center order-1 md:order-2">
                <img
                  src={slide.image}
                  alt={slide.brand}
                  className="max-h-[290px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-[420px] w-auto object-contain"
                />
              </div>
            </div>
          </Link>
        ))}

        {/* Indicators */}
        <div className="absolute  bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-90 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "bg-gray-900 dark:bg-white w-6 h-2"
                  : "bg-gray-400/60 dark:bg-gray-500/60 w-2 h-2 hover:bg-gray-600 dark:hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>

{/* OFFER BANNER */}

      <div className="bg-[#f5f5f7] dark:bg-zinc-900 border-t border-b border-gray-200 dark:border-zinc-800 py-1.5 sm:py-2 text-center text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 px-4">
        {t('home.offer_banner')}
      </div>

          {/* VIEW ALL APPLE PRODUCTS */}
          {/* FIX: grid version yalnız lg (≥1024px) ekranlarda göstərilir.
              ipad / tablet (md range, 768-1024px) və mobil ekranlarda isə
              saga-sola scroll butonlu (arrow) versiya işləyir ki, 7 kateqoriya
              bir-birinin içinə girib overlap olmasın. */}

      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-6 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 ">
          {t('home.view_all_apple')}
        </h2>

       
        <div className="hidden lg:grid grid-cols-7 gap-6 justify-items-center">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={cat.link}
              className="flex flex-col items-center w-full group"
            >
              <div className="w-28 h-28 bg-[#f5f5f7] dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl flex items-center justify-center mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-20 h-20 object-contain group-hover:scale-105 transition"
                />
              </div>
              <p className="font-semibold text-sm text-gray-900 dark:text-gray-200">{cat.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{cat.priceRange}</p>
            </Link>
          ))}
        </div>

        <div className="lg:hidden relative">
          {catArrows.left && (
            <button
              onClick={categoryScrollLeft}
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white dark:bg-zinc-800 border dark:border-zinc-700 shadow-md rounded-full flex items-center justify-center cursor-pointer"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div
            ref={categoryScrollRef}
            onScroll={updateCatArrows}
            className="flex gap-4 overflow-x-auto scrollbar-hide pl-0 pr-8 md:px-8"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={cat.link}
                className="flex flex-col items-center flex-none w-24 sm:w-28 group"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#f5f5f7] dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl flex items-center justify-center mb-3 ">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-14 sm:w-20 sm:h-20 object-contain group-hover:scale-105 transition"
                  />
                </div>
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-200 text-center">{cat.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{cat.priceRange}</p>
              </Link>
            ))}
          </div>

          {catArrows.right && (
            <button
              onClick={categoryScrollRight}
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white dark:bg-zinc-800 border dark:border-zinc-700 shadow-md rounded-full flex items-center justify-center cursor-pointer"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>      </section>

          {/* SEE WHAT'S NEW */}

      <section className="max-w-[1200px] mx-auto px-5 sm:px-6 md:px-6 py-8 sm:py-10">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          {t('home.see_whats_new')}
        </h2>
        <div className="relative">
          {/* Scroll left btn */}
          {newArrows.left && (
            <button
              onClick={scrollLeft}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white dark:bg-zinc-800 border dark:border-zinc-700 shadow-md rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            onScroll={updateNewArrows}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {newProducts.map(product => (
              <Link
                key={product.id}
                to={getProductLink(product.title)}
                className="group flex-none flex flex-col justify-between bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-4 w-[240px] sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)] xl:w-[calc((100%-48px)/4)] hover:shadow-md transition-all duration-300"
              >
                <div className="bg-[#f5f5f7] dark:bg-zinc-800/50 rounded-xl overflow-hidden flex items-center justify-center relative w-full aspect-square mb-3">
                  <span className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 leading-snug truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-snug line-clamp-2 h-8">
                      {product.description}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mt-2">
                    From {product.price} ₼ or {product.monthlyPrice} ₼/{product.months} ay
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {/* Scroll right btn */}
          {newArrows.right && (
            <button
              onClick={scrollRight}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white dark:bg-zinc-800 border dark:border-zinc-700 shadow-md rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>
      </section>

          {/* PROMOTIONAL BLOCKS (Trade-In / Loyalty / Blog) */}
      <section className="max-w-[1200px] mx-auto px-6 py-8 space-y-4">
        {translatedPromoBlocks.map(block => (
          <div
            key={block.id}
            className={`flex flex-col ${block.imageLeft ? "md:flex-row-reverse" : "md:flex-row"} rounded-2xl overflow-hidden bg-[#f5f5f7] dark:bg-zinc-900 border dark:border-zinc-800`}
          >
            {/* Image half */}
            <div className="w-full md:w-1/2 h-44 md:h-auto relative overflow-hidden">
              <img
                src={block.image}
                alt={block.title}
                className="w-full h-full object-cover grayscale-[20%] dark:grayscale-[40%]"
              />
            </div>
            {/* Text half */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-8 md:px-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{block.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 max-w-xs">{block.desc}</p>
             
            </div>
          </div>
        ))}
      </section>

      {/*DISCOVER SERVICES AND MORE*/}
      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
          {t('home.discover_services')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {translatedServices.map(svc => (
            <div
              key={svc.id}
              className="bg-[#f5f5f7] dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl p-5 hover:shadow-md transition-all cursor-default"
            >
              <p className="text-[10px] font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-1">{svc.label}</p>
              <p className={`text-sm font-semibold leading-snug ${svc.color} `}>
                {svc.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*FEATURED PRODUCTS AREA*/}
      <section className="max-w-[1200px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ minHeight: "360px" }}>
          <Link
            to={translatedFeaturedLarge.link}
            className="group bg-[#f5f5f7] dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl p-8 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex gap-2 mb-3">
                <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{translatedFeaturedLarge.badge}</span>
                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">{translatedFeaturedLarge.badgeSub}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 leading-tight">{translatedFeaturedLarge.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{translatedFeaturedLarge.desc}</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-4">{translatedFeaturedLarge.price}</p>
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-semibold px-5 py-2 rounded-full transition-all"  >
                {t('home.buy_now')}
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <img
                src={translatedFeaturedLarge.image}
                alt={translatedFeaturedLarge.title}
                className="h-44 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          <div className="flex flex-col gap-4">
            {translatedFeaturedSmall.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="group flex-1 bg-[#f5f5f7] dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl p-6 flex items-center gap-5 hover:shadow-lg transition-all"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 object-contain flex-none group-hover:scale-105 transition-transform duration-300"
                />
                <div>
                  <div className="flex gap-2 mb-1">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">{item.badgeSub}</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 leading-tight">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.desc}</p>
                  <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-3">{item.price}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all" >
                    {t('home.buy_now')}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CAROUSEL — "Magic on the outside" */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white mb-8">
          {t('home.magic_outside')}
        </h2>
        <div className="relative flex items-center">
          {/* Prev */}
          {carouselIdx > 0 && (
            <button
              onClick={carouselPrev}
              className="flex-none w-10 h-10 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow rounded-full flex items-center justify-center mr-3 hover:shadow-md transition-all text-gray-700 dark:text-gray-300"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          {/* Cards */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500"
              style={{ transform: `translateX(calc(-${carouselIdx} * (100% / ${visibleCount} + 16px)))` }}
            >
              {translatedCarousel.map(item => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="group bg-[#f5f5f7] dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center flex-none hover:shadow-lg transition-all"
                  style={{ width: `calc(100% / ${visibleCount} - ${((visibleCount - 1) * 16 / visibleCount)}px)` }}
                >
                  <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">{item.sub}</p>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300 mb-4"
                  />
                  <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-center mb-1 leading-snug">{item.title}</h3>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">{item.price}</p>
                  <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-semibold px-5 py-1.5 rounded-full transition-all">
                    {t('home.buy_now')}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Next */}
          {carouselIdx < maxIdx && (
            <button
              onClick={carouselNext}
              className="flex-none w-10 h-10 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow rounded-full flex items-center justify-center ml-3 hover:shadow-md transition-all text-gray-700 dark:text-gray-300"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          )}
        </div>

        {/* Dot indicators */}
       <div className="flex justify-center gap-2 mt-6">
  {Array.from({ length: 2 }).map((_, i) => (
    <button
      key={i}
      onClick={() => setCarouselIdx(i)}
      className={`rounded-full transition-all duration-300 ${
        i === carouselIdx
          ? "bg-gray-800 dark:bg-white w-5 h-2"
          : "bg-gray-300 dark:bg-zinc-700 w-2 h-2"
      }`}
    />
  ))}
</div>

      </section>

    </div>
  );
}

export default Home;