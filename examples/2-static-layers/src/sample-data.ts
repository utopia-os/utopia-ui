import { Point } from "geojson";

export const places = [{
    "id": "51",
    "name": "Stadtgemüse",
    "text": "Stadtgemüse Fulda ist eine Gemüsegärtnerei in Maberzell, die es sich zur Aufgabe gemacht hat, die Stadt und seine Bewohner:innen mit regionalem, frischem und natürlich angebautem Gemüse mittels Gemüsekisten zu versorgen. Es gibt also jede Woche, von Frühjahr bis Herbst, angepasst an die Saison eine Kiste mit schmackhaftem und frischem Gemüse für euch, welche ihr direkt vor Ort abholen könnt. \r\n\r\nhttps://stadtgemuese-fulda.de",
    "position": { "type": "Point", "coordinates": [9.632435, 50.560342] } as Point,
  },
  {
    "id": "166",
    "name": "Weidendom",
    "text": "free camping",
    "position": { "type": "Point", "coordinates": [9.438793, 50.560112] } as Point,
  }];
  
  export const events = [
    {
      "id": "423",
      "name": "Hackathon",
      "text": "still in progress",
      "position":  { "type": "Point", "coordinates": [10.5, 51.62] } as Point,
      "start": "2022-03-25T12:00:00",
      "end": "2022-05-12T12:00:00",
    }
  ]