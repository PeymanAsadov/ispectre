import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import DisplaySiralama from "../../components/watch/display/DisplaySiralama";
import displays from "../../data/display";
import { useTranslation } from "react-i18next";

function AllDisplay() {
  const { t } = useTranslation();
  const [dynamicDisplays, setDynamicDisplays] = useState([]);

  useEffect(() => {
    setDynamicDisplays(getDynamicProducts("display", displays));
  }, []);

  return <DisplaySiralama title={t('nav.view_all_displays')} displays={dynamicDisplays} />;
}

export default AllDisplay;