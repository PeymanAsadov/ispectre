import IPadSiralama from "../../components/watch/ipad/ipadSiralama";
import ipads from "../../data/ipad";
import { useTranslation } from "react-i18next";

function IpadBase() {
  const baseModels = ipads.filter((ipad) =>
    ipad.model.toLowerCase().includes("11th")
  );

  return (
    <IPadSiralama title="iPad" ipads={baseModels} />
  );
}

export default IpadBase;