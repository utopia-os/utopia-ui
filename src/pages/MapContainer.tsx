import { UtopiaMap, Layer, ItemForm, ItemView, PopupTextAreaInput, PopupTextInput, PopupStartEndInput, TextView, StartEndView, PopupButton } from 'utopia-ui'
import { itemsApi } from '../api/itemsApi';
import { Place, Event } from '../api/directus';
import { useEffect, useState } from 'react';
import { CalendarDaysIcon, MapPinIcon, UserIcon } from '@heroicons/react/20/solid'

function MapContainer() {


  const [placesApi, setPlacesApi] = useState<itemsApi<Place>>();
  const [eventsApi, setEventsApi] = useState<itemsApi<Event>>();
  const [updatesApiInstance, setUpdatesApiInstance] = useState<itemsApi<Place>>();




  useEffect(() => {

    setPlacesApi(new itemsApi<Place>('items', undefined, undefined, {"type":{"_eq":"project"}}, {type: "project"}));
    setEventsApi(new itemsApi<Event>('items', undefined, undefined, {"type":{"_eq":"event"}}, {type: "event"}));
    setUpdatesApiInstance(new itemsApi('updates', "d2e5c850-74db-4789-910b-79d6784ad265", undefined, { "latest": { "_eq": true } }));


  }, []);

  const icon = CalendarDaysIcon;


  return (


    <UtopiaMap zoom={12} height='calc(100dvh - 64px)' width="100%" center={[52.49, 13.46]}>
      <Layer
        name='Events'
        menuIcon={icon}
        menuText='add new event'
        menuColor='#f9a825'
        markerIcon='calendar-days-solid'
        markerShape='square'
        markerDefaultColor='#3D3846'
        itemAvatarField='image'
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
        name='Projects'
        menuIcon={MapPinIcon}
        menuText='add new place'
        menuColor='#2E7D32'
        markerIcon='circle-solid'
        markerShape='circle'
        markerDefaultColor='#3D3846'
        itemAvatarField='image'
        itemColorField='color'
        itemOwnerField='user_created'
        // data={places}
        api={placesApi}>
        <ItemView>
          <PopupButton url={'/item'} parameterField={'id'} text={'Profile'} colorField={'color'} />
          <TextView truncate></TextView>
        </ItemView>
      </Layer>
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
        itemOwnerField="user_created"
        itemOffersField='user_created.offers'
        itemNeedsField='user_created.needs'
        customEditLink='/profile-settings'
        onlyOnePerOwner={true}
        // data={places}
        api={updatesApiInstance}>
        <ItemView>
          <PopupButton url={'/profile'} parameterField={'id'} text={'Profile'} colorField={'user_created.color'} />
          <TextView truncate></TextView>
        </ItemView>
        <ItemForm title='Place yor Profile'>
          <div className='flex justify-center'>
            <p>Press Save to place your Profile to the Map</p>
          </div>
        </ItemForm>
      </Layer>
    </UtopiaMap>
  )
}

export default MapContainer
