/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { cloneElement } from 'react'

const platformConfigs = {
  facebook: {
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'>
        <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
      </svg>
    ),
    bgColor: '#3b5998',
  },
  twitter: {
    shareUrl: 'https://twitter.com/intent/tweet?text={title}:%20{url}',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'>
        <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
      </svg>
    ),
    bgColor: '#55acee',
  },
  linkedin: {
    shareUrl: 'http://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'>
        <path d='M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' />
        <circle cx='4' cy='4' r='2' />
      </svg>
    ),
    bgColor: '#4875b4',
  },
  xing: {
    shareUrl: 'https://www.xing-share.com/app/user?op=share;sc_p=xing-share;url={url}',
    icon: (
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'>
        <path d='M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.659-.962-.659H3.648v.016z' />
      </svg>
    ),
    bgColor: '#026466',
  },
  whatsapp: {
    shareUrl: 'https://api.whatsapp.com/send?text={title}%20{url}',
    icon: (
      <svg
        stroke='currentColor'
        fill='currentColor'
        strokeWidth='0'
        viewBox='0 0 512 512'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z'></path>
      </svg>
    ),
    bgColor: '#25D366',
  },
  telegram: {
    shareUrl: 'https://t.me/share/url?url={url}&text={title}',
    icon: (
      <svg
        stroke='white'
        fill='white'
        strokeWidth='0'
        viewBox='0 0 448 512'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z'></path>
      </svg>
    ),
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
      className='tw-w-8 tw-h-8 tw-mt-2 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white'
      style={{
        color: 'white',
        backgroundColor: bgColor,
      }}
      title={`share link on ${platform}`}
    >
      {cloneElement(icon, { className: 'tw-w-4 tw-h-4 tw-fill-current' })}
    </a>
  )
}

export default SocialShareButton
