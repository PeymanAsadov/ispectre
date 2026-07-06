import { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";

function ScrollToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            setVisible(window.scrollY > 10);
        };

        window.addEventListener("scroll", toggleVisible);

        return () => window.removeEventListener("scroll", toggleVisible);
    }, []);

    const scrollToTop = () => {
        const start = window.scrollY;
        const duration = 600;
        const startTime = performance.now();

        function easeInOutCubic(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(
                0,
                start * (1 - easeInOutCubic(progress))
            );

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50
      w-12 h-12 rounded-full
      bg-black text-white
      shadow-xl
      hover:scale-110
      hover:bg-neutral-800
      transition-all duration-500
      ${visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5 pointer-events-none"
                }`}
        >
            <FiChevronUp size={22} className="mx-auto" />
        </button>
    );
}

export default ScrollToTopButton;