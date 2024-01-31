import { UtopiaMap, Tags, Layer, ItemForm, ItemView, PopupTextAreaInput, PopupTextInput, PopupStartEndInput, TextView, StartEndView, Permissions, PopupButton } from 'utopia-ui'
import { itemsApi } from '../api/itemsApi';
import { permissionsApi } from '../api/permissionsApi';
import { Place, Event, Tag } from '../api/directus';
import { useEffect, useState } from 'react';
import {CalendarDaysIcon, MapPinIcon, UserIcon} from '@heroicons/react/20/solid'

function MapContainer() {


  const [placesApi, setPlacesApi] = useState<itemsApi<Place>>();
  const [eventsApi, setEventsApi] = useState<itemsApi<Event>>();
  const [tagsApi, setTagsApi] = useState<itemsApi<Tag>>();
  const [permissionsApiInstance, setPermissionsApiInstance] = useState<permissionsApi>();
  const [updatesApiInstance, setUpdatesApiInstance] = useState<itemsApi<Place>>();




  useEffect(() => {

    setPlacesApi(new itemsApi<Place>('places'));
    setEventsApi(new itemsApi<Event>('events'));
    setTagsApi(new itemsApi<Tag>('tags'));
    setPermissionsApiInstance(new permissionsApi());
    setUpdatesApiInstance(new itemsApi('updates', {
      "latest": {
        "_eq": true
      }
    }));
  }, []);

  const icon = CalendarDaysIcon;


  return (


    <UtopiaMap zoom={5} height='calc(100dvh - 64px)' width="100%">
      <Layer
        name='Events'
        menuIcon={icon}
        menuText='add new event'
        menuColor='#f9a825'
        markerIcon='calendar-days-solid'
        markerShape='square'
        markerDefaultColor='#818583'
        //     data={events}
        api={eventsApi}>
        <ItemForm>
          <PopupTextInput dataField='name' placeholder='Name'></PopupTextInput>
          <PopupStartEndInput></PopupStartEndInput>
          <PopupTextAreaInput dataField='text' placeholder={'Text ...'} style="tw-h-40"></PopupTextAreaInput>
        </ItemForm>
        <ItemView>
          <StartEndView></StartEndView>
          <TextView></TextView>
        </ItemView>
      </Layer>
      <Layer
        name='Places'
        menuIcon={MapPinIcon}
        menuText='add new place'
        menuColor='#2E7D32'
        markerIcon='circle-solid'
        markerShape='circle'
        markerDefaultColor='#818583'
        // data={places}
        api={placesApi} />
      <Layer
        name='People'
        menuIcon={UserIcon}
        menuText='place your profile on the map'
        menuColor='#C62828'
        markerIcon='user'
        markerShape='square'
        markerDefaultColor='#818583'
        itemNameField='user_created.first_name'
        itemTextField='user_created.description'
        itemAvatarField='user_created.avatar'
        itemColorField='user_created.color'
        itemOwnerField="user_created.id"
        onlyOnePerOwner={true}
        // data={places}
        api={updatesApiInstance}>
        <ItemView>
          <PopupButton url={'/profile'} parameterField={'user_created.id'} text={'Profile'} colorField={'user_created.color'} />
          <TextView truncate></TextView>
        </ItemView>
        <ItemForm title='Place yor Profile'>
          <div className='flex justify-center'>
          <p>Press Save to place your Profile to the Map</p>
          </div>
        </ItemForm>
      </Layer>

      <Tags api={tagsApi}></Tags>
      <Permissions api={permissionsApiInstance} adminRole='8ed0b24e-3320-48cd-8444-bc152304e580'></Permissions>
    </UtopiaMap>
  )
}

export default MapContainer
