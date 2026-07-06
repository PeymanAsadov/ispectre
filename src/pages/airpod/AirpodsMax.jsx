import AirpodsSiralama from "../../components/watch/airpods/AirpodsSiralama";
import airpods from "../../data/airpods";
 import { useTranslation } from "react-i18next";

function AirpodsMax() {
  const models = airpods.filter((a) =>
    a.model.toLowerCase().includes("max")
  );
  return <AirpodsSiralama title="AirPods Max" airpods={models} />;
}
export default AirpodsMax;