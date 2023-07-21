import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { Tag } from "../../../types";

type ActionType =
  | { type: "ADD"; tag: Tag }
  | { type: "REMOVE"; id: string };

type UseTagManagerResult = ReturnType<typeof useTagsManager>;

const TagContext = createContext<UseTagManagerResult>({
  tags: [],
  addTag: () => { },
  removeTag: () => { }
});

function useTagsManager(initialTags: Tag[]): {
  tags: Tag[];
  addTag: (tag: Tag) => void;
  removeTag: (id: string) => void;
} {
  const [tags, dispatch] = useReducer((state: Tag[], action: ActionType) => {
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

  const addTag = useCallback((tag: Tag) => {
    dispatch({
      type: "ADD",
      tag,
    });
  }, []);

  const removeTag = useCallback((id: string) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);
  return { tags, addTag, removeTag };
}

export const TagsProvider: React.FunctionComponent<{
  initialTags: Tag[], children?: React.ReactNode
}> = ({ initialTags, children }) => (
  <TagContext.Provider value={useTagsManager(initialTags)}>
    {children}
  </TagContext.Provider>
);

export const useTags = (): Tag[] => {
  const { tags } = useContext(TagContext);
  return tags;
};

export const useAddTag = (): UseTagManagerResult["addTag"] => {
  const { addTag } = useContext(TagContext);
  return addTag;
};

export const useRemoveTag = (): UseTagManagerResult["removeTag"] => {
  const { removeTag } = useContext(TagContext);
  return removeTag;
};