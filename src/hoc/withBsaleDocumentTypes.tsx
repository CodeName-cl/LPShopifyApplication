import { useEffect, useState } from "react";
import Bsale from "src/infra/Bsale";


interface withBsaleDocumentTypesProps {
  accessToken: string;
  apiURL: string;
}


export const withBsaleDocumentTypes = (WrappedComponent: any) => {

  const Component = ({ accessToken, apiURL, ...props }: withBsaleDocumentTypesProps) => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
      const loadData = async () => {
        const bsale = new Bsale(apiURL, accessToken);
        const data = await bsale.getDocumentTypes();

        console.log(data)

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
