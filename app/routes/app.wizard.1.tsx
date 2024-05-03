import WizardStep1 from "src/containers/WizardStep1";
import type { Automation } from "src/domain/Automation";

// TODO: implement the real thing, maybe from an API.
const mockAutomations: Automation[] = [
  {
    id: "1",
    type: "bsale-inventory",
    image: '/card-placeholder.png',
    title: "Inventory Synchronization",
    description: "Inventory Synchronization",
    url: "https://www.loadingplay.com/",
  },
  {
    id: "2",
    type: "bsale-voucher",
    image: '/card-placeholder.png',
    title: "Voucher Generation",
    description: "Voucher Generation",
    url: "https://www.loadingplay.com/",
  },
  {
    id: "3",
    type: "more",
    image: '/card-placeholder.png',
    title: "Inventory Synchronization",
    description: "Inventory Synchronization",
    url: "https://www.loadingplay.com/",
  }
]

export default function Wizard1(): JSX.Element {
  return (
    <>
      <WizardStep1 automations={mockAutomations} ></WizardStep1>
    </>
  );
}
