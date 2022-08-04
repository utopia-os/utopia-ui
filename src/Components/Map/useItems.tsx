import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { Item } from "../../types";

type ActionType =
| { type: "ADD"; item: Item }
| { type: "REMOVE"; id: number };

type UseItemManagerResult = ReturnType<typeof useItemsManager>;

const ItemContext = createContext<UseItemManagerResult>({
    items: [],
    addItem: () => {},
    removeItem: () => {}
});

function useItemsManager (initialItems: Item[]): {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
} {
  const [items, dispatch] = useReducer((state: Item[], action: ActionType) => {
    switch (action.type) {
        case "ADD":
          return [
            ...state,
            action.item,
          ];
        case "REMOVE":
          return state.filter(({ id }) => id !== action.id);
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

  const removeItem = useCallback((id: number) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);
  return { items, addItem, removeItem };
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

export const useRemoveItem = (): UseItemManagerResult["removeItem"] => {
  const { removeItem } = useContext(ItemContext);
  return removeItem;
};