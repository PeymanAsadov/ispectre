 import MacbookSiralama from "../../components/watch/mac/macSiralama"
import macbooks from "../../data/macbook";
import { useTranslation } from "react-i18next";

function MacbookNeo() {
  const filtered = macbooks.filter((mac) =>
    mac.model?.toLowerCase().includes("neo")
  );
  return <MacbookSiralama title="MacBook Neo" macbooks={filtered} />;
}

export default MacbookNeo;
