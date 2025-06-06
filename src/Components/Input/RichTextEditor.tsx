import { Color } from '@tiptap/extension-color'
import { Image } from '@tiptap/extension-image'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Youtube } from '@tiptap/extension-youtube'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { Markdown } from 'tiptap-markdown'

import { TextEditorMenu } from './TextEditorMenu'

interface RichTextEditorProps {
  labelTitle?: string
  labelStyle?: string
  containerStyle?: string
  inputStyle?: string
  defaultValue: string
  placeholder?: string
  required?: boolean
  size?: string
  updateFormValue?: (value: string) => void
}

/**
 * @category Input
 */
export function RichTextEditor({
  labelTitle,
  labelStyle,
  containerStyle,
  defaultValue,
  placeholder,
  required = true,
  updateFormValue,
}: RichTextEditorProps) {
  console.log(placeholder, required)

  const handleChange = () => {
    const newValue: string | undefined = editor?.storage.markdown.getMarkdown()
    if (updateFormValue && newValue) {
      updateFormValue(newValue)
    }
  }

  const editor = useEditor({
    extensions: [
      Color.configure({ types: ['textStyle', 'listItem'] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Markdown,
      Image,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: defaultValue,
    onUpdate: handleChange,
    editorProps: {
      attributes: {
        class: `tw:h-full tw:max-h-full tw:p-2 tw:overflow-y-auto`,
      },
    },
  })

  useEffect(() => {
    if (editor?.storage.markdown.getMarkdown() === '' || !editor?.storage.markdown.getMarkdown()) {
      editor?.commands.setContent(defaultValue)
    }
  }, [defaultValue, editor])

  return (
    <div
      className={`tw:form-control tw:w-full tw:flex tw:flex-col tw:min-h-0 ${containerStyle ?? ''}`}
    >
      {labelTitle ? (
        <label className='tw:label tw:pb-1'>
          <span className={`tw:label-text tw:text-base-content ${labelStyle ?? ''}`}>
            {labelTitle}
          </span>
        </label>
      ) : null}
      <div
        className={`editor-wrapper tw:border-base-content/20 tw:rounded-box tw:border tw:flex tw:flex-col tw:flex-1 tw:min-h-0`}
      >
        {editor ? (
          <>
            <TextEditorMenu editor={editor} />
            <EditorContent editor={editor} />
          </>
        ) : null}
      </div>
    </div>
  )
}
