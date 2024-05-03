import { Layout } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import type { Automation, AutomationButton } from "src/domain/Automation";
import AutomationSelectCard from "../polaris/AutomationSelectCard";

export default function SelectAutomation(
  { automations, onAutomationChange }: { automations: Automation[], onAutomationChange: CallableFunction }
) {
  // set states
  const [automationButtons, setAutomationButtons] = useState(
    // transform Automations to AutomationButtons
    automations.map((automation) => {
      return {
        ...automation,
        isSelected: false,
        isEnabled: automation.type !== "more",
        path: automation.type
      } as AutomationButton
    })
  );


  const selectedChange = useCallback((button: AutomationButton) => {
    // set automation buttons
    setAutomationButtons(
      // map automation buttons to find the selected one
      automationButtons.map((automationButton) => {

        // if found, then change selected state
        if (automationButton.id === button.id)
          return {
            ...automationButton, isSelected: !automationButton.isSelected
          };

        // if not found, then reset selected state
        return { ...automationButton, isSelected: false };
      })
    );
  }, [automationButtons]);

  useEffect(() => {
    onAutomationChange(
      // find if there is some automation selected
      automationButtons.find((automationButton) => automationButton.isSelected)
    );
  }, [automationButtons, onAutomationChange]);

  return (
    <>
      {
        automationButtons.map((automationButton) => (
          <Layout.Section key={automationButton.id} variant="oneThird" >
            <AutomationSelectCard
              automationButton={automationButton}
              onAutomationSelected={selectedChange}
            />
          </Layout.Section>
        ))
      }
    </>
  );

}
