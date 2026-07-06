import AirpodsSiralama from "../../components/watch/airpods/AirpodsSiralama";
import airpods from "../../data/airpods";
 import { useTranslation } from "react-i18next";

function Airpods3() {
  const models = airpods.filter((a) =>
    a.model.toLowerCase().includes("pro 3")
  );
  return <AirpodsSiralama title="AirPods Pro 3" airpods={models} />;
}
export default Airpods3;