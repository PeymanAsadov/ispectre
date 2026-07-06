import IphoneSiralama from "../../components/watch/phone/iphoneSiralama";
import iphones from "../../data/iphones";
import { useTranslation } from "react-i18next";

function Phone16() {

const products = iphones.filter(phone =>
phone.model.includes("16")
);

return (
<IphoneSiralama
title="iPhone 16"
iphones={products}
/>
);

}

export default Phone16;