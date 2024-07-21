import SocialShareBar from './SocialShareBar';


const flags = {
    de: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="tw-w-5 tw-h-3">
            <rect width="5" height="3" fill="#FFCE00" />
            <rect width="5" height="2" fill="#DD0000" />
            <rect width="5" height="1" fill="#000000" />
        </svg>
    ),
    at: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="tw-w-5 tw-h-3">
            <rect width="5" height="3" fill="#ED2939" />
            <rect width="5" height="2" fill="#FFFFFF" />
            <rect width="5" height="1" fill="#ED2939" />
        </svg>
    )
};

const statusMapping = {
    'in_planning': 'in Planung',
    'paused': 'pausiert',
    'active': 'aktiv'
};

const SubHeader = ({ type, status, url, title }) => (
    <div>
        <div className='tw-float-left tw-mt-2 tw-mb-4 tw-flex tw-items-center'>

            {status && <div className="tw-mt-1.5">
                <span className="tw-text-sm tw-text-current tw-bg-base-300 tw-rounded tw-py-0.5 tw-px-2 tw-inline-flex tw-items-center tw-mr-2"><span className={`tw-w-2 tw-h-2  ${ status=="in_planning" && "tw-bg-blue-700"} ${ status=="paused" && "tw-bg-orange-400"} ${ status=="active" && "tw-bg-green-500"} tw-rounded-full tw-mr-1.5`}></span>{statusMapping[status]}</span>
            </div>}
            {type && <div className="tw-mt-1.5">
                <span className="tw-text-sm tw-text-current tw-bg-base-300 tw-rounded tw-py-1 tw-px-2">{type}</span>
            </div>}
        </div>
        <div>
            <SocialShareBar url={url} title={title} />
        </div>
    </div>
);

export default SubHeader;