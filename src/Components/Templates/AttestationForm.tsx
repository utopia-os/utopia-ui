
import { MapOverlayPage } from './MapOverlayPage'
import { useItems } from '../Map/hooks/useItems'
import { useAssetApi } from '../AppShell/hooks/useAssets'
import { EmojiPicker } from './EmojiPicker';
import { Link } from 'react-router-dom';
import { ColorPicker } from '../Profile/Subcomponents/ColorPicker';
import { useRef, useState } from 'react';
import { Item, UserItem } from '../../types';
import { useEffect } from 'react';

export const AttestationForm = () => {

    const items = useItems();
    const assetsApi = useAssetApi();
    const [users, setUsers] = useState<Array<Item>>();

    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let to_user_ids = params.get("to");
        setUsers(items.filter(i => to_user_ids?.includes(i.id)))
    }, [items, location])

    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = 'auto';
            inputRef.current.style.width = `${inputRef.current.scrollWidth+20}px`;
        }
    }, [inputValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };




    return (
        <MapOverlayPage backdrop className='tw-h-fit tw-min-h-56 tw-w-96'>
            <div className='tw-text-center tw-text-xl tw-font-bold'>Gratitude</div>
            <div className='tw-text-center tw-text-base tw-text-gray-400'>to</div>
            <div className='tw-flex tw-flex-row tw-justify-center tw-items-center tw-flex-wrap'>
                {users && users.map((u, k) => (
                    <div key={k} className="tw-flex tw-items-center tw-space-x-3 tw-mx-2 tw-my-1">
                        {u.image ? <div className="tw-avatar">
                            <div className="tw-mask tw-mask-circle tw-w-8 tw-h-8">
                                <img src={assetsApi.url + u.image + "?width=40&heigth=40"} alt="Avatar" />
                            </div>
                        </div> :
                            <div className='tw-mask tw-mask-circle tw-text-xl md:tw-text-2xl tw-bg-slate-200 tw-rounded-full tw-w-8 tw-h-8'></div>}
                        <div>
                            <div className="tw-font-bold">{u.name}</div>
                        </div>
                    </div>
                ), ", ")}
            </div>

            <div className='tw-w-full'>
                <div className='tw-flex tw-justify-center tw-items-center'>
                    <div className=' tw-flex tw-justify-center tw-items-center tw-w-28 tw-h-28 tw-m-4'>
                        <EmojiPicker />
                    </div>
                </div>
                <div className='tw-flex tw-justify-center tw-items-center'>
                    <input ref={inputRef}
                        value={inputValue}
                        onChange={handleChange}
                        type="text"
                        placeholder="... and say some words"
                        className="tw-input tw-min-w-0 tw-w-fit tw-resize-none tw-overflow-hidden tw-text-center " />
                </div>
            </div>
            <div className='tw-w-full tw-grid tw-mt-4'><Link className="tw-place-self-center" to="/item/b42a1404-fe08-4d84-8404-47ce623c3cf2?tab=2"><button className="tw-btn  tw-px-8">Next</button></Link></div>
        </MapOverlayPage>
    )
}