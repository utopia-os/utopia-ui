import { UtopiaMap, Layer, ItemView, PopupButton, StartEndView, TextView, ItemForm, PopupStartEndInput, PopupTextAreaInput, PopupTextInput } from 'utopia-ui'
import { itemsApi } from '../api/itemsApi';
import { Place } from '../api/directus';
import { useEffect, useState } from 'react';
import { LayerProps } from 'utopia-ui/dist/types';

type layerApi = {
  id: string;
  api: itemsApi<Place>
}

function MapContainer({ layers, map }: { layers: Array<LayerProps>, map: any }) {
  const [apis, setApis] = useState<Array<layerApi>>([]);

  useEffect(() => {
    layers.map(layer => {
      apis && setApis(current => [...current, { id: layer.id!, api: new itemsApi<Place>('items', layer.id) }])
    })
  }, [layers])

  useEffect(() => {
  }, [apis])


  return (

    <UtopiaMap zoom={map.zoom || 5} center={map.center? [map.center?.coordinates[1], map.center?.coordinates[0]] : [50.6, 9.5]} height='calc(100dvh - 64px)' width="100%" >
      {layers && apis &&
        layers.map(layer =>
          <Layer
            key={layer.id}
            name={layer.name}
            menuIcon={"https://api.utopia-lab.org/assets/" + layer.menuIcon}
            menuText={layer.menuText}
            menuColor={layer.menuColor}
            markerIcon={layer.markerIcon}
            markerShape={layer.markerShape}
            onlyOnePerOwner={layer.onlyOnePerOwner}
            markerDefaultColor='#3D3846'
            itemType={layer.itemType}
            itemNameField='name'
            itemTextField='text'
            itemAvatarField='image'
            itemSubnameField='subname'
            itemColorField='color'
            itemOwnerField='user_created'
            customEditLink='/edit-item'
            customEditParameter='id'
            api={apis?.find(api => api.id === layer.id)?.api}>
            <ItemView>
              {layer.itemType.show_start_end &&
                <StartEndView></StartEndView>
              }
              {layer.itemType.show_profile_button &&
                <PopupButton url={'/item'} parameterField={'id'} text={'Profile'} colorField={'color'} />
              }
              {layer.itemType.show_text &&
                <TextView truncate></TextView>
              }
            </ItemView>
            <ItemForm>
              {layer.itemType.show_name_input && <PopupTextInput dataField='name' placeholder='Name'></PopupTextInput>}
              {layer.itemType.show_start_end_input && <PopupStartEndInput></PopupStartEndInput>}
              {layer.itemType.show_text_input &&<PopupTextAreaInput dataField='text' placeholder={'Text ...'} style="tw-h-40"></PopupTextAreaInput>}
              {layer.itemType.custom_text && <div className='flex justify-center'>
                <p>Press Save to place your Profile to the Map</p>
              </div>}
            </ItemForm>
          </Layer>)
      }
    </UtopiaMap>
  )
}

export default MapContainer
