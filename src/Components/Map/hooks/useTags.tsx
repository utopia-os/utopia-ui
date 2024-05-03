import { useCallback, useReducer, createContext, useContext, useState } from "react";
import * as React from "react";
import { Item, ItemsApi, Tag } from "../../../types";
import { hashTagRegex } from "../../../Utils/HashTagRegex";
import { getValue } from "../../../Utils/GetValue";

type ActionType =
  | { type: "ADD"; tag: Tag }
  | { type: "REMOVE"; id: string };

type UseTagManagerResult = ReturnType<typeof useTagsManager>;

const TagContext = createContext<UseTagManagerResult>({
  tags: [],
  addTag: () => { },
  setTagApi: () => { },
  setTagData: () => { },
  getItemTags: () => [],
  allTagsLoaded: false
});

function useTagsManager(initialTags: Tag[]): {
  tags: Tag[];
  addTag: (tag: Tag) => void;
  setTagApi: (api: ItemsApi<Tag>) => void;
  setTagData: (data: Tag[]) => void;
  getItemTags: (item: Item) => Tag[];
  allTagsLoaded: boolean
} {

  const [allTagsLoaded, setallTagsLoaded] = useState<boolean>(false);
  const [tagCount, setTagCount] = useState<number>(0);

  const [tags, dispatch] = useReducer((state: Tag[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        const exist = state.find((tag) =>
          tag.name.toLocaleLowerCase() === action.tag.name.toLocaleLowerCase() ? true : false
        );
        if (!exist) {
          const newState = [
            ...state,
            { ...action.tag}
          ];
          if(tagCount == newState.length) setallTagsLoaded(true);
          return newState;
        } 
        else return state;
      default:
        throw new Error();
    }
  }, initialTags);

  const [api, setApi] = React.useState<ItemsApi<Tag>>({} as ItemsApi<Tag>)


  const setTagApi = useCallback(async (api: ItemsApi<Tag>) => {
    setApi(api);
    const result = await api.getItems();
    setTagCount(result.length);
    if(tagCount == 0) setallTagsLoaded(true);
    if (result) {
      result.map(tag => {
        //tag.name = tag.name.toLocaleLowerCase();
        dispatch({ type: "ADD", tag });
      })
    }

    
  }, [])

  const setTagData = useCallback((data: Tag[]) => {
    data.map(tag => {
      //tag.name = tag.name.toLocaleLowerCase();
      dispatch({ type: "ADD", tag })
    })
  }, []);

  const addTag = (tag: Tag) => {  
      dispatch({
        type: "ADD",
        tag,
      });
      if (!tags.some((t) => t.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase())) {
        api?.createItem && api.createItem(tag);
      }
    
  };


  const getItemTags = useCallback((item: Item) => {
    const text = item?.layer?.itemTextField && item ? getValue(item, item.layer?.itemTextField) : undefined;
    const itemTagStrings = text?.match(hashTagRegex);
    const itemTags: Tag[] = [];
    itemTagStrings?.map(tag => {
      if (tags.find(t => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
        itemTags.push(tags.find(t => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())!)
      }
    })   
    item.layer?.itemOffersField && getValue(item, item.layer.itemOffersField) && getValue(item, item.layer.itemOffersField).map(o => {
      const offer = tags.find(t=> t.id === o.tags_id)
      offer && itemTags.push(offer)
    });
    item.layer?.itemNeedsField && getValue(item, item.layer.itemNeedsField) && getValue(item, item.layer.itemNeedsField).map(n => {
      const need = tags.find(t=>t.id === n.tags_id);
      need && itemTags.push(need);
    });

    return itemTags
  }, [tags]);


  return { tags, addTag, setTagApi, setTagData, getItemTags, allTagsLoaded };
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

export const useAllTagsLoaded = (): UseTagManagerResult["allTagsLoaded"] => {
  const { allTagsLoaded } = useContext(TagContext);
  return allTagsLoaded;
}