import { useState } from "react";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation();
  
  const faqs = t("support.faqs", { returnObjects: true }) || [];
  
  const [openFAQ, setOpenFAQ] = useState(0);

  return (
    <section className="bg-white dark:bg-slate-950 py-28 transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-6">
        {/* Başlıq Hissəsi */}
        <div className="text-center">
          <span className="font-semibold uppercase tracking-[4px] text-blue-600 dark:text-blue-400">
            {t("support.faq_section.badge")}
          </span>
          <h2 className="mt-5 text-5xl font-bold text-gray-900 dark:text-white">{t("support.faq_section.title")}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500 dark:text-slate-400">
            {t("support.faq_section.subtitle")}
          </p>
        </div>

        <div className="mt-16 space-y-5">
          {Array.isArray(faqs) && faqs.map((faq, index) => {
            const opened = openFAQ === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-[28px] border border-gray-200 dark:border-slate-805 bg-white dark:bg-slate-900 transition-all duration-305 hover:border-blue-200 dark:hover:border-slate-750 hover:shadow-lg dark:hover:shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setOpenFAQ(opened ? null : index)}
                  className="flex w-full items-center justify-between px-8 py-7"
                >
                  <span className="text-left text-xl font-semibold text-gray-900 dark:text-white">{faq?.title}</span>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                      opened ? "rotate-45 bg-blue-600 dark:bg-blue-500 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300"
                    }`}
                  >
                    <Plus size={22} />
                  </div>
                </button>

                <div className={`grid transition-all duration-500 ${opened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-8 pb-8 leading-8 text-gray-500 dark:text-slate-400">{faq?.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

  );
}

export default FAQ;