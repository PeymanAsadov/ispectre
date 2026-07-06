import IphoneSiralama from "../../components/watch/phone/iphoneSiralama";
import iphones from "../../data/iphones";
import { useTranslation } from "react-i18next";

function Phone15() {

const products = iphones.filter(phone =>
phone.model.includes("15")
);

return (
<IphoneSiralama
title="iPhone 15"
iphones={products}
/>
);

}

export default Phone15;