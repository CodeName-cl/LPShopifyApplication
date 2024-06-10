import { Link, AccountConnection } from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import RUTInput from "./RUTInput";

export default function BsaleToken(
  { onAccountConnected, onAccountDisconnected }: { onAccountConnected: CallableFunction, onAccountDisconnected: CallableFunction }
) {

  // init state
  // TODO: change connected to false by default
  const [connected, setConnected] = useState(true);
  // TODO: change companyRUT to empty string by default
  const [companyRUT, setCompanyRUT] = useState('76.802.842-7');
  // TODO: remove access token de pruebas
  const [accessToken, setAccessToken] = useState('d2f8a9321e2ae69af120e97fc54f5021f0efbe5e');

  // generate uuid
  const [id, setID] = useState(Math.random().toString(36).substring(7));

  useEffect(() => {
    // listen token changes
    const interval = setInterval(async () =>
    {
      // query the token from the server
      const response = await fetch(`${window.location.origin}/bsale/token/${id}`)
      const data = await response.json();

      // if token is present, set it and call the callback
      if (data.hasOwnProperty('accessToken')) {
        setAccessToken(data.accessToken);
        onAccountConnected(data.accessToken);
      }
    }, 2000);

    // clear interval if effect is loaded.
    return () => clearInterval(interval);
  }, [id, onAccountConnected]);

  const handleAction = useCallback(() => {
    // init login
    // TODO: move app_id to an environment variable
    window.open(
      `https://oauth.bsale.io/login?app_id=7vz13ywk9&redirect_uri=${window.location.origin}/bsale/code/${id}&client_code=${companyRUT.split('.').join('')}`,
      "_blank"
    );
  }, [companyRUT, id]);

  // handle disconnect bsale account
  const handleDisconnect = useCallback(() => {
    // remove token from server
    fetch(`${window.location.origin}/bsale/disconnect/${id}`);

    // reset states
    setAccessToken('');
    setID(Math.random().toString(36).substring(7));

    // execute callback
    onAccountDisconnected('');
  }, [id, onAccountDisconnected]);

  // set is connected
  useEffect(() => { setConnected(accessToken.length > 0); }, [accessToken]);

  // init texts from connected state
  const accountName = connected ? 'Bsale' : '';
  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';

  // init terms section
  const terms = connected ? null : (
    <p>
      <RUTInput onChange={setCompanyRUT} />
      <br />
      By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
      <Link url="https://www.loadingplay.com" target="_blank" >terms and conditions</Link>. You’ll pay a
      commission rate of 15% on sales made through Sample App.
    </p>
  );

  // render component
  return (
    <AccountConnection
      accountName={accountName}
      connected={connected}
      title="Bsale account"
      action={{
        content: buttonText,
        onAction: connected ? handleDisconnect : handleAction,
        disabled: companyRUT.length < 11, // Fix: Add the 'disabled' property
      }}
      details={details}
      termsOfService={terms}
    />
  )
}
