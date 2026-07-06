import IphoneSiralama from "../../components/watch/phone/iphoneSiralama";
import iphones from "../../data/iphones";
import { useTranslation } from "react-i18next";

function Phone17() {

const products = iphones.filter(phone =>
phone.model.includes("17")
);

return (
<IphoneSiralama
title="iPhone 17"
iphones={products}
/>
);

}

export default Phone17;