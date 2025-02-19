# Example 2: Static Layers

In [Example 1](/1-basic-map), we learned how to create a basic map app using [utopia-ui](https://github.com/utopia-os/utopia-ui). Now, we'll add **static layers** to our map.

### Adding Sample Data

First, we create a new file called `src/sample-data.ts` and define some sample data:

```javascript
export const places = [
  {
    "id": 51,
    "name": "Stadtgemüse",
    "text": "Stadtgemüse Fulda ist eine Gemüsegärtnerei in Maberzell, die es sich zur Aufgabe gemacht hat, die Stadt und seine Bewohner:innen mit regionalem, frischem und natürlich angebautem Gemüse mittels Gemüsekisten zu versorgen. Es gibt also jede Woche, von Frühjahr bis Herbst, angepasst an die Saison eine Kiste mit schmackhaftem und frischem Gemüse für euch, welche ihr direkt vor Ort abholen könnt.\r\n\r\nhttps://stadtgemuese-fulda.de",
    "position": { "type": "Point", "coordinates": [9.632435, 50.560342] }
  },
  {
    "id": 166,
    "name": "Weidendom",
    "text": "Free camping",
    "position": { "type": "Point", "coordinates": [9.438793, 50.560112] }
  }
];

export const events = [
  {
    "id": 423,
    "name": "Hackathon",
    "text": "Still in progress",
    "position": { "type": "Point", "coordinates": [10.5, 51.62] },
    "start": "2022-03-25T12:00:00",
    "end": "2022-05-12T12:00:00"
  }
];
```

### Creating Layers

We want to create **two layers**: 

- A **"Places"** layer for locations 
- An **"Events"** layer for scheduled activities.

First, we import our sample data into `src/App.tsx`:

```tsx
import { events, places } from "./sample-data";
```

### Adding Layers to `<UtopiaMap>`

Next, we define our `<Layer>` components inside `<UtopiaMap>`:

```tsx
<UtopiaMap center={[50.6, 15.5]} zoom={5} height="100dvh" width="100dvw">
  <Layer
    name="events"
    markerIcon="calendar"
    markerShape="square"
    markerDefaultColor="#700"
    data={events}
  />
  <Layer
    name="places"
    markerIcon="point"
    markerShape="circle"
    markerDefaultColor="#007"
    data={places}
  />
</UtopiaMap>
```

### Running the Application

Finally, we start our development server to see the **map with two layers**:

```shell
npm run dev
```

➡️ In [Example 3](../3-tags/), we'll add **tags** to our map.  