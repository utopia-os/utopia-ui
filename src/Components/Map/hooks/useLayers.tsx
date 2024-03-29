import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { LayerProps } from "../../../types";

type ActionType =
  | { type: "ADD LAYER"; layer: LayerProps }

type UseItemManagerResult = ReturnType<typeof useLayerManager>;

const LayerContext = createContext<UseItemManagerResult>({
  layers: [],
  addLayer: () => { },
});

function useLayerManager(initialLayers: LayerProps[]): {
  layers: LayerProps[];
  addLayer: (layer: LayerProps) => void;
} {
  const [layers, dispatch] = useReducer((state: LayerProps[], action: ActionType) => {
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

  const addLayer = useCallback((layer: LayerProps) => {
    dispatch({
      type: "ADD LAYER",
      layer
    });
  }, []);

  return { layers, addLayer };
}

export const LayersProvider: React.FunctionComponent<{
  initialLayers: LayerProps[], children?: React.ReactNode
}> = ({ initialLayers, children }) => (
  <LayerContext.Provider value={useLayerManager(initialLayers)}>
    {children}
  </LayerContext.Provider>
);

export const useLayers = (): LayerProps[] => {
  const { layers } = useContext(LayerContext);
  return layers;
};

export const useAddLayer = (): UseItemManagerResult["addLayer"] => {
  const { addLayer } = useContext(LayerContext);
  return addLayer;
};
