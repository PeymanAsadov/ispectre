import DisplaySiralama from "../../components/watch/display/DisplaySiralama";
import displays from "../../data/display";
import { useTranslation } from "react-i18next";

function DisplayStudio() {
  const models = displays.filter((d) =>
    d.model.toLowerCase().includes("studio")
  );
  return <DisplaySiralama title="Studio Display" displays={models} />;
}
export default DisplayStudio;