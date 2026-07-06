import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", category: "iphone", img: "" });
    const [customCategory, setCustomCategory] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");

    useEffect(() => {
        const stored = localStorage.getItem("ispectre_products");
        if (stored) setProducts(JSON.parse(stored));
    }, []);

    const categories = ["all", ...new Set(products.map((p) => p.category))];
    const filteredProducts =
        filterCategory === "all" ? products : products.filter((p) => p.category === filterCategory);

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.price || !form.img.trim()) return;

        const finalCategory =
            form.category === "custom" ? customCategory.trim().toLowerCase() : form.category;

        if (!finalCategory) {
            alert("Zəhmət olmasa kateqoriya adını daxil edin!");
            return;
        }

        const newProduct = {
            id: Date.now().toString(),
            name: form.name.trim(),
            price: parseFloat(form.price),
            category: finalCategory,
            img: form.img.trim(),
        };

        const updated = [...products, newProduct];
        setProducts(updated);
        localStorage.setItem("ispectre_products", JSON.stringify(updated));
        window.dispatchEvent(new Event("ispectre-products-updated"));

        setForm({ name: "", price: "", category: "iphone", img: "" });
        setCustomCategory("");
    };

    const handleDeleteProduct = (id) => {
        if (!window.confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) return;
        const updated = products.filter((p) => p.id !== id);
        setProducts(updated);
        localStorage.setItem("ispectre_products", JSON.stringify(updated));
        window.dispatchEvent(new Event("ispectre-products-updated"));
    };

    return (
        <div className="space-y-8 text-neutral-900 dark:text-gray-100">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-slate-950 dark:text-white">
                    <Plus size={18} /> Məhsul Əlavə Et
                </h3>
                <form onSubmit={handleAddProduct} className="grid sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Məhsulun adı"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border border-gray-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Qiymət (₼)"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="border border-gray-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                        required
                    />

                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="iphone">iPhone</option>
                        <option value="macbook">MacBook</option>
                        <option value="ipad">iPad</option>
                        <option value="watch">Apple Watch</option>
                        <option value="airpods">AirPods</option>
                        <option value="display">Display</option>
                        <option value="vision">Vision</option>
                        <option value="accessories">Aksesuarlar</option>
                        <option value="tv">TV & Home</option>
                        <option value="custom">+ Yeni kateqoriya</option>
                    </select>

                    {form.category === "custom" && (
                        <input
                            type="text"
                            placeholder="Yeni kateqoriyanın adı (örn: porsche, luks)"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            className="border border-blue-400 dark:border-blue-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none bg-blue-50/50 dark:bg-blue-955/20 text-gray-900 dark:text-white font-medium"
                            required
                        />
                    )}

                    <input
                        type="url"
                        placeholder="Şəkil URL-i"
                        value={form.img}
                        onChange={(e) => setForm({ ...form, img: e.target.value })}
                        className="border border-gray-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 sm:col-span-2"
                        required
                    />
                    <button
                        type="submit"
                        className="sm:col-span-2 bg-slate-950 text-white hover:bg-slate-900 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 py-2.5 rounded-xl text-sm font-medium transition"
                    >
                        Əlavə et
                    </button>
                </form>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <h3 className="font-semibold text-lg text-slate-950 dark:text-white">
                        Əlavə edilmiş məhsullar ({filteredProducts.length})
                    </h3>

                    {products.length > 0 && (
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="border border-gray-200 dark:border-slate-805 rounded-lg px-3 py-1.5 text-xs bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c === "all" ? "Bütün kateqoriyalar" : c}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {products.length === 0 ? (
                    <p className="text-sm text-gray-400 dark:text-slate-450">Hələ məhsul yoxdur.</p>
                ) : filteredProducts.length === 0 ? (
                    <p className="text-sm text-gray-400 dark:text-slate-450">Bu kateqoriyada məhsul yoxdur.</p>
                ) : (
                    <div className="space-y-2">
                        {filteredProducts.map((p) => (
                            <div
                                key={p.id}
                                className="flex items-center justify-between border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 bg-white dark:bg-[#1e293b]/30 transition-colors duration-300"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <img
                                        src={p.img}
                                        alt={p.name}
                                        className="w-10 h-10 object-contain rounded flex-shrink-0 bg-transparent"
                                        onError={(e) => (e.target.style.opacity = 0.2)}
                                    />
                                    <div className="min-w-0 overflow-hidden">
                                        <p className="text-sm font-medium truncate text-gray-900 dark:text-white">{p.name}</p>
                                        <p className="text-xs text-gray-450 dark:text-slate-400">
                                            {p.category} · {p.price} ₼
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteProduct(p.id)}
                                    className="text-red-500 hover:bg-red-55 dark:hover:bg-red-950/20 p-2 rounded-lg flex-shrink-0 transition-colors"
                                    title="Sil"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminProducts;