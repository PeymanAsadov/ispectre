
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('')

  const shopLinks = [
    { nameKey: 'mac', path: '/mac' },
    { nameKey: 'ipad', path: '/ipad' },
    { nameKey: 'iphone', path: '/iphone' },
    { nameKey: 'watch', path: '/watch' },
    { nameKey: 'airpods', path: '/airpods' },
    { nameKey: 'tv_home', path: '/tv-home' },
    { nameKey: 'accessories', path: '/accessories' },
  ]

  const servicesLinks = [
    { nameKey: 'all_services', path: '/services' },
    { nameKey: 'trade_in', path: '/trade-in' },
    { nameKey: 'installments_credit', path: '/installments' },
    { nameKey: 'returns_warranty', path: '/warranty' },
    { nameKey: 'delivery_payment', path: '/delivery' },
    { nameKey: 'isupport', path: '/support' },
  ]

  const clientLinks = [
    { nameKey: 'blog', path: '/blog' },
    { nameKey: 'press_releases', path: '/press' },
    { nameKey: 'educational_offer', path: '/education' },
    { nameKey: 'apple_business', path: '/business' },
    { nameKey: 'loyalty_program', path: '/loyalty' },
  ]

  const infoLinks = [
    { nameKey: 'about_us', path: '/about' },
    { nameKey: 'find_store', path: '/stores' },
    { nameKey: 'contacts', path: '/contacts' },
    { nameKey: 'careers', path: '/careers' },
    { nameKey: 'privacy_policy', path: '/privacy' },
    { nameKey: 'gift_regulations', path: '/gift-regulations' },
  ]

  const handleSubscribe = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="bg-neutral-50 dark:bg-[#0B0B0D] text-neutral-900 dark:text-gray-100 border-t border-neutral-200 dark:border-[#3F3F46] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">

          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-sm mb-6">{t('footer.shop')}</h3>
            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-600 dark:text-gray-400 hover:opacity-60 transition-opacity"
                  >
                    {t(`footer.links.${link.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-sm mb-6">{t('footer.services')}</h3>
            <ul className="space-y-4">
              {servicesLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-600 dark:text-gray-400 hover:opacity-60 transition-opacity"
                  >
                    {t(`footer.links.${link.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Clients Column */}
          <div>
            <h3 className="font-semibold text-sm mb-6">{t('footer.for_clients')}</h3>
            <ul className="space-y-4">
              {clientLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-600 dark:text-gray-400 hover:opacity-60 transition-opacity"
                  >
                    {t(`footer.links.${link.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h3 className="font-semibold text-sm mb-6">{t('footer.information')}</h3>
            <ul className="space-y-4">
              {infoLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-600 dark:text-gray-400 hover:opacity-60 transition-opacity"
                  >
                    {t(`footer.links.${link.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apple Premium Partner */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('footer.apple_premium_partner')}</h3>
            <p className="text-xs text-neutral-600 dark:text-gray-400 leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="space-y-3">
              <div className="border border-neutral-300 dark:border-[#3F3F46] rounded-lg px-4 py-3 flex items-center justify-center gap-2">
                <span className="text-lg">
<i class="fa-brands fa-apple"></i>                </span>
                <span className="text-xs font-medium">{t('footer.premium_partner')}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-gray-400">
                <span className="text-lg">🛡️</span>
                <span className="text-xs">{t('footer.authorised_service')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 dark:border-[#3F3F46] mb-12"></div>

        {/* Email Subscribe & Social Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">

          {/* Subscribe */}
          <div>
            <h3 className="font-semibold text-sm mb-4">{t('footer.subscribe')}</h3>
            <form onSubmit={handleSubscribe} className="flex mb-4">
              <input
                type="email"
                placeholder={t('footer.email_placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 text-sm border border-neutral-300 dark:border-[#3F3F46] bg-white dark:bg-[#18181B] text-neutral-900 dark:text-gray-100 placeholder-neutral-500 dark:placeholder-gray-500 outline-none focus:border-neutral-500 dark:focus:border-gray-400 transition-colors"
              />
              <button
                type="submit"
                className="px-6 border-l border-neutral-300 dark:border-[#3F3F46] hover:bg-neutral-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </form>
            <p className="text-xs text-neutral-600 dark:text-gray-400">
              <input type="checkbox" className="mr-2" />
              {t('footer.i_agree')}{' '}
              <a href="#" className="text-blue-600 hover:underline">
                {t('footer.processing_data')}
              </a>
              , {t('footer.and_understand')}{' '}
              <a href="#" className="text-blue-600 hover:underline">
                {t('footer.terms_conditions')}
              </a>
              .
            </p>
          </div>

          {/* Social & Payment */}
          <div className="flex flex-col justify-between">
            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-sm mb-4">{t('footer.follow_us')}</h3>
              <div className="flex gap-6">
                <a target='_blank' href="https://www.instagram.com/" className="text-2xl hover:opacity-60 transition-opacity">
                  <i className="fa-brands fa-instagram"></i>                </a>
                <a target='_blank' href="https://www.facebook.com/" className="text-2xl hover:opacity-60 transition-opacity">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a target='_blank' href="https://www.tiktok.com/" className="text-2xl hover:opacity-60 transition-opacity">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
                <a target='_blank' href="http://x.com/" className="text-2xl hover:opacity-60 transition-opacity">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a target='_blank' href="https://telegram.org/k/" className="text-2xl hover:opacity-60 transition-opacity">
                  <i className="fa-brands fa-telegram"></i>
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold text-sm mb-4 mt-4">{t('footer.payment_methods')}</h3>
              <div className="flex gap-3">
                <div className="w-12 h-8 rounded border border-neutral-300 dark:border-[#3F3F46] bg-white dark:bg-white/90 flex items-center justify-center text-xs font-semibold">
                  <img src="https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/ec/50/ec5020d9df396125a9d714effb746e6a/apple_pay.webp" alt="" />
                </div>
                <div className="w-12 h-8 rounded border border-neutral-300 dark:border-[#3F3F46] bg-white dark:bg-white/90 flex items-center justify-center text-xs font-semibold">
                  <img src="https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/c9/eb/c9ebabb04d110ae5e2031bbcea8948fc/googlepay.webp" alt="" />
                </div>
                <div className="w-12 h-8 rounded border border-neutral-300 dark:border-[#3F3F46] bg-white dark:bg-white/90 flex items-center justify-center text-lg">
                  <img src="https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/8f/6c/8f6c78272b25fe88e94b072207f018c7/mastercard.webp" alt="" />
                </div>
                <div className="w-12 h-8 rounded border border-neutral-300 dark:border-[#3F3F46] bg-white dark:bg-white/90 flex items-center justify-center text-xs font-semibold">
                  <img src="https://prod-cdn.prod.asbis.io/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/52/f7/52f762ab78f204caec9424d3b93a086a/visa.webp" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200 dark:border-[#3F3F46]"></div>

        {/* Copyright */}
        <div className="py-6 text-xs text-neutral-600 dark:text-gray-500 text-center">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  )
}

export default Footer

