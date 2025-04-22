import WizardStep1 from "src/containers/WizardStep1";
import type { Automation } from "src/domain/Automation";

// TODO: implement the real thing, maybe from an API.
const mockAutomations: Automation[] = [
  {
    id: "1",
    type: "bsale-inventory",
    image: '/bsale-con-shopify.png',
    title: "Sincronización de inventario",
    description: "Sincronización de inventario",
    url: "https://www.loadingplay.com/",
  },
  {
    id: "2",
    type: "bsale-voucher",
    image: '/bsale-con-shopify.png',
    title: "Generación de boletas",
    description: "Generación de boletas",
    url: "https://www.loadingplay.com/",
  },
  {
    id: "3",
    type: "other",
    image: '/other.png',
    title: "Pronto...",
    description: "Agregaremos soporte para más integraciones",
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
