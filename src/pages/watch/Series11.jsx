// Series11.jsx
import WatchSiralama from "../../components/watch/WatchSiralama";
import Watches from "../../data/watch";
import { useTranslation } from "react-i18next";

function Series11() {
  const series11Watches = Watches.filter((watch) =>
    watch.model.includes("Series 11")
  );

  return (
    <>
      <WatchSiralama title="Apple Watch Series 11" watches={series11Watches} />
    </>
  );
}
export default Series11;