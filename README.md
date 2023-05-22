# Utopia UI [![npm version](https://img.shields.io/npm/v/utopia-ui.svg)](https://www.npmjs.com/package/utopia-ui)
is a UI Library to build mapping apps with focus of real life action, local connection and positiv impact.

Check [utopia-os.org](https://utopia-os.org) for more information

*In early 2021, we developed a Django-based Proof of Concept, which can be found @ [new.docutopia.de](https://new.docutopia.de). This map can be edited freely you can register to create an account and place them on the map.*

Utopia UI is the approach to create a Open Source Library of JavaScript Components which should bring useful maps and apps to all kind of projects and communities.

## Getting Started


install via npm
```bash
 npm install utopia-ui
```

## Map Component
The map shows various Layers (places, events, profiles ...) of Irems at their respective position whith nice and informative Popups.

Tags, colors and clusters help to retain the overview.

use the Map UI Component
```jsx
import { UtopiaMap, Layer, Tags } from 'utopia-ui'

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
You can find some Sample Data (places, events, tags) for test in the `SamleData/` folder



### Options

 Option         | Type              | Default      | Required   | Description 
 ---            | ---               | ---          | ---        | ---    
 `height`       | `string`          |`'400px'`     |    No      | height of the map           
 `width`        | `string`          |`'100vw'`     |    No      | width of the map
 `center`       | `LatLng`          |`[50.6, 9.5]` |    No      | initial map position           
 `zoom`         | `number`          |`10`          |    No      | initial zoom level



## Join the community

*This Library is in early alpha stage. You are very welcome to participate in the development*

*We are looking for Web Developer, UX Designer, Community Manager, Visionaries, Artists, etc. who like to support this Vision.*

[https://t.me/utopiaOS](https://t.me/utopiaOS)