import { MediaCard } from "@shopify/polaris";
import { ExternalIcon } from '@shopify/polaris-icons'
import type { AutomationButton } from "src/domain/Automation";

interface AutomationSelectCardProps {
  automationButton: AutomationButton,
  onAutomationSelected: CallableFunction
}

export default function AutomationSelectCard(
  { automationButton, onAutomationSelected }: AutomationSelectCardProps
) {
  return (
    <MediaCard
      portrait
      title={automationButton.title}
      primaryAction={{
        content: automationButton.isSelected ? "Selected" : "Select",
        // tslint:disable-next-line
        variant: automationButton.isSelected ? "primary" : "secondary",
        disabled: !automationButton.isEnabled,
        onAction: () => { onAutomationSelected(automationButton) },
      }}
      secondaryAction={{
        plain: true,
        url: automationButton.url,
        target: "_blank",
        content: 'Learn more',
        icon: ExternalIcon
      }}
      description={automationButton.description}
    >
      {/* // TODO: add badges to the picture */}
      <img src={automationButton.image} alt="Card placeholder" style={{
        // TODO: move to css file
        width: "100%",
        objectFit: "cover"
      }} ></img>
    </MediaCard>
  );
}
