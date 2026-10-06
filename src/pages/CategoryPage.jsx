import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, formatCategoryLabel } from "../utils/categories";
import { useTranslation } from "react-i18next";

function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProductsByCategory(categoryName));
  }, [categoryName]);

  return (
    <div className="max-w-6xl mx-auto px-8 pt-32 pb-20 min-h-[60vh]">
      <h1 className="text-4xl font-bold tracking-tight mb-2">
        {formatCategoryLabel(categoryName)}
      </h1>
      <p className="text-gray-400 mb-10">{products.length} məhsul</p>

      {products.length === 0 ? (
        <p className="text-gray-400">Bu kateqoriyada hələ məhsul yoxdur.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/category/${categoryName}/${p.id}`}
              className="group relative flex flex-row items-center justify-between bg-white dark:bg-[#1A1A1A] p-3 sm:p-4 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(255,255,255,0.06)] transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] overflow-hidden"
            >
              {/* Top Left Subtle Badge */}
              <div className="absolute top-2.5 left-3.5 z-10">
                <span className="text-[10px] font-bold tracking-wider text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md backdrop-blur-sm uppercase">
                  APPLE ORIGINAL
                </span>
              </div>

              {/* Left Icon Container - Centered vertically */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-none pt-4 pb-1 px-1">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[85px] sm:max-h-[105px] w-auto object-contain transition-transform duration-300 group-hover:scale-108"
                  onError={(e) => (e.target.style.opacity = 0.2)}
                />
              </div>

              {/* Right Content - Vertical Stack (Product Name + Price) */}
              <div className="flex-1 flex flex-col justify-center pl-3 pr-2 py-1 space-y-1">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-tight tracking-tight group-hover:text-blue-500 transition-colors line-clamp-1">
                  {p.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium">
                  Official Model
                </p>

                <div className="pt-1 flex items-baseline justify-between">
                  <p className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
                    {p.price} ₼
                  </p>

                  <span className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-sm">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;