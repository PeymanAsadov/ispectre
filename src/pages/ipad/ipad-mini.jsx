import IPadSiralama from "../../components/watch/ipad/ipadSiralama";
import ipads from "../../data/ipad";
import { useTranslation } from "react-i18next";

function IpadMini() {
  const miniModels = ipads.filter((ipad) =>
    ipad.model.toLowerCase().includes("mini")
  );

  return (
    <IPadSiralama title="iPad Mini" ipads={miniModels} />
  );
}

export default IpadMini;