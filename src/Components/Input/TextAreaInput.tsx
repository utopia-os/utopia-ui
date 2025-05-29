import { useEffect, useMemo, useRef, useState } from 'react'
import { SimpleMdeReact } from 'react-simplemde-editor'

import type SimpleMDE from 'easymde'
import type { InputHTMLAttributes } from 'react'

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
export function TextAreaInput({
  labelTitle,
  dataField,
  labelStyle,
  containerStyle,
  inputStyle,
  defaultValue,
  placeholder,
  required = true,
  size,
  updateFormValue,
}: TextAreaProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState<string>(defaultValue)
  const [showToolbar, setShowToolbar] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const [containerHeight, setContainerHeight] = useState<string>('0px')

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight
      setContainerHeight(`${height - 61}px`)
      console.log(height)
    }
  }, [containerStyle])

  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])

  const handleChange = (value: string) => {
    const newValue = value
    setInputValue(newValue)
    if (updateFormValue) {
      updateFormValue(newValue)
    }
  }

  const handleFocus = () => {
    setShowToolbar(true)
  }

  /*
  // Collides with fullscreen mode
  const handleBlur = () => {
    setShowToolbar(false)
  }
  */

  const options = useMemo(() => {
    return {
      status: false,
      lineNumbers: false,
      minHeight: size === 'small' ? '100%' : '100%',
      maxHeight: size === 'small' ? '50px' : containerHeight,
      forceSync: true,
      autoDownloadFontAwesome: false,
      nativeSpellcheck: false,
      spellChecker: false,
      /*
          autoDownloadFontAwesome?: boolean;
          autofocus?: boolean;
          autosave?: AutoSaveOptions;
          autoRefresh?: boolean | { delay: number; };
          blockStyles?: BlockStyleOptions;
          element?: HTMLElement;
          forceSync?: boolean;
          hideIcons?: ReadonlyArray<ToolbarButton>;
          indentWithTabs?: boolean;
          initialValue?: string;
          insertTexts?: InsertTextOptions;
          lineWrapping?: boolean;
          minHeight?: string;
          maxHeight?: string;
          parsingConfig?: ParsingOptions;
          placeholder?: string;
          previewClass?: string | ReadonlyArray<string>;
          previewImagesInEditor?: boolean;
          imagesPreviewHandler?: (src: string) => string,
          previewRender?: (markdownPlaintext: string, previewElement: HTMLElement) => string | null;
          promptURLs?: boolean;
          renderingConfig?: RenderingOptions;
          shortcuts?: Shortcuts;
          showIcons?: ReadonlyArray<ToolbarButton>;
          spellChecker?: boolean | ((options: SpellCheckerOptions) => void);
          inputStyle?: 'textarea' | 'contenteditable';
          nativeSpellcheck?: boolean;
          sideBySideFullscreen?: boolean;
          status?: boolean | ReadonlyArray<string | StatusBarItem>;
          styleSelectedText?: boolean;
          tabSize?: number;
          toolbar?: boolean | ReadonlyArray<'|' | ToolbarButton | ToolbarIcon | ToolbarDropdownIcon>;
          toolbarTips?: boolean;
          toolbarButtonClassPrefix?: string;
          onToggleFullScreen?: (goingIntoFullScreen: boolean) => void;
          theme?: string;
          scrollbarStyle?: string;
          unorderedListStyle?: '*' | '-' | '+';

          uploadImage?: boolean;
          imageMaxSize?: number;
          imageAccept?: string;
          imageUploadFunction?: (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => void;
          imageUploadEndpoint?: string;
          imagePathAbsolute?: boolean;
          imageCSRFToken?: string;
          imageCSRFName?: string;
          imageCSRFHeader?: boolean;
          imageTexts?: ImageTextsOptions;
          imageInputName?: string
          errorMessages?: ImageErrorTextsOptions;
          errorCallback?: (errorMessage: string) => void;

          promptTexts?: PromptTexts;
          syncSideBySidePreviewScroll?: boolean;

          overlayMode?: OverlayModeOptions;

          direction?: 'ltr' | 'rtl';
          */
    } as SimpleMDE.Options
  }, [containerHeight, size])

  return (
    <div ref={containerRef} className={`tw:form-control ${containerStyle ?? ''}`}>
      {labelTitle ? (
        <label className='tw:label'>
          <span className={`tw:label-text tw:text-base-content ${labelStyle ?? ''}`}>
            {labelTitle}
            {required && !inputValue ? ' (this field is required)' : null}
          </span>
        </label>
      ) : null}
      <SimpleMdeReact
        textareaProps={
          {
            required,
          } as InputHTMLAttributes<HTMLTextAreaElement>
        }
        ref={ref}
        id={dataField}
        value={inputValue}
        placeholder={placeholder ?? ''}
        onChange={handleChange}
        onFocus={handleFocus}
        // onBlur={handleBlur}
        options={options}
        className={`${inputStyle ?? ''} ${showToolbar ? '' : 'hide-toolbar'}`}
      />
    </div>
  )
}
