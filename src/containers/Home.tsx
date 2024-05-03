import EmptyScreen from "src/components/polaris/EmptyScreen";
import HiredAutomations from "src/components/polaris/HiredAutomations";

import type { HiredAutomation } from "src/domain/Automation";

export default function Home(
  { automations } : { automations: HiredAutomation[] }
) {
  return (
    <>
      {automations.length === 0 && <EmptyScreen></EmptyScreen>}
      {automations.length > 0 && <HiredAutomations automations={automations} ></HiredAutomations>}
    </>
  )
}
