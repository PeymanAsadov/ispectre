// Ultra2.jsx
import WatchSiralama from "../../components/watch/WatchSiralama";
import Watches from "../../data/watch";
import { useTranslation } from "react-i18next";

function Ultra2() {
  const ultra2Watches = Watches.filter((watch) =>
    watch.model.includes("Ultra 2")
  );

  return (
    <>
      <WatchSiralama title="Apple Watch Ultra 2" watches={ultra2Watches} />
    </>
  );
}
export default Ultra2;