import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { Item, Layer } from "../../../types";

type ActionType =
  | { type: "ADD LAYER"; layer: Layer }
  | { type: "ADD ITEM"; item: Item; layer: Layer };

type UseItemManagerResult = ReturnType<typeof useLayerManager>;

const LayerContext = createContext<UseItemManagerResult>({
  layers: [],
  addLayer: () => { },
});

function useLayerManager(initialLayers: Layer[]): {
  layers: Layer[];
  addLayer: (layer: Layer) => void;
} {
  const [layers, dispatch] = useReducer((state: Layer[], action: ActionType) => {
    switch (action.type) {
      case "ADD LAYER":
        const exist = state.find((layer) =>
          layer.name === action.layer.name ? true : false
        );
        if (!exist) return [
          ...state,
          action.layer,
        ];
        else return state;
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

  return { layers, addLayer };
}

export const LayersProvider: React.FunctionComponent<{
  initialLayers: Layer[], children?: React.ReactNode
}> = ({ initialLayers, children }) => (
  <LayerContext.Provider value={useLayerManager(initialLayers)}>
    {children}
  </LayerContext.Provider>
);

export const useLayers = (): Layer[] => {
  const { layers } = useContext(LayerContext);
  return layers;
};

export const useAddLayer = (): UseItemManagerResult["addLayer"] => {
  const { addLayer } = useContext(LayerContext);
  return addLayer;
};
