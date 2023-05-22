# Utopia UI [![npm version](https://img.shields.io/npm/v/utopia-ui.svg)](https://www.npmjs.com/package/utopia-ui)
is a UI Library to build mapping apps with focus of real life action, local connection and positiv impact.

Check [utopia-os.org](https://utopia-os.org) for more information

*In early 2021, we developed a Django-based Proof of Concept, which can be found @ [new.docutopia.de](https://new.docutopia.de). This map can be edited freely you can register to create an account and place them on the map.*

Utopia UI is the approach to create a Open Source Library of JavaScript Components which should bring useful maps and apps to all kind of projects and communities.


## Map Component
The Map Component based on [leaflet](https://leafletjs.com)

The map shows places, events and people at their respective position whith nice and informative Popups. Tags, colors and clusters help to retain the overview.

Include it somewhere in your React Application, pass some data and the required props.

### Getting Started


install via npm
```bash
 npm install utopia-ui
```

then import in your React App
```jsx
import UtopiaMap from 'utopia-ui'
```

use the Map UI Component
```jsx
      <UtopiaMap zoom={5} height='calc(100vh - 64px)' width="100%">
        <Layer
          name='events'
          menuIcon='CalendarIcon'
          menuText='add new event'
          menuColor='#f9a825'
          markerIcon='calendar-days-solid'
          markerShape='square'
          markerDefaultColor='#777'
          data={events} />
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
```
You can find some Sample Data (places, events, tags) for test purpose below

### Sample Data
```jsx
const places = [{
  "id": 51,
  "name": "Stadtgemüse",
  "text": "Stadtgemüse Fulda ist eine Gemüsegärtnerei in Maberzell, die es sich zur Aufgabe gemacht hat, die Stadt und seine Bewohner:innen mit regionalem, frischem und natürlich angebautem Gemüse mittels Gemüsekisten zu versorgen. Es gibt also jede Woche, von Frühjahr bis Herbst, angepasst an die Saison eine Kiste mit schmackhaftem und frischem Gemüse für euch, welche ihr direkt vor Ort abholen könnt. \r\n\r\nhttps://stadtgemuese-fulda.de",
  "position": { "type": "Point", "coordinates": [9.632435, 50.560342] },
  "tags": [9,13],
},
{
  "id": 166,
  "name": "Weidendom",
  "text": "free camping",
  "position": { "type": "Point", "coordinates": [9.438793, 50.560112] },
  "tags": [10,11]
}];

const events = [
  {
    "id": 423,
    "name": "Hackathon",
    "text": "still in progress",
    "position": { "type": "Point", "coordinates": [9.5, 50.62] },
    "start": "2022-03-25T12:00:00",
    "end": "2022-05-12T12:00:00",
    "tags": [10]
  }
]

const tags = [
  {"id": 9, "name": "Gardening", "color": "#008e5b" },
  {"id": 10, "name": "Art", "color": "#fdc60b" },
  {"id": 11, "name": "Nature", "color": "#8cbb26"  },
  {"id": 13, "name": "Market", "color": "#2a71b0" }
]

```

### Options


 Option         | Type              | Default      | Required   | Description 
 ---            | ---               | ---          | ---        | ---    
 `height`       | `string`          |`'400px'`     |    No      | height of the map           
 `width`        | `string`          |`'100vw'`     |    No      | width of the map
 `center`       | `LatLng`          |`[50.6, 9.5]` |    No      | initial map position           
 `zoom`         | `number`          |`10`          |    No      | initial zoom level
 `places`       | [`Item[]`](https://utopia-os.org/docs/utopia-ui/map-components/item)| `[]` | No | Array with Items           
 `events`       | [`Item[]`](https://utopia-os.org/docs/utopia-ui/map-components/item)| `[]` | No | Array with Items             
 `tags`         | [`Tag[]`](https://utopia-os.org/docs/utopia-ui/map-components/tag)  | `[]` | No | Array with Tags  

 ## Coming Soon

 * Profile UI Component
 * Market UI Component
 * Calendar UI Component
 * Friends
 * Groups
 * Tags & Colors
 * Gamification Elements

## Join the community

*This Library is in early alpha stage. You are very welcome to participate in the development*

*We are looking for Web Developer, UX Designer, Community Manager, Visionaries, Artists, etc. who like to support this Vision.*

[https://t.me/utopiaOS](https://t.me/utopiaOS)