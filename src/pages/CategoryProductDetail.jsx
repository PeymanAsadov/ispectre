import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { getProductById, getProductsByCategory, formatCategoryLabel } from "../utils/categories";
import { addToCart } from "../utils/cartUtils"; 
import { useTranslation } from "react-i18next";

function CategoryProductDetail() {
  const { t } = useTranslation();
  const { categoryName, id } = useParams();
  const [added, setAdded] = useState(false);

  const product = useMemo(() => getProductById(id), [id]);

  const suggested = useMemo(() => {
    if (!product) return [];
    return getProductsByCategory(categoryName)
      .filter((p) => p.id !== id)
      .slice(0, 8);
  }, [categoryName, id, product]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      model: product.name,
      color: "Standart",
      size: "Default",
      price: product.price,
      img: product.img,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] gap-4">
        <h1 className="text-3xl font-semibold">{t("product.not_found")}</h1>
        <Link to={`/category/${categoryName}`} className="text-blue-600 hover:underline">
          {t("product.back_to_list")}
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] text-[#1d1d1f] pb-24 animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 pt-12">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="text-gray-500 hover:text-black transition-colors duration-200">
            {t("nav.home")}
          </Link>
          <span>/</span>
          <Link
            to={`/category/${categoryName}`}
            className="text-gray-500 hover:text-black transition-colors duration-200 capitalize"
          >
            {formatCategoryLabel(categoryName)}
          </Link>
          <span>/</span>
          <span className="text-black font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 md:p-12 mb-16">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left — Picture */}
            <div className="flex-1 flex items-center justify-center min-h-[520px]">
              <img
                src={product.img}
                alt={product.name}
                loading="eager"
                decoding="async"
                className="max-h-[520px] object-contain drop-shadow-xl hover:scale-105 transition duration-500"
                onError={(e) => (e.target.style.opacity = 0.2)}
              />
            </div>

            <div className="w-full lg:w-96 flex-shrink-0">
              <p className="text-sm text-gray-400 mb-2 capitalize">
                {formatCategoryLabel(categoryName)}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight">{product.name}</h1>

              <div className="mt-6 bg-[#f5f5f7] rounded-3xl p-5 border border-gray-100">
                <h2 className="text-3xl font-bold">{Number(product.price).toLocaleString()} ₼</h2>
                <p className="text-xs text-gray-400 mt-1">{t("product.payment_cash_card")}</p>
                <div className="border-t mt-4 pt-4">
                  <p className="text-lg font-bold text-blue-600">
                    {Math.ceil(Number(product.price) / 12)} ₼{" "}
                    <span className="text-xs text-gray-500 font-normal">{t("product.per_month")}</span>
                  </p>
                  <p className="text-[11px] text-gray-400">{t("product.installments_info")}</p>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-2xl transition text-white font-semibold ${
                  added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <ShoppingBag size={18} />
                {added ? t("cart.added_to_cart") : t("cart.add_to_cart")}
              </button>

              <Link
                to={`/category/${categoryName}`}
                className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-black transition"
              >
                <ArrowLeft size={14} /> {t("product.back_to_list")}
              </Link>
            </div>
          </div>
        </div>

        {suggested.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">{t("product.you_may_also_like")}</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {suggested.map((item) => (
                <Link
                  key={item.id}
                  to={`/category/${categoryName}/${item.id}`}
                  className="flex-shrink-0 w-[240px] bg-white rounded-[28px] border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-full h-[180px] flex items-center justify-center mb-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[160px] object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => (e.target.style.opacity = 0.2)}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-center text-gray-900">{item.name}</h3>
                  <p className="text-sm font-bold text-center mt-3">
                    {t("product.from_price_suffix", { price: Number(item.price).toLocaleString() })}
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

export default CategoryProductDetail;