import AsyncSelect from "src/components/polaris/AsyncSelect";


interface ShopifyOfficeSelectProps {
  shopifyLocations: any[];
  onChange: CallableFunction;
}

export function ShopifyOfficeSelect({
  shopifyLocations,
  onChange
}: ShopifyOfficeSelectProps): JSX.Element {

  return (
    <AsyncSelect
      label="Elige la ubicación de Shopify"
      options={shopifyLocations.map((item: any) => {
        return { label: item.name, value: item.id.toString() };
      })}
      onChange={(value: string) => {
        onChange(
          shopifyLocations.find((item: any) => {
            return item.id.toString() === value;
          })
        );
      }}
    />
  );
}
