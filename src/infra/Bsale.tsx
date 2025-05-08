interface Office {
  id: number;
  name: string;
}


class Bsale {

  accessToken: string;
  proxyURL: string;

  constructor(proxyURL: string, accessToken: string) {
    this.accessToken = accessToken;
    this.proxyURL = proxyURL;
  }

  get = async (endpoint: string) => {
    const response = await fetch(
      `${this.proxyURL}/bsale/proxy?endpoint=${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.accessToken}`
      }
    });
    const data = await response.json();
    return data;
  }

  getOffices = async () => {
    const data = await this.get('offices.json');
    return data;
  }

  getPaymentTypes = async () => {
    const data = await this.get('payment_types.json');
    return data;
  }

  getSellers = async () => {
    const data = await this.get('users.json');
    return data;
  }

  getPriceLists = async () => {
    const data = await this.get('price_lists.json');
    return data;
  }

  getDocumentTypes = async () => {
    const data = await this.get('document_types.json');
    return data;
  }
}

export default Bsale;
