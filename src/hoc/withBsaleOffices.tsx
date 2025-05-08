import { useEffect, useState } from "react";
import Bsale from "src/infra/Bsale";


interface WithBsaleOfficeProps {
  accessToken: string;
  apiURL: string;
}


export const withBsaleOffices = (WrappedComponent: any) => {

  const Component = ({ accessToken, apiURL, ...props }: WithBsaleOfficeProps) => {

    const [bsaleOffices, setBsaleOffices] = useState<any[]>([]);

    useEffect(() => {
      const loadBsaleOffices = async () => {
        const bsale = new Bsale(apiURL, accessToken);
        const data = await bsale.getOffices();

        setBsaleOffices(
          data.items.map((i: any)=> { return {id: i.id, name: i.name} })
        );
      }
      loadBsaleOffices();

    }, [accessToken, apiURL, setBsaleOffices]);

    return (
      <WrappedComponent bsaleAPIData={bsaleOffices} {...props} />
    );
  };

  return Component
}
