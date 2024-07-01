
import { useLoaderData } from "@remix-run/react";

import Home from "src/containers/Home";
import type { HiredAutomation } from "src/domain/Automation";
import { readEntity } from "src/infra/Datastore.server";

export const loader = async (): Promise<HiredAutomation[]> => {
  const data = await readEntity("test-shop")  // TODO: replace with real shop
  if (!data) return [];

  return data.integrations?.map((integration) => {
    return {
      id: "1",
      type: "bsale-inventory",
      image: '/card-placeholder.png',
      title: integration.name,
      description: "Inventory Synchronization",
      url: "https://www.loadingplay.com/",
    } as HiredAutomation
  });
}

export default function Index() {
  const loaderData = useLoaderData() as HiredAutomation[];

  return (
    <>
      <Home automations={loaderData} ></Home>
    </>
  );
}
