import { useSetAssetApi } from './hooks/useAssets'
import { AssetsApi } from '../../types';
import { useEffect } from 'react';

export const SetAssetsApi = ({assetsApi}:{assetsApi: AssetsApi}) => {
    const setAssetsApi = useSetAssetApi();

    useEffect(() => {
      setAssetsApi(assetsApi)
    }, [assetsApi])
    

  return (
    <></>
  )
}
