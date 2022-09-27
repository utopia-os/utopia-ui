import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { Item } from "../../../types";

type ActionType =
| { type: "ADD"; item: Item }
| { type: "UPDATE"; item: Item }
| { type: "REMOVE"; item: Item };

type UseItemManagerResult = ReturnType<typeof useItemsManager>;

const ItemContext = createContext<UseItemManagerResult>({
    items: [],
    addItem: () => {},
    updateItem: () => {},
    removeItem: () => {}
});

function useItemsManager (initialItems: Item[]): {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  removeItem: (item: Item) => void;
} {
  const [items, dispatch] = useReducer((state: Item[], action: ActionType) => {
    switch (action.type) {
        case "ADD":           
          return [
            ...state,
            action.item,
          ];
        case "UPDATE": 
            return state.map((item) => {
              if (item.id === action.item.id) {
                return action.item
              }
              return item
            });            
        case "REMOVE":
          return state.filter(item => item !== action.item);
        default:
          throw new Error();
      }
  }, initialItems);

  const addItem = useCallback((item: Item) => {
    dispatch({
      type: "ADD",
      item,
    });
  }, []);

  const updateItem = useCallback((item: Item) => {
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
  return { items, updateItem, addItem, removeItem };
}

export const ItemsProvider: React.FunctionComponent<{
  initialItems: Item[],  children?: React.ReactNode 
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