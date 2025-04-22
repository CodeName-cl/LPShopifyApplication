import {
  Page,
  Select,
  Form,
  FormLayout,
  Button,
  Text
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import BsaleToken from "src/components/polaris/BsaleToken";
import AsyncSelect from "src/components/polaris/AsyncSelect";
import Bsale from "src/infra/Bsale";


export default function WizardStep2({ apiURL, shopifyLocations, onSubmit }: { apiURL: string, shopifyLocations: any[], onSubmit: CallableFunction }): JSX.Element {

  // TODO: change access token to empty string by default
  const [accessToken, setAccessToken] = useState('d2f8a9321e2ae69af120e97fc54f5021f0efbe5e');

  // TODO: change connected default to false
  const [isConnected, setIsConnected] = useState(true);

  const [canContinue] = useState(true);
  const [bsaleOffices, setBsaleOffices] = useState([]);

  const [selectedBsaleOffice, setSelectedBsaleOffice] = useState('');
  const [selectedShopifyLocation, setSelectedShopifyLocation] = useState('');

  const handleAccountConnected = useCallback((accessToken: string) => {
    setIsConnected(true);
    setAccessToken(accessToken);
  }, [setIsConnected]);

  const handleAccountDisconnected = useCallback((accessToken: string) => {
    setIsConnected(false);
    setAccessToken('');
  }, [setIsConnected]);

  useEffect(() => {
    const bsale = new Bsale(apiURL, accessToken);

    bsale.getOffices().then((data) => {
      setBsaleOffices(data.items.map((item: any) => {
        return { label: item.name, value: item.id.toString() }
      }))
    });

  }, [apiURL, accessToken]);

  const handleBsaleOfficeChange = useCallback((value: string) => {
    setSelectedBsaleOffice(value);
  }, [setSelectedBsaleOffice]);

  const handleShopifyLocationChange = useCallback((value: string) => {
    setSelectedShopifyLocation(value);
  }, [setSelectedShopifyLocation]);

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
        {/* // TODO: move this to a css file ^^ */}
        <Form onSubmit={handleSubmitClick} >
          <FormLayout>
            <BsaleToken
              onAccountConnected={handleAccountConnected}
              onAccountDisconnected={handleAccountDisconnected}
            />

            {/* // TODO: move to a bsale component */}
            <AsyncSelect
              label="Select Bsale Office"
              options={bsaleOffices}
              onChange={handleBsaleOfficeChange}
            />

            {/* // TODO: move to a shopify component */}
            <AsyncSelect
              label="Elige la ubicación de Shopify"
              options={shopifyLocations}
              onChange={handleShopifyLocationChange}
            />

            {/* // TODO: write correct text and add a link to support */}
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
