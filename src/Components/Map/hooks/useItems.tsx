import { useCallback, useReducer, createContext, useContext, useState } from "react";
import * as React from "react";
import { Item, LayerProps } from "../../../types";
import { toast } from "react-toastify";
import { useAddLayer } from "./useLayers";


type ActionType =
  | { type: "ADD"; item: Item }
  | { type: "UPDATE"; item: Item }
  | { type: "REMOVE"; item: Item }
  | { type: "RESET"; layer: LayerProps }
  ;


type UseItemManagerResult = ReturnType<typeof useItemsManager>;

const ItemContext = createContext<UseItemManagerResult>({
  items: [],
  addItem: () => { },
  updateItem: () => { },
  removeItem: () => { },
  resetItems: () => { },
  setItemsApi: () => { },
  setItemsData: () => { },
  allItemsLoaded: false
});

function useItemsManager(initialItems: Item[]): {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  resetItems: (layer: LayerProps) => void;
  setItemsApi: (layer: LayerProps) => void;
  setItemsData: (layer: LayerProps) => void;
  allItemsLoaded: boolean;

} {

  const addLayer = useAddLayer();

  const [allItemsLoaded, setallItemsLoaded] = useState<boolean>(false);



  const [items, dispatch] = useReducer((state: Item[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        const exist = state.find((item) =>
          item.id === action.item.id ? true : false
        );
        if (!exist) return [
          ...state,
          action.item,
        ];
        else return state;
      case "UPDATE":
        return state.map((item) => {
          if (item.id === action.item.id) {
            return action.item
          }
          return item
        });
      case "REMOVE":
        return state.filter(item => item !== action.item);
      case "RESET":
        return state.filter(item => item.layer?.name !== action.layer.name);
      default:
        throw new Error();
    }
  }, initialItems);


  const setItemsApi = useCallback(async (layer: LayerProps) => {
    addLayer(layer);
    const result = await toast.promise(
      layer.api!.getItems(),
      {
        pending: `loading ${layer.name} ...`,
        success: `${layer.name} loaded`,
        error: {
          render( {data} ) {        
            return `${data}`
          },
        },
      }
    );
    if (result) {      
      result.map(item => {       
        dispatch({ type: "ADD", item: { ...item, layer: layer } });       
      })
      setallItemsLoaded(true);
    }
  }, [])

  const setItemsData = useCallback((layer: LayerProps) => {
    addLayer(layer);
    layer.data?.map(item => {
      dispatch({ type: "ADD", item: { ...item, layer: layer } });
    })
    setallItemsLoaded(true);
  }, []);


  const addItem = useCallback(async (item: Item) => {   
    dispatch({
      type: "ADD",
      item,
    });
  }, []);

  const updateItem = useCallback(async (item: Item) => {
    dispatch({
      type: "UPDATE",
      item,
    });
  }, []);

  const removeItem = useCallback((item: Item) => {
    dispatch({
      type: "REMOVE",
      item,
    });
  }, []);

  const resetItems = useCallback((layer: LayerProps) => {
    dispatch({
      type: "RESET",
      layer
    });
  }, []);



  return { items, updateItem, addItem, removeItem, resetItems, setItemsApi, setItemsData, allItemsLoaded };
}

export const ItemsProvider: React.FunctionComponent<{
  initialItems: Item[], children?: React.ReactNode
}> = ({ initialItems, children }) => (
  <ItemContext.Provider value={useItemsManager(initialItems)}>
    {children}
  </ItemContext.Provider>
);

export const useItems = (): Item[] => {
  const { items } = useContext(ItemContext);
  return items;
};

export const useAddItem = (): UseItemManagerResult["addItem"] => {
  const { addItem } = useContext(ItemContext);
  return addItem;
};

export const useUpdateItem = (): UseItemManagerResult["updateItem"] => {
  const { updateItem } = useContext(ItemContext);
  return updateItem;
};

export const useRemoveItem = (): UseItemManagerResult["removeItem"] => {
  const { removeItem } = useContext(ItemContext);
  return removeItem;
};

export const useResetItems = (): UseItemManagerResult["resetItems"] => {
  const { resetItems } = useContext(ItemContext);
  return resetItems;
};

export const useSetItemsApi = (): UseItemManagerResult["setItemsApi"] => {
  const { setItemsApi } = useContext(ItemContext);
  return setItemsApi;
};

export const useSetItemsData = (): UseItemManagerResult["setItemsData"] => {
  const { setItemsData } = useContext(ItemContext);
  return setItemsData;
}; 

export const useAllItemsLoaded = (): UseItemManagerResult["allItemsLoaded"] => {
  const { allItemsLoaded } = useContext(ItemContext);
  return allItemsLoaded;
}