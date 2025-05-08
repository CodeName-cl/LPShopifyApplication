
import { useLoaderData } from "@remix-run/react";

import Home from "src/containers/Home";
import type { HiredAutomation } from "src/domain/Automation";
import { readEntity } from "src/infra/Datastore.server";
import { authenticate } from "~/shopify.server";
import { mockAutomations } from "src/domain/Automations";

interface LoaderData {
  automations: HiredAutomation[];
}

export const loader = async ({ request }: { request: any }): Promise<LoaderData> => {

  const { session } = await authenticate.admin(request);
  const data = await readEntity(session.shop);

  // TODO: apuntar soporte a wahtasapp https://api.whatsapp.com/send/?phone=56997458921&text&type=phone_number&app_absent=0

  return {
    automations: data?.integrations?.map((integration) => {
      const automation = mockAutomations.find((automation) => automation.type === integration.type);
      return {
        id: "1",
        type: automation?.type,
        image: '/bsale-con-shopify.png',
        title: automation?.title,
        description: automation?.description,
        url: "https://www.loadingplay.com/",
      } as HiredAutomation
    }) || [],
  };

}

export default function Index() {
  const loaderData = useLoaderData() as LoaderData;

  return (
    <Home automations={loaderData.automations} ></Home>
  );
}
