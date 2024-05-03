import { useState } from "react";
import { useHasUserPermission, usePermissions } from "../Map/hooks/usePermissions";
import DialogModal from "../Templates/DialogModal";
import { useItems } from "../Map/hooks/useItems";
import { HeaderView } from "../Map/Subcomponents/ItemPopupComponents/HeaderView";
import { Item } from "../../types";
import { TextInput } from "../Input";
import { getValue } from "../../Utils/GetValue";
import { useGetItemTags } from "../Map/hooks/useTags";

export function ActionButton({ item, triggerAddButton, triggerItemSelected, existingRelations, itemType, colorField, collection = "items" }: {
    triggerAddButton?: any,
    triggerItemSelected?: any,
    existingRelations: Item[],
    itemType?: string;
    colorField?: string,
    collection?: string,
    item: Item
}) {
    const hasUserPermission = useHasUserPermission();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const getItemTags = useGetItemTags();


    const items = useItems();

    const filterdItems = items.filter(i => !itemType || i.layer?.itemType.name == itemType).filter(i => !existingRelations.some(s => s.id == i.id)).filter(i => i.id != item.id)



    return (
        <>{hasUserPermission(collection, "update", item) &&
            <>
                <div className="tw-absolute tw-right-4 tw-bottom-4 tw-flex tw-flex-col" >
                    {triggerItemSelected && <button tabIndex={0} className="tw-z-500 tw-btn tw-btn-circle tw-shadow" onClick={() => { setModalOpen(true) }} style={{ backgroundColor: `${colorField && getValue(item,colorField)? getValue(item,colorField) : (getItemTags(item) && getItemTags(item)[0] && getItemTags(item)[0].color ? getItemTags(item)[0].color : item?.layer?.markerDefaultColor)}`, color: "#fff" }}>
                        <svg className="tw-h-5 tw-w-5" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"></path></svg>

                    </button>}
                    {triggerAddButton && <button tabIndex={0} className="tw-z-500 tw-btn tw-btn-circle tw-shadow tw-mt-2" onClick={() => { triggerAddButton() }} style={{ backgroundColor: `${colorField && getValue(item,colorField)? getValue(item,colorField) : (getItemTags(item) && getItemTags(item)[0] && getItemTags(item)[0].color ? getItemTags(item)[0].color : item?.layer?.markerDefaultColor)}`, color: "#fff" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="tw-w-5 tw-h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>}
                </div>
                <DialogModal title={"Select"} isOpened={modalOpen} onClose={() => (setModalOpen(false))} className="tw-w-xl sm:tw-w-2xl tw-min-h-80 tw-bg-base-200">
                <TextInput defaultValue='' placeholder='🔍 Search' containerStyle='lg:col-span-2 tw-m-4 ' updateFormValue={(val) => { setSearch(val) }}></TextInput>      
                       <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2'>
                        {filterdItems.filter(item => {
                            return search === ''
                                ? item :
                                item.name.toLowerCase().includes(search.toLowerCase());
                        }).map(i => <div key={i.id} className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-mx-4 tw-p-4 tw-mb-4 tw-h-fit' onClick={() => { triggerItemSelected(i.id); setModalOpen(false) }}>
                            <HeaderView item={i} hideMenu></HeaderView>
                        </div>)}
                    </div>
                </DialogModal>
            </>
        }
        </>

    )
}
