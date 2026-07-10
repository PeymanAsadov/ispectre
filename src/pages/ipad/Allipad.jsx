import IPadSiralama from "../../components/watch/ipad/ipadSiralama";
import ipads from "../../data/ipad";
import { useTranslation } from "react-i18next";

function AllIpads() {
  const { t } = useTranslation();
  return (
    <IPadSiralama title={t('nav.all_ipads')} ipads={ipads} />
  );
}

export default AllIpads;