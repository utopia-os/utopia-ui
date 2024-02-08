import * as React from "react";
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { useEffect } from "react";

export function TextEditor({ value, updateFormValue }: { value: string, updateFormValue: (string) => void }) {

  useEffect(() => {
    setHeightFromSourceToTarget("wmde-markdown-color","w-md-editor-text-input");
  }, [value])

  

  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={(val) => updateFormValue(val)}
        preview="edit"
        height="100%"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
    </div>
  );
}

// TypeScript
const setHeightFromSourceToTarget = (sourceClassName: string, targetClassName: string): void => {
  // Select the source element and get its height
  const sourceElement = document.querySelector(`.${sourceClassName}`) as HTMLElement;
  const height = sourceElement ? (sourceElement.clientHeight +10) + 'px' : '0'; // Convert to string to use in style

  // Select all target elements
  const targetElements = document.querySelectorAll(`.${targetClassName}`);

  // Set the height of all target elements to match the source element's height
  targetElements.forEach((element) => {
    (element as HTMLElement).style.height = height;
  });
}