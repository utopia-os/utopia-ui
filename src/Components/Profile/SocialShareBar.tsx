import SocialShareButton from './SocialShareButton';

const SocialShareBar = ({ url, title, platforms = ['facebook', 'twitter', 'linkedin', 'xing', 'email'] }) => {
    return (
        <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2">
            <span className="tw-text-sm tw-font-medium tw-text-gray-700">Teilen:</span>
            <div className="tw-flex tw-space-x-2">
                {platforms.map((platform) => (
                    <SocialShareButton
                        platform={platform}
                        url={url}
                        title={title}
                    />
                ))}
            </div>
        </div>
    );
};

export default SocialShareBar;