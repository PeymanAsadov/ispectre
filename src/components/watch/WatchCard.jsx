import { Link } from "react-router-dom";
import { useMemo, memo } from "react";
import { addToCart } from "../../utils/cartUtils";
import { useTranslation } from "react-i18next";

const WatchProductCard = memo(({ item }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/watch/${item.id}?color=${encodeURIComponent(item.color)}`}
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
          className="w-full mt-4 bg-black text-white hover:bg-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 py-3 rounded-xl transition duration-200"
        >
          {t("cart.add_to_cart")}
        </button>
      </div>
    </Link>
  );
});

WatchProductCard.displayName = "WatchProductCard";

function WatchCard({
  watches = [],
  minPrice,
  maxPrice,
  selectedModels = [],
  selectedColor = [],
  selectedSize = [],
  sortBy = "",
}) {
  const { t } = useTranslation();

  const cards = useMemo(() => {
    const result = [];

    watches.forEach((watch) => {
      if (selectedModels.length && !selectedModels.includes(watch.model)) return;

      const seenColors = new Set();

      watch.colors?.forEach((colorObj) => {
        if (seenColors.has(colorObj.name)) return;
        seenColors.add(colorObj.name);

        if (selectedColor.length && !selectedColor.includes(colorObj.name)) return;

        const validStorage = colorObj.storage?.filter((s) => {
          const price = Number(s.price);
          if (minPrice !== undefined && price < Number(minPrice)) return false;
          if (maxPrice !== undefined && price > Number(maxPrice)) return false;
          if (selectedSize.length && !selectedSize.includes(s.size)) return false;
          return true;
        }) ?? [];

        if (validStorage.length === 0) return;

        const minVariantPrice = Math.min(...validStorage.map((s) => Number(s.price)));

        result.push({
          id: watch.id,
          model: watch.model,
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
  }, [watches, minPrice, maxPrice, selectedModels, selectedColor, selectedSize, sortBy]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
        {cards.map((item) => (
          <WatchProductCard key={`${item.id}-${item.color}`} item={item} />
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

export default WatchCard;