import { Link } from "react-router-dom";
import { useMemo, memo } from "react";
import { addToCart } from "../../../utils/cartUtils";
import { useTranslation } from "react-i18next";

const ProductCard = memo(({ item }) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/detail/${item.id}?color=${encodeURIComponent(item.color)}`}
      className="group flex flex-col justify-between bg-white dark:bg-[#1c1c1e] p-6 rounded-[32px] border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1"
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
        <h3 className="mt-4 text-center font-semibold text-base tracking-tight text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.model}
        </h3>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">{item.color}</p>
      </div>

      <div className="mt-5 border-t border-gray-100 dark:border-gray-700/50 pt-4 text-center">
        <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{item.price.toLocaleString()} ₼-dan</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">ayda {item.monthly} ₼-dan</p>
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
          className="w-full mt-4 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
        >
          Səbətə Əlavə Et
        </button>
      </div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

function Iphone({
  iphones = [],
  minPrice,
  maxPrice,
  selectedSeries = [],
  selectedMemory = [],
  selectedColor = [],
  sortBy = "",
}) {
  const filteredCards = useMemo(() => {
    const cards = [];

    iphones.forEach((phone) => {
      if (selectedSeries.length && !selectedSeries.includes(phone.model)) {
        return;
      }

      phone.colors?.forEach((color) => {
        if (selectedColor.length && !selectedColor.includes(color.name)) {
          return;
        }

        let minPriceForColor = Infinity;
        let hasValidStorage = false;

        color.storage?.forEach((storage) => {
          const price = Number(storage.price);
          const size = storage.size.trim();

          if (selectedMemory.length && !selectedMemory.includes(size)) {
            return;
          }

          if (minPrice !== undefined && price < Number(minPrice)) {
            return;
          }

          if (maxPrice !== undefined && price > Number(maxPrice)) {
            return;
          }

          hasValidStorage = true;

          if (price < minPriceForColor) {
            minPriceForColor = price;
          }
        });

        if (hasValidStorage) {
          cards.push({
            id: phone.id,
            model: phone.model,
            color: color.name,
            img: color.images?.[0]?.url || "",
            price: minPriceForColor,
            monthly: Math.ceil(minPriceForColor / 12),
          });
        }
      });
    });

    return cards;
  }, [
    iphones,
    minPrice,
    maxPrice,
    selectedSeries,
    selectedMemory,
    selectedColor,
  ]);

  const processedCards = useMemo(() => {
    const cards = [...filteredCards];

    if (sortBy === "cheap") {
      cards.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "expensive") {
      cards.sort((a, b) => b.price - a.price);
    }

    return cards;
  }, [filteredCards, sortBy]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 animate-fade-in">

        {processedCards.map((item) => (
          <ProductCard
            key={`${item.id}-${item.color}`}
            item={item}
          />
        ))}

      </div>
      {processedCards.length === 0 && (
        <div className="py-20 mt-6 text-center bg-white dark:bg-[#1c1c1e] rounded-3xl border border-dashed border-gray-200 dark:border-gray-700/50">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Seçilmiş filtrlərə uyğun məhsul tapılmadı.
          </p>
        </div>
      )}
    </div>
  );
}

export default Iphone;