import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
 import MacbookSiralama from "../../components/watch/mac/macSiralama"
import staticMacbooks from "../../data/macbook";
import { useTranslation } from "react-i18next";

function AllMacbooks() {
  const [macbooks, setMacbooks] = useState([]);

  useEffect(() => {
    setMacbooks(getDynamicProducts("macbook", staticMacbooks));
  }, []);

  return <MacbookSiralama title="All Macbooks" macbooks={macbooks} />;
}
export default AllMacbooks;