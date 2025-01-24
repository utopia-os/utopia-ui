# Example 2: Static Layers

[Example 1](/1-basic-map) shows us how we create a basic map app with [utopia-ui](https://github.com/utopia-os/utopia-ui). Now we add some static layer.

First we put some sample data in a new file called `src/sample-data.ts`

```javascript=
export const places = [{
    "id": 51,
    "name": "Stadtgemüse",
    "text": "Stadtgemüse Fulda ist eine Gemüsegärtnerei in Maberzell, die es sich zur Aufgabe gemacht hat, die Stadt und seine Bewohner:innen mit regionalem, frischem und natürlich angebautem Gemüse mittels Gemüsekisten zu versorgen. Es gibt also jede Woche, von Frühjahr bis Herbst, angepasst an die Saison eine Kiste mit schmackhaftem und frischem Gemüse für euch, welche ihr direkt vor Ort abholen könnt. \r\n\r\nhttps://stadtgemuese-fulda.de",
    "position": { "type": "Point", "coordinates": [9.632435, 50.560342] },
  },
  {
    "id": 166,
    "name": "Weidendom",
    "text": "free camping",
    "position": { "type": "Point", "coordinates": [9.438793, 50.560112] },
  }];
  
  export const events = [
    {
      "id": 423,
      "name": "Hackathon",
      "text": "still in progress",
      "position": { "type": "Point", "coordinates": [10.5, 51.62] },
      "start": "2022-03-25T12:00:00",
      "end": "2022-05-12T12:00:00",
    }
  ]
```

We want to create two Layers. One we want to call *Places* and the other *Events*

we import our sample data to the `src/App.tsx`

```jsx=
import { events, places } from "./sample-data"
```
and than we create our two `<Layer>` inside of our `<UtopiaMap>` component
```jsx=
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
    </UtopiaMap>
```