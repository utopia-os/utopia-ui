import Color from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Youtube from '@tiptap/extension-youtube'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { Markdown } from 'tiptap-markdown'

import { TextEditorMenu } from './TextEditorMenu'

import type { EditorEvents } from '@tiptap/react'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Markdown,
  Image,
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
]

interface TextAreaProps {
  labelTitle?: string
  labelStyle?: string
  containerStyle?: string
  dataField?: string
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
  dataField,
  labelStyle,
  containerStyle,
  inputStyle,
  defaultValue,
  placeholder,
  required = true,
  updateFormValue,
}: TextAreaProps) {
  // const ref = useRef<HTMLTextAreaElement>(null)
  const [inputValue, setInputValue] = useState<string>(defaultValue)

  /* useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue]) */

  console.log(
    labelTitle,
    dataField,
    labelStyle,
    containerStyle,
    inputStyle,
    defaultValue,
    placeholder,
    required,
    updateFormValue,
  )

  const handleChange = (props: EditorEvents['update']) => {
    const newValue = props.editor.storage.markdown.getMarkdown()
    setInputValue(newValue)
    if (updateFormValue) {
      updateFormValue(newValue)
    }
  }

  return (
    <div className={`tw:form-control tw:w-full ${containerStyle ?? ''}`}>
      {labelTitle ? (
        <label className='tw:label'>
          <span className={`tw:label-text tw:text-base-content ${labelStyle ?? ''}`}>
            {labelTitle}
          </span>
        </label>
      ) : null}
      <EditorProvider
        slotBefore={
          <>
            <br />
            <TextEditorMenu />
          </>
        }
        extensions={extensions}
        content={inputValue}
        onUpdate={handleChange}
        editorProps={{
          attributes: {
            class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
          },
        }}
      ></EditorProvider>
    </div>
  )
}
