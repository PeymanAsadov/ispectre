import AccessoriesData from "../../data/accessories";
import KeyboardSiralama from "../../components/watch/accessories/AccessoriesSiralama";
import { useTranslation } from "react-i18next";

function Keyboards() {
  const filtered = AccessoriesData.filter((item) =>
    item.model.toLowerCase().includes("keyboard")
  );

  return <KeyboardSiralama title="Klaviaturalar" keyboards={filtered} />;
}

export default Keyboards;