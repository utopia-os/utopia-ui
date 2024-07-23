import * as React from 'react'
import { useEffect, useState } from 'react';
import { useTags } from '../../Map/hooks/useTags';
import { Tag } from '../../../types';
import { Autocomplete } from '../../Input/Autocomplete';
import { randomColor } from '../../../Utils/RandomColor';
import { decodeTag, encodeTag } from '../../../Utils/FormatTags';

export const TagsWidget = ({placeholder, containerStyle, defaultTags, onUpdate}) => {

  const [input, setInput] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const tags = useTags();
  const [pushFilteredSuggestions, setPushFilteredSuggestions] = useState<Array<any>>([]);

  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [currentTags, setCurrentTags] = useState<Array<Tag>>(defaultTags);

  useEffect(() => {
    setCurrentTags(defaultTags)
  }, [defaultTags])
  


  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if ((key === 'Enter' || key === ',' ) && trimmedInput.length && !defaultTags.some(tag => tag.name.toLocaleLowerCase() === trimmedInput.toLocaleLowerCase())) {
      e.preventDefault();
      const newTag = tags.find(t => t.name === trimmedInput.toLocaleLowerCase())
      newTag && onUpdate([...currentTags, newTag]);
      !newTag && onUpdate([...currentTags,  { id: crypto.randomUUID(), name: encodeTag(trimmedInput), color: randomColor() }]);
      setInput('');
      setPushFilteredSuggestions([]);
    }

    if (key === "Backspace" && !input.length && defaultTags.length && isKeyReleased) {
      const defaultTagsCopy = [...defaultTags];
      const poppedTag = defaultTagsCopy.pop();
      e.preventDefault();
      onUpdate(defaultTagsCopy);
      poppedTag && setInput(poppedTag.name);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  }

  const deleteTag = (tag) => {
    onUpdate(currentTags.filter((t) => t !== tag))
  }


  const onSelected = (tag) => {
    if(!defaultTags.some(t => t.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase())) {
      const newTag = tags.find(t => t.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase())
      newTag && onUpdate([...currentTags, newTag]);
      !newTag && onUpdate([...currentTags,  { id: crypto.randomUUID(), name: tag.name.toLocaleLowerCase(), color: randomColor() }]);
      setInput('');
      setPushFilteredSuggestions([]);
    }
  }

  const inputProps = {
    value: input,
    placeholder: placeholder,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onChange: onChange,
    className: 'tw-bg-transparent tw-w-fit tw-mt-5 tw-h-fit'
  }

  return (
    <div onClick={()=> {
      setFocusInput(true);
      setTimeout(()=> {
        setFocusInput(false)
      }, 200)
    }} className={`tw-input tw-input-bordered tw-cursor-text ${containerStyle}`}>
      <div className='tw-flex tw-flex-wrap tw-h-fit'>
      {defaultTags.map((tag) => (
        <div key={tag.name} className='tw-rounded-2xl tw-text-white tw-p-2 tw-px-4 tw-shadow-xl tw-card tw-mt-3 tw-mr-4' style={{ backgroundColor: tag.color ? tag.color : "#666" }}>
          <div className="tw-card-actions tw-justify-end">
            <label className="tw-btn tw-btn-xs tw-btn-circle tw-absolute tw--right-2 tw--top-2 tw-bg-white tw-text-gray-600" onClick={() => (deleteTag(tag))}>✕</label>
          </div><b>{decodeTag(tag.name)}</b>
        </div>

      ))}
      <Autocomplete suggestions={tags} pushFilteredSuggestions={pushFilteredSuggestions} setFocus={focusInput} inputProps={inputProps} onSelected={(tag) => onSelected(tag)}/>
      </div>
    </div>
  )
}