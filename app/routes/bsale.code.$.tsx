import { useEffect } from "react";
import DATA from "~/inmemory.server";

export const loader = async ({ request }: { request: any }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const id = url.pathname.split('/').pop();

  try {

    // exchange code for a token
    const response = await fetch(
      `https://oauth.bsale.io/gateway/oauth_response.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code,
        usrToken: "5f5228fa61173d6fdc47ab5b82c03efcf0bd373a",
        appId: "7vz13ywk9"
      })
    });

    // convert response to JSON
    const data = await response.json();
    DATA[id] = data.data.accessToken;

    return {
      accessToken: data.data.accessToken
    }
  }
  catch (error) {
    console.error(error);
  }

  return json(
    {
      accessToken: ""
    }
  );
}


export default function BsaleCode() {

  useEffect(() => {
    // close the window
    setTimeout(() => window.close(), 3000);
  }, []);

  return (
    <div>token de Bsale generado, puedes cerrar esta ventana.</div>
  )
}
