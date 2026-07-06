  import { Link, useLocation } from "react-router-dom";
  import { Search } from "lucide-react";

  const quickLinks = [
    { label: "Mac", to: "/macbook-air" },
    { label: "iPhone", to: "/iphone" },
    { label: "iPad", to: "/ipad" },
    { label: "Watch", to: "/watch" },
    { label: "Airpods", to: "/airpods" },
    { label: "Tv & Home", to: "/tv-home" },
    { label: "Vision Pro", to: "/vision" },
    { label: "Display", to: "/displays" },
    { label: "Accessories", to: "/accessories" },
  ];

  function Notfound() {
    const location = useLocation();
    const query = location.state?.query;

    return (
      <div className="bg-white dark:bg-black min-h-[75vh] flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full flex flex-col items-center text-center">

          <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500/10 dark:bg-blue-400/10" />
            <span
              className="motion-safe:animate-ping absolute inline-flex h-16 w-16 rounded-full bg-blue-500/15 dark:bg-blue-400/15"
              style={{ animationDelay: "0.3s" }}
            />
            <div className="relative w-16 h-16 rounded-2xl bg-[#f5f5f7] dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center">
              <Search size={26} className="text-gray-400 dark:text-gray-500" strokeWidth={1.75} />
            </div>
          </div>

          <p className="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase mb-3">
            Xəta · 404
          </p>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-snug">
            Axtardığınız məhsul tapılmadı
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
            {query ? (
              <>
                <span className="text-gray-700 dark:text-gray-300 font-medium">"{query}"</span> üzrə heç bir nəticə tapılmadı. Yazılışı yoxlayın və ya aşağıdakı kateqoriyalardan birinə baxın.
              </>
            ) : (
              "Bu səhifə mövcud deyil və ya silinib. Aşağıdakı kateqoriyalardan birinə baxa bilərsiniz."
            )}
          </p>

          <div className="flex items-center gap-3 mb-10">
            <Link
              to="/"
              className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-all"
            >
              Ana səhifəyə qayıt
            </Link>
            
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-[#f5f5f7] dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full px-4 py-1.5 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-zinc-700 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  export default Notfound;