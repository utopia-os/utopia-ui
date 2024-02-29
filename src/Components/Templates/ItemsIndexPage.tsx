import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ItemsApi } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { TitleCard } from './TitleCard';


type breadcrumb = {
  name: string,
  path: string
}


export const ItemsIndexPage = ({ api, url, parameterField, breadcrumbs, itemNameField, itemTextField, itemImageField, itemSymbolField }: { api: ItemsApi<any>, url: string, parameterField: string, breadcrumbs: Array<breadcrumb>, itemNameField: string, itemTextField: string, itemImageField: string, itemSymbolField: string }) => {


  const [items, setItems] = useState<any[]>();

  const loadProjects = async () => {
    const items = await api?.getItems();
    setItems(items as any);
  }


  useEffect(() => {
    loadProjects();
  }, [api])

  return (
    <main className="tw-flex-1 tw-overflow-y-auto tw-pt-2 tw-px-6  tw-bg-base-200 tw-min-w-80 tw-flex tw-justify-center" >
      <div className=' tw-w-full xl:tw-max-w-6xl'>
        {breadcrumbs &&
          <div className="tw-text-sm tw-breadcrumbs">
            <ul>
              {breadcrumbs.map((b,i) => <li key={i}><Link to={b.path} >{b.name}</Link></li>)}
            </ul>
          </div>}
        {/**
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-2 ">
             <TextInput defaultValue='' placeholder='🔍 Search' containerStyle='lg:col-span-2' updateFormValue={(val) => { setSearch(val) }}></TextInput>
          <SelectBox updateFormValue={() => { }} placeholder="Type" containerStyle=' hidden md:grid' defaultValue='PLACEHOLDER' options={[{ name: "local", value: "local" }, { name: "project", value: "project" }]} />
        </div>
        <div className="divider" ></div>

         */}



        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 ">
          {
            items?.map((i, k) => {
              return (
                <Link key={k} to={url + getValue(i, parameterField)}>
                  <TitleCard className={"!tw-h-96 "} title={getValue(i, itemNameField)} topMargin={"tw-mt-2"}>
                    {getValue(i,itemImageField) ?
                      <div className=' tw-h-36 flex items-center justify-center '>
                      <img className='tw-h-24' src={`https://api.utopia-lab.org/assets/${getValue(i, itemImageField)}`}></img> 
                      </div> :
                      <div className="tw-h-36 !bg-transparent tw-flex tw-items-center tw-justify-center tw-text-7xl">
                        {getValue(i,itemSymbolField)}
                      </div>
                    }
                    <p className='tw-font-bold tw-text-sm tw-mt-2'>{i.subname}</p>


                    <p className='tw-text-sm tw-mt-2 tw-mb-2'>{getValue(i, itemTextField)}</p>
                    {/**
 *                  <div className='flex justify-between text-gray-500 '>
                    <div className='flex'><UsersIcon className=' h-6 w-6' />&nbsp;2</div>
                    <div className='flex'><MapPinIcon className='h-6 w-6' />&nbsp;5</div>
                    <div className='flex'><CalendarIcon className='h-6 w-6' />&nbsp;9</div>
                  </div>
 
 */}


                  </TitleCard>
                </Link>
              )

            })
          }
        </div>
      </div>
    </main>


  )
}
