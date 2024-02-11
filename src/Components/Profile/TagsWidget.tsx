import * as React from 'react'
import { useState } from 'react';
import { useTags } from '../Map/hooks/useTags';
import { Tag } from '../../types';
import { Autocomplete } from '../Input/Autocomplete';
import { randomColor } from '../../Utils/RandomColor';

export const TagsWidget = ({placeholder, containerStyle}) => {

  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState<Array<Tag>>([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const tags = useTags();
  const [pushFilteredSuggestions, setPushFilteredSuggestions] = useState<Array<any>>([]);

  const [focusInput, setFocusInput] = useState<boolean>(false);


  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if ((key === 'Enter' || key === ',' ) && trimmedInput.length && !localTags.some(tag => tag.name.toLocaleLowerCase() === trimmedInput.toLocaleLowerCase())) {
      e.preventDefault();
      const newTag = tags.find(t => t.name === trimmedInput.toLocaleLowerCase())
      newTag && setLocalTags(prevState => [...prevState, newTag]);
      !newTag && setLocalTags(prevState => [...prevState,  { id: crypto.randomUUID(), name: trimmedInput.toLocaleLowerCase(), color: randomColor() }]);
      setInput('');
      setPushFilteredSuggestions([]);
    }

    if (key === "Backspace" && !input.length && localTags.length && isKeyReleased) {
      const localTagsCopy = [...localTags];
      const poppedTag = localTagsCopy.pop();
      e.preventDefault();
      setLocalTags(localTagsCopy);
      poppedTag && setInput(poppedTag.name);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  }

  const deleteTag = (tag) => {
    setLocalTags(prevState => prevState.filter((t) => t !== tag))
  }


  const onSelected = (tag) => {
    if(!localTags.some(t => t.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase())) {
      const newTag = tags.find(t => t.name === tag.name.toLocaleLowerCase())
      newTag && setLocalTags(prevState => [...prevState, newTag]);
      !newTag && setLocalTags(prevState => [...prevState,  { id: crypto.randomUUID(), name: tag.name.toLocaleLowerCase(), color: randomColor() }]);
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
      {localTags.map((tag) => (
        <div key={tag.name} className='tw-rounded-2xl tw-text-white tw-p-2 tw-px-4 tw-shadow-xl tw-card tw-h-[2.75em] tw-mt-3 tw-mr-4' style={{ backgroundColor: tag.color ? tag.color : "#666" }}>
          <div className="tw-card-actions tw-justify-end">
            <label className="tw-btn tw-btn-xs tw-btn-circle tw-absolute tw--right-2 tw--top-2 tw-bg-white tw-text-gray-600" onClick={() => (deleteTag(tag))}>✕</label>
          </div><b>#{tag.name}</b>
        </div>

      ))}
      <Autocomplete suggestions={tags} pushFilteredSuggestions={pushFilteredSuggestions} setFocus={focusInput} inputProps={inputProps} onSelected={(tag) => onSelected(tag)}/>
      </div>
    </div>
  )
}