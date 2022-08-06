import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { Item, Layer } from "../../../types";

type ActionType =
  | { type: "ADD LAYER"; layer: Layer }
  | { type: "ADD ITEM"; item: Item; layer: Layer }
  | { type: "REMOVE ITEM"; id: number; layer: Layer };

type UseItemManagerResult = ReturnType<typeof useLayerManager>;

const LayerContext = createContext<UseItemManagerResult>({
  layers: new Map([]),
  addLayer: () => { },
  addItem: () => { },
  removeItem: () => { }
});

function useLayerManager(initialLayers: Map<string, Layer>): {
  layers: Map<string, Layer>;
  addLayer: (layer: Layer) => void;
  addItem: (item: Item, layer: Layer) => void;
  removeItem: (id: number, layer: Layer) => void;
} {
  const [layers, dispatch] = useReducer((state: Map<string, Layer>, action: ActionType) => {
    switch (action.type) {
      case "ADD LAYER":
        {
          return state.set(action.layer.name, action.layer);
        }
      case "ADD ITEM":
        {
          if(!state.get(action.layer.name)?.data?.includes(action.item))
          state.get(action.layer.name)?.data?.push(action.item);
        }
      case "REMOVE ITEM":
        { return state; }
      default:
        throw new Error();
    }
  }, initialLayers);

  const addLayer = useCallback((layer: Layer) => {
    dispatch({
      type: "ADD LAYER",
      layer
    });
  }, []);

  const addItem = useCallback((item: Item, layer: Layer) => {
    dispatch({
      type: "ADD ITEM",
      item,
      layer
    });
  }, []);

  const removeItem = useCallback((id: number, layer: Layer) => {
    dispatch({
      type: "REMOVE ITEM",
      id,
      layer
    });
  }, []);
  return { layers, addLayer, addItem, removeItem };
}

export const LayersProvider: React.FunctionComponent<{
  initialLayers: Map<string, Layer>, children?: React.ReactNode
}> = ({ initialLayers, children }) => (
  <LayerContext.Provider value={useLayerManager(initialLayers)}>
    {children}
  </LayerContext.Provider>
);

export const useLayers = (): Map<string, Layer> => {
  const { layers } = useContext(LayerContext);
  return layers;
};

export const useAddLayer = (): UseItemManagerResult["addLayer"] => {
  const { addLayer } = useContext(LayerContext);
  return addLayer;
};

export const useAddItem = (): UseItemManagerResult["addItem"] => {
  const { addItem } = useContext(LayerContext);
  return addItem;
};

export const useRemoveItem = (): UseItemManagerResult["removeItem"] => {
  const { removeItem } = useContext(LayerContext);
  return removeItem;
};
