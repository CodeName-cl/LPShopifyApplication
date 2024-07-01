import {
  Page,
  MediaCard,
} from "@shopify/polaris";

import {
  ExternalIcon
} from '@shopify/polaris-icons'

import { useState } from "react";


// TODO: move this to a API.
const automationButton = {
  id: "1",
  type: "bsale-inventory",
  image: '/card-placeholder.png',
  title: "Inventory Synchronization",
  description: "Inventory Synchronization",
  url: "https://www.loadingplay.com/",
}


export default function WizardStep3(): JSX.Element {

  const [canContinue] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Page
      title="Configure Automation"
      subtitle="Step 3 of 3"
      primaryAction={{
        content: "Next Step",
        url: "/app",
        disabled: !canContinue
      }}
      backAction={{ url: "/app/wizard/2" }}
    >
      <div style={{ width: "70%", maxWidth: "300px", marginRight: "auto", marginLeft: "auto" }} >
        <MediaCard
          portrait
          title={automationButton.title}
          primaryAction={{
            // TODO: mejorar mensaje
            content: isEnabled ? "Deshabilitar" : "Habilitar",
            // tslint:disable-next-line
            variant: isEnabled ? "secondary" : "primary",
            onAction: () => { setIsEnabled(!isEnabled) },
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
      </div>
    </Page>
  );
}
