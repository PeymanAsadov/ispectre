import AccessoriesData from "../../data/accessories";
import KeyboardSiralama from "../../components/watch/accessories/AccessoriesSiralama";
import { useTranslation } from "react-i18next";

function Trackpad() {
  const filtered = AccessoriesData.filter((item) => item.model === "Magic Trackpad");

  return <KeyboardSiralama title="Magic Trackpad" keyboards={filtered} />;
}

export default Trackpad;