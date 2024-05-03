
import { useLoaderData } from "@remix-run/react";

import Home from "src/containers/Home";
import type { HiredAutomation } from "src/domain/Automation";

export const loader = (): HiredAutomation[] => {
  // TODO: extract from API
  return [
    // {
    //   id: "1",
    //   type: "bsale-inventory",
    //   image: '/card-placeholder.png',
    //   title: "Inventory Synchronization",
    //   description: "Inventory Synchronization",
    //   url: "https://www.loadingplay.com/",
    // } as HiredAutomation
  ];
}

export default function Index() {
  const loaderData = useLoaderData() as HiredAutomation[];

  return (
    <>
      <Home automations={loaderData} ></Home>
    </>
  );
}
