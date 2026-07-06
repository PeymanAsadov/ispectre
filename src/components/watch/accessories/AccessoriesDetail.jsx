import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Accessories from "../../../data/accessories";
import { addToCart } from "../../../utils/cartUtils";
import { FiHome, FiChevronRight } from "react-icons/fi";

function useDragScroll() {
  const ref = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e) => {
    isDown.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeft.current = ref.current.scrollLeft;
    ref.current.style.cursor = "grabbing";
  }, []);
  const onMouseLeave = useCallback(() => {
    isDown.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  }, []);
  const onMouseUp = useCallback(() => {
    isDown.current = false;
    if (ref.current) ref.current.style.cursor = "grab";
  }, []);
  const onMouseMove = useCallback((e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  return { ref, onMouseDown, onMouseLeave, onMouseUp, onMouseMove };
}

function Breadcrumb({ items = [] }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">
        <FiHome size={15} />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1.5">
            <FiChevronRight size={13} className="text-gray-400 dark:text-gray-600" />
            {isLast ? (
              <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[220px]">{item.label}</span>
            ) : (
              <Link to={item.path} className="hover:text-black dark:hover:text-white transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AccessoriesDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const drag = useDragScroll();
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(null);
  const [variant, setVariant] = useState(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const product = useMemo(() => {
    return Accessories.find((item) => String(item.id) === String(id));
  }, [id]);

  useEffect(() => {
    setColor(null);
    setVariant(null);
    setSelectedImageIdx(0);
    setIsLoading(true);

    if (!product) {
      setIsLoading(false);
      return;
    }

    const colorParam = searchParams.get("color");
    const matchedColor = colorParam
      ? product.colors?.find((c) => c.name === colorParam) || product.colors?.[0]
      : product.colors?.[0];

    setColor(matchedColor || null);
    setVariant(matchedColor?.storage?.[0] || null);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, product, searchParams]);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setVariant(newColor.storage?.[0] || null);
    setSelectedImageIdx(0);
  };

  const price = variant?.price || 0;
  const monthly = Math.ceil(price / 12);

  const suggested = useMemo(() => {
    return Accessories
      .filter((item) => String(item.id) !== String(id))
      .map((item) => ({
        id: item.id,
        model: item.model,
        color: item.colors?.[0]?.name || "",
        img: item.colors?.[0]?.images?.[0]?.url || "",
        price: item.colors?.[0]?.storage?.[0]?.price || 0,
      }));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      model: product.model || product.name,
      color: color?.name || "Standart",
      size: variant?.size || "Default",
      price: variant?.price || product.price || 0,
      img: color?.images?.[selectedImageIdx]?.url || product.img || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f5f5f7] dark:bg-[#0f0f13] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{t("product.loading")}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] dark:bg-[#0f0f13] gap-4">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{t("product.not_found")}</h1>
        <Link to="/accessories" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">{t("product.back_to_list")}</Link>
      </div>
    );
  }

  const mainImage = color?.images?.[selectedImageIdx]?.url || "";

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] dark:bg-[#0f0f13] text-[#1d1d1f] dark:text-gray-100 pb-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <Breadcrumb items={[{ label: t("nav.accessories"), path: "/accessories" }, { label: product.model }]} />

        <div className="bg-white dark:bg-[#1c1c1e] rounded-[40px] border border-gray-100 dark:border-gray-700/50 shadow-sm p-8 md:p-12 mb-16">
          <div className="flex gap-12 items-start">

            {/* SOL: THUMBNAILS */}
            <div className="hidden md:flex flex-col gap-4 w-24">
              {color?.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center bg-white dark:bg-[#232326] transition-all ${
                    selectedImageIdx === idx ? "ring-2 ring-blue-500" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.label} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain" />
                </button>
              ))}
            </div>

            {/* ORTADA: ANA ŞƏKİL */}
            <div className="flex-1 flex justify-center items-center min-h-[500px]">
              {mainImage && (
                <img src={mainImage} alt={product.model} loading="eager" decoding="async"
                  className="max-w-full max-h-[500px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,.08)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,.4)]" />
              )}
            </div>

            {/* SAĞDA: SPESİFİKASİYALAR */}
            <div className="w-full md:w-80 flex-shrink-0">
              <h1 className="text-4xl font-semibold tracking-tight">{product.model}</h1>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                {t("product.selected_color")} <span className="text-black dark:text-white font-medium">{color?.name}</span>
              </p>

              <div className="mt-6 bg-[#f5f5f7] dark:bg-[#232326] rounded-3xl p-5 flex flex-col gap-3 border border-gray-50 dark:border-gray-700/50">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">{price} ₼</h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{t("product.payment_cash_card")}</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{monthly} ₼ <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">{t("product.per_month")}</span></p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{t("product.installments_info")}</p>
                </div>
              </div>

              {/* RƏNG SEÇİMİ */}
              {product.colors && product.colors.length > 1 && (
                <div className="mt-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">{t("product.color")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(c)}
                        className={`px-4 py-2 rounded-lg border transition ${color?.name === c.name ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white" : "bg-white dark:bg-[#232326] border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full mt-8 py-4 rounded-2xl transition text-white font-semibold ${
                  added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                }`}
              >
                {added ? t("cart.added_to_cart") : t("cart.add_to_cart")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessoriesDetail;