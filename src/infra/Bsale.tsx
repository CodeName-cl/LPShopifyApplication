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

  getOffices = async () => {
    const response = await fetch(`${this.proxyURL}/bsale/proxy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'access-token': `${this.accessToken}`
      }
    });
    const data = await response.json();
    return data;
  }
}

export default Bsale;
