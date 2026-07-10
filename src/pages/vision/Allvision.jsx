import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import VisionSiralama from "../../components/watch/vision/VisionSiralama";
import visions from "../../data/vision";
import { useTranslation } from "react-i18next";

function AllVision() {
  const { t } = useTranslation();
  const [dynamicVisions, setDynamicVisions] = useState([]);

  useEffect(() => {
    setDynamicVisions(getDynamicProducts("vision", visions));
  }, []);

  return <VisionSiralama title={t('nav.view_all_visions')} visions={dynamicVisions} />;
}

export default AllVision;