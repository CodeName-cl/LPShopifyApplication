import {
  Select
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";


export default function AsyncSelect({ label, options }: { label: string, options: any })
{
  // set states
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState('');

  // set callback
  const handleSelectChange = useCallback((value: string) => {
    setSelected(value)
  }, [setSelected]);

  // set effect
  useEffect(() => { setIsLoading(false); }, [options]);

  return (
    <Select
      disabled={options.length === 0 || isLoading}
      label={label}
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
