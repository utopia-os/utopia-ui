import LinkIcon from '@heroicons/react/24/outline/LinkIcon'
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon'
import BoldIcon from '@heroicons/react/24/solid/BoldIcon'
import H1Icon from '@heroicons/react/24/solid/H1Icon'
import H2Icon from '@heroicons/react/24/solid/H2Icon'
import H3Icon from '@heroicons/react/24/solid/H3Icon'
import ItalicIcon from '@heroicons/react/24/solid/ItalicIcon'
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon'
import NumberedListIcon from '@heroicons/react/24/solid/NumberedListIcon'
import { useEditorState } from '@tiptap/react'
import { useCallback, useEffect, useState } from 'react'
import { MdUndo, MdRedo, MdHorizontalRule } from 'react-icons/md'

import type { Editor } from '@tiptap/react'

export const TextEditorMenu = ({ editor }: { editor: Editor }) => {
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
        isHeading: ctx.editor.isActive('heading'),
        isBulletList: ctx.editor.isActive('bulletList'),
        isOrderedList: ctx.editor.isActive('orderedList'),
        isCodeBlock: ctx.editor.isActive('codeBlock'),
        isBlockquote: ctx.editor.isActive('blockquote'),
        canUndo: ctx.editor.can().chain().focus().undo().run(),
        canRedo: ctx.editor.can().chain().focus().redo().run(),
      }
    },
  })

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const [url, setUrl] = useState<string>('')

  const setLink = (e: React.MouseEvent) => {
    e.preventDefault()

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <>
      <ul
        className={
          'tw:menu tw:overflow-x-hidden tw:sm:overflow-visible tw:md:overflow-x-hidden tw:lg:overflow-visible tw:p-1 tw:menu-horizontal tw:flex-nowrap tw:flex-none tw:bg-base-200 tw:rounded-box tw:w-full tw:rounded-b-none'
        }
      >
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 ${editorState.isHeading1 ? 'tw:bg-base-content/10' : ''}`}
            data-tip='Heading 1'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <H1Icon className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 ${editorState.isHeading2 ? 'tw:bg-base-content/10' : ''}`}
            data-tip='Heading 2'
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <H2Icon className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 ${editorState.isHeading3 ? 'tw:bg-base-content/10' : ''}`}
            data-tip='Heading 3'
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <H3Icon className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div className='tw:w-[1px] tw:p-0 tw:mx-1 tw:bg-base-content/10 tw:my-1' />
        </li>
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 ${editorState.isBold ? 'tw:bg-base-content/10' : ''}`}
            data-tip='Bold'
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 ${editorState.isItalic ? 'tw:bg-base-content/10' : ''}`}
            data-tip='Italic'
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <ItalicIcon className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div className='tw:w-[1px] tw:p-0 tw:mx-1 tw:bg-base-content/10 tw:my-1' />
        </li>
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 ${editorState.isBulletList ? 'tw:bg-base-content/10' : ''}`}
            data-tip='List'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <ListBulletIcon className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 ${editorState.isOrderedList ? 'tw:bg-base-content/10' : ''}`}
            data-tip='List'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <NumberedListIcon className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div className='tw:w-[1px] tw:p-0 tw:mx-1 tw:bg-base-content/10 tw:my-1' />
        </li>
        <li className='tw:hidden tw:sm:block tw:md:hidden tw:lg:block'>
          {!editor.isActive('link') ? (
            <div
              tabIndex={0}
              role='button'
              className='tw:dropdown tw:dropdown-end tw:px-1.5 tw:mx-0.5 tw:pt-1.5 tw:pb-0 tw:cursor-pointer '
            >
              <div
                className={`tw:tooltip tw:h-full ${editor.isActive('link') ? 'tw:bg-base-content/10' : ''}`}
                data-tip='Link'
              >
                <LinkIcon className='tw:h-full tw:w-5' />
              </div>
              <div
                tabIndex={0}
                className='tw:dropdown-content tw:bg-base-200 tw:card tw:card-body tw:card-sm tw:bg-base-100 z-1 w-64 shadow-md'
              >
                <div className='tw:join'>
                  <div>
                    <label className='tw:input tw:validator tw:join-item tw:w-58'>
                      <LinkIcon className='tw:h-full tw:w-4' />
                      <input
                        onChange={(e) => setUrl(e.target.value)}
                        type='url'
                        placeholder='https://...'
                      />
                    </label>
                    <div className='tw:validator-hint tw:hidden'>Enter valid url</div>
                  </div>
                  <button
                    className='tw:btn tw:btn-neutral tw:join-item'
                    onClick={(e) => setLink(e)}
                  >
                    Set Link
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`tw:tooltip tw:px-1.5 tw:mx-0.5 ${editor.isActive('link') ? 'tw:bg-base-content/10' : ''}`}
              data-tip='List'
              onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
            >
              <LinkIcon className='tw:w-5 tw:h-5' />
            </div>
          )}
        </li>

        <li>
          <div className='tw:tooltip tw:px-1.5 tw:mx-0.5' data-tip='Image' onClick={addImage}>
            <PhotoIcon className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div
            className='tw:tooltip tw:px-1'
            data-tip='Horizontal Line'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <MdHorizontalRule className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <div className='tw:flex-grow'></div>
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 tw:hidden tw:sm:block tw:md:hidden tw:lg:block ${editorState.canUndo ? '' : 'tw:opacity-50'}`}
            data-tip='Undo'
            onClick={() => editor.chain().focus().undo().run()}
          >
            <MdUndo className='tw:w-5 tw:h-5' />
          </div>
        </li>
        <li>
          <div
            className={`tw:tooltip tw:px-1.5 tw:mx-0.5 tw:hidden tw:sm:block tw:md:hidden tw:lg:block ${editorState.canRedo ? '' : 'tw:opacity-50'}`}
            data-tip='Redo'
            onClick={() => editor.chain().focus().redo().run()}
          >
            <MdRedo className='tw:w-5 tw:h-5' />
          </div>
        </li>
      </ul>
      {/**       <div className='control-group tiptap-toolbar'>
        <div className='button-group'>
          <button id='add' className='btn btn-sm' onClick={addYoutubeVideo}>
            Add YouTube video
          </button>
        </div>
      </div> */}
      {/**      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className='bubble-menu tw:card tw:card-body tw:rounded-box tw:border tw:border-base-content/20 tw:bg-base-200 tw:shadow'>
          <ul
            className={
              'tw:menu tw:p-1 tw:menu-horizontal tw:flex-nowrap tw:flex-none tw:bg-base-200 tw:rounded-box tw:w-full tw:rounded-b-none'
            }
          >
            <li>
              <div
                className={`tw:tooltip tw:px-1.5 tw:mx-0.5 tw:cursor-pointer ${editorState.isBold ? 'tw:bg-base-content/10' : ''}`}
                data-tip='Bold'
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <BoldIcon className='tw:w-4 tw:h-4' />
              </div>
            </li>
            <li>
              <div
                className={`tw:tooltip tw:px-1.5 tw:mx-1 tw:cursor-pointer ${editorState.isItalic ? 'tw:bg-base-content/10' : ''}`}
                data-tip='Italic'
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <ItalicIcon className='tw:w-4 tw:h-4' />
              </div>
            </li>
            <li>
              <div
                className={`tw:tooltip tw:px-1.5 tw:mx-1 tw:cursor-pointer ${editor.isActive('link') ? 'tw:bg-base-content/10' : ''}`}
                data-tip='Link'
                onClick={setLink}
              >
                <LinkIcon className='tw:w-4 tw:h-4' />
              </div>
            </li>
          </ul>
        </div>
      </BubbleMenu>  */}
    </>
  )
}
