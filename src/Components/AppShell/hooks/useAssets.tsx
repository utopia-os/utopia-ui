import { useCallback, useState } from 'react';


import { createContext, useContext } from "react";
import * as React from "react";
import { AssetsApi } from '../../../types';



type UseAssetManagerResult = ReturnType<typeof useAssetsManager>;

const AssetContext = createContext<UseAssetManagerResult>({
  api: {} as AssetsApi,
  setAssetsApi: () => { }
});

function useAssetsManager(): {
  api: AssetsApi;
  // eslint-disable-next-line no-unused-vars
  setAssetsApi: (api: AssetsApi) => void;
} {
  const [api, setApi] = useState<AssetsApi>({} as AssetsApi);

  const setAssetsApi = useCallback((api: AssetsApi) => {
    setApi(api);
  }, []);

  return { api, setAssetsApi };
}

export const AssetsProvider: React.FunctionComponent<{
  children?: React.ReactNode
}> = ({ children }) => (
  <AssetContext.Provider value={useAssetsManager()}>
    {children}
  </AssetContext.Provider>
);

export const useAssetApi = (): AssetsApi => {
  const { api } = useContext(AssetContext);
  return api;
};


export const useSetAssetApi = (): UseAssetManagerResult["setAssetsApi"] => {
  const { setAssetsApi } = useContext(AssetContext);
  return setAssetsApi;
}
