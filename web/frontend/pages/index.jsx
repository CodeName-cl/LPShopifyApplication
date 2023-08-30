// @ts-nocheck
import {
  Page,
  Layout,
  Button,
  Text,
  VerticalStack,
  HorizontalStack,
  Card,
  Frame,
  Loading
} from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MockAutomation } from "../assets/index.js"

const mockAutomations = [
  {
    "image": MockAutomation,
    "status": "running",
    "description": "Generate a vouvher for each shopify order with Bsale"
  },
  {
    "image": MockAutomation,
    "status": "in review",
    "description": "Generate a vouvher for each shopify order with Bsale"
  },
  {
    "image": MockAutomation,
    "status": "ready to run",
    "description": "Connect inventory from Bsale to Shopify"
  },
  {
    "image": MockAutomation,
    "status": "paused",
    "description": "Connect inventory from Bsale to Shopify"
  },
]

export default function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasAutomations, setHasAutomations] = useState(false);
  const [automations, setAutomations] = useState([]);

  // if you want see filled page, please just uncomment this code and change default loading from false to true
  /* useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHasAutomations(true);
      setAutomations(mockAutomations);
      setLoading(false);
    }, 1000);
  }, []); */

  const handleSelect = useCallback(() => {
    navigate("/selectautomation");
  }, []);

  const chooiceStatusColor = (status) => {
    switch (status) {
      case "running":
        return <span style={{ "color": "#5DA460" }}>{status}</span>;
      case "in review":
        return <span style={{ "color": "#98A799" }}>{status}</span>;
      case "ready to run":
        return <span style={{ "color": "#015FB6" }}>{status}</span>;
      case "paused":
        return <span style={{ "color": "#BFAD06" }}>{status}</span>;
    }
  }

  return (
    <div>
      {
        loading ? (
          <div style={{ height: '100px' }}>
            <Frame>
              <Loading />
            </Frame>
          </div>
        ) : hasAutomations ? (
          <Page
            fullWidth
            title="My automations"
            primaryAction={
              {
                content: "New",
                onAction: handleSelect,
              }
            }
          >
            <div style={{ "paddingBottom": "30px" }} >
              <HorizontalStack gap={6} >
                {automations.map((item, index) => (
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
                          <Text variant="bodyLg" as="p" alignment="end">
                            Status: {chooiceStatusColor(item.status)}
                          </Text>
                          <div style={{ "height": "40px" }} >
                            <Text as="p" fontWeight="regular" >
                              {item.description}
                            </Text>
                          </div>
                          <Button fullWidth onClick={() => console.log("created")} primary>
                            Configure
                          </Button>
                        </VerticalStack>
                      </div>
                    </Card>
                  </div>
                ))}
              </HorizontalStack>
            </div>
          </Page>
        ) : (
          <Page
            fullWidth
            title="Start with automations"
            primaryAction={
              {
                content: "New",
                onAction: handleSelect,
              }
            }
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
                    <Text as="p" fontWeight="regular">
                      Add a new outomation to start automating your store.
                    </Text>
                    <Button onClick={handleSelect} primary>
                      Start
                    </Button>
                  </VerticalStack>
                </Layout.Section>
              </Layout>
            </div>
          </Page>
        )
      }
    </div>
  );
}
