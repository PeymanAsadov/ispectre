 import MacbookSiralama from "../../components/watch/mac/macSiralama"
import macbooks from "../../data/macbook";
 import { useTranslation } from "react-i18next";

function MacbookPro() {
  const filtered = macbooks.filter((mac) =>
    mac.model?.toLowerCase().includes("pro")
  );
  return <MacbookSiralama title="MacBook Pro" macbooks={filtered} />;
}
 
export default MacbookPro;