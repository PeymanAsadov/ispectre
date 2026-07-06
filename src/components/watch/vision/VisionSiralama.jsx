import { useState, useMemo, useCallback, useEffect } from "react";
import VisionCard from "./VisionCard";
import { useTranslation } from "react-i18next";

function VisionSiralama({ title, visions = [] }) {
  const { t } = useTranslation();


  // CARD DATA

  const allCards = useMemo(() => {
    const cards = [];
    visions.forEach((v) => {
      v.colors?.forEach((colorObj) => {
        if (!colorObj.storage || colorObj.storage.length === 0) return;
        const prices = colorObj.storage.map((s) => Number(s.price));
        const minPrice = Math.min(...prices);
        cards.push({
          id: v.id,
          model: v.model,
          color: colorObj.name,
          img: colorObj.images?.[0]?.url || "",
          price: minPrice,
          storage: colorObj.storage,
        });
      });
    });
    return cards;
  }, [visions]);


  // MAX PRICE

  const highestPrice = useMemo(() => {
    let max = 0;
    allCards.forEach((card) => {
      card.storage.forEach((s) => {
        if (Number(s.price) > max) max = Number(s.price);
      });
    });
    return max || 10000;
  }, [allCards]);


  // STATES

  const [priceRange, setPriceRange] = useState([0, highestPrice]);
  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState(String(highestPrice));
  const [sortBy, setSortBy] = useState("");
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);

  useEffect(() => {
    setPriceRange([0, highestPrice]);
    setMinInput("0");
    setMaxInput(String(highestPrice));
  }, [highestPrice]);


  // FILTER VALUES

  const allModels = useMemo(() => [...new Set(allCards.map((c) => c.model))], [allCards]);
  const allColors = useMemo(() => [...new Set(allCards.map((c) => c.color))], [allCards]);
  const allStorages = useMemo(() => {
    const set = new Set();
    allCards.forEach((c) => c.storage.forEach((s) => set.add(s.size)));
    return [...set].sort((a, b) => parseFloat(a) - parseFloat(b));
  }, [allCards]);

  const getModelCount = (m) => allCards.filter((c) => c.model === m).length;
  const getColorCount = (c) => allCards.filter((card) => card.color === c).length;
  const getStorageCount = (s) => allCards.filter((c) => c.storage.some((v) => v.size === s)).length;

  
  
  // TOGGLE
  
  
  const toggle = useCallback((value, selected, setSelected) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((i) => i !== value)
        : [...selected, value]
    );
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] dark:bg-[#0f0f13] text-[#1d1d1f] dark:text-gray-100 pb-24 transition-colors duration-300">
      <h1 className="text-2xl md:text-4xl font-bold px-4 md:px-10 lg:mx-20 py-6 md:py-8">{title}</h1>

      <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:mx-20 gap-6 lg:gap-12">
        {/* SIDEBAR */}
        <div className="hidden lg:block w-80 flex-shrink-0 space-y-6">
          {/* PRICE FILTER */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-white">{t('filters.price')}</h3>
            <div className="flex gap-3 mb-4">
              <input
                type="number"
                min={0}
                max={priceRange[1]}
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
                  if (num <= priceRange[1]) {
                    setPriceRange([num, priceRange[1]]);
                  }
                }}
                onBlur={() => {
                  if (minInput === "" || Number(minInput) > priceRange[1]) {
                    setMinInput(String(priceRange[0]));
                  }
                }}
                className="w-1/2 border dark:border-gray-700 rounded-xl p-3 text-center bg-transparent focus:outline-none text-gray-900 dark:text-white"
              />
              <input
                type="number"
                min={priceRange[0]}
                max={highestPrice}
                value={maxInput}
                placeholder={String(highestPrice)}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setMaxInput("");
                    setPriceRange([priceRange[0], highestPrice]);
                    return;
                  }
                  if (!/^[0-9]+$/.test(raw)) return;
                  const num = Number(raw);
                  setMaxInput(raw);
                  if (num >= priceRange[0]) {
                    setPriceRange([priceRange[0], num]);
                  }
                }}
                onBlur={() => {
                  if (maxInput === "" || Number(maxInput) < priceRange[0]) {
                    setMaxInput(String(priceRange[1]));
                  }
                }}
                className="w-1/2 border dark:border-gray-700 rounded-xl p-3 text-center bg-transparent focus:outline-none text-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={highestPrice}
                value={priceRange[0]}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  if (num <= priceRange[1]) {
                    setPriceRange([num, priceRange[1]]);
                    setMinInput(String(num));
                  }
                }}
                className="w-full accent-black dark:accent-white mb-1"
              />
              <input
                type="range"
                min={0}
                max={highestPrice}
                value={priceRange[1]}
                onChange={(e) => {
                  const num = Number(e.target.value);
                  if (num >= priceRange[0]) {
                    setPriceRange([priceRange[0], num]);
                    setMaxInput(String(num));
                  }
                }}
                className="w-full accent-black dark:accent-white"
              />
            </div>
          </div>

          {/* SORT */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">{t('filters.sort')}</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-[#1c1c1e] font-medium text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              <option value="">{t('filters.select')}</option>
              <option value="cheap">{t('filters.cheap_to_expensive')}</option>
              <option value="expensive">{t('filters.expensive_to_cheap')}</option>
            </select>
          </div>

          {/* MODEL */}
          {allModels.length > 1 && (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-white">{t('filters.model')}</h3>
              <div className="space-y-4">
                {allModels.map((m) => (
                  <label key={m} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedModels.includes(m)}
                        onChange={() => toggle(m, selectedModels, setSelectedModels)}
                        className="accent-black dark:accent-white w-4 h-4"
                      />
                      <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{m}</span>
                    </div>
                    <span className="text-sm text-gray-400">({getModelCount(m)})</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* COLOR */}
          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-white">{t('filters.color')}</h3>
            <div className="space-y-4 max-h-72 overflow-y-auto JSON_scrollbar">
              {allColors.map((c) => (
                <label key={c} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedColor.includes(c)}
                      onChange={() => toggle(c, selectedColor, setSelectedColor)}
                      className="accent-black dark:accent-white w-4 h-4"
                    />
                    <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{c}</span>
                  </div>
                  <span className="text-sm text-gray-400">({getColorCount(c)})</span>
                </label>
              ))}
            </div>
          </div>

          {/* STORAGE */}
          {allStorages.length > 1 && (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <h3 className="font-bold text-xl mb-5 text-gray-900 dark:text-white">{t('filters.storage')}</h3>
              <div className="space-y-4">
                {allStorages.map((s) => (
                  <label key={s} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedStorage.includes(s)}
                        onChange={() => toggle(s, selectedStorage, setSelectedStorage)}
                        className="accent-black dark:accent-white w-4 h-4"
                      />
                      <span className="ml-3 font-medium text-gray-800 dark:text-gray-200">{s}</span>
                    </div>
                    <span className="text-sm text-gray-400">({getStorageCount(s)})</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PRODUCTS SIDE */}
        <div className="flex-1">
          <VisionCard
            visions={visions}
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
  );
}

export default VisionSiralama;
