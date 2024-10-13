import { useState } from 'react'
import { MapOverlayPage } from './MapOverlayPage'
import { useItems } from '../Map/hooks/useItems'
import { useAssetApi } from '../AppShell/hooks/useAssets'
import { Link } from 'react-router-dom'

export const SelectUser = ({ userType }: { userType: string }) => {

    const items = useItems();
    const users = items.filter(i => i.layer?.itemType.name == userType)
    const assetsApi = useAssetApi();

    const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);

    return (
        <MapOverlayPage backdrop className='tw-h-3/4 tw-w-80'>

            <div className='tw-text-center tw-text-xl tw-font-bold tw-mb-4'>Gratitude to ...</div>


            {/* Team Member list in table format loaded constant */}
            <div className="tw-overflow-x-auto tw-w-full fade">
                <table className="tw-table tw-w-full">
                    <tbody>
                        {
                            users.map((u, k) => {
                                return (
                                    <tr key={k}>
                                        <td>
                                        <input type="checkbox" onChange={() => setSelectedUsers(prev => [...prev, u.id])} className="tw-checkbox tw-checkbox-sm" />
                                        </td>
                                        <td>
                                            <div className="tw-flex tw-items-center tw-space-x-3">
                                                {u.image ? <div className="tw-avatar">
                                                    <div className="tw-mask tw-mask-circle tw-w-8 tw-h-8">
                                                        <img src={assetsApi.url + u.image+ "?width=40&heigth=40"} alt="Avatar" />
                                                    </div>
                                                </div> :
                                                <div className='tw-mask tw-mask-circle tw-text-xl md:tw-text-2xl tw-bg-slate-200 tw-rounded-full tw-w-8 tw-h-8'></div>}
                                                <div>
                                                    <div className="tw-font-bold">{u.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='tw-w-full tw-grid tw-mt-4'><Link className="tw-place-self-center " to={"/attestation-form"+"?to="+selectedUsers.map(u=> u,",")}><button className="tw-btn tw-px-8">Next</button></Link></div>
        </MapOverlayPage>
    )
}