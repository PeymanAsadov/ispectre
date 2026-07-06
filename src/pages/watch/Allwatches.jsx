// AllWatches.jsx
import WatchSiralama from "../../components/watch/WatchSiralama";
import Watches from "../../data/watch";
import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import { useTranslation } from "react-i18next";
function AllWatches() {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    setWatches(getDynamicProducts("watch", Watches));
  }, []);
  return (
    <>
      <WatchSiralama title="All Watches" watches={watches} />
    </>
  );
}
export default AllWatches;