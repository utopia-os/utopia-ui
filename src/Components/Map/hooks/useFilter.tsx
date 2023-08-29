import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import {Tag} from "../../../types";

type ActionType =
  | { type: "ADD"; tag: Tag }
  | { type: "REMOVE"; id: string }
  | { type: "RESET"};

type UseFilterManagerResult = ReturnType<typeof useFilterManager>;

const FilterContext = createContext<UseFilterManagerResult>({
  filterTags: [],
  addFilterTag: () => { },
  removeFilterTag: () => { },
  resetFilterTags: () => { },
});

function useFilterManager(initialTags: Tag[]): {
  filterTags: Tag[];
  addFilterTag: (tag: Tag) => void;
  removeFilterTag: (id: string) => void;
  resetFilterTags: () => void;
} {
  const [filterTags, dispatch] = useReducer((state: Tag[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        const exist = state.find((tag) =>
          tag.id === action.tag.id ? true : false
        );
        if (!exist) return [
          ...state,
          action.tag,
        ];
        else return state;
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      case "RESET": 
        return initialTags;
      default:
        throw new Error();
    }
  }, initialTags);



  const addFilterTag = (tag: Tag) => {
    dispatch({
      type: "ADD",
      tag,
    });

  };

  const removeFilterTag = useCallback((id: string) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);

  const resetFilterTags = useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, []);


  return { filterTags, addFilterTag, removeFilterTag, resetFilterTags };
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
