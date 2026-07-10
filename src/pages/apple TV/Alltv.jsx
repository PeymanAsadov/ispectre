import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import TvSiralama from "../../components/watch/AppleTV/TvSiralama";
import appletv from "../../data/appletv";
import { useTranslation } from "react-i18next";

function AllTv() {
  const { t } = useTranslation();
  const [tvs, setTvs] = useState([]);

  useEffect(() => {
    setTvs(getDynamicProducts("tv", appletv));
  }, []);

  return <TvSiralama title={t('nav.view_all_tvs')} tvs={tvs} />;
}

export default AllTv;