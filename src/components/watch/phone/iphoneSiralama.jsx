import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../../utils/cartUtils";
import { useTranslation } from "react-i18next";

function IphoneSiralama({ title = "Bütün iPhone-lər", iphones = [] }) {
  const { t } = useTranslation();

  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState("6000");

  const [sortBy, setSortBy] = useState("");
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);

  const allCards = useMemo(() => {
    const cards = [];

    iphones.forEach((phone) => {
      phone.colors?.forEach((color) => {
        if (!color.storage) return;

        const prices = color.storage.map((s) => Number(s.price));
        const minPrice = Math.min(...prices);

        cards.push({
          id: phone.id,
          model: phone.model,
          color: color.name,
          img: color.images?.[0]?.url || "",
          price: minPrice,
          monthly: Math.ceil(minPrice / 12),
          storage: color.storage
        });
      });
    });

    return cards;
  }, [iphones]);

  const highestPrice = useMemo(() => {
    let max = 0;
    allCards.forEach(card => {
      card.storage.forEach(item => {
        if (Number(item.price) > max) {
          max = Number(item.price);
        }
      });
    });
    return max || 6000;
  }, [allCards]);

  useEffect(() => {
    setPriceRange([0, highestPrice]);
    setMinInput("0");
    setMaxInput(String(highestPrice));
  }, [highestPrice]);

  const allModels = useMemo(() => {
    return [...new Set(allCards.map(card => card.model))];
  }, [allCards]);

  const allColors = useMemo(() => {
    return [...new Set(allCards.map(card => card.color))];
  }, [allCards]);

  const allMemory = useMemo(() => {
    const set = new Set();
    allCards.forEach(card => {
      card.storage.forEach(item => {
        set.add(item.size.trim());
      });
    });
    return [...set];
  }, [allCards]);

  const toggle = useCallback((value, selected, setSelected) => {
    setSelected(
      selected.includes(value)
        ? selected.filter(i => i !== value)
        : [...selected, value]
    );
  }, []);

  const getModelCount = (model) => {
    return allCards.filter(card => card.model === model).length;
  };

  const getColorCount = (color) => {
    return allCards.filter(card => card.color === color).length;
  };

  const getMemoryCount = (memory) => {
    return allCards.filter(card =>
      card.storage.some(s => s.size.trim() === memory)
    ).length;
  };

  const filteredCards = useMemo(() => {
    return allCards
      .map((card) => {
        const modelOk =
          selectedSeries.length === 0 ||
          selectedSeries.includes(card.model);

        const colorOk =
          selectedColor.length === 0 ||
          selectedColor.includes(card.color);

        if (!modelOk || !colorOk) return null;

        const validStorage = card.storage.filter((item) => {
          const price = Number(item.price);

          const memoryOk =
            selectedMemory.length === 0 ||
            selectedMemory.includes(item.size.trim());

          const priceOk =
            price >= priceRange[0] &&
            price <= priceRange[1];

          return memoryOk && priceOk;
        });

        if (validStorage.length === 0) return null;

        const minPrice = Math.min(
          ...validStorage.map((i) => Number(i.price))
        );

        return {
          ...card,
          price: minPrice,
          monthly: Math.ceil(minPrice / 12),
        };
      })
      .filter(Boolean);
  }, [
    allCards,
    selectedSeries,
    selectedColor,
    selectedMemory,
    priceRange,
  ]);

  const sortedCards = useMemo(() => {
    const cards = [...filteredCards];

    if (sortBy === "cheap") {
      cards.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "expensive") {
      cards.sort((a, b) => b.price - a.price);
    }

    return cards;
  }, [filteredCards, sortBy]);

  const [filterOpen, setFilterOpen] = useState(false);

  const filterSidebar = (
    <div className="space-y-6">

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <h3 className="font-bold text-xl mb-5">
          {t('filters.price')}
        </h3>

        <div className="flex gap-3 mb-4">
          <input
            type="number"
            min={0}
            value={minInput}
            placeholder="0"
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") { setMinInput(""); setPriceRange([0, priceRange[1]]); return; }
              if (!/^[0-9]+$/.test(raw)) return;
              const num = Number(raw);
              setMinInput(raw);
              setPriceRange([num, priceRange[1]]);
            }}
            onBlur={() => { if (minInput === "") setMinInput("0"); }}
            className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl p-3 text-center focus:outline-none"
          />
          <input
            type="number"
            min={0}
            value={maxInput}
            placeholder="0"
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") { setMaxInput(""); setPriceRange([priceRange[0], 0]); return; }
              if (!/^[0-9]+$/.test(raw)) return;
              const num = Number(raw);
              setMaxInput(raw);
              setPriceRange([priceRange[0], num]);
            }}
            onBlur={() => { if (maxInput === "") setMaxInput("0"); }}
            className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl p-3 text-center focus:outline-none"
          />
        </div>

        <input type="range" min={0} max={highestPrice} value={priceRange[0]}
          onChange={(e) => { const n = Number(e.target.value); setPriceRange([n, priceRange[1]]); setMinInput(String(n)); }}
          className="w-full accent-black dark:accent-slate-500 mb-3"
        />
        <input type="range" min={0} max={highestPrice} value={priceRange[1]}
          onChange={(e) => { const n = Number(e.target.value); setPriceRange([priceRange[0], n]); setMaxInput(String(n)); }}
          className="w-full accent-black dark:accent-slate-500"
        />
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <h3 className="font-bold text-xl mb-4">{t('filters.sort')}</h3>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-[#232326] dark:text-gray-100 focus:outline-none">
          <option value="">{t('filters.select')}</option>
          <option value="cheap">{t('filters.cheap_to_expensive')}</option>
          <option value="expensive">{t('filters.expensive_to_cheap')}</option>
        </select>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <h3 className="font-bold text-xl mb-5">{t('filters.model')}</h3>
        <div className="space-y-4">
          {allModels.map((model) => (
            <label key={model} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <input type="checkbox" checked={selectedSeries.includes(model)}
                  onChange={() => toggle(model, selectedSeries, setSelectedSeries)}
                  className="accent-black dark:accent-slate-500" />
                <span className="ml-3 text-gray-700 dark:text-gray-300">{model}</span>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500">({getModelCount(model)})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <h3 className="font-bold text-xl mb-5">{t('filters.color')}</h3>
        <div className="space-y-4 max-h-72 overflow-y-auto">
          {allColors.map((color) => (
            <label key={color} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <input type="checkbox" checked={selectedColor.includes(color)}
                  onChange={() => toggle(color, selectedColor, setSelectedColor)}
                  className="accent-black dark:accent-slate-500" />
                <span className="ml-3 text-gray-700 dark:text-gray-300">{color}</span>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500">({getColorCount(color)})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <h3 className="font-bold text-xl mb-5">{t('filters.storage')}</h3>
        <div className="space-y-4 max-h-72 overflow-y-auto">
          {allMemory.map((memory) => (
            <label key={memory} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <input type="checkbox" checked={selectedMemory.includes(memory)}
                  onChange={() => toggle(memory, selectedMemory, setSelectedMemory)}
                  className="accent-black dark:accent-slate-500" />
                <span className="ml-3 text-gray-700 dark:text-gray-300">{memory}</span>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500">({getMemoryCount(memory)})</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] dark:bg-[#0f0f13] text-[#1d1d1f] dark:text-gray-100 pb-24 transition-colors duration-300">

      {/* Mobile filter drawer overlay */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          {/* Drawer */}
          <div className="relative ml-auto w-full max-w-sm h-full bg-[#f5f5f7] dark:bg-[#1a1a1e] overflow-y-auto p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold dark:text-white">{t('filters.title') || 'Filters'}</h2>
              <button onClick={() => setFilterOpen(false)}
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                ✕
              </button>
            </div>
            {filterSidebar}
            <button onClick={() => setFilterOpen(false)}
              className="mt-4 w-full py-3 rounded-2xl bg-black dark:bg-slate-700 text-white font-semibold hover:bg-gray-800 dark:hover:bg-slate-600 transition">
              {t('filters.apply') || 'Apply Filters'}
            </button>
          </div>
        </div>
      )}

      {/* Page title */}
      <h1 className="text-2xl md:text-4xl font-bold px-4 md:px-10 lg:mx-20 py-6 md:py-8">
        {title}
      </h1>

      {/* Mobile filter toggle button */}
      <div className="lg:hidden px-4 md:px-10 mb-4">
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-[#1c1c1e] border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
          </svg>
          {t('filters.title') || 'Filters'}
          {(selectedSeries.length + selectedColor.length + selectedMemory.length) > 0 && (
            <span className="ml-1 bg-black dark:bg-slate-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedSeries.length + selectedColor.length + selectedMemory.length}
            </span>
          )}
        </button>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:mx-20 gap-6 lg:gap-12">

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          {filterSidebar}
        </div>

        {/* Products */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">

            {sortedCards.map((item) => {
              const uniqueKey = `${item.id}-${item.color}`;
              return (
                <Link
                  key={uniqueKey}
                  to={`/detail/${item.id}?color=${encodeURIComponent(item.color)}`}
                  className="group flex flex-col justify-between bg-white dark:bg-[#1c1c1e] p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1"
                >
                  <div>
                    <div className="w-full h-[160px] md:h-[220px] flex justify-center items-center mb-3 md:mb-4">
                      <img
                        src={item.img}
                        alt={item.model}
                        loading="lazy"
                        decoding="async"
                        className="max-h-[140px] md:max-h-[190px] object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="font-semibold text-center text-sm md:text-base text-gray-900 dark:text-gray-100 line-clamp-2">
                      {item.model}
                    </p>
                    <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-1">{item.color}</p>
                  </div>

                  <div className="mt-3 md:mt-5 pt-3 md:pt-4 text-center">
                    <p className="font-bold text-base md:text-lg text-gray-900 dark:text-gray-100">
                      {t('product.from_price_suffix', { price: item.price.toLocaleString() })}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {t('product.monthly_price', { price: item.monthly })}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({ id: item.id, model: item.model, color: item.color, size: "Default", price: item.price, img: item.img });
                      }}
                      className="w-full mt-3 bg-black text-white rounded-full py-2.5 text-sm hover:bg-gray-800 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
                    >
                      {t('cart.add_to_cart')}
                    </button>
                  </div>
                </Link>
              );
            })}

          </div>

          {sortedCards.length === 0 && (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              {t('filters.no_results')}
            </div>
          )}
        </div>

      </div>

    </div>
  );

}

export default IphoneSiralama;