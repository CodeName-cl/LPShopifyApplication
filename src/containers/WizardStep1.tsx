import { Page, Layout } from "@shopify/polaris";
import { useState } from "react";
import type { Automation, AutomationButton } from "src/domain/Automation";
import SelectAutomation from "src/components/polaris/SelectAutomation";

export default function WizardStep1({ automations }: { automations: Automation[] }) {
  // set states
  const [canContinue, setCanContinue] = useState(false);

  const handleSelectedAutomationChange = (automation: AutomationButton) => {
    setCanContinue(automation !== null);
  };

  return (
    <Page
      title="Select automation type"
      subtitle="Step 1 of 3"
      primaryAction={{
        content: "Next Step",
        url: "/app/wizard/2",
        disabled: !canContinue
      }}
      backAction={{ url: "/app/" }}
    >
      <Layout>
        <SelectAutomation
          automations={automations}
          onAutomationChange={handleSelectedAutomationChange}
        />
      </Layout>
      {/* // TODO: add support link */}
    </Page>
  );

}
