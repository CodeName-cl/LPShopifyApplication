// @ts-nocheck
import {
    Page,
    Layout,
    Button,
    Text,
    VerticalStack,
} from "@shopify/polaris";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MockAutomation } from "../assets/index.js"

export default function ConfigureAutomation() {
    const navigate = useNavigate();

    const handleSelect = useCallback(() => {
        navigate("/");
    }, []);

    return (
        <div>
            <Page
                fullWidth
                title="Automation created"
                subtitle="Step 3 of 3"
            >
                <div style={{ "marginTop": "5%" }} >
                    <Layout>
                        <Layout.Section>
                            <VerticalStack inlineAlign="center" gap={4} >
                                <img
                                    style={{
                                        width: "375px",
                                        height: "250px",
                                    }}
                                    src={MockAutomation}
                                />
                                <div style={{ "width": "375px" }} >
                                    <Text as="p" fontWeight="regular" alignment="center">
                                        Thanks for activating this automation.
                                        The Loadingplay team will reach you to finish up this configration.
                                    </Text>
                                </div>
                                <Button onClick={handleSelect} primary>
                                    Done
                                </Button>
                            </VerticalStack>
                        </Layout.Section>
                    </Layout>
                </div>
            </Page>
        </div>
    );
}
