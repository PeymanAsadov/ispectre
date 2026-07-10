import { Link } from "react-router-dom";
import { useMemo, memo } from "react";
import { addToCart } from "../../../utils/cartUtils";
import { useTranslation } from "react-i18next";

const VisionProductCard = memo(({ item }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/vision/${item.id}?color=${encodeURIComponent(item.color)}`}
      className="group flex flex-col justify-between bg-white dark:bg-[#1c1c1e] p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-gray-200 dark:hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        <div className="w-full h-[160px] md:h-[220px] flex justify-center items-center mb-3 md:mb-4">
          <img
            src={item.img}
            alt={`${item.model} ${item.color}`}
            loading="lazy"
            decoding="async"
            className="max-h-[140px] md:max-h-[190px] object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <p className="font-semibold text-center text-sm md:text-base text-gray-900 dark:text-[#F5F5F5] line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
          {item.model}
        </p>
        <p className="text-center text-xs text-gray-400 dark:text-[#A1A1AA] mt-1">{item.color}</p>
      </div>

      <div className="mt-3 md:mt-5 pt-3 md:pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
        <p className="font-bold text-base md:text-lg text-gray-900 dark:text-[#F5F5F5]">
          {t("product.from_price_suffix", { price: item.price.toLocaleString() })}
        </p>
        <p className="text-xs text-gray-400 dark:text-[#A1A1AA]">
          {t("product.monthly_price", { price: item.monthly })}
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart({
              id: item.id,
              model: item.model,
              color: item.color,
              size: "Default",
              price: item.price,
              img: item.img,
            });
          }}
          className="w-full mt-3 bg-slate-950 text-white hover:bg-slate-900 active:bg-slate-950 dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:active:bg-gray-200 rounded-full py-2.5 text-sm transition font-medium"
        >
          {t("cart.add_to_cart")}
        </button>
      </div>
    </Link>
  );
});

VisionProductCard.displayName = "VisionProductCard";

function VisionCard({
  visions = [],
  minPrice,
  maxPrice,
  selectedModels = [],
  selectedColor = [],
  selectedStorage = [],
  sortBy = "",
}) {
  const { t } = useTranslation();

  const cards = useMemo(() => {
    const result = [];

    visions.forEach((v) => {
      if (selectedModels.length && !selectedModels.includes(v.model)) return;

      v.colors?.forEach((colorObj) => {
        if (selectedColor.length && !selectedColor.includes(colorObj.name)) return;

        const validStorage = colorObj.storage?.filter((s) => {
          const price = Number(s.price);
          if (minPrice !== undefined && price < Number(minPrice)) return false;
          if (maxPrice !== undefined && price > Number(maxPrice)) return false;
          if (selectedStorage.length && !selectedStorage.includes(s.size)) return false;
          return true;
        }) ?? [];

        if (validStorage.length === 0) return;

        const minVariantPrice = Math.min(...validStorage.map((s) => Number(s.price)));

        result.push({
          id: v.id,
          model: v.model,
          color: colorObj.name,
          img: colorObj.images?.[0]?.url || "",
          price: minVariantPrice,
          monthly: Math.ceil(minVariantPrice / 12),
        });
      });
    });

    if (sortBy === "cheap") result.sort((a, b) => a.price - b.price);
    if (sortBy === "expensive") result.sort((a, b) => b.price - a.price);
    return result;
  }, [visions, minPrice, maxPrice, selectedModels, selectedColor, selectedStorage, sortBy]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 font-sans">
        {cards.map((item) => (
          <VisionProductCard key={`${item.id}-${item.color}`} item={item} />
        ))}
      </div>
      {cards.length === 0 && (
        <div className="py-20 mt-6 text-center bg-white dark:bg-[#1c1c1e] rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-[#A1A1AA] text-lg font-medium">{t("filters.no_results")}</p>
        </div>
      )}
    </div>
  );
}

export default VisionCard;