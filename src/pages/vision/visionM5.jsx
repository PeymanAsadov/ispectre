import VisionSiralama from "../../components/watch/vision/VisionSiralama";
import visions from "../../data/vision";
import { useTranslation } from "react-i18next";

function VisionM5() {
  const models = visions.filter((v) =>
    v.model.toLowerCase().includes("m5")
  );
  return <VisionSiralama title="Apple Vision Pro M5" visions={models} />;
}
export default VisionM5;