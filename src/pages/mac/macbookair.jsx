import MacbookSiralama from "../../components/watch/mac/macSiralama";
import macbooks from "../../data/macbook";
import { useTranslation } from "react-i18next";

function MacbookAir() {
  const filtered = macbooks.filter((mac) =>
    mac.model?.toLowerCase().includes("air")
  );
  return <MacbookSiralama title="MacBook Air" macbooks={filtered} />;
}

export default MacbookAir;