import { useState } from 'react'

export const MarkdownHint = () => {
  const [expended, setExpended] = useState<boolean>(false)
  return (
    <div
      onClick={() => setExpended(true)}
      title='Markdown is supported'
      className='flex tw-flex-row tw-text-gray-400 tw-cursor-pointer'
    >
      <svg
        aria-hidden='true'
        height='16'
        viewBox='0 0 16 16'
        version='1.1'
        width='16'
        data-view-component='true'
        className='octicon octicon-markdown'
        fill='rgb(156 163 175 / var(--tw-text-opacity))'
      >
        <path d='M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z'></path>
      </svg>
      {expended && (
        <a
          href='https://www.markdownguide.org/cheat-sheet/#basic-syntax'
          target='_blank'
          rel='noreferrer'
        >
          <span className='Button-label tw-ml-1'>Markdown is support</span>{' '}
        </a>
      )}
    </div>
  )
}
