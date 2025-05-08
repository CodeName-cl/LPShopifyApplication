import { Page, Layout } from "@shopify/polaris";
import { useState } from "react";
import type { Automation, AutomationButton } from "src/domain/Automation";
import SelectAutomation from "src/components/polaris/SelectAutomation";

export default function WizardStep1({ automations }: { automations: Automation[] }) {
  // set states
  const [disabled, setDisabled] = useState(true);
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationButton | undefined>(undefined);
  const handleSelectedAutomationChange = (automation: AutomationButton) => {
    setDisabled(automation === undefined);
    setSelectedAutomation(automation);
  };

  return (
    <Page
      title="Elige la automatización que quieres crear"
      subtitle="Paso 1 de 3"
      primaryAction={{
        content: "Continuar",
        url: '/app/wizard/2/' + selectedAutomation?.type,
        disabled: disabled
      }}
      backAction={{ url: "/app/" }}
    >
      <Layout>
        <SelectAutomation
          automations={automations}
          onAutomationChange={handleSelectedAutomationChange}
        />
      </Layout>
    </Page>
  );

}
