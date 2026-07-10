import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Səhifə dəyişəndə dərhal yuxarı atması üçün kiçik bir gecikmə (0ms) brauzer növbəsini gözləyir
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      
      // Əgər yuxarıdakı işləməsə, HTML elementini sıfırlayırıq
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

export default ScrollToTop;