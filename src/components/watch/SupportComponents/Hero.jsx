import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

function Hero() {
  const { t } = useTranslation("", { keyPrefix: "support" });

  const scrollToSelector = () => {
    const section = document.getElementById("device-selector");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fb] via-white to-white dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950" />
      <div className="absolute left-1/2 top-[-120px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[160px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-7 text-center">
        <span className="rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 px-5 py-2 text-sm font-semibold text-blue-600 dark:text-blue-450">
          {t("hero.badge")}
        </span>

        <h1 className="mt-8 text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-7xl">
          {t("hero.welcome")}
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-sky-400 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent">
             {t("hero.iSpectre Service Center")}

          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-500 dark:text-slate-400">
          {t("hero.subtitle")}
        </p>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row">
          <button
            onClick={scrollToSelector}
            className="rounded-full bg-slate-950 text-white hover:bg-slate-900 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 px-10 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {t("hero.cta_primary")}
          </button>
          <button
            onClick={scrollToSelector}
            className="rounded-full border border-gray-300 dark:border-slate-800 bg-transparent text-gray-900 dark:text-white hover:bg-gray-105 dark:hover:bg-slate-900 px-10 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {t("hero.cta_secondary")}
          </button>
        </div>

        <div className="mt-20">
          <img
            src="https://media.machines.com.my/Shopify_IMG/multi-product-pro-v2026.png"
            alt={t("hero.image_alt")}
            className="mx-auto w-full max-w-5xl transition duration-500 hover:scale-[1.02]"
          />
        </div>

        <button onClick={scrollToSelector} className="mt-14 animate-bounce">
          <ChevronDown size={34} className="text-gray-400 dark:text-slate-600" />
        </button>
      </div>
    </section>

  );
}

export default Hero;