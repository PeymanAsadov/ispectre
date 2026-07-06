  // WatchSE.jsx
import WatchSiralama from "../../components/watch/WatchSiralama";
  import Watches from "../../data/watch"; 
  import { useTranslation } from "react-i18next";

  function WatchSE() {
    const seWatches = Watches.filter((watch) =>
      watch.model.includes("SE")
    );

    return (
      <>
        <WatchSiralama title="Apple Watch SE" watches={seWatches} />
      </>
    );
  }
  export default WatchSE;