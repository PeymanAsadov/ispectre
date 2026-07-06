import IphoneSiralama from "../../components/watch/phone/iphoneSiralama";
import iphones from "../../data/iphones";
import { useTranslation } from "react-i18next";

function PhoneAir() {

const products = iphones.filter(phone =>
phone.model.toLowerCase().includes("air")
);

return (
<IphoneSiralama
title="iPhone Air"
iphones={products}
/>
);

}

export default PhoneAir;