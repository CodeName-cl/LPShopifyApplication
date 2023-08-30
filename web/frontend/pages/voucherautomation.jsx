// @ts-nocheck
import {
    Page,
    Text,
    VerticalStack,
    HorizontalStack,
    Frame,
    Loading,
    TextField,
    Select
} from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticatedFetch } from "../hooks";
const access_token = "a601d995c748e4bc99856301eb0f205331f0e360"

export default function VoucherAutomation() {
    const navigate = useNavigate();
    const fetchShopify = useAuthenticatedFetch();
    const [loading, setLoading] = useState(true);
    const [officeOptions, setOfficeOptions] = useState([]);
    const [paymentMethodOptions, setPaymentMethodOptions] = useState([]);
    const [bsaleSellerOptions, setBsaleSellerOptions] = useState([]);
    const [priceListOptions, setPriceListOptions] = useState([]);
    const [voucherDocumentOptions, setVoucherDocumentOptions] = useState([]);
    const [values, setValues] = useState({});

    const handleSelect = async () => {
        try{
            setLoading(true);
            const response = await fetchShopify(
                "/api/sendmessage",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values)
                }
            );
            setLoading(false);
            navigate("/configureautomation");
        }catch(error){
            console.log(error);
        }
        
    };

    const sendRequest = useCallback(async (url) => {
        try {
            const response = await fetch(
                url,
                {
                    headers: {
                        "access_token": access_token,
                    }
                }
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    }, [])

    const giveOptions = async (response, changedValue) => {
        const data = await response.json();
        console.log("data", changedValue, data)
        const options = data?.items.map((item) => {
            return {
                label: changedValue !== "bsaleSellerOptions" ? item.name : `${item.firstName} ${item.lastName}`,
                value: changedValue !== "bsaleSellerOptions" ? item.name : `${item.firstName} ${item.lastName}`
            }
        })
        switch (changedValue) {
            case "officeOptions":
                setOfficeOptions(options);
                break;
            case "paymentMethodOptions":
                setPaymentMethodOptions(options);
                break;
            case "bsaleSellerOptions":
                setBsaleSellerOptions(options);
                break;
            case "priceListOptions":
                setPriceListOptions(options);
                break;
            case "voucherDocumentOptions":
                setVoucherDocumentOptions(options);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const responseOffice = await sendRequest("https://api.bsale.io/v1/offices.json")
                if (responseOffice.ok) {
                    await giveOptions(responseOffice, "officeOptions");
                }
                const responsePaymentMethod = await sendRequest("https://api.bsale.io/v1/payment_types.json")
                if (responsePaymentMethod.ok) {
                    await giveOptions(responsePaymentMethod, "paymentMethodOptions");
                }
                const responseBsaleSeller = await sendRequest("https://api.bsale.io/v1/users.json")
                if (responseBsaleSeller.ok) {
                    await giveOptions(responseBsaleSeller, "bsaleSellerOptions");
                }
                const responsePriceList = await sendRequest("https://api.bsale.io/v1/price_lists.json")
                if (responsePriceList.ok) {
                    await giveOptions(responsePriceList, "priceListOptions");
                }
                const responseVoucherDocument = await sendRequest("https://api.bsale.io/v1/document_types.json")
                if (responseVoucherDocument.ok) {
                    await giveOptions(responseVoucherDocument, "voucherDocumentOptions");
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    const handleChange = useCallback((value, name) => {
        setValues((values) => ({ ...values, [name]: value }));
    }, []);

    return (
        <div>
            {
                loading ? (
                    <div style={{ height: '100px' }}>
                        <Frame>
                            <Loading />
                        </Frame>
                    </div>
                ) : (
                    <Page
                        fullWidth
                        title="Configure automation parameters"
                        subtitle="Step 2 of 3"
                        primaryAction={
                            {
                                content: "Configurar",
                                onAction: handleSelect,
                            }
                        }
                    >

                        <Text variant="headingMd" as="h6">
                            Generate a voucher for each Shopify order in Bsale
                        </Text>
                        <HorizontalStack align="center">
                            <div style={{ "width": "50%", "marginTop": "5%", "marginBottom": "5%" }} >
                                <VerticalStack gap="5">
                                    <TextField
                                        label="Bsale access token"
                                        value={values.access_token || access_token}
                                        onChange={(value) => handleChange(value, "access_token")}
                                        autoComplete="off"
                                        type="password"
                                    />
                                    <Select
                                        label="Select Bsale Office"
                                        options={officeOptions}
                                        onChange={(value) => handleChange(value, "bsale_office")}
                                        value={values.bsale_office || ""}
                                        placeholder="Main Office"
                                    />
                                    <Select
                                        label="Select Default Payment Method"
                                        options={paymentMethodOptions}
                                        onChange={(value) => handleChange(value, "payment_method")}
                                        value={values.payment_method || ""}
                                        placeholder="Payment Method"
                                    />
                                    <Select
                                        label="Select Bsale Seller"
                                        options={bsaleSellerOptions}
                                        onChange={(value) => handleChange(value, "bsale_seller")}
                                        value={values.bsale_seller || ""}
                                        placeholder="Bsale Seller"
                                    />
                                    <Select
                                        label="Price List"
                                        options={priceListOptions}
                                        onChange={(value) => handleChange(value, "price_list")}
                                        value={values.price_list || ""}
                                        placeholder="Price List"
                                    />
                                    <Select
                                        label="Voucher Document"
                                        options={voucherDocumentOptions}
                                        onChange={(value) => handleChange(value, "voucher_document")}
                                        value={values.voucher_document || ""}
                                        placeholder="Document"
                                    />
                                </VerticalStack>
                            </div>
                        </HorizontalStack>

                    </Page>
                )
            }
        </div>
    );
}
