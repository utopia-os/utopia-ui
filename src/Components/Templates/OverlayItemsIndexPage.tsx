import { ReactNode, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Item, ItemsApi, LayerProps } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { TextView } from '../Map';
import { PlusButton } from '../Profile/PlusButton';
import { TextInput, TextAreaInput } from '../Input';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { toast } from 'react-toastify';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { useAuth } from '../Auth';
import { useLayers } from '../Map/hooks/useLayers';
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView';
import { MapOverlayPage } from './MapOverlayPage';
import { useAddItem, useItems, useRemoveItem } from '../Map/hooks/useItems';
import { timeAgo } from '../../Utils/TimeAgo';


type breadcrumb = {
    name: string,
    path: string
}


export const OverlayItemsIndexPage = ({ url, layerName, parameterField, breadcrumbs, itemNameField, itemTextField, itemImageField, itemSymbolField, itemSubnameField, plusButton = true, children }: { layerName: string, url: string, parameterField: string, breadcrumbs: Array<breadcrumb>, itemNameField: string, itemTextField: string, itemImageField: string, itemSymbolField: string, itemSubnameField: string, plusButton?: boolean, children?: ReactNode }) => {

    console.log(itemSymbolField);
    const [infoExpanded, setInfoExpanded] = useState<Number>(0);

    const [loading, setLoading] = useState<boolean>(false);
    const [addItemPopupType, setAddItemPopupType] = useState<string>("");

    const tabRef = useRef<HTMLFormElement>(null);

    function scroll() {
        tabRef.current?.scrollIntoView();
    }

    useEffect(() => {
        scroll();
    }, [addItemPopupType])


    const navigate = useNavigate();

    const tags = useTags();
    const addTag = useAddTag();
    const { user } = useAuth();
    const items = useItems();
    const addItem = useAddItem();
    const removeItem = useRemoveItem();
    const layers = useLayers();

    useEffect(() => {
        console.log(items);


    }, [items])

    const layer = layers.find(l => l.name == layerName);


    const submitNewItem = async (evt: any) => {
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
            await layer?.api?.createItem!({ ...formItem, id: uuid });
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            toast.success("New item created");
        }
        addItem({ ...formItem, user_created: user, id: uuid, layer: layer });
        setLoading(false);
        setAddItemPopupType("");
    }

    const deleteItem = async (item) => {
        setLoading(true);
        let success = false;
        try {
            await layer?.api?.deleteItem!(item.id)
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            toast.success("Item deleted");
        }
        removeItem(item);
        setLoading(false);
    }


    return (
        <>


            <MapOverlayPage className='tw-rounded-none tw-overflow-y-auto'>
                <div className='tw-h-fit'>
                    {breadcrumbs &&
                        <div className="tw-text-sm tw-breadcrumbs">
                            <ul>
                                {breadcrumbs.map((b, i) => <li key={i}><Link to={b.path} >{b.name}</Link></li>)}
                            </ul>
                        </div>}
                </div>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-pt-4">
                    {
                        items?.filter(i => i.layer?.name === layerName)
                        .sort((a, b) => {
                            // Convert date_created to milliseconds, handle undefined by converting to lowest possible date (0 milliseconds)
                            const dateA = a.date_updated ? new Date(a.date_updated).getTime() : a.date_created ? new Date(a.date_created).getTime() : 0;
                            const dateB = b.date_updated ? new Date(b.date_updated).getTime() : b.date_created ? new Date(b.date_created).getTime() : 0;
                            return dateB - dateA; // Subtracts milliseconds which are numbers
                          })
                          .map((i, k) => {
                            return (
                                <div key={k} className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-p-4 tw-mb-4 tw-h-fit' onClick={() => navigate(url + getValue(i, parameterField))}>
                                    <HeaderView loading={loading} item={i} api={layer?.api} itemAvatarField={itemImageField} itemNameField={itemNameField} itemSubnameField={itemSubnameField} editCallback={() => navigate("/edit-item/" + i.id)} deleteCallback={() => deleteItem(i)}></HeaderView>
                                    <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                                        <TextView truncate item={i} itemTextField={itemTextField} />
                                    </div>
                                    <div className='tw-flex -tw-mb-1 tw-flex-row tw-mr-2 -tw-mt-2' onClick={(e)=> e.stopPropagation()}>

                                    {
            infoExpanded == k ?
            <p className={`tw-italic tw-min-h-[21px] !tw-my-0 tw-text-gray-500`} onClick={() => setInfoExpanded(0)} >{`${i.date_updated &&  i.date_updated != i.date_created ? "updated" : "posted" } ${i && i.user_created && i.user_created.first_name ? `by ${i.user_created.first_name}` : ""} ${i.date_updated ? timeAgo(i.date_updated) : timeAgo(i.date_created!)}`}</p>
              :
              <p className="!tw-my-0 tw-min-h-[21px] tw-font-bold tw-cursor-pointer tw-text-gray-500" onClick={() => setInfoExpanded(k)}>ⓘ</p>
          }
                                        <div className='tw-grow '></div>
                                        { //**        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-place-self-end tw-w-4 tw-h-4 tw-mb-1 tw-cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg> */ 
                                        }
                                    </div>
                                </div>

                            )

                        })
                    }
                    {addItemPopupType == "place" ?

                        <form ref={tabRef} autoComplete='off' onSubmit={e => submitNewItem(e)}  >

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
                {children}


            </MapOverlayPage>


            {plusButton && <PlusButton triggerAction={() => { setAddItemPopupType("place"); scroll(); }} color={'#777'} collection='items' />}

        </>


    )
}
