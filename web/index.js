// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

// to get locations from shopify
app.get("/api/locations", async (_req, res) => {
  let status = 200;
  let error = null;
  // write your shopify_access_token here like "shpua_1305d9598fbd7fa50280fc04cb779c17"
  const shopify_access_token = ""
  // write your url here like "https://ylmzcnplt.myshopify.com/admin/api/2023-07/locations.json"
  const myShopifyStore = ""
  try {
    const responseLocations = await fetch(
      myShopifyStore,
      {
        headers: {
          "X-Shopify-Access-Token": shopify_access_token,
          'Content-Type': 'application/json',
          "mode": "no-cors"
        }
      }
    );
    const responseLocationsJson = await responseLocations.json()
    const locations = responseLocationsJson.locations
    res.status(status).send({ locations });
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
    res.status(status).send({ success: status === 200, error });
  }

});

// to send message to slice
app.post("/api/sendmessage", async (_req, res) => {
  const sliceWebhookUrl = "https://hooks.slack.com/services/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"
  try {
    const blocks = [];
    for(const key in _req.body) {
      blocks.push({
        "type": "section",
        "fields": [{
          "type": "mrkdwn",
          "text": `*${key}:*\n${_req.body[key]}`
        }]
      })
    }
    
    const response = await fetch(
      sliceWebhookUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "blocks": blocks
        })
      }
    );
    res.status(200).send("ok");
  } catch (e) {
    console.log(e.message);
    res.status(200).send("err");
  }
});

app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
