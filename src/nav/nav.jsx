import { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import Navlists from "./navlists";

function Nav() {
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);
  const hiddenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;


      if (Math.abs(delta) < 5) return;

      // Səhifənin başında həmişə görünsün
      if (currentY <= 70) {
        if (hiddenRef.current) {
          hiddenRef.current = false;
          setHidden(false);
        }

        lastScrollY.current = currentY;
        return;
      }


      if (delta > 0) {
        if (!hiddenRef.current) {
          hiddenRef.current = true;
          setHidden(true);
        }
      }


      else {
        if (hiddenRef.current) {
          hiddenRef.current = false;
          setHidden(false);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Navbar />
      <Navlists />
    </div>
  );
}

export default Nav;