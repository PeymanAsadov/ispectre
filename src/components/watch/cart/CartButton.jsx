import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCartCount } from "../../../utils/cartUtils";
import CartDrawer from "./CartDrawer";

function CartButton() {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setCount(getCartCount());
        const handler = () => setCount(getCartCount());
        window.addEventListener("cart-updated", handler);
        return () => window.removeEventListener("cart-updated", handler);
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
                aria-label={t("cart.title")}
            >
                <ShoppingBag size={20} />
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {count}
                    </span>
                )}
            </button>

            {/* Portal — backdrop-blur olan nav-dan "qaçır", birbaşa body-yə render olunur */}
            {createPortal(
                <CartDrawer isOpen={open} onClose={() => setOpen(false)} />,
                document.body
            )}
        </>
    );
}

export default CartButton;