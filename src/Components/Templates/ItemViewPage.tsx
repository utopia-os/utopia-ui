import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CardPage } from "./CardPage";
import { ItemsApi } from "../../types";
import { getValue } from "../../Utils/GetValue";


type breadcrumb = {
  name: string,
  path: string
}


export const ItemViewPage = ({ api, parents, itemNameField, itemTextField, itemImageField, itemSymbolField }: { api: ItemsApi<any>, parents: Array<breadcrumb>, itemNameField: string, itemTextField: string, itemImageField: string, itemSymbolField: string }) => {

  const [item, setItem] = useState<any>();

  let location = useLocation();
  

  const loadProject = async () => {
    if (api?.getItem) {
      const project: unknown = await api?.getItem(location.pathname.split("/")[2]);
      setItem(project as any);
    }
  }



  useEffect(() => {
    loadProject();
  }, [api])

  return (
    <CardPage title={getValue(item, itemNameField) || ""} parents={parents}>
      {item &&
        <>
          {getValue(item, itemImageField) ?
            <div className=' tw-h-36 flex items-center justify-center '>
              <img className='tw-h-24' src={`https://api.utopia-lab.org/assets/${getValue(item, itemImageField)}`}></img>
            </div> :
            <div className="tw-h-36 !bg-transparent tw-flex tw-items-center tw-justify-center tw-text-7xl">
              {getValue(item, itemSymbolField)}
            </div>
          }
          <p className='text-sm mb-2'>{getValue(item, itemTextField)}</p>
        </>

      }

    </CardPage>
  )
}
