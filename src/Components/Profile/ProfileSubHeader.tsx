import SocialShareBar from './SocialShareBar';


const flags = {
    de: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="tw-w-5 tw-h-3">
            <rect width="5" height="3" fill="#FFCE00"/>
            <rect width="5" height="2" fill="#DD0000"/>
            <rect width="5" height="1" fill="#000000"/>
        </svg>
    ),
    at: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="tw-w-5 tw-h-3">
            <rect width="5" height="3" fill="#ED2939"/>
            <rect width="5" height="2" fill="#FFFFFF"/>
            <rect width="5" height="1" fill="#ED2939"/>
        </svg>
    )
};

const SubHeader = ({ location, type, url, title }) => (
    <div>
        <div className="tw-flex tw-items-center tw-mt-6">
            <span className="tw-text-sm tw-text-gray-600">{type}</span>
            <span className="tw-text-sm tw-text-gray-600 tw-ml-6">{location}</span>
        </div>
        <div className="tw-mt-4">
            <SocialShareBar url={url} title={title} />
        </div>
    </div>
);

export default SubHeader;