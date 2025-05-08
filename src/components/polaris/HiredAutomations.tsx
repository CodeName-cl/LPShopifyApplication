import {
  Page, Layout, MediaCard,
  Badge
} from "@shopify/polaris";

import {
  ExternalIcon
} from '@shopify/polaris-icons';

import type { HiredAutomation } from "src/domain/Automation";

export default function HiredAutomations({ automations }: { automations: HiredAutomation[] }) {
  return (
    <Page
      title="Tus Automatizaciones"
      subtitle="Automatizaciones creadas"
      primaryAction={{
        content: "+ Nueva Automatización",
        url: "/app/wizard/1",
      }}
    >
      <Layout>
        {
          automations.map((automation) => (
            <Layout.Section key={automation.id} variant="oneThird">
              <div style={{ maxWidth: "300px" }} >
                <MediaCard
                  portrait
                  title={automation.title}
                  description={automation.description}
                  secondaryAction={{
                    plain: true,
                    url: automation.url,
                    target: "_blank",
                    content: 'leer más',
                    icon: ExternalIcon
                  }}
                >
                  <img src={automation.image} alt="Card placeholder" style={{
                    // TODO: move to css file
                    width: "100%",
                    objectFit: "cover"
                  }} ></img>

                  <div style={{ marginLeft: "15px", position: "relative" }} >
                    <Badge tone="warning" >Configurando...</Badge>
                  </div>
                </MediaCard>
              </div>
            </Layout.Section>
          ))
        }
      </Layout>
    </Page>
  );
}
