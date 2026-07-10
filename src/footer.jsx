import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (window.innerWidth < 640) {
      setOpenSection(openSection === section ? null : section);
    }
  };

  const socials = [
    { name: 'instagram', url: 'https://instagram.com', iconClass: 'fa-brands fa-instagram' },
    { name: 'facebook', url: 'https://facebook.com', iconClass: 'fa-brands fa-facebook-f' },
    { name: 'tiktok', url: 'https://tiktok.com', iconClass: 'fa-brands fa-tiktok' },
    { name: 'twitter', url: 'https://x.com', iconClass: 'fa-brands fa-x-twitter' },
    { name: 'telegram', url: 'https://t.me', iconClass: 'fa-brands fa-telegram' },
  ];

  return (
    <footer className="bg-gray-50 text-gray-500 dark:bg-black dark:text-gray-400 py-12 px-6 sm:px-10 md:px-16 transition-colors duration-300 relative border-t border-gray-200/80 dark:border-zinc-900 select-none">
      
      {/* Upper Grid - Primary Links & About */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-200 dark:border-zinc-800">
        
        {/* Column 1: Shop */}
        <div className="flex flex-col border-b border-gray-200/50 pb-4 sm:pb-0 sm:border-none">
          <h3 
            onClick={() => toggleSection('shop')}
            className="text-gray-900 dark:text-white font-medium text-sm tracking-wide mb-0 sm:mb-5 flex justify-between items-center cursor-pointer sm:cursor-default"
          >
            <span>{t('footer.shop')}</span>
            <span className={`text-xs transition-transform duration-200 sm:hidden ${openSection === 'shop' ? 'rotate-180' : ''}`}>▼</span>
          </h3>
          <ul className={`space-y-3 text-[13px] font-normal transition-all duration-300 overflow-hidden sm:max-h-none ${openSection === 'shop' ? 'max-h-[400px] mt-4' : 'max-h-0 sm:mt-0'}`}>
            <li><Link to="/macbook" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.mac')}</Link></li>
            <li><Link to="/ipad" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.ipad')}</Link></li>
            <li><Link to="/iphone" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.iphone')}</Link></li>
            <li><Link to="/watch" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.watch')}</Link></li>
            <li><Link to="/airpods" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.airpods')}</Link></li>
            <li><Link to="/tv-home" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.tv_home')}</Link></li>
            <li><Link to="/accessories" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.accessories')}</Link></li>
          </ul>
        </div>

        {/* Column 2: Services & Support */}
        <div className="flex flex-col border-b border-gray-200/50 pb-4 sm:pb-0 sm:border-none">
          <h3 
            onClick={() => toggleSection('services')}
            className="text-gray-900 dark:text-white font-medium text-sm tracking-wide mb-0 sm:mb-5 flex justify-between items-center cursor-pointer sm:cursor-default"
          >
            <span>{t('footer.services')}</span>
            <span className={`text-xs transition-transform duration-200 sm:hidden ${openSection === 'services' ? 'rotate-180' : ''}`}>▼</span>
          </h3>
          <ul className={`space-y-3 text-[13px] font-normal transition-all duration-300 overflow-hidden sm:max-h-none ${openSection === 'services' ? 'max-h-[400px] mt-4' : 'max-h-0 sm:mt-0'}`}>
            <li><Link to="/support" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.all_services')}</Link></li>
            <li><Link to="/support" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.isupport')}</Link></li>
            <li><Link to="/trade-in" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.trade_in')}</Link></li>
            <li><Link to="/installments" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.installments_credit')}</Link></li>
          </ul>
        </div>

        {/* Column 3: Clients & Information */}
        <div className="flex flex-col border-b border-gray-200/50 pb-4 sm:pb-0 sm:border-none">
          <h3 
            onClick={() => toggleSection('info')}
            className="text-gray-900 dark:text-white font-medium text-sm tracking-wide mb-0 sm:mb-5 flex justify-between items-center cursor-pointer sm:cursor-default"
          >
            <span>{t('footer.information')}</span>
            <span className={`text-xs transition-transform duration-200 sm:hidden ${openSection === 'info' ? 'rotate-180' : ''}`}>▼</span>
          </h3>
          <ul className={`space-y-3 text-[13px] font-normal transition-all duration-300 overflow-hidden sm:max-h-none ${openSection === 'info' ? 'max-h-[400px] mt-4' : 'max-h-0 sm:mt-0'}`}>
            <li><Link to="/about" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.about_us')}</Link></li>
            <li><Link to="/stores" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.find_store')}</Link></li>
            <li><Link to="/contacts" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.contacts')}</Link></li>
            <li><Link to="/returns" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.returns_warranty')}</Link></li>
            <li><Link to="/delivery" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.delivery_payment')}</Link></li>
            <li><Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">{t('footer.links.privacy_policy')}</Link></li>
          </ul>
        </div>

        {/* Column 4: Premium Partner Info Banner */}
        <div className="flex flex-col pt-4 sm:pt-0">
          <h3 className="text-gray-900 dark:text-white font-medium text-sm tracking-wide mb-4">{t('footer.apple_premium_partner')}</h3>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal mb-6 text-left">
            {t('footer.description')}
          </p>
          
          <div className="space-y-3 w-full max-w-xs">
            <div className="flex items-center gap-3 bg-white border border-gray-200/80 dark:bg-[#1c1c1e] dark:border-zinc-800/60 rounded-xl p-3.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#2c2c2e] transition-all duration-200 shadow-sm active:scale-[0.98] group">
              <span className="text-gray-900 dark:text-white text-lg group-hover:scale-110 transition duration-200"><i className="fa-brands fa-apple"></i></span>
              <span className="text-xs text-gray-900 dark:text-white font-medium tracking-tight">{t('footer.premium_partner')}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-transparent border-0 rounded-xl py-1 cursor-default group">
              <span className="text-sm group-hover:animate-bounce transition duration-200 text-[15px]">🛡️</span>
              <span className="text-[12px] text-gray-500 dark:text-gray-400 font-normal text-left leading-snug">
                {t('footer.authorised_service')}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Lower Footer - Payments, Socials & Legal */}
      <div className="max-w-[1440px] mx-auto pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Payment Badges */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <h4 className="text-gray-900 dark:text-white text-xs font-semibold tracking-wider uppercase opacity-75">{t('footer.payment_methods')}</h4>
          <div className="flex flex-wrap gap-2">
            {['Pay', 'G Pay', 'Master', 'Visa'].map((pay) => (
              <div key={pay} className="px-3.5 py-1.5 bg-white border border-gray-200 text-black dark:border-none text-[11px] font-bold tracking-wide rounded-lg flex items-center justify-center shadow-sm hover:scale-105 hover:shadow-md transition-all duration-200 cursor-default">
                {pay}
              </div>
            ))}
          </div>
        </div>

        {/* Social Icons & Copyright */}
        <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
          <div className="w-full md:w-auto">
            <h4 className="text-gray-900 dark:text-white text-xs font-semibold tracking-wider uppercase opacity-75 mb-3 md:text-right">{t('footer.follow_us')}</h4>
            <div className="flex gap-2.5 justify-start md:justify-end">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-[#1c1c1e] dark:border-transparent dark:hover:bg-[#2c2c2e] text-gray-700 dark:text-white rounded-xl flex items-center justify-center text-base cursor-pointer transition-all duration-200 shadow-sm hover:-translate-y-1 hover:shadow-md active:scale-95"
                >
                  <i className={social.iconClass}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="text-[12px] text-gray-400 dark:text-zinc-600 font-normal tracking-wide pt-4 border-t border-gray-200 dark:border-zinc-900 w-full md:w-auto md:border-none md:pt-0 text-left md:text-right">
            <span>{t('footer.copyright')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;