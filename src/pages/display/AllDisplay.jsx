import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import DisplaySiralama from "../../components/watch/display/DisplaySiralama";
import displays from "../../data/display"; // Statik data
import { useTranslation } from "react-i18next";

function AllDisplay() {
  const [dynamicDisplays, setDynamicDisplays] = useState([]);

  useEffect(() => {
    setDynamicDisplays(getDynamicProducts("display", displays));
  }, []);

  return <DisplaySiralama title="All Displays" displays={dynamicDisplays} />;
}

export default AllDisplay;