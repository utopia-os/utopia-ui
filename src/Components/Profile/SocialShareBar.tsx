import SocialShareButton from './SocialShareButton';

const SocialShareBar = ({url, title, platforms = ['facebook', 'twitter', 'linkedin', 'xing', 'email']}) => {
    return (
        <div className="tw-flex tw-items-center tw-justify-end tw-space-x-2">
            {platforms.map((platform) => (
                <SocialShareButton
                    platform={platform}
                    url={url}
                    title={title}
                />
            ))}
        </div>
    );
};

export default SocialShareBar;