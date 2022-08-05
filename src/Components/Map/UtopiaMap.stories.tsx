import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UtopiaMap } from "./UtopiaMap";
import { Layer } from "./Layer";
import { tags, places, events } from './data'


export default {
    title: "Utopia Map",
    component: UtopiaMap,
} as ComponentMeta<typeof UtopiaMap>;


const Template: ComponentStory<typeof UtopiaMap> = (args) => (
    <UtopiaMap height={args.height} width={args.width} center={args.center} zoom={args.zoom}>
        <Layer
            name='places'
            menuIcon='LocationMarkerIcon'
            menuText='add new place'
            menuColor='#2E7D32'
            markerIcon='circle-solid'
            markerShape='circle'
            markerDefaultColor='#777'
            data={places}
            tags={tags}
        />
        <Layer
            name='events'
            menuIcon='CalendarIcon'
            menuText='add new event'
            menuColor='#f9a825'
            markerIcon='calendar-days-solid'
            markerShape='square'
            markerDefaultColor='#777'
            data = {events}
            tags={tags}
        />
    </UtopiaMap>
);


export const Custom = Template.bind({});
Custom.args = {

};

export const BadSalzschlirf = Template.bind({});
BadSalzschlirf.args = {
    center : [50.6238,9.5061],
    zoom: 15,
    height: "500px"
};