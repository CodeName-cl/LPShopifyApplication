export default class LPIMConfig {

  accountsURL: string

  constructor(accountsURL: string | null = null) {
    this.accountsURL = accountsURL || process.env.ACCOUNTS_URL || 'https://accounts.loadingplay.com';  // TODO: default to ondev
  }

  getLoginToken = async () => {
    const response = await fetch(
      `${this.accountsURL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
          'email': 'ricardo@loadingplay.com',
          'password': 'Escuela16761*',
          'next': '/apps'
        })
      }
    );

    return response.headers.get('Set-Cookie').split(';')[0];
  }

  createHypeSite = async (cookie: string, site_name: string) => {
    const response = await fetch(
      `${this.accountsURL}/site`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': cookie
        },
        body: new URLSearchParams({
          'site_name': site_name
        })
      }
    );

    return await response.json();
  }

  // TODO: move arguments to a place where it makes more sense
  getLoginCode = async (cookie: string, client_id: string, redirect_uri: string, site_name: string) => {
    let data = {
      'response_type': 'code',
      'client_id': client_id,
      'redirect_uri': redirect_uri,
      'site_name': site_name
    };

    const response = await fetch(
      `${this.accountsURL}/oauth2/auth?${new URLSearchParams(data).toString()}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Cookie': cookie
        }
      }
    );

    // IF response is with error, there is a high chance that the client id doesnt exists
    // check http://localhost:8519/apps
    const args = response.url.split('?')[1];
    const parsedArguments = new URLSearchParams(args);
    return parsedArguments.get('code');
  }

  exchangeCodeForToken = async (code: string, client_id: string, client_secret: string, redirect_uri: string) => {
    // Prepare URL-encoded form data
    const formData = new URLSearchParams({
      "code": code,
      "grant_type": "authorization_code",
      "client_id": client_id,
      "client_secret": client_secret,
      "redirect_uri": redirect_uri
    }).toString();

    // get tokens
    const response = await fetch(`${this.accountsURL}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    });

    return await response.json();
  }

  getUnexistentLocations = async (access_token: string, shopify_locations: string[]) => {
    const response = await fetch(
      "https://apibodegas.loadingplay.com/v1/cellar",
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }
    );

    const JSONData = await response.json();
    const unexistent_locations = [];

    console.log("getUnexistentLocations", JSONData)

    for (const location of shopify_locations) {
      let found = false;
      for (const cellar of JSONData.cellars) {
        if (location.includes(cellar.name)) {
          found = true;
          break;
        }
      }

      if (!found) {
        unexistent_locations.push(location);
      }
    }

    console.log(unexistent_locations);
    return unexistent_locations;
  }

  createUnexistentLocations = async (access_token: string, unexistent_locations: string[]) => {
    // create unexistent locations
    for (const location of unexistent_locations) {
      const response = await fetch(
        "https://apibodegas.loadingplay.com/v1/cellar",
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: location
          })
        }
      );

      console.log("location created", await response.json());
    }
  }

  configShopify = async (access_token: string, refresh_token: string, shopify_shop: string, shopify_token: string) => {

    // TODO: remove all hard coded values
    // create config in im
    fetch('https://im.loadingplay.com/config/shopify', {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'text/plain;charset=UTF-8',
        'Cookie': 'access_token=aUgnY3yzGCevd1jQhSYTDFeLKSK3Php5g3HytbZl; refresh_token=A2FhiIJ9BmjKdAcn8h0yG7LBBrZwzyNvSiuism5q; site_name=test-ric-4; session=.eJwlzktOAzEMANC7ZI2QE9vJpCtuUvkLIxUGpe2iqrg7SLwTvGc554rrRznd1j1eynn3ciqyCQa1jDH7qBv75KkeEewdLDuSDETmDbOC9gRRT4mNpNnMgTMdRvMKYtBINY0sXBmsVwpKIucuAmgTWZWqD5CGyhNGr0LlL3K_xvrfrN1k-fF2OcT3r_fvizxe7fgsP7-uKjkH.Zlnq_Q.5BLv48YcwjM4ugC9XR0RskvxwmM; auth_access_token=xdPeFJIeSdoOrn9wloxx8YgOSI3xpX3dGGBrxiaI; auth_refresh_token=G2BbM0tsdns0jGmtc7us8gOCJX7cM7ls2pIIuT7Q',
        'DNT': '1',
        'Origin': 'https://im.loadingplay.com',
        'Referer': 'https://im.loadingplay.com/forms/shopify',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      },
      body: JSON.stringify({
        config: {
          enabled: true,
          access_token_lp: access_token,
          refresh_token_lp: refresh_token,
          shopify_url: `https://${shopify_shop}`,
          shopify_token: shopify_token,
          shopify_store_name: shopify_shop,
          ignore_tag: "",
          dni_field: "",
          company_dni_field: "",
          company_name_field: "",
          company_activity_field: "",
          company_address_field: "",
          company_province_field: "",
          company_city_field: "",
          company_zip_field: "",
          company_regime_field: "",
          company_cfdi_field: "",
          cellar_location: {
            "4756": "72427274456"
          },
          location_cellar: {
            "72427274456": "4756"
          },
          sync_stock_shopify_to_lp: false,
          sync_stock_lp_to_shopify: true,
          sync_products_shopify_to_lp: false,
          sync_orders_shopify_to_lp: true,
          validate_shopify_orders: false,
          validate_shopify_orders_v2: false,
          update_order_detail: false,
          refund_order_detail: false,
          partially_refund_order_detail: false,
          wait_n_seconds_for_order_data: "0",
          uses_net_shipping_costs: false,
          show_new_hook_shopify: false
        },
        motive_comment: "test"
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  configBsale = async (access_token: string, refresh_token: string, bsale_token: string, cookie_im: string) => {
    // TODO: remove all hard coded values
    fetch('https://im.loadingplay.com/config/bsale', {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Content-Type': 'text/plain;charset=UTF-8',
        'Cookie': cookie_im,
        'DNT': '1',
        'Origin': 'https://im.loadingplay.com',
        'Referer': 'https://im.loadingplay.com/forms/bsale',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      },
      body: JSON.stringify({
        config: {
          enabled: true,
          access_token_lp: access_token,
          refresh_token_lp: refresh_token,
          access_token_bsale: bsale_token,
          coin: "1",
          seller_id: "5",
          payment_type_shopify_bill: "1",
          price_list_id: "2",
          document_flows: {
            "por confirmar": {
              tags: null,
              multicellar: null,
              default: null
            },
            confirmado: {
              tags: null,
              multicellar: null,
              default: {
                action: {
                  id: "2",
                  name: "Reservar stock"
                },
                document: {
                  id: "23",
                  name: "NOTA VENTA T"
                }
              }
            },
            despachado: {
              tags: null,
              multicellar: null,
              default: null
            },
            cancelado: {
              tags: null,
              multicellar: null,
              default: null
            },
            "listo para despacho": {
              tags: null,
              multicellar: null,
              default: null
            }
          },
          stock_movement: true,
          use_current_date_on_document_generation: false,
          bill_reference_on_last_name: false,
          bill_comment: false,
          dynamic_attr_list: [],
          sync_stock_bsale_to_lp: true,
          cellar_office: {},
          office_cellar: {},
          validate_order_invoice: true,
          validate_multicellar_order: false,
          block_bill_generation: false,
          only_sale_note: false,
          skip_gloss: false,
          only_gloss: false,
          deactivate_payment_validation: true,
          deactivate_shipping_cost: false,
          use_shipping_product: false,
          foreigner_client: false,
          factura: "",
          factura_excenta: "",
          boleta: "",
          doc_reserva_stock: "",
          nota_credito: "",
          guia_despacho: "",
          guia_tipo_despacho: "",
          rut_dispatch_guide: "",
          activity_dispatch_guide: "",
          company_dispatch_guide: "",
          dispatch_guide_generate_status: "",
          payment_types: false,
          orders: false,
          sync_products_bsale_to_lp: false,
          load_option: "complete_load",
          separator: "",
          variant_name: ""
        },
        motive_comment: "test"
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  createIntegration = async () => {
    // TODO: remove all hard coded values
    const site_name = "test-ric-4";  // TODO: implement shop name
    const redirect_uri = "http://localhost:8000/auth/complete"
    const client_id = '84'
    const client_secret = '2277fe35d2dec51d2e9baa4efcf03b4e'
    const shopify_token = "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"
    const bsale_token = "d2f8a9321e2ae69af120e97fc54f5021f0efbe5e"
    const shopify_locations = ["test location", "otra"]
    const cookie_im = "site_name=test-ric-4; session=.eJwlzktOAzEMANC7ZI2QE9vJpCtuUvkLIxUGpe2iqrg7SLwTvGc554rrRznd1j1eynn3ciqyCQa1jDH7qBv75KkeEewdLDuSDETmDbOC9gRRT4mNpNnMgTMdRvMKYtBINY0sXBmsVwpKIucuAmgTWZWqD5CGyhNGr0LlL3K_xvrfrN1k-fF2OcT3r_fvizxe7fgsP7-uKjkH.Zlnq_Q.5BLv48YcwjM4ugC9XR0RskvxwmM"
    const cookie = await this.getLoginToken();

    console.log(await this.createHypeSite(cookie, site_name));

    const code = await this.getLoginCode(cookie, client_id, redirect_uri, site_name)  // TODO: handle cases with code in null
    const tokenJSON = await this.exchangeCodeForToken(code, client_id, client_secret, redirect_uri);
    const unexistentLocations = await this.getUnexistentLocations(tokenJSON.access_token, shopify_locations);

    await this.createUnexistentLocations(tokenJSON.access_token, unexistentLocations);
    await this.configShopify(tokenJSON.access_token, tokenJSON.refresh_token, site_name, shopify_token);
    await this.configBsale(tokenJSON.access_token, tokenJSON.refresh_token, bsale_token, cookie_im);
  }
}
