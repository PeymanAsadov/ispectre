import { useState, useEffect, useMemo, useCallback } from "react";
import Macbook from "./mac";
import { useTranslation } from "react-i18next";

function MacSiralama({ title, macbooks = [] }) {
  const { t } = useTranslation();

  const allCards = useMemo(() => {
    const cards = [];
    macbooks.forEach((product) => {
      product.colors?.forEach((color) => {
        if (!color.storage?.length) return;
        const prices = color.storage.map((s) => Number(s.price));
        const minPrice = Math.min(...prices);
        cards.push({
          model: product.model,
          color: color.name,
          price: minPrice,
          storage: color.storage,
        });
      });
    });
    return cards;
  }, [macbooks]);

  const highestPrice = useMemo(() => {
    let max = 0;
    allCards.forEach((card) => {
      card.storage.forEach((s) => {
        if (Number(s.price) > max) max = Number(s.price);
      });
    });
    return max || 10000;
  }, [allCards]);

  const [priceRange, setPriceRange] = useState([0, highestPrice]);
  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState(String(highestPrice));
  const [sortBy, setSortBy] = useState("");
  const [selectedModel, setSelectedModel] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState([]);

  useEffect(() => {
    setPriceRange([0, highestPrice]);
    setMinInput("0");
    setMaxInput(String(highestPrice));
  }, [highestPrice]);

  const allModels = useMemo(
    () => [...new Set(allCards.map((c) => c.model))],
    [allCards]
  );

  const allColors = useMemo(
    () => [...new Set(allCards.map((c) => c.color))],
    [allCards]
  );

  const allMemory = useMemo(() => {
    const set = new Set();
    allCards.forEach((card) => {
      card.storage.forEach((s) => set.add(s.size.trim()));
    });
    return [...set];
  }, [allCards]);

  const getModelCount = (model) =>
    allCards.filter((c) => c.model === model).length;

  const getColorCount = (color) =>
    allCards.filter((c) => c.color === color).length;

  const getMemoryCount = (memory) =>
    allCards.filter((card) =>
      card.storage.some((s) => s.size.trim() === memory)
    ).length;

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

        <div className="hidden lg:block w-80 flex-shrink-0 space-y-6">

          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <h3 className="font-bold text-xl mb-5">{t('filters.price')}</h3>
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
                className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl p-3 text-center text-sm focus:outline-none"
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
                className="w-1/2 border border-gray-200 dark:border-gray-700 dark:bg-[#232326] dark:text-gray-100 rounded-xl p-3 text-center text-sm focus:outline-none"
              />
            </div>
            <input
              type="range"
              min={0}
              max={highestPrice}
              value={priceRange[0]}
              onChange={(e) => {
                const num = Number(e.target.value);
                setPriceRange([num, priceRange[1]]);
                setMinInput(String(num));
              }}
              className="w-full accent-black dark:accent-slate-500 mb-3"
            />
            <input
              type="range"
              min={0}
              max={highestPrice}
              value={priceRange[1]}
              onChange={(e) => {
                const num = Number(e.target.value);
                setPriceRange([priceRange[0], num]);
                setMaxInput(String(num));
              }}
              className="w-full accent-black dark:accent-slate-500"
            />
          </div>

          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <h3 className="font-bold text-xl mb-4">{t('filters.sort')}</h3>
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

          {allModels.length > 1 && (
            <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
              <h3 className="font-bold text-xl mb-5">{t('filters.model')}</h3>
              <div className="space-y-4">
                {allModels.map((model) => (
                  <label key={model} className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedModel.includes(model)}
                        onChange={() => toggle(model, selectedModel, setSelectedModel)}
                        className="accent-black dark:accent-slate-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{model}</span>
                    </div>
                    <span className="text-sm text-gray-400 dark:text-gray-500">({getModelCount(model)})</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <h3 className="font-bold text-xl mb-5">{t('filters.color')}</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {allColors.map((color) => (
                <label key={color} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedColor.includes(color)}
                      onChange={() => toggle(color, selectedColor, setSelectedColor)}
                      className="accent-black dark:accent-slate-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{color}</span>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">({getColorCount(color)})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-6 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <h3 className="font-bold text-xl mb-5">{t('filters.storage')}</h3>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {allMemory.map((memory) => (
                <label key={memory} className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedMemory.includes(memory)}
                      onChange={() => toggle(memory, selectedMemory, setSelectedMemory)}
                      className="accent-black dark:accent-slate-500"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{memory}</span>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">({getMemoryCount(memory)})</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        <div className="flex-1">
          <Macbook
            macbooks={macbooks}
            minPrice={priceRange[0]}
            maxPrice={priceRange[1]}
            selectedModel={selectedModel}
            selectedColor={selectedColor}
            selectedMemory={selectedMemory}
            sortBy={sortBy}
          />
        </div>

      </div>
    </div>
  );
}

export default MacSiralama;
