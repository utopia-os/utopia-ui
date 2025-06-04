import {
  MDXEditor,
  BlockTypeSelect,
  CreateLink,
  BoldItalicUnderlineToggles,
  InsertThematicBreak,
  ListsToggle,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor'
import { useEffect, useRef, useState } from 'react'

interface TextAreaProps {
  labelTitle?: string
  labelStyle?: string
  containerStyle?: string
  dataField?: string
  inputStyle?: string
  defaultValue: string
  placeholder?: string
  required?: boolean
  updateFormValue?: (value: string) => void
}

/**
 * @category Input
 */
export function TextAreaInput({
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
  const ref = useRef<HTMLTextAreaElement>(null)
  const [inputValue, setInputValue] = useState<string>(defaultValue)

  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (updateFormValue) {
      updateFormValue(newValue)
    }
  }

  const data = 'lorem ipsum'

  return (
    <div className={`tw:form-control tw:w-full ${containerStyle ?? ''}`}>
      {labelTitle ? (
        <label className='tw:label'>
          <span className={`tw:label-text tw:text-base-content ${labelStyle ?? ''}`}>
            {labelTitle}
          </span>
        </label>
      ) : null}
      <MDXEditor
        plugins={[
          headingsPlugin({ allowedHeadingLevels: [2, 3, 4] }),
          listsPlugin({}),
          // quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin({}),
          diffSourcePlugin({
            diffMarkdown: data,
            viewMode: 'rich-text',
          }),
          linkDialogPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <BlockTypeSelect />
                <ListsToggle />
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <InsertThematicBreak />
                <UndoRedo />
              </>
            ),
          }),
        ]}
        // ref={ref}
        markdown={data}
        contentEditableClassName='prose'
      />
      <textarea
        required={required}
        ref={ref}
        value={inputValue}
        name={dataField}
        className={`tw:textarea tw:textarea-bordered tw:w-full tw:leading-5 ${inputStyle ?? ''}`}
        placeholder={placeholder ?? ''}
        onChange={handleChange}
      ></textarea>
    </div>
  )
}
