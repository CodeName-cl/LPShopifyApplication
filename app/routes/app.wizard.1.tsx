import WizardStep1 from "src/containers/WizardStep1";
import { mockAutomations } from "src/domain/Automations";



export default function Wizard1(): JSX.Element {
  return (
    <>
      <WizardStep1 automations={mockAutomations} ></WizardStep1>
    </>
  );
}
