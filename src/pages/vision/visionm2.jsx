import VisionSiralama from "../../components/watch/vision/VisionSiralama";
import visions from "../../data/vision";
import { useTranslation } from "react-i18next";

function VisionM2() {
  const models = visions.filter((v) =>
    v.model.toLowerCase().includes("m2")
  );
  return <VisionSiralama title="Apple Vision Pro M2" visions={models} />;
}
export default VisionM2;
