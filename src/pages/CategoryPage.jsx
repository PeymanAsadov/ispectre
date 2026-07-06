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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Link
              key={p.id}
              to={`/category/${categoryName}/${p.id}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square bg-[#FAFAFC] rounded-2xl flex items-center justify-center p-6 group-hover:shadow-lg transition">
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => (e.target.style.opacity = 0.2)}
                />
              </div>
              <h3 className="mt-4 font-medium text-[15px]">{p.name}</h3>
              <p className="text-sm text-gray-400">{p.price} ₼</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;