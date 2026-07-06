import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import allDisplays from "../../../data/display";
import { addToCart } from "../../../utils/cartUtils";

function DisplayDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState(null);
  const [variant, setVariant] = useState(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const sliderRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const onMouseDown = useCallback((e) => {
    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = "grabbing";
  }, []);
  const onMouseLeave = useCallback(() => {
    isDown.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
  }, []);
  const onMouseUp = useCallback(() => {
    isDown.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
  }, []);
  const onMouseMove = useCallback((e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeftRef.current - (x - startX.current) * 1.5;
  }, []);

  const product = useMemo(
    () => allDisplays.find((item) => String(item.id) === String(id)),
    [id]
  );

  useEffect(() => {
    setIsLoading(true);
    setSelectedImageIdx(0);

    if (!product) {
      setIsLoading(false);
      return;
    }

    const colorParam = searchParams.get("color");
    const matched = colorParam
      ? product.colors?.find((c) => c.name === colorParam) ?? product.colors?.[0]
      : product.colors?.[0];

    setColor(matched ?? null);
    setVariant(matched?.storage?.[0] ?? null);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, product, searchParams]);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setVariant(newColor.storage?.[0] ?? null);
    setSelectedImageIdx(0);
  };

  const price = variant?.price ?? 0;
  const monthly = Math.ceil(price / 12);

  const specs = useMemo(() => {
    if (!product) return [];
    const list = [];
    if (variant?.size) list.push({ name: "Şüşə növü", value: variant.size });
    if (color?.name) list.push({ name: "Rəng", value: color.name });
    return list;
  }, [product, variant, color]);

  const suggested = useMemo(
    () =>
      allDisplays
        .filter((item) => String(item.id) !== String(id))
        .slice(0, 8)
        .map((item) => ({
          id: item.id,
          model: item.model,
          color: item.colors?.[0]?.name ?? "",
          img: item.colors?.[0]?.images?.[0]?.url ?? "",
          price: item.colors?.[0]?.storage?.[0]?.price ?? 0,
        })),
    [id]
  );

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      model: product.model,
      color: color?.name || "Standart",
      size: variant?.size || "Default",
      price: variant?.price || 0,
      img: color?.images?.[selectedImageIdx]?.url || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f5f5f7] dark:bg-[#0f0f13] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">{t("product.loading")}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] dark:bg-[#0f0f13] gap-4">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{t("product.not_found")}</h1>
        <Link to="/display" className="text-blue-600 dark:text-blue-400 hover:underline">
          {t("product.back_to_list")}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] dark:bg-[#0f0f13] text-[#1d1d1f] dark:text-gray-100 pb-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 pt-12">

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">{t("nav.home")}</Link>
          <span>/</span>
          <Link to="/display" className="hover:text-black dark:hover:text-white transition-colors">Display</Link>
          <span>/</span>
          <span className="text-black dark:text-white font-medium">{product.model}</span>
        </div>

        <div className="bg-white dark:bg-[#1c1c1e] rounded-[40px] border border-gray-100 dark:border-gray-700/50 shadow-sm p-8 md:p-12 mb-16">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            <div className="flex-1 flex flex-col md:flex-row gap-8">
              <div className="hidden md:flex flex-col gap-4">
                {color?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIdx(index)}
                    className={`w-24 h-24 rounded-xl border overflow-hidden transition ${selectedImageIdx === index
                      ? "border-blue-500"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                      }`}
                  >
                    <img src={image.url} alt={image.label ?? ""} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[520px]">
                <img
                  key={color?.images?.[selectedImageIdx]?.url}
                  src={color?.images?.[selectedImageIdx]?.url}
                  alt={product.model}
                  loading="eager"
                  decoding="async"
                  className="max-h-[520px] object-contain drop-shadow-xl hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            <div className="w-full lg:w-96 flex-shrink-0">
              <h1 className="text-4xl font-semibold tracking-tight">{product.model}</h1>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                {t("product.selected_color")}{" "}
                <span className="text-black dark:text-white font-medium ml-1">{color?.name}</span>
              </p>

              <div className="mt-6 bg-[#f5f5f7] dark:bg-[#232326] rounded-3xl p-5 border border-gray-100 dark:border-gray-700/50">
                <h2 className="text-3xl font-bold">{price.toLocaleString()} ₼</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{t("product.payment_cash_card")}</p>
                <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {monthly} ₼{" "}
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">{t("product.per_month")}</span>
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">{t("product.installments_info")}</p>
                </div>
              </div>

              {product.colors && product.colors.length > 1 && (
                <div className="mt-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">{t("product.color")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors?.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(c)}
                        className={`px-4 py-2 rounded-lg border transition ${color?.name === c.name
                          ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                          : "bg-white dark:bg-[#232326] border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                          }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Şüşə Növü</h3>
                <div className="grid grid-cols-1 gap-2">
                  {color?.storage?.map((item) => (
                    <button
                      key={item.size}
                      onClick={() => setVariant(item)}
                      className={`p-3 rounded-lg border text-left transition ${variant?.size === item.size
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                        }`}
                    >
                      <p className="font-semibold text-sm">{item.size}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.price} ₼</p>
                    </button>
                  ))}
                </div>
              </div>

              {specs.length > 0 && (
                <div className="mt-8 border border-gray-200 dark:border-gray-700/50 rounded-3xl overflow-hidden">
                  <div className="bg-gray-50 dark:bg-[#232326] px-5 py-4 border-b border-gray-200 dark:border-gray-700/50">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                      {t("product.tech_specs")}
                    </h3>
                  </div>
                  {specs.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center px-5 py-4 text-sm ${index !== specs.length - 1 ? "border-b border-gray-100 dark:border-gray-700/50" : ""
                        }`}
                    >
                      <span className="text-gray-500 dark:text-gray-400">{item.name}</span>
                      <span className="font-medium text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full mt-8 py-4 rounded-2xl transition text-white font-semibold ${added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  }`}
              >
                {added ? t("cart.added_to_cart") : t("cart.add_to_cart")}
              </button>
            </div>
          </div>
        </div>

        {suggested.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">{t("product.you_may_also_like")}</h2>
            <div
              ref={sliderRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide cursor-grab select-none"
            >
              {suggested.map((item) => (
                <Link
                  key={`${item.id}-${item.color}`}
                  to={`/display/${item.id}?color=${encodeURIComponent(item.color)}`}
                  className="flex-shrink-0 w-[240px] bg-white dark:bg-[#1c1c1e] rounded-[28px] border border-gray-100 dark:border-gray-700/50 p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-full h-[180px] flex items-center justify-center mb-4">
                    <img
                      src={item.img}
                      alt={item.model}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[160px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-center text-gray-900 dark:text-gray-100">{item.model}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">{item.color}</p>
                  <p className="text-sm font-bold text-center mt-3">{t("product.from_price_suffix", { price: item.price.toLocaleString() })}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default DisplayDetail;