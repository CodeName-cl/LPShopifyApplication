import {
  Page,
  Select,
  Form,
  FormLayout,
  Button,
  Text
} from "@shopify/polaris";
import { useCallback, useState } from "react";
import { BsaleDataSelect } from "src/components/polaris/BsaleDataSelect";
import BsaleToken from "src/components/polaris/BsaleToken";
// import { BsaleOfficeSelect } from "src/components/polaris/BsaleOfficeSelect";
import { ShopifyOfficeSelect } from "src/components/polaris/ShopifyOfficeSelect";
import { withBsaleOffices } from "src/hoc/withBsaleOffices";

interface WizardStep2BsaleInventoryProps {
  bsaleAPPID: string;
  apiURL: string;
  shopifyLocations: any[];
  onSubmit: CallableFunction;
}

const BsaleOfficeSelect = withBsaleOffices(BsaleDataSelect);


export default function WizardStep2BsaleInventory({
  bsaleAPPID,
  apiURL,
  shopifyLocations,
  onSubmit
}: WizardStep2BsaleInventoryProps): JSX.Element {

  // TODO: change access token to empty string by default
  const [accessToken, setAccessToken] = useState('d2f8a9321e2ae69af120e97fc54f5021f0efbe5e');

  // TODO: change connected default to false
  const [isConnected, setIsConnected] = useState(true);

  const [canContinue] = useState(true);

  const [selectedBsaleOffice, setSelectedBsaleOffice] = useState(null);
  const [selectedShopifyLocation, setSelectedShopifyLocation] = useState(null);


  const handleAccountConnected = useCallback((accessToken: string) => {
    setIsConnected(true);
    setAccessToken(accessToken);
  }, [setIsConnected]);

  const handleAccountDisconnected = useCallback((accessToken: string) => {
    setIsConnected(false);
    setAccessToken('');
  }, [setIsConnected]);

  const handleSubmitClick = useCallback(() => {
    onSubmit(selectedBsaleOffice, selectedShopifyLocation);
  }, [selectedBsaleOffice, selectedShopifyLocation, onSubmit]);

  return (
    <Page
      title="Configurar automatización"
      subtitle="Paso 2 de 3"
      primaryAction={{
        content: "Continuar",
        url: "/app/wizard/3",
        disabled: !canContinue
      }}
      backAction={{ url: "/app/wizard/1" }}
    >

      <div style={{ width: "70%", marginRight: "auto", marginLeft: "auto" }} >
        <Form onSubmit={handleSubmitClick} >
          <FormLayout>
            <BsaleToken
              bsaleAPPID={bsaleAPPID}
              onAccountConnected={handleAccountConnected}
              onAccountDisconnected={handleAccountDisconnected}
            />

            <BsaleOfficeSelect
              apiURL={apiURL}
              accessToken={accessToken}
              onChange={setSelectedBsaleOffice}
            ></BsaleOfficeSelect>

            <ShopifyOfficeSelect
              shopifyLocations={shopifyLocations}
              onChange={setSelectedShopifyLocation}
            ></ShopifyOfficeSelect>

            <Text as="p" alignment="center" >
              Si necesitas ayuda, pof favor contacta a nuestro <a href="https://www.loadingplay.com" target="__blank" >soporte técnico</a>.
            </Text>

            <Button submit >Continuar</Button>
          </FormLayout>
        </Form>
      </div>
    </Page>
  );
}
