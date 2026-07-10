import { useTranslation } from "react-i18next";
import { models } from "./data";
import { useRef, useState, useEffect } from "react";

function DeviceSelector({ device, setDevice, selectedModel, setSelectedModel, goToRepairForm }) {
    const { t } = useTranslation();
    const scrollContainerRef = useRef(null);
    
    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(false);

    const changeDevice = (newDevice) => {
        setDevice(newDevice);
        if (models[newDevice] && models[newDevice].length > 0) {
            setSelectedModel(models[newDevice][0]);
        }
    };

    const checkScrollBounds = () => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setShowLeftBtn(scrollLeft > 5);
            // 5px dözümlülük payı ilə sağ künc yoxlanışı
            setShowRightBtn(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            checkScrollBounds();
            // İlk yüklənmədə sürüşmə sahəsi olub olmadığını anlamaq üçün kiçik gecikmə
            setTimeout(checkScrollBounds, 100); 
            
            container.addEventListener("scroll", checkScrollBounds);
            window.addEventListener("resize", checkScrollBounds);
        }
        return () => {
            if (container) container.removeEventListener("scroll", checkScrollBounds);
            window.removeEventListener("resize", checkScrollBounds);
        };
    }, []);

    // Slow effektli sürüşdürmə funksiyası
   // Animasiyalı sürüşdürmə funksiyası
const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
        const scrollAmount = 240; // Sürüşmə məsafəsi
        const start = container.scrollLeft;
        const change = direction === "left" ? -scrollAmount : scrollAmount;
        const duration = 400; // Animasiyanın davametmə müddəti (milisaniyə ilə)
        let startTime = null;

        // Easing funksiyası (Gedişatın daha yumşaq və təbii görünməsi üçün)
        const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        const animateScroll = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, start, change, duration);
            
            container.scrollLeft = run;

            if (timeElapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        };

        requestAnimationFrame(animateScroll);
    }
};

    return (
        <section id="device-selector" className="bg-[#fafafa] dark:bg-slate-950 py-28 transition-colors duration-300">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <span className="text-sm font-semibold uppercase tracking-[4px] text-blue-600 dark:text-blue-400">
                        {t("support.device_selector.badge")}
                    </span>
                    <h2 className="mt-5 text-5xl font-bold text-gray-900 dark:text-white">{t("support.device_selector.title")}</h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500 dark:text-slate-400">
                        {t("support.device_selector.subtitle")}
                    </p>
                </div>

                {/* Tabs Container */}
                <div className="relative mt-10 max-w-xl mx-auto flex items-center group">
                    
                    {/* Sol Düymə (Slow opacity və scale keçidi ilə) */}
                    <button 
                        onClick={() => scroll("left")}
                        className={`absolute -left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 transition-all duration-500 ease-in-out ${
                            showLeftBtn 
                                ? "opacity-100 scale-100 pointer-events-auto" 
                                : "opacity-0 scale-75 pointer-events-none"
                        }`}
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    {/* Brendlərin Siyahısı (scroll-smooth əlavə olundu) */}
                    {/* Brendlərin Siyahısı (scroll-smooth çıxarıldı ki, yeni animasiya ilə toqquşmasın) */}
<div 
    ref={scrollContainerRef}
    className="flex w-full gap-4 overflow-x-auto scrollbar-none px-2 py-1 select-none"
    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
>
                        {Object.keys(models).map((brand) => (
                            <button
                                key={brand}
                                onClick={() => changeDevice(brand)}
                                className={`rounded-xl px-6 py-3 font-medium transition-all duration-300 shrink-0 ${
                                    device === brand
                                        ? "bg-slate-950 text-white dark:bg-slate-700 shadow-md scale-105"
                                        : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-350 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800"
                                }`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>

                    {/* Sağ Düymə (Slow opacity və scale keçidi ilə) */}
                    <button 
                        onClick={() => scroll("right")}
                        className={`absolute -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 transition-all duration-500 ease-in-out ${
                            showRightBtn 
                                ? "opacity-100 scale-100 pointer-events-auto" 
                                : "opacity-0 scale-75 pointer-events-none"
                        }`}
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Select */}
                <div className="mt-6 flex justify-center">
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full max-w-xs rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-3 shadow-sm outline-none focus:border-blue-500 transition-all"
                    >
                        {models[device]?.map((model) => (
                            <option key={model} value={model}>
                                {model}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-10 rounded-[30px] border border-blue-100 dark:border-slate-800 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-slate-900/50 dark:to-slate-900/30 p-8">
                    <p className="text-gray-500 dark:text-slate-400">{t("support.device_selector.selected_device")}</p>
                    <h3 className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{selectedModel}</h3>
                    <p className="mt-4 leading-7 text-gray-500 dark:text-slate-400">{t("support.device_selector.continue_text")}</p>
                    <button
                        onClick={goToRepairForm}
                        className="mt-8 w-full rounded-2xl bg-slate-950 text-white hover:bg-slate-900 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        {t("support.device_selector.cta")}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default DeviceSelector;