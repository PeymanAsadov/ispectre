import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import AccessoriesData from "../../data/accessories";
import KeyboardSiralama from "../../components/watch/accessories/AccessoriesSiralama";
import { useTranslation } from "react-i18next";

function AllAccessories() {
  const { t } = useTranslation();
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    setAccessories(getDynamicProducts("accessories", AccessoriesData));
  }, []);

  return <KeyboardSiralama title={t('nav.view_all_accessories')} keyboards={accessories} />;
}

export default AllAccessories;