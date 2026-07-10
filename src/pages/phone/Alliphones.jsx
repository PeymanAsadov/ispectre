import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import IphoneSiralama from "../../components/watch/phone/iphoneSiralama";
import staticIphones from "../../data/iphones";
import { useTranslation } from "react-i18next";

function Alliphones() {
  const { t } = useTranslation();
  const [iphones, setIphones] = useState([]);

  useEffect(() => {
    const dynamicData = getDynamicProducts("iphone", staticIphones);
    setIphones(dynamicData);
  }, []);

  return (
    <IphoneSiralama
      title={t('nav.all_iphones')}
      iphones={iphones}
    />
  );
}

export default Alliphones;