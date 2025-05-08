import { MediaCard } from "@shopify/polaris";
import { ExternalIcon } from '@shopify/polaris-icons'
import type { AutomationButton } from "src/domain/Automation";

interface AutomationSelectCardProps {
  type: string,   // other, bsale-inventory, bsale-voucher
  automationButton: AutomationButton,
  onAutomationSelected: CallableFunction
}

export default function AutomationSelectCard(
  { type, automationButton, onAutomationSelected }: AutomationSelectCardProps
) {

  const primaryAction =  type !== "other" && {
    content: automationButton.isSelected ? "Seleccionada" : "Seleccionar",
    // tslint:disable-next-line
    variant: automationButton.isSelected ? "primary" : "secondary",
    disabled: !automationButton.isEnabled,
    onAction: () => { onAutomationSelected(automationButton) },
  };

  const secondaryAction = {
    plain: true,
    url: automationButton.url,
    target: "_blank",
    content: type === "other" ? "ver otras automatizaciones" : 'leer más',
    icon: ExternalIcon
  };

  return (
    <MediaCard
      portrait
      title={automationButton.title}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      description={automationButton.description}
    >
      {/* // TODO: add badges to the picture */}
      <img src={automationButton.image} alt="Card placeholder" style={{
        width: "100%",
        objectFit: "cover"
      }} ></img>
    </MediaCard>
  );
}
