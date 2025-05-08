import {
  Page,
  Form,
  FormLayout,
  Button,
  Text
} from "@shopify/polaris";
import { access } from "fs";
import { useCallback, useState } from "react";
import { BsaleDataSelect } from "src/components/polaris/BsaleDataSelect";
import BsaleToken from "src/components/polaris/BsaleToken";
import { withBsaleDocumentTypes } from "src/hoc/withBsaleDocumentTypes";
import { withBsaleOffices } from "src/hoc/withBsaleOffices";
import { withBsalePaymentTypes } from "src/hoc/withBsalePaymentTypes";
import { withBsalePriceLists } from "src/hoc/withBsalePriceLists";
import { withBsaleSellers } from "src/hoc/withBsaleSellers";
// import { BsaleOfficeSelect } from "src/components/polaris/BsaleOfficeSelect";
// import { BsalePaymentsSelect } from "src/components/polaris/BsalePaymentsSelect";

const BsaleOfficeSelect = withBsaleOffices(BsaleDataSelect);
const BsalePaymentsSelect = withBsalePaymentTypes(BsaleDataSelect);
const BsaleSellersSelect = withBsaleSellers(BsaleDataSelect);
const BsalePriceListsSelect = withBsalePriceLists(BsaleDataSelect);
const BsaleDocumentTypesSelect = withBsaleDocumentTypes(BsaleDataSelect);

export default function WizardStep2BsaleVoucher({ apiURL, onSubmit }: { apiURL: string, onSubmit: CallableFunction }): JSX.Element {

  // TODO: change access token to empty string by default
  const [accessToken, setAccessToken] = useState('d2f8a9321e2ae69af120e97fc54f5021f0efbe5e');

  // TODO: change connected default to false
  const [isConnected, setIsConnected] = useState(true);

  const [canContinue] = useState(true);

  const [selectedBsaleOffice, setSelectedBsaleOffice] = useState(null);
  const [selectedBsalePayment, setSelectedBsalePayment] = useState(null);
  const [selectedBsaleSeller, setSelectedBsaleSeller] = useState(null);
  const [selectedBsalePriceList, setSelectedBsalePriceList] = useState(null);
  const [selectedBsaleDocumentType, setSelectedBsaleDocumentType] = useState(null);


  const handleAccountConnected = useCallback((accessToken: string) => {
    setIsConnected(true);
    setAccessToken(accessToken);
  }, [setIsConnected]);

  const handleAccountDisconnected = useCallback((accessToken: string) => {
    setIsConnected(false);
    setAccessToken('');
  }, [setIsConnected]);

  const handleSubmitClick = () => {
    onSubmit(
      {
        token: accessToken,
        office: selectedBsaleOffice,
        payment: selectedBsalePayment,
        seller: selectedBsaleSeller,
        price_list: selectedBsalePriceList,
        document_type: selectedBsaleDocumentType
      }
    );
  };

  return (
    <Page
      title="Configurar automatización"
      subtitle="Paso 2 de 3"
      primaryAction={{
        content: "Terminar",
        onAction: handleSubmitClick,
        disabled: !canContinue
      }}
      backAction={{ url: "/app/wizard/1" }}
    >

      <div style={{ width: "70%", marginRight: "auto", marginLeft: "auto" }} >
        <Form onSubmit={handleSubmitClick} >
          <FormLayout>
            <BsaleToken
              onAccountConnected={handleAccountConnected}
              onAccountDisconnected={handleAccountDisconnected}
            />

            <BsaleOfficeSelect
              apiURL={apiURL}
              accessToken={accessToken}
              onChange={setSelectedBsaleOffice}
              label="Generar la boleta en la bodega"
            ></BsaleOfficeSelect>

            {/* <ShopifyOfficeSelect
              shopifyLocations={shopifyLocations}
              onChange={setSelectedShopifyLocation}
            ></ShopifyOfficeSelect> */}

            <BsalePaymentsSelect
              apiURL={apiURL}
              accessToken={accessToken}
              onChange={setSelectedBsalePayment}
              label="Generar boletas con el siguiente medio de pago"
            ></BsalePaymentsSelect>

            <BsaleSellersSelect
              apiURL={apiURL}
              accessToken={accessToken}
              onChange={setSelectedBsaleSeller}
              label="Seleccionar vendedor de Bsale"
            ></BsaleSellersSelect>

            <BsalePriceListsSelect
              apiURL={apiURL}
              accessToken={accessToken}
              onChange={setSelectedBsalePriceList}
              label="Seleccionar lista de precios de Bsale"
            ></BsalePriceListsSelect>

            <BsaleDocumentTypesSelect
              apiURL={apiURL}
              accessToken={accessToken}
              onChange={setSelectedBsaleDocumentType}
              label="Selecciona el tipo de documento (Sólo funcionan los tipos de documento boleta electrónica)"
            ></BsaleDocumentTypesSelect>

            {/* // TODO: write correct text and add a link to support */}
            <Text as="p" alignment="center" >
              Si necesitas ayuda, pof favor contacta a nuestro <a href="https://www.loadingplay.com" target="__blank" >soporte técnico</a>.
            </Text>

            {/* <Button submit >Continuar</Button> */}
          </FormLayout>
        </Form>
      </div>
    </Page>
  );
}
