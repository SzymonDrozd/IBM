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
      this.getElements()
    }
  
    handleSelect(event){
      alert(event.title)
    }  
    
    getElements(){
      axios
      .post("http://localhost:8080/getlesson",this.props.user)
      .then(response => {
        console.log(response);

        if (response.data){
          const event= {
            id:response.data.id,
            title:response.data.subject,
            start:new Date(response.data.dateStart),
            end:new Date(response.data.dateStop),
            desc:response.data.description
          }
          this.setState({
            events:[
              ...this.state.events,event
            ],
          })
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    render() {
      console.log(this.state)
      //const user = {
        //email : this.props.user.email,
        //password : this.props.user.password
      //}
      
      return (
        <div>
        <BigCalendar
            selectable
            events={this.state.events}
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