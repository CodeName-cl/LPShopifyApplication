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

export default function InventoryAutomation() {
    const navigate = useNavigate();
    const fetchShopify = useAuthenticatedFetch();
    const [loading, setLoading] = useState(true);
    const [officeOptions, setOfficeOptions] = useState([]);
    const [locationsOptions, setLocationsOptions] = useState([]);
    const [values, setValues] = useState({});

    const handleSelect = async () => {
        try {
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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const responseOffice = await fetch(
                    "https://api.bsale.io/v1/offices.json",
                    {
                        headers: {
                            "access_token": access_token,
                        }
                    }
                );
                if (responseOffice.ok) {
                    const data = await responseOffice.json();
                    const options = data?.items.map((item) => {
                        return {
                            label: item.name,
                            value: item.name
                        }
                    })
                    setOfficeOptions(options);
                }

                const responseLocations = await fetchShopify("/api/locations");

                if (responseLocations.ok) {
                    const data = await responseLocations.json();
                    console.log("data", data)
                    const options = data.locations?.map((item) => {
                        return {
                            label: item.name,
                            value: item.name
                        }
                    })
                    setLocationsOptions(options);
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
                            Connect inventory from Bsale to Shopify
                        </Text>
                        <HorizontalStack align="center">
                            <div style={{ "width": "50%", "marginTop": "5%" }} >
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
                                        label="Select Shopify Location"
                                        options={locationsOptions}
                                        onChange={(value) => handleChange(value, "shopify_location")}
                                        value={values.shopify_location || ""}
                                        placeholder="Shopify Locations"
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
