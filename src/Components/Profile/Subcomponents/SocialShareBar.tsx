import SocialShareButton from './SocialShareButton';

const SocialShareBar = ({url, title, platforms = ['facebook', 'twitter', 'linkedin', 'xing', 'email']}) => {
    return (
        <div className="tw-flex tw-place-content-end tw-justify-end tw-space-x-2 tw-grow tw-min-w-fit tw-pl-2">
            {platforms.map((platform) => (
                <SocialShareButton
                    key={platform}
                    platform={platform}
                    url={url}
                    title={title}
                />
            ))}
        </div>
    );
};

export default SocialShareBar;