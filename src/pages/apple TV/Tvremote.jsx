import TvSiralama from "../../components/watch/AppleTV/TvSiralama";
import appletv from "../../data/appletv";
import { useTranslation } from "react-i18next";

function TvRemotePage() {
  const models = appletv.filter((t) =>
    t.model.toLowerCase().includes("remote")
  );
  return <TvSiralama title="Apple TV Remote" tvs={models} />;
}
export default TvRemotePage;