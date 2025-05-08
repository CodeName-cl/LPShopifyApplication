import { useLoaderData, useSubmit, redirect } from "@remix-run/react";
import WizardStep2BsaleVoucher from "src/containers/WizardStep2BsaleVoucher";
import { authenticate } from "~/shopify.server";
// import LPIMConfig from "src/infra/LPIMConfig.server";
import { addAutomation } from "src/infra/Datastore.server";
import { AutomationTypes, createIntegration } from "src/domain/Automations"; // TODO: continue here

export const action = async ({ request }: { request: Request, params: { bsaleOffice: string, shopifyLocation: string } }) => {
  const { session } = await authenticate.admin(request);
  // // update config in IM
  // const config = new LPIMConfig();
  // config.createIntegration();
  const integration = createIntegration(AutomationTypes.BSALE_VOUCHER, await request.json());
  addAutomation(session.shop, integration);

  const response = await fetch(process.env.SLACK_HOOK || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'mrkdwn',
      text: `Configuración de **boleta** de Bsale y Shopify`,
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
              title: "Medio de pago seleccionado",
              value: integration.payment.name,
              short: false
            },
            {
              title: "Vendedor de Bsale",
              value: integration.seller.name,
              short: false
            },
            {
              title: "Lista de precios de Bsale",
              value: integration.price_list.name,
              short: false
            },
            {
              title: "Tipo de documento de Bsale",
              value: integration.document_type.name,
              short: false
            },
            {
              title: "Token de Shopify",
              value: session.accessToken,
              short: false,
            },
            {
              title: "Token de Bsale",
              value: integration.token,
              short: false,
            }
          ]
        }
      ],
      blocks: [
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "Configurado"
              },
              style: "reject",
              value: "click_me_123"
            }
          ]
        }
      ]
    })
  });

  if (!response.ok)
    console.error('Error al enviar el mensaje a Slack:', response.statusText);

  return redirect("/app/wizard/3");
}


export const loader = async ({ request }: { request: Request }) => {
  await authenticate.admin(request)

  return {
    API_URL: process.env.API_URL
  }
}


export default function Wizard2(): JSX.Element {
  const loaderData = useLoaderData() as { API_URL: string, locations: any };
  const submit = useSubmit();

  const handleSubmit = (data: dict) => {
    submit(data, { method: "post", encType: "application/json" });
  }

  return (
    <WizardStep2BsaleVoucher
      apiURL={loaderData.API_URL}
      onSubmit={handleSubmit}
    />
  );
}
