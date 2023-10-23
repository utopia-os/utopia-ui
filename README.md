# Utopia UI [![npm version](https://img.shields.io/npm/v/utopia-ui.svg)](https://www.npmjs.com/package/utopia-ui)
*UI Framework for Real-Life-Networking-Apps*

Its mission is to provide open source building blocks to create beautiful applications with a focus on real life impact, local communities and gamification. 

The building blocks are designed to allow each network and community to assemble their map and app for their specific purposes.

Utopia Game is the first app made with Utopia UI. It is an attempt to use gamification to get users to take action and make the map even more alive. Check it out at [utopia-game.org](https://utopia-game.org/) or see the code in the [repository](https://github.com/utopia-os/utopia-game)


## Background
In early 2021, we developed a small Prototyp which can be found @ [new.docutopia.de](https://new.docutopia.de). This map can be edited freely. You can register to create an account and place them on the map. We tested it with a couple of users and got some very positiv feedback. Some of them are still using it. 

Since these days we got in contact with many other projects with focus of real life transformation and mapping for change. But our quick and dirty spaghetti code was hard to adapt to the special requirements of different communities and projects.

That's why we want to provide with Utopia UI this functionality (and much more) as easy to adapt building blocks. It is a full rewrite as a React Component Library. 




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
