import * as React from 'react'
import { useEffect } from 'react';

export const Autocomplete = ({ inputProps, suggestions, onSelected, pushFilteredSuggestions, setFocus }: { inputProps: any, suggestions: Array<any>, onSelected: (suggestion) => void, pushFilteredSuggestions?: Array<any>, setFocus?: boolean }) => {

  const [filteredSuggestions, setFilteredSuggestions] = React.useState<Array<any>>([]);
  const [heighlightedSuggestion, setHeighlightedSuggestion] = React.useState<number>(0);


  useEffect(() => {
    pushFilteredSuggestions && setFilteredSuggestions(pushFilteredSuggestions)
  }, [pushFilteredSuggestions])

  useEffect(() => {
    setFocus && inputRef.current?.focus();
  }, [setFocus])

  const inputRef = React.useRef<HTMLInputElement>();


  const getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div key={suggestion.name} className='tw-rounded-2xl tw-text-white tw-p-2 tw-px-4 tw-shadow-xl tw-card tw-h-[2.75em] tw-mt-3 tw-mr-4 tw-cursor-pointer tw-w-fit' style={{ backgroundColor: suggestion.color ? suggestion.color : "#666" }}>
      <div className="tw-card-actions tw-justify-end">
      </div><b>#{suggestion.name}</b>
    </div>
  );

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestions.filter(tag =>
      tag.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const handleChange = (e) => {
    setFilteredSuggestions(getSuggestions(e.target.value))

    // Call the parent's onChange handler, if it exists
    if (inputProps.onChange) {
      inputProps.onChange(e);
    }
  };


  function handleSuggestionClick(suggestion) {
    onSelected(suggestion)
  }

  const handleKeyDown = (event) => {
    console.log(filteredSuggestions);
    
    switch (event.key) {
      case 'ArrowDown':
        heighlightedSuggestion < filteredSuggestions.length-1 && setHeighlightedSuggestion(current => current +1)
        break;
      case 'ArrowUp':
        heighlightedSuggestion>0 && setHeighlightedSuggestion(current => current -1)
        break;
      case 'Enter':
        if(filteredSuggestions.length > 0) {
          onSelected(filteredSuggestions[heighlightedSuggestion]);
          setHeighlightedSuggestion(0);
        }
        filteredSuggestions.length == 0 && inputProps.onKeyDown(event);
        break;
      default:
        inputProps.onKeyDown(event);
        break;
    }

  }

  return (
    <div>
      <input ref={inputRef} {...inputProps} type="text" onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown}/>
      <ul className='tw-absolute tw-z-[4000]'>
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{renderSuggestion(suggestion)}{index == heighlightedSuggestion && "+"}</li>
        ))}
      </ul>
    </div>
  )
}
