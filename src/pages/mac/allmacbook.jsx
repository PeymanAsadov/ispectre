import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import MacbookSiralama from "../../components/watch/mac/macSiralama";
import staticMacbooks from "../../data/macbook";
import { useTranslation } from "react-i18next";

function AllMacbooks() {
  const { t } = useTranslation();
  const [macbooks, setMacbooks] = useState([]);

  useEffect(() => {
    setMacbooks(getDynamicProducts("macbook", staticMacbooks));
  }, []);

  return <MacbookSiralama title={t('nav.view_all_mac')} macbooks={macbooks} />;
}
export default AllMacbooks;