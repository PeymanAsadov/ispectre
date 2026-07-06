import AccessoriesData from "../../data/accessories";
import KeyboardSiralama from "../../components/watch/accessories/AccessoriesSiralama";
import { useTranslation } from "react-i18next";

function MagicKeyboardTouch() {
  const filtered = AccessoriesData.filter(
    (item) => item.model === "Magic Keyboard with Touch ID"
  );

  return <KeyboardSiralama title="Magic Keyboard with Touch ID" keyboards={filtered} />;
}

export default MagicKeyboardTouch;