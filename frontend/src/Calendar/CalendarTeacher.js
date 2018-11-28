import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import axios from "axios"
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import events from './events'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
export default class CalendarTeacher extends Component {
    constructor(...args){
      super (...args)
      this.state = {events}
      this.handleSlot=this.handleSlot.bind(this)
      this.getElements()
    }
    
    handleEvent(event){
      alert(event.title)
    }
    
    handleSlot({start,end}){
      const lesson={
        start:start,
        end:end
      }
      this.props.addLesson(lesson)
      this.props.history.push("/editLesson");
    } 
    
    getElements(){
      axios
      .get("http://localhost:8080/getalllessons")
      .then(response => {
        console.log(response);

        if (response.data){
          response.data.forEach(entry=> {
            const event= {
              id:entry.id,
              title:entry.subject,
              start:new Date(entry.dateStart),
              end:new Date(entry.dateStop),
              desc:entry.description
            }
            this.setState({
              events:[
                ...this.state.events,event
              ],
            })
        });
          
          console.log(this.state)
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    render() {
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
            onSelectEvent={this.handleEvent}
            onSelectSlot={this.handleSlot}
        />
      </div>
      
      );
      
    }
  }