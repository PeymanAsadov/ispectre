import { useTranslation } from "react-i18next";


function Statistics() {
  const { t } = useTranslation();
  const items = (t("support.stats_items", { returnObjects: true }) || []);

  return (
    <section className="bg-slate-50 dark:bg-slate-950 py-28 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="font-semibold uppercase tracking-[4px] text-blue-600 dark:text-blue-400">
            {t("support.stats_section.badge")}
          </span>
          <h2 className="mt-5 text-5xl font-bold text-slate-900 dark:text-white">{t("support.stats_section.title")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
            {t("support.stats_section.subtitle")}
          </p>
        </div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {Array.isArray(items) && items.map((item, index) => (
            <div
              key={index}
              className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-400 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/80"
            >
              <h3 className="text-5xl font-bold text-slate-950 dark:text-white">{item.number}</h3>
              <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
}

export default Statistics;