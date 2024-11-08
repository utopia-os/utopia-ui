import { toast } from 'react-toastify'
import SocialShareButton from './SocialShareButton'

const SocialShareBar = ({
  // eslint-disable-next-line react/prop-types
  url,
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  platforms = ['facebook', 'twitter', 'linkedin', 'xing', 'email'],
}) => {
  const copyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('link copied to clipboard')
      })
      .catch((error) => {
        toast.error('Fehler beim Kopieren des Links: ', error)
      })
  }
  return (
    <div className='tw-flex tw-place-content-end tw-justify-end tw-space-x-2 tw-grow tw-min-w-fit tw-pl-2'>
      {platforms.map((platform) => (
        <SocialShareButton key={platform} platform={platform} url={url} title={title} />
      ))}
      {platforms.includes('email') && (
        <a
          href={`mailto:?subject=${title}&body=${url}`}
          target='_blank'
          rel='noopener noreferrer'
          className='tw-w-8 tw-h-8 tw-mt-2 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-cursor-pointer'
          style={{
            color: 'white',
            backgroundColor: '#444',
          }}
          onClick={() => copyLink()}
          title='copy Link'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='white'
            className='tw-h-4 tw-w-4'
          >
            <path d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' />
          </svg>
        </a>
      )}
      {platforms.includes('clipboard') && (
        <div
          rel='noopener noreferrer'
          className='tw-w-8 tw-h-8 tw-mt-2 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-cursor-pointer'
          style={{
            color: 'white',
            backgroundColor: '#888',
          }}
          onClick={() => copyLink()}
          title='copy Link'
        >
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 256 256'
            height='1.5em'
            width='1.5em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M180,64H40A12,12,0,0,0,28,76V216a12,12,0,0,0,12,12H180a12,12,0,0,0,12-12V76A12,12,0,0,0,180,64ZM168,204H52V88H168ZM228,40V180a12,12,0,0,1-24,0V52H76a12,12,0,0,1,0-24H216A12,12,0,0,1,228,40Z'></path>
          </svg>
        </div>
      )}
    </div>
  )
}

export default SocialShareBar
