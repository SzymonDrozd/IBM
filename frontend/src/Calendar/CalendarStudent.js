import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import events from './events'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
export default class CalendarStudent extends Component {
    
    handleSelect(event){
      alert(event.title)
    }  
  
    render() {
      return (
        <div>
        <BigCalendar
            selectable
            events={events}
            views={['week','day','agenda']}
            defaultView='week'
            //step={60}
            //showMultiDayTimes
            //defaultDate={new Date(2015, 3, 1)}
            localizer={localizer}
            onSelectEvent={this.handleSelect}
        />
      </div>
      );
    }
  }