import { useState, useMemo, useCallback, useEffect } from "react";
import WatchCard from "./WatchCard";
import { useTranslation } from "react-i18next";

function WatchSiralama({ title, watches = [] }) {
  const { t } = useTranslation();

  const allCards = useMemo(() => {
    const cards = [];
    watches.forEach((watch) => {
      const seenColors = new Set();
      watch.colors?.forEach((colorObj) => {
        if (seenColors.has(colorObj.name)) return;
        seenColors.add(colorObj.name);
        if (!colorObj.storage || colorObj.storage.length === 0) return;
        const prices = colorObj.storage.map((s) => Number(s.price));
        const minPrice = Math.min(...prices);
        cards.push({
          id: watch.id,
          model: watch.model,
          color: colorObj.name,
          img: colorObj.images?.[0]?.url || "",
          price: minPrice,
          storage: colorObj.storage,
        });
      });
    });
    return cards;
  }, [watches]);

  const highestPrice = useMemo(() => {
    let max = 0;
    allCards.forEach((card) => {
      card.storage.forEach((s) => {
        if (Number(s.price) > max) max = Number(s.price);
      });
    });
    return max || 2000;
  }, [allCards]);

  const [priceRange, setPriceRange] = useState([0, highestPrice]);
  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState(String(highestPrice));
  const [sortBy, setSortBy] = useState("");
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setPriceRange([0, highestPrice]);
    setMinInput("0");
    setMaxInput(String(highestPrice));
  }, [highestPrice]);

  const allModels = useMemo(() => [...new Set(allCards.map((c) => c.model))], [allCards]);
  const allColors = useMemo(() => [...new Set(allCards.map((c) => c.color))], [allCards]);
  const allSizes = useMemo(() => {
    const set = new Set();
    allCards.forEach((c) => c.storage.forEach((s) => set.add(s.size)));
    return [...set].sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [allCards]);

  const getModelCount = (m) => allCards.filter((c) => c.model === m).length;
  const getColorCount = (c) => allCards.filter((card) => card.color === c).length;
  const getSizeCount = (s) => allCards.filter((c) => c.storage.some((v) => v.size === s)).length;

  const toggle = useCallback((value, selected, setSelected) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((i) => i !== value)
        : [...selected, value]
    );
  }, []);

  const filterSidebar = (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-gray-100">{t('filters.price')}</h3>
        <div className="flex gap-3 mb-4">
          <input
            type="number"
            min={0}
            value={minInput}
            placeholder="0"
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") {
                setMinInput("");
                setPriceRange([0, priceRange[1]]);
                return;
              }
              if (!/^[0-9]+$/.test(raw)) return;
              const num = Number(raw);
              setMinInput(raw);
              setPriceRange([num, priceRange[1]]);
            }}
            onBlur={() => {
              if (minInput === "") setMinInput("0");
            }}
            className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl p-3 text-center focus:outline-none"
          />
          <input
            type="number"
            min={0}
            value={maxInput}
            placeholder="0"
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") {
                setMaxInput("");
                setPriceRange([priceRange[0], 0]);
                return;
              }
              if (!/^[0-9]+$/.test(raw)) return;
              const num = Number(raw);
              setMaxInput(raw);
              setPriceRange([priceRange[0], num]);
            }}
            onBlur={() => {
              if (maxInput === "") setMaxInput("0");
            }}
            className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl p-3 text-center focus:outline-none"
          />
        </div>
        <input
          type="range" min={0} max={highestPrice} value={priceRange[0]}
          onChange={(e) => {
            const num = Number(e.target.value);
            setPriceRange([num, priceRange[1]]);
            setMinInput(String(num));
          }}
          className="w-full accent-black dark:accent-slate-500 mb-3"
        />
        <input
          type="range" min={0} max={highestPrice} value={priceRange[1]}
          onChange={(e) => {
            const num = Number(e.target.value);
            setPriceRange([priceRange[0], num]);
            setMaxInput(String(num));
          }}
          className="w-full accent-black dark:accent-slate-500"
        />
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100">{t('filters.sort')}</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-[#232326] font-medium text-gray-800 dark:text-gray-100 focus:outline-none"
        >
          <option value="">{t('filters.select')}</option>
          <option value="cheap">{t('filters.cheap_to_expensive')}</option>
          <option value="expensive">{t('filters.expensive_to_cheap')}</option>
        </select>
      </div>

      {allModels.length > 1 && (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
          <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-gray-100">{t('filters.model')}</h3>
          <div className="space-y-4">
            {allModels.map((m) => (
              <label key={m} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedModels.includes(m)}
                    onChange={() => toggle(m, selectedModels, setSelectedModels)}
                    className="accent-black dark:accent-slate-500 w-4 h-4"
                  />
                  <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{m}</span>
                </div>
                <span className="text-sm text-gray-400 dark:text-gray-500">({getModelCount(m)})</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
        <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-gray-100">{t('filters.color')}</h3>
        <div className="space-y-4 max-h-72 overflow-y-auto">
          {allColors.map((c) => (
            <label key={c} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedColor.includes(c)}
                  onChange={() => toggle(c, selectedColor, setSelectedColor)}
                  className="accent-black dark:accent-slate-500 w-4 h-4"
                />
                <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{c}</span>
              </div>
              <span className="text-sm text-gray-400 dark:text-gray-500">({getColorCount(c)})</span>
            </label>
          ))}
        </div>
      </div>

      {allSizes.length > 1 && (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
          <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-gray-100">{t('filters.size')}</h3>
          <div className="space-y-4">
            {allSizes.map((s) => (
              <label key={s} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSize.includes(s)}
                    onChange={() => toggle(s, selectedSize, setSelectedSize)}
                    className="accent-black dark:accent-slate-500 w-4 h-4"
                  />
                  <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{s}</span>
                </div>
                <span className="text-sm text-gray-400 dark:text-gray-500">({getSizeCount(s)})</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] dark:bg-[#0f0f13] text-[#1d1d1f] dark:text-gray-100 pb-24 transition-colors duration-300">

      {/* Mobile filter drawer overlay */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div className="relative ml-auto w-full max-w-sm h-full bg-[#f5f5f7] dark:bg-[#1a1a1e] overflow-y-auto p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('filters.title') || 'Filters'}</h2>
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

      <h1 className="text-2xl md:text-4xl font-bold px-4 md:px-10 lg:mx-20 py-6 md:py-8">{title}</h1>

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
          {(selectedModels.length + selectedColor.length + selectedSize.length) > 0 && (
            <span className="ml-1 bg-black dark:bg-slate-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedModels.length + selectedColor.length + selectedSize.length}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:mx-20 gap-6 lg:gap-12">

        <div className="hidden lg:block w-80 flex-shrink-0">
          {filterSidebar}
        </div>

        <div className="flex-1">
          <WatchCard
            watches={watches}
            minPrice={priceRange[0]}
            maxPrice={priceRange[1]}
            selectedModels={selectedModels}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            sortBy={sortBy}
          />
        </div>

      </div>
    </div>
  );
}

export default WatchSiralama;