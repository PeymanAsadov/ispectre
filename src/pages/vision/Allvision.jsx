import { useState, useEffect } from "react";
import { getDynamicProducts } from "../../utils/dataLoader";
import VisionSiralama from "../../components/watch/vision/VisionSiralama";
import visions from "../../data/vision"; // Statik data
import { useTranslation } from "react-i18next";

function AllVision() {
  const [dynamicVisions, setDynamicVisions] = useState([]);

  useEffect(() => {
    setDynamicVisions(getDynamicProducts("vision", visions));
  }, []);

  return <VisionSiralama title="All Vision Pro" visions={dynamicVisions} />;
}

export default AllVision;