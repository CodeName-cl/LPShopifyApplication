// @ts-nocheck
import {
    Page,
    Button,
    Text,
    VerticalStack,
    HorizontalStack,
    Card,
} from "@shopify/polaris";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MockAutomation } from "../assets/index.js"
const mockAutomations = [
    {
        "image": MockAutomation,
        "description": "Inventory Synchronization",
        "buttonText": "Select",
        "path": "/inventoryautomation"
    },
    {
        "image": MockAutomation,
        "description": "Voucher Generation",
        "buttonText": "Select",
        "path": "/voucherautomation"
    },
    {
        "image": MockAutomation,
        "description": "More comming soon",
        "buttonText": "More comming soon",
    },
]


export default function Automations() {
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState(null);

    const handleSelect = () => {
        navigate(activePath);
    };

    return (
        <div>
            <Page
                fullWidth
                title="Select automation type"
                subtitle="Step 1 of 3"
                primaryAction={
                    {
                        content: "Next step",
                        onAction: handleSelect,
                        disabled: !activePath
                    }
                }
            >
                <div style={{ "paddingBottom": "30px" }} >
                    <HorizontalStack gap={6} >
                        {mockAutomations.map((item, index) => (
                            <div style={{ width: "31%" }} key={index} >
                                <Card>
                                    <div style={{ "padding": "10px" }} >
                                        <VerticalStack gap="5">
                                            <img
                                                alt=""
                                                src={item.image}
                                                onClick={() => console.log("click")}
                                                style={{ "cursor": "pointer" }}
                                            />
                                            <div style={{ "height": "40px" }} >
                                                <Text as="p" fontWeight="regular" >
                                                    {item.description}
                                                </Text>
                                            </div>
                                            {
                                                item.buttonText === "More comming soon" ? (
                                                    <Button plain destructive disabled>
                                                        {item.buttonText}
                                                    </Button>
                                                ) : (
                                                    <Button disabled={activePath === item.path} fullWidth onClick={() => setActivePath(item.path)} primary>
                                                        {item.buttonText}
                                                    </Button>
                                                )
                                            }
                                        </VerticalStack>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </HorizontalStack>
                </div>
            </Page>
        </div>
    );
}
