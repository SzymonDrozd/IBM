import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import events from './events'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
export default class Home extends Component {
    render() {
      return (
        <div>
        <BigCalendar
            events={events}
            views={allViews}
            step={60}
            showMultiDayTimes
            defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
        />
      </div>
      );
    }
  }