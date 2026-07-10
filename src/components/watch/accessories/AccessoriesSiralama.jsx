import { useState, useEffect, useMemo, useCallback } from "react";
import Keyboard from "./Accessories";
import { useTranslation } from "react-i18next";

function KeyboardSiralama({ title, keyboards = [] }) {
  const { t } = useTranslation();

  const { prices, allModels, allColors, counts } = useMemo(() => {
    const flatPrices = [];
    const modelsSet = new Set();
    const colorsSet = new Set();
    const modelsCount = {};
    const colorsCount = {};
    const storageCount = {};

    keyboards.forEach((keyboard) => {
      modelsSet.add(keyboard.model);
      keyboard.colors?.forEach((color) => {
        colorsSet.add(color.name);
        modelsCount[keyboard.model] = (modelsCount[keyboard.model] || 0) + 1;
        colorsCount[color.name] = (colorsCount[color.name] || 0) + 1;
        color.storage?.forEach((s) => {
          const priceNum = Number(s.price);
          if (!isNaN(priceNum)) flatPrices.push(priceNum);
          const size = s.size.trim();
          storageCount[size] = (storageCount[size] || 0) + 1;
        });
      });
    });

    return {
      prices: flatPrices,
      allModels: [...modelsSet],
      allColors: [...colorsSet],
      counts: { modelsCount, colorsCount, storageCount },
    };
  }, [keyboards]);

  const highestPrice = useMemo(() => prices.length ? Math.max(...prices) : 5000, [prices]);

  const [priceRange, setPriceRange] = useState([0, highestPrice]);
  const [sortBy, setSortBy] = useState("");
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    setPriceRange([0, highestPrice]);
  }, [highestPrice]);

  const allStorageList = useMemo(() => Object.keys(counts.storageCount), [counts]);

  const toggle = useCallback((value, setArr) => {
    setArr((prev) => prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]);
  }, []);

  const filterSidebar = (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-gray-100">{t('filters.price')}</h3>
        <div className="flex gap-3 mb-6">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl p-3 text-center text-sm focus:outline-none"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl p-3 text-center text-sm focus:outline-none"
          />
        </div>
        <input
          type="range"
          min="0"
          max={highestPrice}
          value={priceRange[0]}
          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          className="w-full accent-black dark:accent-white mb-4"
        />
        <input
          type="range"
          min="0"
          max={highestPrice}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-black dark:accent-white"
        />
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100">{t('filters.sort')}</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-sm bg-white dark:bg-[#232326] dark:text-gray-100 cursor-pointer focus:outline-none"
        >
          <option value="">{t('filters.select')}</option>
          <option value="cheap">{t('filters.cheap_to_expensive')}</option>
          <option value="expensive">{t('filters.expensive_to_cheap')}</option>
        </select>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-gray-100">{t('filters.model')}</h3>
        <div className="space-y-4">
          {allModels.map((m) => (
            <label key={m} className="flex justify-between items-center cursor-pointer text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedModels.includes(m)}
                  onChange={() => toggle(m, setSelectedModels)}
                  className="accent-black dark:accent-white h-4 w-4"
                />
                <span className="ml-3 text-gray-700 dark:text-gray-300">{m}</span>
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-xs">({counts.modelsCount[m] || 0})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-gray-100">{t('filters.color')}</h3>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {allColors.map((c) => (
            <label key={c} className="flex justify-between items-center cursor-pointer text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedColor.includes(c)}
                  onChange={() => toggle(c, setSelectedColor)}
                  className="accent-black dark:accent-white h-4 w-4"
                />
                <span className="ml-3 text-gray-700 dark:text-gray-300">{c}</span>
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-xs">({counts.colorsCount[c] || 0})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-gray-100">{t('filters.layout')}</h3>
        <div className="space-y-4">
          {allStorageList.map((s) => (
            <label key={s} className="flex justify-between items-center cursor-pointer text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStorage.includes(s)}
                  onChange={() => toggle(s, setSelectedStorage)}
                  className="accent-black dark:accent-white h-4 w-4"
                />
                <span className="ml-3 text-gray-700 dark:text-gray-300">{s}</span>
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-xs">({counts.storageCount[s] || 0})</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#f5f5f7] dark:bg-[#0f0f13] text-[#1d1d1f] dark:text-gray-100 min-h-screen transition-colors duration-300">

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

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col items-start gap-4 mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{title}</h1>
          <button
            onClick={() => setFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-[#1c1c1e] border border-gray-200 dark:border-gray-700 shadow-sm text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
            </svg>
            {t('filters.title') || 'Filters'}
            {(selectedModels.length + selectedColor.length + selectedStorage.length) > 0 && (
              <span className="ml-1 bg-black dark:bg-slate-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {selectedModels.length + selectedColor.length + selectedStorage.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-12">
          <div className="hidden lg:block w-80 flex-shrink-0">
            {filterSidebar}
          </div>

          <div className="flex-1">
            <Keyboard
              keyboards={keyboards}
              minPrice={priceRange[0]}
              maxPrice={priceRange[1]}
              selectedModels={selectedModels}
              selectedColor={selectedColor}
              selectedStorage={selectedStorage}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyboardSiralama;