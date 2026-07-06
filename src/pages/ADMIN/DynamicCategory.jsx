import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDynamicProducts } from "../../utils/dataLoader";
import IphoneSiralama from "../../components/watch/phone/iphoneSiralama";

function DynamicCategory() {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = getDynamicProducts(categoryName, []);
    setProducts(data);
  }, [categoryName]);

  return (
    <div className="pt-10">
      <IphoneSiralama
        title={`Bütün ${categoryName.toUpperCase()} Məhsulları`}
        iphones={products} 
      />
    </div>
  );
}

export default DynamicCategory;