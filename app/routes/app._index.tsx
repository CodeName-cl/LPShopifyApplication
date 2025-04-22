
import { useLoaderData } from "@remix-run/react";

import Home from "src/containers/Home";
import type { HiredAutomation } from "src/domain/Automation";
import { readEntity } from "src/infra/Datastore.server";
import { authenticate } from "~/shopify.server";

interface LoaderData {
  automations: HiredAutomation[];
}

export const loader = async ({ request }: { request: any }): Promise<LoaderData> => {

  const { session } = await authenticate.admin(request);
  const data = await readEntity(session.shop);

  return {
    automations: data?.integrations?.map((integration) => {
      return {
        id: "1",
        type: integration.name,
        image: '/card-placeholder.png',
        title: integration.name,
        description: "Sincronización de inventario entre Bsale y Shopify",
        url: "https://www.loadingplay.com/",
      } as HiredAutomation
    }) || [],
  };

}

export default function Index() {
  const loaderData = useLoaderData() as LoaderData;

  return (
    <>
      <Home automations={loaderData.automations} ></Home>
    </>
  );
}
