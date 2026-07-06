import IPadSiralama from "../../components/watch/ipad/ipadSiralama";
import ipads from "../../data/ipad";
import { useTranslation } from "react-i18next";

function IpadAir() {
  const airModels = ipads.filter((ipad) =>
    ipad.model.toLowerCase().includes("air")
  );

  return (
    <IPadSiralama title="iPad Air" ipads={airModels} />
  );
}

export default IpadAir;