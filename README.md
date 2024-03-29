# Utopia UI [![npm version](https://img.shields.io/npm/v/utopia-ui.svg)](https://www.npmjs.com/package/utopia-ui)
**UI Framework for Real-Life-Networking-Apps**

*Real change happens in real life when we meet in person and connect as local communities manifesting their ideas with the earth. When we help each other to step out of capitalism and individualism and start building common infrastructure to meet human needs in harmony with Mother Earth.*

*That is why Utopia UI exists. It is a UI kit for minimalist, fast, intuitive and mobile-first map apps, as a tool for local connection and decentralised networking. It can work with any backend or p2p database and any kind of data structure.*

## Mission 
Utopia UIs mission is to provide open source building blocks to create beautiful applications with a focus on real life impact, local communities and gamification. 

The building blocks are designed to allow different networks and communities to assemble their map and app for their specific needs and purpose.

Utopia Game is the first app made with Utopia UI. It is an attempt to use gamification to get users to take action and make the map even more alive. Check it out at [utopia-game.org](https://utopia-game.org/) or see the code in the [repository](https://github.com/utopia-os/utopia-game)

## Features

* Interactive Component Map with customizable Layers (like Projects, Event, People)
* Flexible API-Interface to make it work with every backend or p2p database
* Create, Update, Delete Items
* User Authentification API-Interface
* User Profiles
* App Shell 

## Getting Started


install via npm
```bash
 npm install utopia-ui
```

## Examples

[Moos Map](https://github.com/utopia-os/moos-map)

## Demo

[Moos Map](https://moos-map.de)


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

*This Library is in alpha stage. You are very welcome to participate in the development*

*We are looking for Web Developer, UX Designer, Community Manager, Visionaries, Artists, etc. who like to support this Vision.*

[https://t.me/utopiaOS](https://t.me/utopiaOS)
