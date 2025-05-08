import type { Automation } from "src/domain/Automation";


export const AutomationTypes = {
  BSALE_INVENTORY: "bsale-inventory",
  BSALE_VOUCHER: "bsale-voucher",
  OTHER: "other",
};

export const mockAutomations: Automation[] = [
  {
    id: "1",
    type: AutomationTypes.BSALE_INVENTORY,
    image: '/bsale-con-shopify.png',
    title: "Sincronización de inventario",
    description: "Sincronización de inventario",
    url: "https://www.loadingplay.com/",
  },
  {
    id: "2",
    type: AutomationTypes.BSALE_VOUCHER,
    image: '/bsale-con-shopify.png',
    title: "Generación de boletas",
    description: "Generación de boletas",
    url: "https://www.loadingplay.com/",
  },
  {
    id: "3",
    type: AutomationTypes.OTHER,
    image: '/other.png',
    title: "Pronto...",
    description: "Agregaremos soporte para más integraciones",
    url: "https://www.loadingplay.com/",
  }
]


export const createIntegration = (type: string, data: dict) => {
  return {
    ...data,
    type,
    id: Math.random().toString(36).substring(2, 15),
  }
}
