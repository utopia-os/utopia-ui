import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import {Tag} from "../../../types";

type ActionType =
  | { type: "ADD"; tag: Tag }
  | { type: "REMOVE"; id: string };

type UseTagManagerResult = ReturnType<typeof useTagsManager>;

const TagContext = createContext<UseTagManagerResult>({
  filterTags: [],
  addFilterTag: () => { },
  removeFilterTag: () => { },

});

function useTagsManager(initialTags: Tag[]): {
  filterTags: Tag[];
  addFilterTag: (tag: Tag) => void;
  removeFilterTag: (id: string) => void;
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


  return { filterTags, addFilterTag, removeFilterTag };
}

export const TagsProvider: React.FunctionComponent<{
  initialTags: Tag[], children?: React.ReactNode
}> = ({ initialTags, children }) => (
  <TagContext.Provider value={useTagsManager(initialTags)}>
    {children}
  </TagContext.Provider>
);

export const useFilterTags = (): Tag[] => {
  const { filterTags } = useContext(TagContext);
  return filterTags;
};

export const useAddFilterTag = (): UseTagManagerResult["addFilterTag"] => {
  const { addFilterTag } = useContext(TagContext);
  return addFilterTag;
};

export const useRemoveFilterTag = (): UseTagManagerResult["removeFilterTag"] => {
  const { removeFilterTag } = useContext(TagContext);
  return removeFilterTag;
};
