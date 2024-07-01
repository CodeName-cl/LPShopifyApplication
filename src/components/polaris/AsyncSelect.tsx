import {
  Select
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";


export default function AsyncSelect({ label, options, onChange }: { label: string, options: any, onChange: CallableFunction })
{
  // set states
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState('');

  // set callback
  const handleSelectChange = useCallback((value: string) => {
    setSelected(value);
    onChange(value);
  }, [setSelected, onChange]);

  // set effect
  useEffect(() => {
    setIsLoading(false);

    // if options has more than one option, then it selects the first one
    handleSelectChange(options[0]?.value);
    setSelected(options[0]?.value);

  }, [options, handleSelectChange]);

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
