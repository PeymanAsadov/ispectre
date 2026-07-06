import { ShieldCheck, Wrench, BadgeCheck, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";

const whyChooseIcons = [ShieldCheck, Wrench, BadgeCheck, Truck];

function WhyChoose() {
  const { t } = useTranslation("", { keyPrefix: "support" });
  const items = t("why_choose_items", { returnObjects: true }) || [];

  return (
    <section className="bg-white dark:bg-slate-950 py-28 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="font-semibold uppercase tracking-[4px] text-blue-600 dark:text-blue-400">
            {t("why_choose.badge")}
          </span>
          <h2 className="mt-5 text-5xl font-bold text-gray-900 dark:text-white">{t("why_choose.title")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500 dark:text-slate-400">
            {t("why_choose.subtitle")}
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {Array.isArray(items) && items.map((card, index) => {
            const Icon = whyChooseIcons[index] || ShieldCheck;

            return (
              <div
                key={index}
                className="group rounded-[30px] border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 dark:hover:border-slate-700 hover:shadow-2xl dark:hover:shadow-3xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 dark:bg-slate-850 transition duration-300 group-hover:bg-blue-600">
                  <Icon size={30} className="text-blue-600 dark:text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                <p className="mt-5 leading-8 text-gray-500 dark:text-slate-400">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

  );
}

export default WhyChoose;