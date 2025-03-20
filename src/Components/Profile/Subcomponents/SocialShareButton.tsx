/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { cloneElement } from 'react'

import FacebookSVG from '#assets/share/facebook.svg'
import LinkedinSVG from '#assets/share/linkedin.svg'
import TelegramSVG from '#assets/share/telegram.svg'
import TwitterSVG from '#assets/share/twitter.svg'
import WhatsappSVG from '#assets/share/whatsapp.svg'
import XingSVG from '#assets/share/xing.svg'

const platformConfigs = {
  facebook: {
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    icon: <img src={FacebookSVG} alt='Facebook' />,
    bgColor: '#3b5998',
  },
  twitter: {
    shareUrl: 'https://twitter.com/intent/tweet?text={title}:%20{url}',
    icon: <img src={TwitterSVG} alt='Twitter' />,
    bgColor: '#55acee',
  },
  linkedin: {
    shareUrl: 'http://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
    icon: <img src={LinkedinSVG} alt='Linkedin' />,
    bgColor: '#4875b4',
  },
  xing: {
    shareUrl: 'https://www.xing-share.com/app/user?op=share;sc_p=xing-share;url={url}',
    icon: <img src={XingSVG} alt='Xing' />,
    bgColor: '#026466',
  },
  whatsapp: {
    shareUrl: 'https://api.whatsapp.com/send?text={title}%20{url}',
    icon: <img src={WhatsappSVG} alt='Whatsapp' />,
    bgColor: '#25D366',
  },
  telegram: {
    shareUrl: 'https://t.me/share/url?url={url}&text={title}',
    icon: <img src={TelegramSVG} alt='Telegram' />,
    bgColor: '#0088cc',
  },
}

const SocialShareButton = ({
  platform,
  url,
  title,
}: {
  platform: string
  url: string
  title: string
}) => {
  // eslint-disable-next-line security/detect-object-injection
  const config = platformConfigs[platform]

  if (!config) {
    return null
  }

  const { shareUrl, icon, bgColor } = config
  const finalShareUrl = shareUrl
    .replace('{url}', encodeURIComponent(url))
    .replace('{title}', encodeURIComponent(title))

  return (
    <a
      href={finalShareUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='tw:w-8 tw:h-8 tw:mt-2 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:text-white'
      style={{
        color: 'white',
        backgroundColor: bgColor,
      }}
      title={`share link on ${platform}`}
    >
      {cloneElement(icon, { className: 'tw:w-4 tw:h-4 tw:fill-current' })}
    </a>
  )
}

export default SocialShareButton
