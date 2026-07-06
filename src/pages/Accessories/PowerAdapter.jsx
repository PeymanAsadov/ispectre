import AccessoriesData from "../../data/accessories";
import KeyboardSiralama from "../../components/watch/accessories/AccessoriesSiralama";
import { useTranslation } from "react-i18next";

function PowerAdapter() {
  const filtered = AccessoriesData.filter((item) =>
    item.model.toLowerCase().includes("power adapter")
  );

  return <KeyboardSiralama title="Power Adapter" keyboards={filtered} />;
}

export default PowerAdapter;