import { useState } from "react";
import {
  Hero,
  DeviceSelector,
  WhyChoose,
  Statistics,
  RepairForm,
  FAQ,
  Contact,
} from "../components/watch/SupportComponents";

import { models } from "../components/watch/SupportComponents/data";

function Support() {
  const [device, setDevice] = useState("iphone");

  const [selectedModel, setSelectedModel] = useState(
    models.iphone[0]
  );

  const goToRepairForm = () => {
    const section = document.getElementById("repair-form");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero />

      <DeviceSelector
        device={device}
        setDevice={setDevice}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        goToRepairForm={goToRepairForm}
      />

      <WhyChoose />

      <Statistics />

      <RepairForm
        device={device}
        selectedModel={selectedModel}
      />

      <FAQ />

      <Contact />
    </>
  );
}

export default Support;
