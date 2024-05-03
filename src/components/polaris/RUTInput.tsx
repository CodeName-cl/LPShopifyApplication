import { TextField } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

export default function RUTInput({ onChange }: { onChange: CallableFunction }) {
  const [companyRUT, setCompanyRUT] = useState('');

  const handleRutValidations = useCallback((value: string) => {
    const allowedChars = "1234567890Kk";

    // remove all non allowed chars
    const rut = value.split('').filter((char: string) => allowedChars.includes(char)).join('');

    // extract featyres
    const body = rut.slice(0, -1).slice(0, 8);  // limit to 8 digits
    const digit = rut.slice(-1).toUpperCase();

    // add dots every 3 digits
    let result = '';
    for (let i = 0; i < body.length; i++) {
      result += body[i];
      if (i === 1 || i === 4) {
        result += '.';
      }
    }

    // last validation before adding the dash
    if (digit.length > 0)
      setCompanyRUT(`${result}-${digit}`);
    else
      setCompanyRUT('');
  }, [setCompanyRUT]);

  useEffect(() => {
    onChange(companyRUT);
  }, [companyRUT, onChange]);

  return (
    <TextField
      label="Ingresa el rut de la empresa"
      placeholder="11.111.111-1"
      onChange={handleRutValidations}
      value={companyRUT}
      autoComplete="off" // Add the autoComplete prop with a value of "off"
    />
  );
}
