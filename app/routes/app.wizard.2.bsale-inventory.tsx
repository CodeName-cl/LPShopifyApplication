import { redirect, useLoaderData, useSubmit } from "@remix-run/react";
import WizardStep2BsaleInventory from "src/containers/WizardStep2BsaleInventory";
import { authenticate } from "~/shopify.server";
// import LPIMConfig from "src/infra/LPIMConfig.server";
import { addAutomation } from "src/infra/Datastore.server";
import { AutomationTypes } from "src/domain/Automations"; // TODO: continue here

export const action = async ({ request }: { request: Request, params: { bsaleOffice: string, shopifyLocation: string } }) =>
{
  const { session } = await authenticate.admin(request);
  // // update config in IM
  // const config = new LPIMConfig();
  // config.createIntegration();
  const integration = await request.json();
  addAutomation(session.shop, integration);

  const response = await fetch(process.env.SLACK_HOOK || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'mrkdwn',
      text: `Configuración de **inventario** de Bsale y Shopify`,
      attachments: [
        {
          title: "Configuración de la integración",
          fields: [
            {
              title: "Tienda",
              value: session.shop,
              short: false
            },
            {
              title: "Oficina de Bsale",
              value: integration.office.name,
              short: false
            },
            {
              title: "Ubicación de Shopify",
              value: integration.location.name,
              short: false
            }
          ]
        }
      ]
    })
  });
  if (!response.ok) {
    console.error("Error al enviar el mensaje a Slack", response.statusText);
  }

  return redirect("/app/wizard/3");
}


interface LoaderDataProps {
  ENV_API_URL: string;
  ENV_BSALE_APP_ID: string;
  locations: Array<{
    id: string;
    name: string;
  }>;
}


export const loader = async ({ request }: { request: Request }) =>
{
  const { admin, session } = await authenticate.admin(request)

  const locations = await admin.rest.resources.Location.all({
    session: session
  });

  return {
    ENV_API_URL: process.env.API_URL || '',
    ENV_BSALE_APP_ID: process.env.BSALE_APP_ID || '',
    locations: locations.data.map((location: any) => {
      return {
        id: location.id,
        name: location.name
      };
    })
  } as LoaderDataProps;
}



export default function Wizard2(): JSX.Element {
  const loaderData = useLoaderData() as LoaderDataProps;
  const submit = useSubmit();

  const handleSubmit = (data: dict) => {
    data.type = AutomationTypes.BSALE_INVENTORY;
    submit(data, { method: "post", encType: "application/json" });
  }

  return (
    <WizardStep2BsaleInventory
      bsaleAPPID={loaderData.ENV_BSALE_APP_ID}
      apiURL={loaderData.ENV_API_URL}
      shopifyLocations={loaderData.locations}
      onSubmit={handleSubmit}
    />
  );
}
