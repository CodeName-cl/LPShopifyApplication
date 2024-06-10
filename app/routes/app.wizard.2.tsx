import { useLoaderData } from "@remix-run/react";
import WizardStep2 from "src/containers/WizardStep2";
import { authenticate } from "~/shopify.server";


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

  return (
    <WizardStep2
      apiURL={loaderData.API_URL}
      shopifyLocations={loaderData.locations}
    />
  );
}
