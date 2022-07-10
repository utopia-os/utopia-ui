# Utopia UI
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
You can find some Sample Data for test purpose below

### Options


 Option         | Type              | Default      | Required   | Description 
 ---            | ---               | ---          | ---        | ---    
 `height`       | `string`          | -            |            | height of the map           
 `width`        | `string`          | -            |            | width of the map
 `center`       | `LatLngExpression`| -            |            | initial map position           
 `zoom`         | `number`          | -            |            | initial zoom level
 `places`       | [`Item[]`](https://utopia-os.org/docs/utopia-ui/map-components/item)| -            |            | Array with Items           
 `events`       | [`Item[]`](https://utopia-os.org/docs/utopia-ui/map-components/item)          | -            |            | Array with Items             


### Sample Data
```jsx
const places = [{
  "id": 51,
  "name": "Stadtgemüse",
  "text": "Stadtgemüse Fulda ist eine Gemüsegärtnerei in Maberzell, die es sich zur Aufgabe gemacht hat, die Stadt und seine Bewohner:innen mit regionalem, frischem und natürlich angebautem Gemüse mittels Gemüsekisten zu versorgen. Es gibt also jede Woche, von Frühjahr bis Herbst, angepasst an die Saison eine Kiste mit schmackhaftem und frischem Gemüse für euch, welche ihr direkt vor Ort abholen könnt. \r\n\r\nhttps://stadtgemuese-fulda.de",
  "position": {
    "type": "Point",
    "coordinates": [
      9.632435,
      50.560342
    ]
  },
  "tags": [
    9,
    13
  ],
},
{
  "id": 166,
  "name": "Weidendom",
  "text": "free camping",
  "position": {
    "type": "Point",
    "coordinates": [
      9.438793,
      50.560112
    ]
  },
  "tags": [
    10,
    11
  ]
}];

const events = [
  {
    "id": "65bbc003-b6de-4904-b85c-8ab6c92fe0db",
    "date_created": "2022-03-14T10:20:11.534Z",
    "date_updated": "2022-04-05T08:58:38.790Z",
    "name": "Hackathon",
    "text": "still in progress",
    "position": {
      "type": "Point",
      "coordinates": [
        9.5,
        50.62
      ]
    },
    "start": "2022-03-25T12:00:00",
    "end": "2022-05-12T12:00:00",
    "tags": [
      {
        "Tags_id": {
          "color": "#75507B",
          "id": "Docutopia"
        }
      },
      {
        "Tags_id": {
          "color": "#3465A4",
          "id": "Coding"
        }
      }
    ]
  }
]

const tags = [
  {
    "id": 9,
    "name": "Gardening",
    "color": "#008e5b"
  },
  {
    "id": 10,
    "name": "Art",
    "color": "#fdc60b"
  },
  {
    "id": 11,
    "name": "Nature",
    "color": "#8cbb26"
  },
  {
    "id": 13,
    "name": "Market",
    "color": "#2a71b0"
  }
]

```

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