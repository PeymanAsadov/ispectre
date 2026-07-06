import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import AirpodsSiralama from "../../components/watch/airpods/AirpodsSiralama";
import airpods from "../../data/airpods"; // Statik data
import { useTranslation } from "react-i18next";

function AllAirpods() {
  const [dynamicAirpods, setDynamicAirpods] = useState([]);

  useEffect(() => {
    setDynamicAirpods(getDynamicProducts("airpods", airpods));
  }, []);

  return <AirpodsSiralama title="All AirPods" airpods={dynamicAirpods} />;
}

export default AllAirpods;