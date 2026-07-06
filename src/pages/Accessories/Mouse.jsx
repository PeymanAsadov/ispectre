import AccessoriesData from "../../data/accessories";
import KeyboardSiralama from "../../components/watch/accessories/AccessoriesSiralama";
import { useTranslation } from "react-i18next";

function Mouse() {
  const filtered = AccessoriesData.filter((item) => item.model === "Magic Mouse");

  return <KeyboardSiralama title="Magic Mouse" keyboards={filtered} />;
}

export default Mouse;