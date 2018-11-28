import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import axios from "axios"
import events from './events'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
export default class MyCalendar extends Component {
    constructor(...args){
      super (...args)
      this.state = {events}
    }
  
    handleSelect(event){
      alert(event.title)
    }  
  
    render() {
      console.log(this.props.user)
      //const user = {
        //email : this.props.user.email,
        //password : this.props.user.password
      //}
            
      axios
        .get("http://localhost:8080/getlesson")
        .then(response => {
          console.log(response);
          if (response.data)
            this.setState({
              events:[
                ...this.state.events,response.data
                ,
              ],
            })
        })
        .catch(function(error) {
          console.log(error);
        });
      
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