import AirpodsSiralama from "../../components/watch/airpods/AirpodsSiralama";
import airpods from "../../data/airpods";
 import { useTranslation } from "react-i18next";

function Airpods2() {
  const models = airpods.filter((a) =>
    a.model.toLowerCase().includes("pro 2")
  );
  return <AirpodsSiralama title="AirPods Pro 2" airpods={models} />;
}
export default Airpods2;