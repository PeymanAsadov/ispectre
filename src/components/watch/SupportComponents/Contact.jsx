import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"; 
import { useTranslation } from "react-i18next"; 
import { contactInfo } from "./data"; 

function Contact() { 
  const { t } = useTranslation("", { keyPrefix: "support" }); 

  return ( 
    <> 
      <section className="bg-[#f5f5f7] dark:bg-slate-950 py-28 transition-colors duration-300"> 
        <div className="mx-auto max-w-7xl px-6"> 
          <div className="text-center"> 
            <span className="font-semibold uppercase tracking-[4px] text-blue-600 dark:text-blue-400"> 
              {t("contact.badge")} 
            </span> 
            <h2 className="mt-5 text-5xl font-bold text-gray-900 dark:text-white">
              {t("contact.title")}
            </h2> 
            <p className="mt-6 text-lg text-gray-500 dark:text-slate-400">
              {t("contact.subtitle")}
            </p> 
          </div> 

          <div className="mt-16 grid gap-10 lg:grid-cols-2"> 
            <div className="space-y-6"> 
              <InfoCard icon={<MapPin className="text-blue-600" />} title={t("contact.address_label")} value={contactInfo.address} /> 
              <InfoCard icon={<Phone className="text-green-600 dark:text-green-400" />} title={t("contact.phone_label")} value={contactInfo.phone} href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} /> 
              <InfoCard icon={<Mail className="text-red-500" />} title={t("contact.email_label")} value={contactInfo.email} href={`mailto:${contactInfo.email}`} /> 
              <InfoCard icon={<Clock className="text-orange-500" />} title={t("contact.hours_label")} value={t("contact.working_hours")} /> 
            </div> 

            <div className="overflow-hidden rounded-[32px] border border-transparent dark:border-slate-800 shadow-xl dark:shadow-2xl"> 
              <iframe title="Google Maps" src="https://www.google.com/maps?q=Baku&output=embed" className="h-[620px] w-full dark:invert dark:opacity-85" loading="lazy" /> 
            </div> 
          </div> 
        </div> 
      </section> 

      <a 
        href={`https://wa.me/${contactInfo.whatsapp}`} 
        target="_blank" 
        rel="noreferrer" 
className="fixed bottom-24 right-7 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110"      > 
        <MessageCircle size={30} /> 
      </a> 
    </> 
  ); 
} 

function InfoCard({ icon, title, value, href }) { 
  return ( 
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl"> 
      <div className="flex items-center gap-5"> 
        <div className="rounded-full bg-gray-100 dark:bg-slate-800 p-4">{icon}</div> 
        <div> 
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h4> 
          {href ? ( 
            <a href={href} className="mt-1 block text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
              {value}
            </a> 
          ) : ( 
            <p className="mt-1 text-gray-500 dark:text-slate-400">{value}</p> 
          )} 
        </div> 
      </div> 
    </div> 
  ); 
} 

export default Contact;
