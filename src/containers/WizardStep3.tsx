import {
  Page,
  MediaCard,
} from "@shopify/polaris";

import {
  ExternalIcon
} from '@shopify/polaris-icons'

import { useState } from "react";


const automationButton = {
  id: "1",
  type: "bsale-inventory",
  image: '/bsale-con-shopify.png',
  title: "Sincronización de inventario",
  description: "Sincronización de inventario",
  url: "https://www.loadingplay.com/",
}


export default function WizardStep3(): JSX.Element {

  const [canContinue] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Page
      title="Configurar automatización"
      subtitle="Step 3 of 3"
      primaryAction={{
        content: "Finalizar",
        url: "/app",
        disabled: !canContinue
      }}
    >
      <div style={{ width: "70%", maxWidth: "300px", marginRight: "auto", marginLeft: "auto" }} >
        <MediaCard
          portrait
          title={automationButton.title}
          primaryAction={{
            disabled: true,
            // content: isEnabled ? "Deshabilitar" : "Habilitar",
            content: "configurando...",
            // tslint:disable-next-line
            variant: isEnabled ? "secondary" : "primary",
            onAction: () => { setIsEnabled(!isEnabled) },
          }}
          secondaryAction={{
            plain: true,
            url: automationButton.url,
            target: "_blank",
            content: 'leer más',
            icon: ExternalIcon
          }}
          description="Nuestro equipo de soporte está trabajando para habilitar esta automatización. Te avisaremos cuando esté lista."
        >
          {/* // TODO: add badges to the picture */}
          <img src={automationButton.image} alt="Card placeholder" style={{
            width: "100%",
            objectFit: "cover"
          }} ></img>
        </MediaCard>
      </div>
    </Page>
  );
}
