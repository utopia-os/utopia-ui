import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { Item, ItemsApi, Tag } from "../../../types";
import { hashTagRegex } from "../../../Utils/HashTagRegex";

type ActionType =
  | { type: "ADD"; tag: Tag }
  | { type: "REMOVE"; id: string };

type UseTagManagerResult = ReturnType<typeof useTagsManager>;

const TagContext = createContext<UseTagManagerResult>({
  tags: [],
  addTag: () => { },
  removeTag: () => { },
  setTagApi: () => { },
  setTagData: () => { },
  getItemTags: () => []
});

function useTagsManager(initialTags: Tag[]): {
  tags: Tag[];
  addTag: (tag: Tag) => void;
  removeTag: (id: string) => void;
  setTagApi: (api: ItemsApi<Tag>) => void;
  setTagData: (data: Tag[]) => void;
  getItemTags: (item: Item) => Tag[];
} {
  const [tags, dispatch] = useReducer((state: Tag[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        const exist = state.find((tag) =>
          tag.id === action.tag.id ? true : false
        );
        if (!exist) return [
          ...state,
          {...action.tag, id: action.tag.id}
        ];
        else return state;

      case "REMOVE":
        return state.filter(({ id }) => id !== action.id.toLocaleLowerCase());
      default:
        throw new Error();
    }
  }, initialTags);

  const [api, setApi] = React.useState<ItemsApi<Tag>>({} as ItemsApi<Tag>)

  const setTagApi = useCallback(async (api: ItemsApi<Tag>) => {
    setApi(api);
    const result = await api.getItems();
    if (result) {
      result.map(tag => {
        tag.id = tag.id.toLocaleLowerCase();
        dispatch({ type: "ADD", tag })
      })
    }
  }, [])

  const setTagData = useCallback((data: Tag[]) => {
    data.map(tag => {
      tag.id = tag.id.toLocaleLowerCase();
      dispatch({ type: "ADD", tag })
    })
  }, []);

  const addTag = (tag: Tag) => {
    dispatch({
      type: "ADD",
      tag,
    });

    if (!tags.some((t) => t.id === tag.id)) {
      api?.createItem && api.createItem(tag);
    }
  };

  const removeTag = useCallback((id: string) => {
    dispatch({
      type: "REMOVE",
      id,
    });
    api?.deleteItem && api.deleteItem(id);
  }, []);

  const getItemTags = useCallback((item: Item) => {  
      const itemTagStrings = item.text.toLocaleLowerCase().match(hashTagRegex);
      const itemTags: Tag[] = [];
      itemTagStrings?.map(tag => {
        if (tags.find(t => t.id === tag.slice(1))) {
          itemTags.push(tags.find(t => t.id === tag.slice(1))!)
        }
      })
      return itemTags 
  }, [tags]);


  return { tags, addTag, removeTag, setTagApi, setTagData, getItemTags };
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

export const useSetTagApi = (): UseTagManagerResult["setTagApi"] => {
  const { setTagApi } = useContext(TagContext);
  return setTagApi;
}

export const useSetTagData = (): UseTagManagerResult["setTagData"] => {
  const { setTagData } = useContext(TagContext);
  return setTagData;
}


export const useGetItemTags = (): UseTagManagerResult["getItemTags"] => {
  const { getItemTags } = useContext(TagContext);
  return getItemTags;
}