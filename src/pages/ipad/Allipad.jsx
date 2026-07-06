import IPadSiralama from "../../components/watch/ipad/ipadSiralama";
import ipads from "../../data/ipad";
import { useTranslation } from "react-i18next";

function AllIpads() {
  return (
    <IPadSiralama title="All iPads" ipads={ipads} />
  );
}

export default AllIpads;