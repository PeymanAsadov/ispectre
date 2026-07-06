import { Link } from "react-router-dom";
import { useMemo } from "react";
import { addToCart } from "../../../utils/cartUtils";
import { useTranslation } from "react-i18next";

function Accessories({
  keyboards = [],
  minPrice,
  maxPrice,
  selectedModels = [],
  selectedColor = [],
  selectedStorage = [],
  sortBy = "",
}) {
  const { t } = useTranslation();

  const filteredColorCards = useMemo(() => {
    const result = [];

    keyboards.forEach((keyboard) => {
      if (selectedModels.length && !selectedModels.includes(keyboard.model)) return;

      keyboard.colors?.forEach((color) => {
        if (selectedColor.length && !selectedColor.includes(color.name)) return;

        let minPriceForColor = Infinity;
        let hasValidStorage = false;

        color.storage?.forEach((storage) => {
          const size = storage.size.trim();
          const price = Number(storage.price);

          if (selectedStorage.length && !selectedStorage.includes(size)) return;
          if (minPrice !== undefined && price < Number(minPrice)) return;
          if (maxPrice !== undefined && price > Number(maxPrice)) return;

          hasValidStorage = true;
          if (price < minPriceForColor) minPriceForColor = price;
        });

        if (hasValidStorage) {
          result.push({
            id: keyboard.id,
            model: keyboard.model,
            color: color.name,
            img: color.images?.[0]?.url || color.img || "",
            price: minPriceForColor,
            monthly: Math.ceil(minPriceForColor / 12),
          });
        }
      });
    });

    return result;
  }, [keyboards, minPrice, maxPrice, selectedModels, selectedColor, selectedStorage]);

  const processedCards = useMemo(() => {
    const cards = [...filteredColorCards];
    if (sortBy === "cheap") return cards.sort((a, b) => a.price - b.price);
    if (sortBy === "expensive") return cards.sort((a, b) => b.price - a.price);
    return cards;
  }, [filteredColorCards, sortBy]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2 animate-fade-in">
        {processedCards.map((item) => {
          const uniqueKey = `${item.id}-${item.color}`;
          return (
            <Link
              key={uniqueKey}
              to={`/accessories/${item.id}?color=${encodeURIComponent(item.color)}`}
              className="group flex flex-col justify-between bg-white dark:bg-[#1c1c1e] p-6 rounded-[32px] border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div>
                <div className="w-full h-[220px] flex items-center justify-center mb-4 bg-transparent overflow-hidden">
                  <img
                    src={item.img}
                    alt={`${item.model} ${item.color}`}
                    loading="lazy"
                    className="max-h-[190px] object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="font-semibold text-base mt-2 px-1 text-center text-gray-900 dark:text-gray-100 tracking-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.model} ({item.color})
                </p>
              </div>

              <div className="mt-5 w-full text-center border-t border-gray-50 dark:border-gray-700/50 pt-4">
                <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {t("product.from_price_suffix", { price: item.price.toLocaleString() })}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5">
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
                  className="w-full mt-4 bg-slate-950 text-white rounded-full py-3 hover:bg-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
                >
                  {t("cart.add_to_cart")}
                </button>
              </div>
            </Link>
          );
        })}
      </div>

      {processedCards.length === 0 && (
        <div className="py-20 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1c1c1e] rounded-3xl border border-dashed border-gray-200 dark:border-gray-700/50 mt-4">
          {t("filters.no_results")}
        </div>
      )}
    </div>
  );
}

export default Accessories;