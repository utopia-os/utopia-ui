import { UtopiaMap, Layer } from "utopia-ui"
import { events, places } from "./sample-data"

const itemTypeEvent = {
  name: "event",
  show_name_input: false,
  show_profile_button: false,
  show_start_end: false,
  show_start_end_input: false,
  show_text: false,
  show_text_input: false,
  custom_text: "",
  profileTemplate: [],
  offers_and_needs: false,
  icon_as_labels: null,
  relations: false,
  template: "TODO",
  questlog: false,
}

const itemTypePlace = {
  name: "event",
  show_name_input: false,
  show_profile_button: false,
  show_start_end: false,
  show_start_end_input: false,
  show_text: false,
  show_text_input: false,
  custom_text: "",
  profileTemplate: [],
  offers_and_needs: false,
  icon_as_labels: null,
  relations: false,
  template: "TODO",
  questlog: false,
}

function App() {
  return (
    <UtopiaMap center={[50.6, 15.5]} zoom={5} height='100dvh' width="100dvw">
    <Layer
      name='events'
      markerIcon={
        {image: "calendar.svg",
         size: 14
        }
      }
      markerShape='square'
      markerDefaultColor='#700'
      data={events}
      menuIcon="calendar"
      menuColor="#700"
      menuText="events"
      itemType={itemTypeEvent}
      />
    <Layer
      name='places'
      markerIcon={
        {image: "point.svg"}
      }
      markerShape='circle'
      markerDefaultColor='#007'
      data={places}
      menuIcon="point"
      menuColor="#007"
      menuText="places"
      itemType={itemTypePlace}
      />
  </UtopiaMap>
  )
}

export default App