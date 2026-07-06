import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import TvSiralama from "../../components/watch/AppleTV/TvSiralama";
import appletv from "../../data/appletv"; // Statik data
import { useTranslation } from "react-i18next";

function AllTv() {
  const [tvs, setTvs] = useState([]);

  useEffect(() => {
    setTvs(getDynamicProducts("tv", appletv));
  }, []);

  return <TvSiralama title="Apple TV" tvs={tvs} />;
}

export default AllTv;