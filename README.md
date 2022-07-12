# Utopia UI [![npm version](https://img.shields.io/npm/v/utopia-ui.svg)](https://www.npmjs.com/package/utopia-ui)
Reuseable React Components to build mapping apps for all kinds of communities with focus of real life action, local connection and positiv impact.

Check [utopia-os.org](https://utopia-os.org) for more information

*This Library is in early alpha stage. You are very welcome to participate in the development*

*A Django-based Proof of Concept can be found @ [new.docutopia.de](https://new.docutopia.de). This map can be edited freely you can register to create an account and place them on the map. The project is no longer maintained.*

Utopia UI is a fully new approach to create a Open Source Library of JavaScript Components which should fit the needs of many different projects and communities. 


## Map UI Component
Map UI is a JavaScript Map Library to create nice and easy to use Maps 

### Getting Started


install via npm
```bash
 npm install utopia-ui
```

then import in your React App
```jsx
import UtopiaMap from 'utopia-ui'
```

use the [Map UI Component](/docs/utopia-ui/map-components/map)
```jsx
<UtopiaMap>
   height='360px'
   width='100vw'
   center={[51.3, 9.6]}
   zoom={6}
   places={places}
   events={events}
   tags = {tags}
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
 `places`       | [`Item[]`](https://utopia-os.org/docs/utopia-ui/map-components/item)|    `[]`     |  No         | Array with Items           
 `events`       | [`Item[]`](https://utopia-os.org/docs/utopia-ui/map-components/item)| `[]`        |  No         | Array with Items             
 `tags`       | [`Tag[]`](https://utopia-os.org/docs/utopia-ui/map-components/tag)    |  `[]`       |  No         | Array with Tags  

 ## Coming Soon

 * Profile UI Component
 * Market UI Component
 * Calendar UI Component
 * Friends
 * Groups
 * Tags & Colors
 * Gamification Elements

## Join the community

 *We are looking for Web Developer, UX Designer, Community Manager, Visionaries, Artists, etc. who like to support this Vision.*

[https://t.me/utopiaOS](https://t.me/utopiaOS)