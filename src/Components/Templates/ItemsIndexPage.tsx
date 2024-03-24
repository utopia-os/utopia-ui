import { ReactNode, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Item, ItemsApi } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { TextView } from '../Map';
import { useAssetApi } from '../AppShell/hooks/useAssets';
import { PlusButton } from '../Profile/PlusButton';
import { TextInput, TextAreaInput } from '../Input';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { useAddItem } from '../Map/hooks/useItems';
import { useResetFilterTags } from '../Map/hooks/useFilter';
import { toast } from 'react-toastify';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { useAuth } from '../Auth';
import { useLayers } from '../Map/hooks/useLayers';
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView';


type breadcrumb = {
  name: string,
  path: string
}


export const ItemsIndexPage = ({ api, url, parameterField, breadcrumbs, itemNameField, itemTextField, itemImageField, itemSymbolField, children }: { api: ItemsApi<any>, url: string, parameterField: string, breadcrumbs: Array<breadcrumb>, itemNameField: string, itemTextField: string, itemImageField: string, itemSymbolField: string, children?: ReactNode }) => {

  console.log(itemSymbolField);

  const [loading, setLoading] = useState<boolean>(false);
  const [addItemPopupType, setAddItemPopupType] = useState<string>("");

  const tabRef = useRef<HTMLFormElement>(null);

  function scroll() {
    tabRef.current?.scrollIntoView();
  }

  useEffect(() => {
    scroll();
  }, [addItemPopupType])

  const [items, setItems] = useState<any[]>([]);

  const loadProjects = async () => {
    const items = await api?.getItems();
    setItems(items as any);
  }

  const assetsApi = useAssetApi();
  const navigate = useNavigate();

  const tags = useTags();
  const addTag = useAddTag();
  const addItem = useAddItem();
  const resetFilterTags = useResetFilterTags();
  const { user } = useAuth();


  useEffect(() => {
    loadProjects();
  }, [api])

  const layers = useLayers();

  const submitNewItem = async (evt: any, type: string) => {
    evt.preventDefault();
    const formItem: Item = {} as Item;
    Array.from(evt.target).forEach((input: HTMLInputElement) => {
      if (input.name) {
        formItem[input.name] = input.value;
      }
    });
    setLoading(true);
    formItem.text && formItem.text.toLocaleLowerCase().match(hashTagRegex)?.map(tag => {
      if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
        addTag({ id: crypto.randomUUID(), name: tag.slice(1), color: randomColor() })
      }
    });
    const uuid = crypto.randomUUID();
    let success = false;
    try {
      await api?.createItem!({ ...formItem, id: uuid, type: type });
      success = true;
    } catch (error) {
      toast.error(error.toString());
    }
    if (success) {
      toast.success("New item created");
    }
    setLoading(false);
    setAddItemPopupType("");
    setItems(current => [...current, { ...formItem, id: uuid, type: type, layer: layers.find(l => l.name == addItemPopupType), user_created: user }])
  }

  const deleteItem = async (item) => {
    setLoading(true);
    let success = false;
    try {
      await api?.deleteItem!(item.id)
      success = true;
    } catch (error) {
      toast.error(error.toString());
    }
    if (success) {
      toast.success("Item deleted");
    }
    setLoading(false);
    setItems(items.filter(i=>i.id !=item.id))
    console.log("chaka");
  }


  
  return (

    <main className="tw-flex-1 tw-overflow-y-auto tw-pt-2 tw-px-6  tw-bg-base-200 tw-min-w-80 tw-flex tw-justify-center" >
      <div className=' tw-w-full xl:tw-max-w-6xl'>
        {breadcrumbs &&
          <div className="tw-text-sm tw-breadcrumbs">
            <ul>
              {breadcrumbs.map((b, i) => <li key={i}><Link to={b.path} >{b.name}</Link></li>)}
            </ul>
          </div>}
        {/**
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-2 ">
             <TextInput defaultValue='' placeholder='🔍 Search' containerStyle='lg:col-span-2' updateFormValue={(val) => { setSearch(val) }}></TextInput>
          <SelectBox updateFormValue={() => { }} placeholder="Type" containerStyle=' hidden md:grid' defaultValue='PLACEHOLDER' options={[{ name: "local", value: "local" }, { name: "project", value: "project" }]} />
        </div>
        <div className="divider" ></div>

         */}



        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-pt-4">
          {
            items?.map((i, k) => {
              return (
                <div key={k} className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-p-4 tw-mb-4 tw-h-fit' onClick={() => navigate(url + getValue(i, parameterField))}>
                  <HeaderView loading={loading} item={i} api={api} itemAvatarField={itemImageField} itemNameField={itemNameField} editCallback={() => navigate("/edit-item/"+i.id)} deleteCallback={()=>deleteItem(i)}></HeaderView>
                  <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                    <TextView truncate item={i} itemTextField={itemTextField} />
                  </div>
                </div>

              )

            })
          }
          {addItemPopupType == "project" ?

            <form ref={tabRef} autoComplete='off' onSubmit={e => submitNewItem(e, addItemPopupType)}  >

              <div className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-p-6 tw-mb-10'>
                <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-text-gray-600" onClick={() => {
                  setAddItemPopupType("")
                }}>
                  <p className='tw-text-center '>✕</p></label>
                <TextInput type="text" placeholder="Name" dataField="name" defaultValue={""} inputStyle='' />
                <TextAreaInput placeholder="Text" dataField="text" defaultValue={""} inputStyle='tw-h-40 tw-mt-5' />
                <div className='tw-flex tw-justify-center'>
                  <button className={loading ? 'tw-btn tw-btn-disabled tw-mt-5 tw-place-self-center' : 'tw-btn tw-mt-5 tw-place-self-center'} type='submit'>{loading ? <span className="tw-loading tw-loading-spinner"></span> : 'Save'}</button>
                </div>
              </div>
            </form> : <></>
          }
        </div>
      </div>
      <PlusButton triggerAction={() => { setAddItemPopupType("project"); scroll(); }} color={'#777'} collection='items' />
      {children}
    </main>


  )
}
