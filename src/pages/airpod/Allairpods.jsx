import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import AirpodsSiralama from "../../components/watch/airpods/AirpodsSiralama";
import airpods from "../../data/airpods";
import { useTranslation } from "react-i18next";

function AllAirpods() {
  const { t } = useTranslation();
  const [dynamicAirpods, setDynamicAirpods] = useState([]);

  useEffect(() => {
    setDynamicAirpods(getDynamicProducts("airpods", airpods));
  }, []);

  return <AirpodsSiralama title={t('nav.view_all_airpods')} airpods={dynamicAirpods} />;
}

export default AllAirpods;