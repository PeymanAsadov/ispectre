import AccessoriesData from "../../data/accessories";
import KeyboardSiralama from "../../components/watch/accessories/AccessoriesSiralama";
import { useTranslation } from "react-i18next";

function ApplePencil() {
  const filtered = AccessoriesData.filter((item) =>
    item.model.toLowerCase().includes("pencil")
  );

  return <KeyboardSiralama title="Apple Pencil" keyboards={filtered} />;
}

export default ApplePencil;