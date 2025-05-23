import { useEffect, useRef, useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'

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
  const ref = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState<string>(defaultValue)

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

  console.log('required not enforced', required)
  return (
    <div className={`tw:form-control tw:w-full ${containerStyle ?? ''}`}>
      {labelTitle ? (
        <label className='tw:label'>
          <span className={`tw:label-text tw:text-base-content ${labelStyle ?? ''}`}>
            {labelTitle}
          </span>
        </label>
      ) : null}
      <SimpleMDE
        ref={ref}
        id={dataField}
        value={inputValue}
        placeholder={placeholder ?? ''}
        onChange={handleChange}
        options={{ status: false }}
        /*
        options={
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
          lineNumbers?: boolean;
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
        }
        */
        className={`${inputStyle ?? ''}`}
      />
    </div>
  )
}
