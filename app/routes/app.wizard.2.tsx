import { redirect, useLoaderData, useSubmit } from "@remix-run/react";
import WizardStep2 from "src/containers/WizardStep2";
import { authenticate } from "~/shopify.server";
import LPIMConfig from "src/infra/LPIMConfig.server";
import { createEntity } from "src/infra/Datastore.server";


export const action = async ({ request }: { request: Request, params: { bsaleOffice: string, shopifyLocation: string } }) =>
{

  // update config in IM
  const config = new LPIMConfig();
  config.createIntegration();

  // save to database
  createEntity({
    shop: "test-shop",
    integrations: [
      {
        name: "bsale"
      }
    ]
  });
  return redirect("/app/wizard/3");
}



export const loader = async ({ request }: { request: Request }) =>
{
  const { admin, session } = await authenticate.admin(request)

  console.log(session.shop, session.accessToken);

  const locations = await admin.rest.resources.Location.all({
    session: session
  });

  return {
    API_URL: process.env.API_URL,
    locations: locations.data.map((location: any) => {
      return {
        label: location.name,
        value: location.id.toString()
      };
    })
  }
}


export default function Wizard2(): JSX.Element {
  const loaderData = useLoaderData() as { API_URL: string, locations: any };
  const submit = useSubmit();

  const handleSubmit = (bsaleOffice: string, shopifyLocation: string) => {
    const formData = new FormData();
    formData.append("bsaleOffice", bsaleOffice);
    formData.append("shopifyLocation", shopifyLocation);

    submit(formData, { method: "post" });
  }

  return (
    <WizardStep2
      apiURL={loaderData.API_URL}
      shopifyLocations={loaderData.locations}
      onSubmit={handleSubmit}
    />
  );
}
