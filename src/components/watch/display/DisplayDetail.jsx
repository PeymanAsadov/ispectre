import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import allDisplays from "../../../data/display";
import { addToCart } from "../../../utils/cartUtils";
import { FiHome, FiChevronRight } from "react-icons/fi";

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

  const price = variant?.price ?? product?.price ?? 0;
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
          img: item.colors?.[0]?.images?.[0]?.url ?? item.img ?? "",
          price: item.colors?.[0]?.storage?.[0]?.price ?? item.price ?? 0,
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
      price: price,
      img: color?.images?.[selectedImageIdx]?.url || product.img || "",
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] dark:bg-[#0f0f13] gap-4 px-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{t("product.not_found")}</h1>
        <Link to="/display" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
          {t("product.back_to_list")}
        </Link>
      </div>
    );
  }

  const mainImage = color?.images?.[selectedImageIdx]?.url || product.img || "";

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] dark:bg-[#0f0f13] text-[#1d1d1f] dark:text-gray-100 pb-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-12">

        {/* Breadcrumb - Mobil Uyğun */}
        <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors flex-shrink-0">
            <FiHome size={15} />
          </Link>
          <FiChevronRight size={13} className="text-gray-400 dark:text-gray-600 flex-shrink-0" />
          <Link to="/display" className="hover:text-black dark:hover:text-white transition-colors flex-shrink-0">
            Display
          </Link>
          <FiChevronRight size={13} className="text-gray-400 dark:text-gray-600 flex-shrink-0" />
          <span className="text-black dark:text-white font-medium truncate max-w-[150px] md:max-w-[220px] flex-shrink-0">
            {product.model}
          </span>
        </div>

        {/* Əsas Kontent Kartı */}
        <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl md:rounded-[40px] border border-gray-100 dark:border-gray-700/50 shadow-sm p-4 md:p-12 mb-8 md:mb-16">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-start">

            {/* ŞƏKİL QALEREYASI PANELİ */}
            <div className="w-full flex-1 flex flex-col md:flex-row gap-4 md:gap-8">
              {/* Kiçik Şəkillər (Thumbnails) */}
              {color?.images && color.images.length > 0 && (
                <div className="flex md:flex-col gap-2 order-2 md:order-1 justify-center overflow-x-auto py-1 scrollbar-hide">
                  {color.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIdx(index)}
                      className={`w-14 h-14 md:w-24 md:h-24 flex-shrink-0 rounded-xl border overflow-hidden flex items-center justify-center bg-white dark:bg-[#232326] transition-all p-1 ${
                        selectedImageIdx === index
                          ? "border-blue-500 ring-2 ring-blue-500/20"
                          : "border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={image.url} alt={image.label ?? ""} className="max-w-full max-h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Böyük Əsas Şəkil */}
              <div className="flex-1 flex items-center justify-center min-h-[260px] md:min-h-[525px] order-1 md:order-2 bg-gray-50/50 dark:bg-black/5 rounded-2xl p-4">
                {mainImage && (
                  <img
                    key={mainImage}
                    src={mainImage}
                    alt={product.model}
                    loading="eager"
                    decoding="async"
                    className="max-h-[240px] md:max-h-[500px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,.05)] dark:drop-shadow-[0_20px_30px_rgba(0,0,0,.4)] transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
            </div>

            {/* SAĞDA MƏLUMAT PANELİ */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">{product.model}</h1>
              {color?.name && (
                <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-500 dark:text-gray-400">
                  {t("product.selected_color")}{" "}
                  <span className="text-black dark:text-white font-medium ml-1">{color.name}</span>
                </p>
              )}

              {/* Qiymət Bloku */}
              <div className="mt-4 mt-6 bg-[#f5f5f7] dark:bg-[#232326] rounded-2xl p-4 md:p-5 border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-baseline justify-between lg:block">
                  <h2 className="text-2xl md:text-3xl font-bold">{price.toLocaleString()} ₼</h2>
                  <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 lg:mt-1">{t("product.payment_cash_card")}</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3 flex items-center justify-between lg:block">
                  <p className="text-base md:text-lg font-bold text-blue-600 dark:text-blue-400">
                    {monthly} ₼{" "}
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">{t("product.per_month")}</span>
                  </p>
                  <p className="text-[10px] md:text-[11px] text-gray-400 dark:text-gray-500 hidden sm:block lg:block">{t("product.installments_info")}</p>
                </div>
              </div>

              {/* Rəng Seçimi */}
              {product.colors && product.colors.length > 1 && (
                <div className="mt-5 md:mt-8">
                  <h3 className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 md:mb-3">{t("product.color")}</h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {product.colors?.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => handleColorChange(c)}
                        className={`px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg border transition ${
                          color?.name === c.name
                            ? "bg-black text-white border-black dark:bg-slate-700 dark:border-slate-700"
                            : "bg-white dark:bg-[#232326] border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Şüşə Növü Seçimi */}
              {color?.storage && color.storage.length > 0 && (
                <div className="mt-5 md:mt-8">
                  <h3 className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 md:mb-3">Şüşə Növü</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {color.storage.map((item) => (
                      <button
                        key={item.size}
                        onClick={() => setVariant(item)}
                        className={`p-3 rounded-xl border text-left transition ${
                          variant?.size === item.size
                            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                        }`}
                      >
                        <p className="font-semibold text-xs md:text-sm">{item.size}</p>
                        <p className="text-[11px] md:text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.price.toLocaleString()} ₼</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Texniki Göstəricilər */}
              {specs.length > 0 && (
                <div className="mt-5 md:mt-8 border border-gray-200 dark:border-gray-700/50 rounded-2xl md:rounded-3xl overflow-hidden">
                  <div className="bg-gray-50 dark:bg-[#232326] px-4 py-3 md:px-5 md:py-4 border-b border-gray-200 dark:border-gray-700/50">
                    <h3 className="text-[10px] md:text-xs uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                      {t("product.tech_specs")}
                    </h3>
                  </div>
                  {specs.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm ${
                        index !== specs.length - 1 ? "border-b border-gray-100 dark:border-gray-700/50" : ""
                      }`}
                    >
                      <span className="text-gray-500 dark:text-gray-400">{item.name}</span>
                      <span className="font-medium text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Səbətə At Düyməsi */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full mt-6 md:mt-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl transition text-white font-semibold text-sm md:text-base shadow-sm ${
                  added ? "bg-green-600" : "bg-black hover:bg-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                }`}
              >
                {added ? t("cart.added_to_cart") : t("cart.add_to_cart")}
              </button>
            </div>
          </div>
        </div>

        {/* Oxşar Məhsullar Slayderi */}
        {suggested.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{t("product.you_may_also_like")}</h2>
            <div
              ref={sliderRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide cursor-grab select-none"
            >
              {suggested.map((item) => (
                <Link
                  key={`${item.id}-${item.color}`}
                  to={`/display/${item.id}?color=${encodeURIComponent(item.color)}`}
                  className="flex-shrink-0 w-[180px] md:w-[240px] bg-white dark:bg-[#1c1c1e] rounded-2xl md:rounded-[28px] border border-gray-100 dark:border-gray-700/50 p-4 md:p-6 hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-full h-[120px] md:h-[180px] flex items-center justify-center mb-3 md:mb-4 bg-gray-50/50 dark:bg-black/5 rounded-xl p-2">
                    <img
                      src={item.img}
                      alt={item.model}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[100px] md:max-h-[160px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xs md:text-sm font-semibold text-center text-gray-900 dark:text-gray-100 line-clamp-1">{item.model}</h3>
                  <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 text-center mt-0.5">{item.color}</p>
                  <p className="text-xs md:text-sm font-bold text-center mt-2 md:mt-3">
                    {t("product.from_price_suffix", { price: item.price.toLocaleString() })}
                  </p>
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