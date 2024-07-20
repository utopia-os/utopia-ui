import * as react from 'react'
import { useState } from 'react'
import { TitleCard } from './TitleCard'
import { timeAgo } from '../../Utils/TimeAgo'
import { MapOverlayPage } from './MapOverlayPage'
import { useItems } from '../Map/hooks/useItems'
import { useAssetApi } from '../AppShell/hooks/useAssets'

export const AttestationForm = ({ userType }: { userType: string }) => {

    const items = useItems();
    const users = items.filter(i => i.layer?.itemType.name == userType)
    const assetsApi = useAssetApi();

    return (
        <MapOverlayPage className='tw-h-3/4 tw-w-80'>

            <div className='tw-text-center tw-text-xl tw-font-bold tw-mb-4'>Select User</div>


            {/* Team Member list in table format loaded constant */}
            <div className="tw-overflow-x-auto tw-w-full">
                <table className="tw-table tw-w-full">
                    <tbody>
                        {
                            users.map((l, k) => {
                                return (
                                    <tr key={k}>
                                        <td>
                                        <input type="checkbox" defaultChecked className="tw-checkbox" />
                                        </td>
                                        <td>
                                            <div className="tw-flex tw-items-center tw-space-x-3">
                                                {l.image ? <div className="tw-avatar">
                                                    <div className="tw-mask tw-mask-circle tw-w-8 tw-h-8">
                                                        <img src={assetsApi.url + l.image} alt="Avatar" />
                                                    </div>
                                                </div> :
                                                <div className='tw-mask tw-mask-circle tw-text-xl md:tw-text-2xl tw-bg-slate-200 tw-rounded-full tw-w-8 tw-h-8'></div>}
                                                <div>
                                                    <div className="tw-font-bold">{l.name}</div>
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
            <button className="tw-btn">Next</button>
        </MapOverlayPage>
    )
}

const TEAM_MEMBERS = [
    { name: "Alex", avatar: "https://reqres.in/img/faces/1-image.jpg", email: "alex@dashwind.com", role: "Owner", joinedOn: timeAgo(new Date()), lastActive: "5 hr ago" },
    { name: "Ereena", avatar: "https://reqres.in/img/faces/2-image.jpg", email: "ereena@dashwind.com", role: "Admin", joinedOn: timeAgo(new Date()), lastActive: "15 min ago" },
    { name: "John", avatar: "https://reqres.in/img/faces/3-image.jpg", email: "jhon@dashwind.com", role: "Admin", joinedOn: timeAgo(new Date()), lastActive: "20 hr ago" },
    { name: "Matrix", avatar: "https://reqres.in/img/faces/4-image.jpg", email: "matrix@dashwind.com", role: "Manager", joinedOn: timeAgo(new Date()), lastActive: "1 hr ago" },
    { name: "Virat", avatar: "https://reqres.in/img/faces/5-image.jpg", email: "virat@dashwind.com", role: "Support", joinedOn: timeAgo(new Date()), lastActive: "40 min ago" },
    { name: "Miya", avatar: "https://reqres.in/img/faces/6-image.jpg", email: "miya@dashwind.com", role: "Support", joinedOn: timeAgo(new Date()), lastActive: "5 hr ago" },

]
