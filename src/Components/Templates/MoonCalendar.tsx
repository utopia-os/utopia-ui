import * as React from 'react'
import { useState } from 'react'
import {
  add,
  format,
  parse,
  startOfToday,
  sub,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { MapOverlayPage } from './MapOverlayPage';
import { CircleLayout } from './CircleLayout';
import { LUNAR_MONTH, getLastNewMoon, getNextNewMoon } from '../../Utils/Moon';


export const MoonCalendar = () => {
  const today = startOfToday();


  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());


  const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  return (
    <MapOverlayPage backdrop className='tw-h-96 tw-w-80'>
      <p className='tw-self-center tw-text-lg tw-font-bold'>Moon Cycle</p>
      <div className='tw-relative tw-h-full'>
        <CircleLayout items={["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"]} radius={80} fontSize={"3em"} />
        <CircleLayout items={ [
          format(getLastNewMoon(), "dd.MM hh:mm"),
          format(sub(getNextNewMoon(), {seconds: LUNAR_MONTH*86400/4*3}), "dd.MM hh:mm"),
          format(sub(getNextNewMoon(), {seconds: LUNAR_MONTH*86400/2}), "dd.MM hh:mm"),
          format(sub(getNextNewMoon(), {seconds: LUNAR_MONTH*86400/4}), "dd.MM hh:mm")
          ]} radius={120} fontSize={"0.8em"}/>
      </div>
      <div className='tw-flex tw-flex-row'>
        <ChevronLeftIcon
          className="tw-w-6 tw-h-6 tw-cursor-pointer"
          onClick={getPrevMonth}
        />
        <p className='tw-text-center tw-p-1 tw-h-full tw-grow'>from {format(getLastNewMoon(), "dd.MM")} - to {format(getNextNewMoon(), "dd.MM")}</p>

        <ChevronRightIcon
          className="tw-w-6 tw-h-6 tw-cursor-pointer"
          onClick={getNextMonth}
        />
      </div>


    </MapOverlayPage>
  );
}

const capitalizeFirstLetter = (string: string) => {
  return string
}