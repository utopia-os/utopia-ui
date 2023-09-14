import { UtopiaMap, Tags, Layer, ItemForm, ItemView, PopupTextAreaInput, PopupStartEndInput, TextView, StartEndView, Permissions } from 'utopia-ui'
import { itemsApi } from '../api/itemsApi'
import { permissionsApi } from '../api/permissionsApi';
import { Place, Event, Tag } from '../api/directus';
import { useEffect, useState } from 'react';

function MapContainer() {


  const [placesApi, setPlacesApi] = useState<itemsApi<Place>>();
  const [eventsApi, setEventsApi] = useState<itemsApi<Event>>();
  const [tagsApi, setTagsApi] = useState<itemsApi<Tag>>();
  const [permissionsApiInstance, setPermissionsApiInstance] = useState<permissionsApi>();




  useEffect(() => {

    setPlacesApi(new itemsApi<Place>('places'));
    setEventsApi(new itemsApi<Event>('events'));
    setTagsApi(new itemsApi<Tag>('tags'));
    setPermissionsApiInstance(new permissionsApi());



  }, []);





  return (

    <UtopiaMap zoom={5} height='calc(100dvh - 64px)' width="100%">
      <Layer
        name='events'
        menuIcon='CalendarDaysIcon'
        menuText='add new event'
        menuColor='#f9a825'
        markerIcon='calendar-days-solid'
        markerShape='square'
        markerDefaultColor='#777'
        //     data={events}
        api={eventsApi}
      >
        <ItemForm>
          <PopupStartEndInput></PopupStartEndInput>
          <PopupTextAreaInput dataField='text' placeholder={'Test'} style="tw-h-40"></PopupTextAreaInput>
        </ItemForm>
        <ItemView>
          <StartEndView></StartEndView>
          <TextView></TextView>
        </ItemView>

      </Layer>
      <Layer
        name='places'
        menuIcon='MapPinIcon'
        menuText='add new place'
        menuColor='#2E7D32'
        markerIcon='circle-solid'
        markerShape='circle'
        markerDefaultColor='#777'
        // data={places}
        api={placesApi}
      />
      <Tags api={tagsApi}></Tags>
      <Permissions api={permissionsApiInstance} adminRole='8ed0b24e-3320-48cd-8444-bc152304e580'></Permissions>
    </UtopiaMap>
  )
}


export default MapContainer
