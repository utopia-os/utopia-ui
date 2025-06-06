import BoldIcon from '@heroicons/react/24/solid/BoldIcon'
import CodeBracketIcon from '@heroicons/react/24/solid/CodeBracketIcon'
import H1Icon from '@heroicons/react/24/solid/H1Icon'
import H2Icon from '@heroicons/react/24/solid/H2Icon'
import H3Icon from '@heroicons/react/24/solid/H3Icon'
import ItalicIcon from '@heroicons/react/24/solid/ItalicIcon'
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon'
import NumberedListIcon from '@heroicons/react/24/solid/NumberedListIcon'
import { useCurrentEditor, useEditorState } from '@tiptap/react'
import { FaQuoteLeft } from 'react-icons/fa6'
import { MdUndo, MdRedo, MdHorizontalRule } from 'react-icons/md'

export const TextEditorMenu = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold'),
        canBold: ctx.editor.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor.isActive('italic'),
        canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor.isActive('strike'),
        canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor.isActive('code'),
        canCode: ctx.editor.can().chain().focus().toggleCode().run(),
        canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
        isParagraph: ctx.editor.isActive('paragraph'),
        isHeading1: ctx.editor.isActive('heading', { level: 1 }),
        isHeading2: ctx.editor.isActive('heading', { level: 2 }),
        isHeading3: ctx.editor.isActive('heading', { level: 3 }),
        isHeading4: ctx.editor.isActive('heading', { level: 4 }),
        isHeading5: ctx.editor.isActive('heading', { level: 5 }),
        isHeading6: ctx.editor.isActive('heading', { level: 6 }),
        isBulletList: ctx.editor.isActive('bulletList'),
        isOrderedList: ctx.editor.isActive('orderedList'),
        isCodeBlock: ctx.editor.isActive('codeBlock'),
        isBlockquote: ctx.editor.isActive('blockquote'),
        canUndo: ctx.editor.can().chain().focus().undo().run(),
        canRedo: ctx.editor.can().chain().focus().redo().run(),
      }
    },
  })

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
      <ul className='tw:menu tw:menu-horizontal tw:flex-none tw:bg-base-200 tw:rounded-box tw:w-full tw:rounded-b-none'>
        <li>
          <a
            className={`tw:tooltip ${editorState.canUndo ? '' : 'tw:opacity-50'}`}
            data-tip='Undo'
            onClick={() => editor.chain().focus().undo().run()}
          >
            <MdUndo className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.canRedo ? '' : 'tw:opacity-50'}`}
            data-tip='Redo'
            onClick={() => editor.chain().focus().redo().run()}
          >
            <MdRedo className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isBold ? 'tw:bg-base-100' : ''}`}
            data-tip='Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isItalic ? 'tw:bg-base-100' : ''}`}
            data-tip='Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isHeading1 ? 'tw:bg-base-100' : ''}`}
            data-tip='Heading 1'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <H1Icon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isHeading2 ? 'tw:bg-base-100' : ''}`}
            data-tip='Heading 2'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <H2Icon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isHeading3 ? 'tw:bg-base-100' : ''}`}
            data-tip='Heading 3'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <H3Icon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isBulletList ? 'tw:bg-base-100' : ''}`}
            data-tip='List'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListBulletIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isOrderedList ? 'tw:bg-base-100' : ''}`}
            data-tip='List'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <NumberedListIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isCodeBlock ? 'tw:bg-base-100' : ''}`}
            data-tip='Code'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <CodeBracketIcon className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className={`tw:tooltip ${editorState.isBlockquote ? 'tw:bg-base-100' : ''}`}
            data-tip='Quote'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <FaQuoteLeft className='tw:w-5 tw:h-5' />
          </a>
        </li>
        <li>
          <a
            className='tw:tooltip'
            data-tip='Horizontal Line'
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
