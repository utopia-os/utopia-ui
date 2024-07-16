import { Link } from "react-router-dom";
import { useAssetApi } from "../AppShell/hooks/useAssets";

const ContactInfo = ({ email, telephone, name, avatar, link }: { email: string, telephone: string, name: string, avatar: string, link?: string }) => {
    const assetsApi = useAssetApi();

    return (
        <div className="tw-bg-gray-100 tw-my-10 tw-p-6">
            <h2 className="tw-text-lg tw-font-semibold">Du hast Fragen?</h2>
            <div className="tw-mt-4 tw-flex tw-items-center">
                {avatar && (
                    <ConditionalLink url={link}>
                        <div className="tw-mr-5 tw-flex tw-items-center tw-justify-center">
                            <div className="tw-avatar">
                                <div className="tw-w-20 tw-h-20 tw-bg-gray-200 rounded-full tw-flex tw-items-center tw-justify-center overflow-hidden">
                                    <img src={assetsApi.url + avatar} alt={name}
                                        className="tw-w-full tw-h-full tw-object-cover" />
                                </div>
                            </div>
                        </div>
                    </ConditionalLink>
                )}
                <div className="tw-text-sm tw-flex-grow">
                    <p className="tw-font-semibold">{name}</p>
                    {email && (
                        <p>
                            <a href={`mailto:${email}`}
                                className="tw-mt-2 tw-text-green-500 tw-inline-flex tw-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="tw-w-4 tw-h-4 tw-mr-1">
                                    <path
                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                {email}
                            </a>
                        </p>
                    )}
                    {telephone && (
                        <p>
                            <a href={`tel:${telephone}`}
                                className="tw-mt-2 tw-text-green-500 tw-inline-flex tw-items-center tw-whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                    className="tw-w-4 tw-h-4 tw-mr-1">
                                    <path
                                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                </svg>
                                {telephone}
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactInfo;

const ConditionalLink = ({ url, children }) => {
    let params = new URLSearchParams(window.location.search);

    if (url) {
        return (
            <Link to={url+"?"+params}>
                {children}
            </Link>
        );
    }
    return children;
};