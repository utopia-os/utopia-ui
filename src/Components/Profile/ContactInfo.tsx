import { useAssetApi } from "../AppShell/hooks/useAssets";

const ContactInfo = ({ email, name, avatar } : {email: string, name: string, avatar: string}) => {
    const assetsApi = useAssetApi();

    
    return(
    <div className="tw-bg-gray-100 tw-my-10 tw-p-6">
        <h2 className="tw-text-lg tw-font-semibold">Du hast Fragen?</h2>
        <div className="tw-mt-4 tw-flex tw-items-center">
            <div className="tw-mr-5 tw-flex tw-items-center tw-justify-center">
                <div className="tw-avatar">
                    <div
                        className="tw-w-20 tw-h-20 tw-bg-gray-200 rounded-full tw-flex tw-items-center tw-justify-center overflow-hidden">
                        {avatar ? (
                            <img src={assetsApi.url + avatar} alt={name}
                                 className="tw-w-full tw-h-full tw-object-cover"/>
                        ) : (
                            <div className="tw-flex tw-items-center tw-justify-center tw-w-full tw-h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="tw-w-12 tw-h-12"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="tw-text-sm">
                <p className="tw-font-semibold">{name}</p>
                <a href={`mailto:${email}`} className="tw-mt-2 tw-text-green-500 tw-flex tw-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="tw-w-4 tw-h-4 tw-mr-1">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>

                    {email}
                </a>
            </div>
        </div>
    </div>
    )
}

export default ContactInfo;