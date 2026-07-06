import TvSiralama from "../../components/watch/AppleTV/TvSiralama";
import appletv from "../../data/appletv";
import { useTranslation } from "react-i18next";

function AppleTvPage() {
  const models = appletv.filter((t) =>
    t.model.toLowerCase().includes("apple tv 4k")
  );
  return <TvSiralama title="Apple TV 4K" tvs={models} />;
}
export default AppleTvPage;