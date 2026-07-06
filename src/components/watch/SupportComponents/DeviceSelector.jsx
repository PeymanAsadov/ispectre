import { useTranslation } from "react-i18next";
import { models } from "./data";

function DeviceSelector({ device, setDevice, selectedModel, setSelectedModel, goToRepairForm }) {
    const { t } = useTranslation();

    const changeDevice = (newDevice) => {
        setDevice(newDevice);
        if (models[newDevice] && models[newDevice].length > 0) {
            setSelectedModel(models[newDevice][0]);
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

                {/* Tabs */}
                <div className="mt-10 flex justify-center gap-4">
                    {Object.keys(models).map((brand) => (
                        <button
                            key={brand}
                            onClick={() => changeDevice(brand)}
                            className={`rounded-xl px-6 py-3 font-medium transition-all ${
                                device === brand
                                    ? "bg-slate-950 text-white dark:bg-slate-700"
                                    : "bg-white dark:bg-slate-900 text-gray-600 dark:text-slate-350 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800"
                            }`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>

                {/* Select */}
                <div className="mt-6 flex justify-center">
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full max-w-xs rounded-xl border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-3 shadow-sm outline-none focus:border-blue-500"
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