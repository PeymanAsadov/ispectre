import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import AccessoriesData from "../../data/accessories"; // Statik data
import KeyboardSiralama from "../../components/watch/accessories/AccessoriesSiralama";
import { useTranslation } from "react-i18next"; 

function AllAccessories() {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    setAccessories(getDynamicProducts("accessories", AccessoriesData));
  }, []);

  return <KeyboardSiralama title="All Accessories" keyboards={accessories} />;
}

export default AllAccessories;