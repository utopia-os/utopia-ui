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
</UtopiaMap>
```

### Options


 Option         | Type              | Default      | Required   | Description 
 ---            | ---               | ---          | ---        | ---    
 `height`       | `string`          | -            |            | height of the map           
 `width`        | `string`          | -            |            | width of the map
 `center`       | `LatLngExpression`| -            |            | initial map position           
 `zoom`         | `number`          | -            |            | initial zoom level
 `places`       | [`Item[]`](https://utopia-os.org/docs/utopia-ui/map-components/item)| -            |            | Array with Items           
 `events`       | [`Item[]`](https://utopia-os.org/docs/utopia-ui/map-components/item)          | -            |            | Array with Items             


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