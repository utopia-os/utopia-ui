import { UtopiaMap, Layer, Tags } from "utopia-ui"
import { events, places, tags } from "./sample-data"

function App() {
  return (
    <UtopiaMap center={[50.6, 15.5]} zoom={5} height='100dvh' width="100dvw">
    <Layer
      name='events'
      markerIcon='calendar'
      markerShape='square'
      markerDefaultColor='#700'
      data={events} />
    <Layer
      name='places'
      markerIcon='point'
      markerShape='circle'
      markerDefaultColor='#007'
      data={places} />
      <Tags data={tags}/>
  </UtopiaMap>
  )
}

export default App