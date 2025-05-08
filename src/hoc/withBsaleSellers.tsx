import { useEffect, useState } from "react";
import Bsale from "src/infra/Bsale";


interface withBsaleSellersProps {
  accessToken: string;
  apiURL: string;
}


export const withBsaleSellers = (WrappedComponent: any) => {

  const Component = ({ accessToken, apiURL, ...props }: withBsaleSellersProps) => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
      const loadData = async () => {
        const bsale = new Bsale(apiURL, accessToken);
        const data = await bsale.getSellers();

        console.log(data)

        setData(
          data.items.map((i: any)=> { return {id: i.id, name: `${i.firstName} ${i.lastName}`} })
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
