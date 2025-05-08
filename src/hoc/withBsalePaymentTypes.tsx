import { useEffect, useState } from "react";
import Bsale from "src/infra/Bsale";


interface withBsalePaymentTypesProps {
  accessToken: string;
  apiURL: string;
}


export const withBsalePaymentTypes = (WrappedComponent: any) => {

  const Component = ({ accessToken, apiURL, ...props }: withBsalePaymentTypesProps) => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
      const loadData = async () => {
        const bsale = new Bsale(apiURL, accessToken);
        const data = await bsale.getPaymentTypes();

        setData(
          data.items.map((i: any)=> { return {id: i.id, name: i.name} })
        );
      }
      loadData();

    }, [accessToken, apiURL, setData]);

    return (
      <WrappedComponent bsaleAPIData={data} {...props} />
    );
  };

  return Component
}
