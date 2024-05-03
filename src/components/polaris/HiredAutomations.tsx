import {
  Page, Layout, MediaCard
} from "@shopify/polaris";

import {
  ExternalIcon
} from '@shopify/polaris-icons';

import type { HiredAutomation } from "src/domain/Automation";

export default function HiredAutomations({ automations }: { automations: HiredAutomation[] }) {
  return (
    <Page
      title="Your Automations"
      subtitle="Created automations"
      primaryAction={{
        content: "+ Add automation",
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
                  primaryAction={{
                    content: "Selected",
                    // tslint:disable-next-line
                    variant: "primary",
                    onAction: () => { },
                  }}
                  secondaryAction={{
                    plain: true,
                    url: automation.url,
                    target: "_blank",
                    content: 'Learn more',
                    icon: ExternalIcon
                  }}
                  description={automation.description}
                >
                  {/* // TODO: add badges to the picture */}
                  <img src={automation.image} alt="Card placeholder" style={{
                    // TODO: move to css file
                    width: "100%",
                    objectFit: "cover"
                  }} ></img>
                </MediaCard>
              </div>
            </Layout.Section>
          ))
        }
      </Layout>
    </Page>
  );
}
