import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { LayerProps, Tag } from "../../../types";
import { useLayers } from "./useLayers";

type ActionType =
  | { type: "ADD_TAG"; tag: Tag }
  | { type: "REMOVE_TAG"; id: string }
  | { type: "RESET_TAGS" }
  | { type: "TOGGLE_LAYER"; layer: LayerProps }
  | { type: "ADD_LAYER"; layer: LayerProps }
  | { type: "RESET_LAYERS" }
  ;

type UseFilterManagerResult = ReturnType<typeof useFilterManager>;

const FilterContext = createContext<UseFilterManagerResult>({
  filterTags: [],
  searchPhrase: "",
  visibleLayers: [],
  addFilterTag: () => { },
  removeFilterTag: () => { },
  resetFilterTags: () => { },
  setSearchPhrase: () => { },
  addVisibleLayer: () => { },
  toggleVisibleLayer: () => { },
  resetVisibleLayers: () => { },
  isLayerVisible: () => true
});

function useFilterManager(initialTags: Tag[]): {
  filterTags: Tag[];
  searchPhrase: string;
  visibleLayers: LayerProps[];
  addFilterTag: (tag: Tag) => void;
  removeFilterTag: (id: string) => void;
  resetFilterTags: () => void;
  setSearchPhrase: (phrase: string) => void;
  addVisibleLayer: (layer: LayerProps) => void;
  toggleVisibleLayer: (layer: LayerProps) => void;
  resetVisibleLayers: () => void;
  isLayerVisible: (layer: LayerProps) => boolean;
} {
  const [filterTags, dispatchTags] = useReducer((state: Tag[], action: ActionType) => {
    switch (action.type) {
      case "ADD_TAG":
        const exist = state.find((tag) =>
          tag.id === action.tag.id ? true : false
        );
        if (!exist) return [
          ...state,
          action.tag,
        ];
        else return state;
      case "REMOVE_TAG":
        return state.filter(({ id }) => id !== action.id);
      case "RESET_TAGS":
        return initialTags;
      default:
        throw new Error();
    }
  }, initialTags);

  const initialLayers = useLayers()

  const [visibleLayers, dispatchLayers] = useReducer((state: LayerProps[], action: ActionType) => {
    switch (action.type) {
      case "ADD_LAYER":
        const exist1 = state.find((layer) =>
          layer.name === action.layer.name ? true : false
        );
        if (!exist1) return [
          ...state,
          action.layer,
        ];
        else return state;
      case "TOGGLE_LAYER":
        const exist2 = state.some((layer) =>
          layer.name === action.layer.name);
          if(exist2) return state.filter(({name}) => name != action.layer.name);
          else return [... state, action.layer];
      case "RESET_LAYERS":
        return initialLayers;
      default:
        throw new Error();
    }
  }, initialLayers);

  const [searchPhrase, searchPhraseSet] = React.useState<string>("");

  const addFilterTag = (tag: Tag) => {
    dispatchTags({
      type: "ADD_TAG",
      tag,
    });

  };

  const removeFilterTag = useCallback((id: string) => {
    dispatchTags({
      type: "REMOVE_TAG",
      id,
    });
  }, []);

  const resetFilterTags = useCallback(() => {
    dispatchTags({
      type: "RESET_TAGS",
    });
  }, []);

  const addVisibleLayer = (layer: LayerProps) => {
    dispatchLayers({
      type: "ADD_LAYER",
      layer,
    });

  };

  const toggleVisibleLayer = (layer: LayerProps) => {
    dispatchLayers({
      type: "TOGGLE_LAYER",
      layer,
    });

  };


  const resetVisibleLayers = useCallback(() => {
    dispatchLayers({
      type: "RESET_LAYERS",
    });
  }, []);

  const isLayerVisible = useCallback((layer: LayerProps) => {
    return visibleLayers.some(l => l.name === layer.name)
  }, [visibleLayers]);

  const setSearchPhrase = useCallback((phrase: string) => {
    searchPhraseSet(phrase)
  }, []);

  return { filterTags, addFilterTag, removeFilterTag, resetFilterTags, setSearchPhrase, searchPhrase, visibleLayers, toggleVisibleLayer, resetVisibleLayers, isLayerVisible, addVisibleLayer };
}

export const FilterProvider: React.FunctionComponent<{
  initialTags: Tag[], children?: React.ReactNode
}> = ({ initialTags, children }) => (
  <FilterContext.Provider value={useFilterManager(initialTags)}>
    {children}
  </FilterContext.Provider>
);

export const useFilterTags = (): Tag[] => {
  const { filterTags } = useContext(FilterContext);
  return filterTags;
};

export const useAddFilterTag = (): UseFilterManagerResult["addFilterTag"] => {
  const { addFilterTag } = useContext(FilterContext);
  return addFilterTag;
};

export const useRemoveFilterTag = (): UseFilterManagerResult["removeFilterTag"] => {
  const { removeFilterTag } = useContext(FilterContext);
  return removeFilterTag;
};

export const useResetFilterTags = (): UseFilterManagerResult["resetFilterTags"] => {
  const { resetFilterTags } = useContext(FilterContext);
  return resetFilterTags;
};

export const useSearchPhrase = (): UseFilterManagerResult["searchPhrase"] => {
  const { searchPhrase } = useContext(FilterContext);
  return searchPhrase;
};

export const useSetSearchPhrase = (): UseFilterManagerResult["setSearchPhrase"] => {
  const { setSearchPhrase } = useContext(FilterContext);
  return setSearchPhrase;
};

export const useVisibleLayer = (): UseFilterManagerResult["visibleLayers"] => {
  const { visibleLayers } = useContext(FilterContext);
  return visibleLayers;
};

export const useAddVisibleLayer = (): UseFilterManagerResult["addVisibleLayer"] => {
  const { addVisibleLayer } = useContext(FilterContext);
  return addVisibleLayer;
};


export const useToggleVisibleLayer = (): UseFilterManagerResult["toggleVisibleLayer"] => {
  const { toggleVisibleLayer } = useContext(FilterContext);
  return toggleVisibleLayer;
};

export const useResetVisibleLayers = (): UseFilterManagerResult["resetVisibleLayers"] => {
  const { resetVisibleLayers } = useContext(FilterContext);
  return resetVisibleLayers;
};

export const useIsLayerVisible = (): UseFilterManagerResult["isLayerVisible"] => {
  const { isLayerVisible } = useContext(FilterContext);
  return isLayerVisible;
};