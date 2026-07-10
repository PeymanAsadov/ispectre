import WatchSiralama from "../../components/watch/WatchSiralama";
import Watches from "../../data/watch";
import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import { useTranslation } from "react-i18next";

function AllWatches() {
  const { t } = useTranslation();
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    setWatches(getDynamicProducts("watch", Watches));
  }, []);

  return (
    <>
      <WatchSiralama title={t('nav.all_watches')} watches={watches} />
    </>
  );
}
export default AllWatches;