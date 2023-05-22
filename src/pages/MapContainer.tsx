// @ts-ignore
import { UtopiaMap, Layer, Tags } from 'utopia-ui'
import { tags, places, events } from './data'
import { itemsApi } from '../api/itemsApi'
import { Place } from '../api/directus';

function MapContainer() {


  const placesApi = new itemsApi<Place>('places');
  
  
  return (
      
      <UtopiaMap zoom={5} height='calc(100vh - 64px)' width="100%">
        <Layer
          name='events'
          menuIcon='CalendarIcon'
          menuText='add new event'
          menuColor='#f9a825'
          markerIcon='calendar-days-solid'
          markerShape='square'
          markerDefaultColor='#777'
          data={events}
          api={placesApi} />
        <Layer
          name='places'
          menuIcon='MapPinIcon'
          menuText='add new place'
          menuColor='#2E7D32'
          markerIcon='circle-solid'
          markerShape='circle'
          markerDefaultColor='#777'
          data={places} />
        <Tags data={tags}></Tags>
      </UtopiaMap>
  )
}


export default MapContainer
