import DisplaySiralama from "../../components/watch/display/DisplaySiralama";
import displays from "../../data/display";
 import { useTranslation } from "react-i18next";

function DisplayXDR() {
  const models = displays.filter((d) =>
    d.model.toLowerCase().includes("xdr")
  );
  return <DisplaySiralama title="Pro Display XDR" displays={models} />;
}
export default DisplayXDR;