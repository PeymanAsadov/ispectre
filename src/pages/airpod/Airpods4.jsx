import AirpodsSiralama from "../../components/watch/airpods/AirpodsSiralama";
import airpods from "../../data/airpods";
 import { useTranslation } from "react-i18next";

function Airpods4() {
  const models = airpods.filter((a) =>
    a.model.toLowerCase().includes("airpods 4")
  );
  return <AirpodsSiralama title="AirPods 4" airpods={models} />;
}
export default Airpods4;