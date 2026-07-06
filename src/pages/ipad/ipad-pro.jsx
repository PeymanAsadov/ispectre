import IPadSiralama from "../../components/watch/ipad/ipadSiralama";
import ipads from "../../data/ipad";
import { useTranslation } from "react-i18next";

function IpadPro() {
  const proModels = ipads.filter((ipad) =>
    ipad.model.toLowerCase().includes("pro m5")
  );

  return (
    <IPadSiralama title="iPad Pro" ipads={proModels} />
  );
}

export default IpadPro;