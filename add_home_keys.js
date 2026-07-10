  import fs from 'fs';
  import path from 'path';

  const localesPath = 'c:/Users/user/Desktop/PORTFOLIO FINAL  WEBSITE/vite-project/src/locales';

  const enHome = {
    "hero": [
      { "tagline": "Titanium Camera Action", "promo": "Get up to 300 ₼ trade-in credit towards your new iPhone", "note": "Available in Cosmic Orange and Desert Titanium", "cta": "Buy Now" },
      { "tagline": "Mind-blowing Power-loaded", "promo": "Built for pro workflows. Experience up to 22 hours of battery life", "note": "Available in Space Black and Silver", "cta": "Buy Now" },
      { "tagline": "Symphony in Blue Sound remastered", "promo": "Get 6 months of Apple Music for free with your new AirPods Max Sky Blue", "note": "Now with USB-C and Pro-level Active Noise Cancellation", "cta": "Buy Now" },
      { "tagline": "Welcome to the era of spatial computing", "promo": "Experience digital content that blends seamlessly with your physical space", "note": "Demo sessions available in-store now", "cta": "Learn more" },
      { "tagline": "Sunlit Supercharged", "promo": "The thinnest MacBook Air ever With M5", "note": "Now available", "cta": "Explore" }
    ],
    "promo_blocks": [
      { "title": "Trade-In", "desc": "Upgrade your MacBook or iPhone for the best price. Trade In your old device and get a discount", "cta": "Submit" },
      { "title": "Loyalty Program", "desc": "Get exclusive benefits — get more bonuses with every purchase. Points can be exchanged for up to 10%", "cta": "Submit" },
      { "title": "Blog", "desc": "News, product releases, lifestyle, company stories and innovations", "cta": "Submit" }
    ],
    "services": [
      { "label": "DELIVERY AND PICKUP", "title": "Order online and get home delivery" },
      { "label": "FINANCING", "title": "Get special financing. Pay over time, interest-free" },
      { "label": "SALE", "title": "Find low everyday prices and buy online for delivery or in-store pick-up" },
      { "label": "TRADE-IN", "title": "Upgrade your iPhone 11 / iPhone 12" }
    ],
    "featured": [
      { "title": "MacBook Neo 13\" A18 Pro", "desc": "Lightning fast. 13-inch display, 512GB" },
      { "title": "Headphones APPLE AirPods Max 2", "desc": "Listening. Remastered" },
      { "title": "iPhone 17 Pro Max", "desc": "Feature stacked. Value packed" }
    ],
    "carousel": [
      { "sub": "13.6 IN · 256GB · ORANGE", "title": "iPhone 17 Pro, 256 GB, Cosmic Orange" },
      { "sub": "6.1 IN · 512GB · Gray", "title": "iPhone 15 Pro, 512 GB, Gray" },
      { "sub": "6.7 IN · 1TB · Black", "title": "iPhone 16 Pro Max, 1 TB, Black" },
      { "sub": "13.6 IN · 256GB · Black", "title": "MacBook Pro M5" }
    ],
    "offer_banner": "The offer is valid when paying with a Visa card in instalments and online. Scan/eMoney Prime to apply. All purchases must be made in Apple Pay or Google Pay",
    "view_all_apple": "View all Apple products",
    "see_whats_new": "See what's new",
    "discover_services": "Discover services and more",
    "buy_now": "Buy now",
    "sale": "SALE",
    "magic_outside": "Magic on the outside, innovation on the inside",
    "new_badge": "NEW",
    "from_price": "From {{price}} ₼ or {{monthly}} ₼/{{months}} months",
    "from_category_price": "From {{price}}"
  };

  const azHome = {
    "hero": [
      { "tagline": "Titanium. Kamera. Motor", "promo": "Köhnə iPhone-u təhvil verin və 300 ₼-dək endirim qazanın", "note": "Kosmik Narıncı və Səhra Titaniumu rənglərində", "cta": "İndi al" },
      { "tagline": "Heyrətamiz. Güclə dolu", "promo": "Peşəkarlar üçün yaradılıb. 22 saata qədər batareya ömrü", "note": "Space Black və Silver rənglərində", "cta": "İndi al" },
      { "tagline": "Mavinin Simfoniyası. Yenidən kəşf", "promo": "Yeni AirPods Max Sky Blue ilə 6 ay pulsuz Apple Music əldə edin", "note": "İndi USB-C və Pro-level aktiv Səs-küy Ləğvi ilə", "cta": "İndi al" },
      { "tagline": "Məkan hesablamaları erasına xoş gəlmisiniz", "promo": "Rəqəmsal məzmunun fiziki məkanınızla necə birləşdiyini kəşf edin", "note": "Mağazalarımızda sınaq seansları mövcuddur", "cta": "Ətraflı" },
      { "tagline": "Günəş işığı. Super güc", "promo": "İndiyə qədər ən incə MacBook Air. M5 ilə", "note": "Artıq satışda", "cta": "Kəşf et" }
    ],
    "promo_blocks": [
      { "title": "Trade-In", "desc": "Ən yaxşı qiymətə MacBook və ya iPhone-nuzu yeniləyin. Köhnə cihazı təhvil verin, endirim qazanın", "cta": "Göndər" },
      { "title": "Loyallıq Proqramı", "desc": "Eksklüziv üstünlüklər əldə edin — hər alışla daha çox bonus qazanın. Xallar 10%-ə qədər dəyişdirilə bilər", "cta": "Göndər" },
      { "title": "Bloq", "desc": "Xəbərlər, məhsul buraxılışları, həyat tərzi, şirkət hekayələri və yeniliklər", "cta": "Göndər" }
    ],
    "services": [
      { "label": "ÇATDIRILMA VƏ TƏHVİL", "title": "Onlayn sifariş edin və evinizə çatdırılsın" },
      { "label": "MALİYYƏ", "title": "Xüsusi maliyyələşdirmə. Faizsiz, hissə-hissə ödəyin" },
      { "label": "SATIŞ", "title": "Gündəlik sərfəli qiymətlər tapın, onlayn alın, çatdırılma və ya mağazadan götürün" },
      { "label": "TRADE-IN", "title": "iPhone 11 / iPhone 12-nizi yeniləyin" }
    ],
    "featured": [
      { "title": "MacBook Neo 13\" A18 Pro", "desc": "İldırım sürəti ilə. 13 düym displey, 512GB" },
      { "title": "Qulaqlıq APPLE AirPods Max 2", "desc": "Dinləmə. Yenidən master olundu" },
      { "title": "iPhone 17 Pro Max", "desc": "Xüsusiyyətlərlə dolu. Dəyərli paket" }
    ],
    "carousel": [
      { "sub": "13.6 İN · 256GB · NARINCI", "title": "iPhone 17 Pro, 256 GB, Kosmik Narıncı" },
      { "sub": "6.1 İN · 512GB · BOZ", "title": "iPhone 15 Pro, 512 GB, Boz" },
      { "sub": "6.7 İN · 1TB · QARA", "title": "iPhone 16 Pro Max, 1 TB, Qara" },
      { "sub": "13.6 İN · 256GB · QARA", "title": "MacBook Pro M5" }
    ],
    "offer_banner": "Təklif Visa kartı ilə onlayn taksitlə ödəniş zamanı etibarlıdır. Müraciət üçün Scan/eMoney Prime. Bütün alışlar Apple Pay və ya Google Pay ilə edilməlidir",
    "view_all_apple": "Bütün Apple məhsullarına bax",
    "see_whats_new": "Yenilikləri kəşf et",
    "discover_services": "Xidmətlər və daha çoxu ilə tanış ol",
    "buy_now": "İndi al",
    "sale": "ENDİRİM",
    "magic_outside": "Möcüzəvi xarici görünüş, innovativ daxili dizayn",
    "new_badge": "YENİ",
    "from_price": "{{price}} ₼-dan və ya {{monthly}} ₼/{{months}} ay",
    "from_category_price": "{{price}}-dan"
  };

  const ruHome = {
    "hero": [
      { "tagline": "Титан. Камера. Мотор", "promo": "Сдайте старый iPhone в Trade-in и получите скидку до 300 ₼", "note": "Доступно в цветах Cosmic Orange и Desert Titanium", "cta": "Купить" },
      { "tagline": "Умопомрачительно. Заряжено мощью", "promo": "Создано для профессионалов. Время работы от батареи до 22 часов", "note": "Доступно в цветах Space Black и Silver", "cta": "Купить" },
      { "tagline": "Симфония в синем. Звук обновлен", "promo": "Получите 6 бесплатных месяцев Apple Music при покупке новых AirPods Max Sky Blue", "note": "Теперь с USB-C и профессиональным шумоподавлением", "cta": "Купить" },
      { "tagline": "Добро пожаловать в эру пространственных вычислений", "promo": "Погрузитесь в цифровой контент, гармонирующий с вашим физическим пространством", "note": "Демо-сессии доступны в магазинах", "cta": "Узнать больше" },
      { "tagline": "Солнечный. Супермощный", "promo": "Самый тонкий MacBook Air. С чипом M5", "note": "Уже в продаже", "cta": "Изучить" }
    ],
    "promo_blocks": [
      { "title": "Trade-In", "desc": "Обновите свой MacBook или iPhone по лучшей цене. Сдайте старое устройство и получите скидку", "cta": "Отправить" },
      { "title": "Программа лояльности", "desc": "Получите эксклюзивные преимущества — больше бонусов за каждую покупку. Баллы можно обменять на скидку до 10%", "cta": "Отправить" },
      { "title": "Блог", "desc": "Новости, обзоры продуктов, стиль жизни, истории компании и инновации", "cta": "Отправить" }
    ],
    "services": [
      { "label": "ДОСТАВКА И САМОВЫВОЗ", "title": "Заказывайте онлайн и получайте с доставкой на дом" },
      { "label": "ФИНАНСИРОВАНИЕ", "title": "Специальное финансирование. Платите частями, без процентов" },
      { "label": "СКИДКА", "title": "Находите низкие цены каждый день и покупайте онлайн с доставкой или самовывозом из магазина" },
      { "label": "TRADE-IN", "title": "Обновите свой iPhone 11 / iPhone 12" }
    ],
    "featured": [
      { "title": "MacBook Neo 13\" A18 Pro", "desc": "Молниеносно быстрый. 13-дюймовый дисплей, 512 ГБ" },
      { "title": "Наушники APPLE AirPods Max 2", "desc": "Слушайте. По-новому" },
      { "title": "iPhone 17 Pro Max", "desc": "Много функций. Огромная ценность" }
    ],
   "carousel": [
  {
    "sub": "13.6 ДЙ · 256ГБ · ОРАНЖЕВЫЙ",
    "title": "iPhone 17 Pro, 256 ГБ, Космический оранжевый"
  },
  {
    "sub": "6.1 ДЙ · 256 ГБ · СЕРЫЙ",
    "title": "iPhone 15 Pro, 256 ГБ, СЕРЫЙ"
  },
  {
    "sub": "6.7 ДЙ · 512 ГБ · Черный",
    "title": "iPhone 16 Pro Max, 512 ГБ, Черный"
  },
  {
    "sub": "13.6 ДЙ · 256ГБ · Черный",
    "title": "MacBook Pro M5"
  }
]
,
    "offer_banner": "Предложение действительно при оплате картой Visa в рассрочку онлайн. Для подачи заявки отсканируйте eMoney Prime. Все покупки должны осуществляться через Apple Pay или Google Pay",
    "view_all_apple": "Смотреть все продукты Apple",
    "see_whats_new": "Посмотреть новинки",
    "discover_services": "Узнайте о сервисах и не только",
    "buy_now": "Купить сейчас",
    "sale": "СКИДКА",
    "magic_outside": "Магия снаружи, инновации внутри",
    "new_badge": "НОВИНКА",
    "from_price": "От {{price}} ₼ или {{monthly}} ₼ ({{months}} мес)",
    "from_category_price": "От {{price}}"
  };

  const mappings = {
    'en.json': enHome,
    'az.json': azHome,
    'ru.json': ruHome
  };

  // Qovluğun mövculuğunu yoxlayırıq, yoxdursa yaradırıq
  if (!fs.existsSync(localesPath)) {
    fs.mkdirSync(localesPath, { recursive: true });
  }

  for (const [file, data] of Object.entries(mappings)) {
    const filePath = path.join(localesPath, file);
    let content = {};

    // Fayl mövcuddursa və boş deyilsə oxuyuruq, yoxdursa yeni obyekt açırıq
    if (fs.existsSync(filePath)) {
      try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        content = fileData ? JSON.parse(fileData) : {};
      } catch (e) {
        content = {}; // JSON xarabdırsa sıfırlayırıq
      }
    }

    content.home = data;
    
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
  }

  console.log('Uğurla tamamlandı! Fayllar yeniləndi.');