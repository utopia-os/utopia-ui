import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import {Tag} from "../../../types";

type ActionType =
  | { type: "ADD_TAG"; tag: Tag }
  | { type: "REMOVE_TAG"; id: string }
  | { type: "RESET_TAGS"};

type UseFilterManagerResult = ReturnType<typeof useFilterManager>;

const FilterContext = createContext<UseFilterManagerResult>({
  filterTags: [],
  searchPhrase: "",
  addFilterTag: () => { },
  removeFilterTag: () => { },
  resetFilterTags: () => { },
  setSearchPhrase: () => { },
});

function useFilterManager(initialTags: Tag[]): {
  filterTags: Tag[];
  searchPhrase: string;
  addFilterTag: (tag: Tag) => void;
  removeFilterTag: (id: string) => void;
  resetFilterTags: () => void;
  setSearchPhrase: (phrase: string) => void;
} {
  const [filterTags, dispatchTags] = useReducer((state: Tag[], action: ActionType) => {
    switch (action.type) {
      case "ADD_TAG":
        const exist = state.find((tag) =>
          tag.id === action.tag.id ? true : false
        );
        if (!exist) return [
          ...state,
          action.tag,
        ];
        else return state;
      case "REMOVE_TAG":
        return state.filter(({ id }) => id !== action.id);
      case "RESET_TAGS": 
        return initialTags;
      default:
        throw new Error();
    }
  }, initialTags);

  const [searchPhrase, searchPhraseSet] = React.useState<string>("");

  const addFilterTag = (tag: Tag) => {
    dispatchTags({
      type: "ADD_TAG",
      tag,
    });

  };

  const removeFilterTag = useCallback((id: string) => {
    dispatchTags({
      type: "REMOVE_TAG",
      id,
    });
  }, []);

  const resetFilterTags = useCallback(() => {
    dispatchTags({
      type: "RESET_TAGS",
    });
  }, []);

  const setSearchPhrase = useCallback((phrase:string) => {
    searchPhraseSet(phrase)
  }, []);

  return { filterTags, addFilterTag, removeFilterTag, resetFilterTags, setSearchPhrase, searchPhrase };
}

export const FilterProvider: React.FunctionComponent<{
  initialTags: Tag[], children?: React.ReactNode
}> = ({ initialTags, children }) => (
  <FilterContext.Provider value={useFilterManager(initialTags)}>
    {children}
  </FilterContext.Provider>
);

export const useFilterTags = (): Tag[] => {
  const { filterTags } = useContext(FilterContext);
  return filterTags;
};

export const useAddFilterTag = (): UseFilterManagerResult["addFilterTag"] => {
  const { addFilterTag } = useContext(FilterContext);
  return addFilterTag;
};

export const useRemoveFilterTag = (): UseFilterManagerResult["removeFilterTag"] => {
  const { removeFilterTag } = useContext(FilterContext);
  return removeFilterTag;
};

export const useResetFilterTags = (): UseFilterManagerResult["resetFilterTags"] => {
  const { resetFilterTags } = useContext(FilterContext);
  return resetFilterTags;
};

export const useSearchPhrase = (): UseFilterManagerResult["searchPhrase"] => {
  const { searchPhrase } = useContext(FilterContext);
  return searchPhrase;
};

export const useSetSearchPhrase = (): UseFilterManagerResult["setSearchPhrase"] => {
  const { setSearchPhrase } = useContext(FilterContext);
  return setSearchPhrase;
};