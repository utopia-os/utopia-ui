import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { UtopiaMap } from "./UtopiaMap";
import { Layer } from "./Layer";

export default {
    title: "Utopia Map",
    component: UtopiaMap,
} as ComponentMeta<typeof UtopiaMap>;


const Template: ComponentStory<typeof UtopiaMap> = (args) => (
    <UtopiaMap height="600px">
        <Layer
            name='places'
            menuIcon='LocationMarkerIcon'
            menuText='add new place'
            menuColor='#2E7D32'
            markerIcon='circle-solid'
            markerShape='circle'
            markerDefaultColor='#777'
        />
        <Layer
            name='events'
            menuIcon='CalendarIcon'
            menuText='add new event'
            menuColor='#f9a825'
            markerIcon='calendar-days-solid'
            markerShape='square'
            markerDefaultColor='#777'
        />
    </UtopiaMap>
);


export const Custom = Template.bind({});
Custom.args = {

};

export const BadSalzschlirf = Template.bind({});
BadSalzschlirf.args = {
    center : [9.5061,50.6238],
    zoom: 15
};