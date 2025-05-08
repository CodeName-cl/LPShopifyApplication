
import AsyncSelect from "src/components/polaris/AsyncSelect";

interface BsaleDataSelectProps {
  bsaleAPIData: any[];
  onChange: CallableFunction;
  label?: string;
}

export const BsaleDataSelect = ({
  bsaleAPIData,
  onChange,
  label
}: BsaleDataSelectProps) => {

  return (
    <AsyncSelect
      label={label || "Seleccione un metodo de pago"}
      options={
        bsaleAPIData.map((item: any) => {
          return { label: item.name, value: item.id.toString() }
        })
      }
      onChange={(value: any) => {
        onChange(
          bsaleAPIData.find((item: any) => {
            return item.id.toString() === value;
          })
        );
      }}
    />
  );
};
