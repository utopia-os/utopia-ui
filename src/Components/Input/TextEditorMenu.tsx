import BoldIcon from '@heroicons/react/24/solid/BoldIcon'
import CodeBracketIcon from '@heroicons/react/24/solid/CodeBracketIcon'
import H1Icon from '@heroicons/react/24/solid/H1Icon'
import H2Icon from '@heroicons/react/24/solid/H2Icon'
import H3Icon from '@heroicons/react/24/solid/H3Icon'
import ItalicIcon from '@heroicons/react/24/solid/ItalicIcon'
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon'
import NumberedListIcon from '@heroicons/react/24/solid/NumberedListIcon'
import { useCurrentEditor } from '@tiptap/react'
import { FaQuoteLeft } from 'react-icons/fa6'
import { MdUndo, MdRedo, MdHorizontalRule } from 'react-icons/md'

export const TextEditorMenu = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320) || 640,
        height: Math.max(180) || 480,
      })
    }
  }

  return (
    <>
      <ul className='tw:menu tw:menu-horizontal tw:bg-base-200 tw:rounded-box tw:mt-6'>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <H1Icon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <H2Icon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <H3Icon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListBulletIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <NumberedListIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <CodeBracketIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <FaQuoteLeft className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().redo().run()}
          >
            <MdRedo className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().undo().run()}
          >
            <MdUndo className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Details'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <MdHorizontalRule className='tw:w-5 tw:h-5' />
          </a>
        </li>
      </ul>
      {/**       <div className='control-group tiptap-toolbar'>
        <div className='button-group'>
          <button id='add' className='btn btn-sm' onClick={addYoutubeVideo}>
            Add YouTube video
          </button>
        </div>
      </div> */}
    </>
  )
}
