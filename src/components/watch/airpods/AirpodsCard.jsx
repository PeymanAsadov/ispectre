import { Link } from "react-router-dom";
import { useMemo, memo } from "react";
import { addToCart } from "../../../utils/cartUtils";
import { useTranslation } from "react-i18next";

const AirpodsProductCard = memo(({ item }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/airpods/${item.id}?color=${encodeURIComponent(item.color)}`}
      className="group flex flex-col justify-between bg-white dark:bg-[#18181B] p-6 rounded-[32px] border border-gray-100 dark:border-[#3F3F46] hover:shadow-xl hover:border-gray-200 dark:hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        <div className="w-full h-[220px] flex items-center justify-center overflow-hidden">
          <img
            src={item.img}
            alt={`${item.model} ${item.color}`}
            loading="lazy"
            decoding="async"
            className="max-h-[190px] object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="mt-4 text-center font-semibold text-base tracking-tight text-gray-900 dark:text-[#F5F5F5] line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
          {item.model}
        </h3>
        <p className="text-center text-xs text-gray-500 dark:text-[#A1A1AA] mt-1">{item.color}</p>
      </div>

      <div className="mt-5 border-t border-gray-100 dark:border-[#3F3F46] pt-4 text-center">
        <p className="font-bold text-lg text-gray-900 dark:text-[#F5F5F5]">
          {t("product.from_price_suffix", { price: item.price.toLocaleString() })}
        </p>
        <p className="text-xs text-gray-400 dark:text-[#A1A1AA] mt-1">
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
          className="w-full mt-4 bg-slate-950 text-white hover:bg-slate-900 active:bg-slate-950 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 dark:active:bg-slate-800 py-3 rounded-xl transition duration-200"
        >
          {t("cart.add_to_cart")}
        </button>
      </div>
    </Link>
  );
});

AirpodsProductCard.displayName = "AirpodsProductCard";

function AirpodsCard({
  airpods = [],
  minPrice,
  maxPrice,
  selectedModels = [],
  selectedColor = [],
  sortBy = "",
}) {
  const { t } = useTranslation();

  const cards = useMemo(() => {
    const result = [];

    airpods.forEach((item) => {
      if (selectedModels.length && !selectedModels.includes(item.model)) return;

      item.colors?.forEach((colorObj) => {
        if (selectedColor.length && !selectedColor.includes(colorObj.name)) return;

        const validStorage = colorObj.storage?.filter((s) => {
          const price = Number(s.price);
          if (minPrice !== undefined && price < Number(minPrice)) return false;
          if (maxPrice !== undefined && price > Number(maxPrice)) return false;
          return true;
        }) ?? [];

        if (validStorage.length === 0) return;

        const minVariantPrice = Math.min(...validStorage.map((s) => Number(s.price)));

        result.push({
          id: item.id,
          model: item.model,
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
  }, [airpods, minPrice, maxPrice, selectedModels, selectedColor, sortBy]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
        {cards.map((item) => (
          <AirpodsProductCard key={`${item.id}-${item.color}`} item={item} />
        ))}
      </div>
      {cards.length === 0 && (
        <div className="py-20 mt-6 text-center bg-white dark:bg-[#18181B] rounded-3xl border border-dashed border-gray-200 dark:border-[#3F3F46]">
          <p className="text-gray-500 dark:text-[#A1A1AA] text-lg">{t("filters.no_results")}</p>
        </div>
      )}
    </div>
  );
}

export default AirpodsCard;