import {
  Page,
  Select,
  Form,
  FormLayout,
  Button,
  Text
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import BsaleToken from "src/components/polaris/BsaleToken";


export default function WizardStep2(): JSX.Element {

  const [connected, setConnected] = useState(false);

  const [canContinue] = useState(true);
  // TODO: move to a component for loading bsale
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  // TODO: Load options from API.
  const options = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: 'lastWeek' },
  ];

  const handleAccountConnected = useCallback((accessToken: string) => {
    setConnected(true);
  }, [setConnected]);

  const handleAccountDisconnected = useCallback((accessToken: string) => {
    setConnected(false);
  }, [setConnected]);

  return (
    <Page
      title="Configure Automation"
      subtitle="Step 2 of 3"
      primaryAction={{
        content: "Next Step",
        url: "/app/wizard/3",
        disabled: !canContinue
      }}
      backAction={{ url: "/app/wizard/1" }}
    >

      <div style={{ width: "70%", marginRight: "auto", marginLeft: "auto" }} >
        {/* // TODO: move this to a css file ^^ */}
        <Form onSubmit={() => { }} >
          <FormLayout>
            <BsaleToken
              onAccountConnected={handleAccountConnected}
              onAccountDisconnected={handleAccountDisconnected}
            />

            {/* // TODO: move to a bsale component */}
            <Select
              disabled={!connected}
              label="Select Bsale Office"
              options={options}
              onChange={handleSelectChange}
              value={selected}
            />

            {/* // TODO: move to a shopify component */}
            <Select
              disabled={!connected}
              label="Select Shopify Location"
              options={options}
              onChange={handleSelectChange}
              value={selected}
            />

            {/* // TODO: write correct text and add a link to support */}
            <Text as="p" alignment="center" >
              kl jlk jklajs dklajsl kajsdklj aslkdjaskljd j0ioqw90wq0aj ajsdkl
            </Text>

            <Button submit >Guardar</Button>
          </FormLayout>
        </Form>
      </div>
    </Page>
  );
}
