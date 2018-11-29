import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import axios from "axios"
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import events from './events'
import Popup from 'reactjs-popup'
import EditLesson from "./../Lesson/EditLesson"

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
export default class CalendarTeacher extends Component {
    constructor(...args){
      super (...args)
      this.state = {
        lesson:{
          start:"",
          end:""
        },
        showModal:false,
        events}
      this.handleSlot=this.handleSlot.bind(this)
      this.onClose=this.onClose.bind(this)
      this.setLesson=this.setLesson.bind(this)
      this.getElements()
    }
    
    handleEvent(event){
      alert(event.title)
    }
    
    onClose(event){
      this.setState({
        lesson:this.state.lesson,
        showModal:false,
        events
      })
      this.getElements()
    }
  
    async setLesson({start,end}){
      const lesson={
        start:start,
        end:end
      }
      //this.props.addLesson(lesson)
      this.setState({lesson:lesson})
    }
    
    async handleSlot({start,end}){
      await this.setLesson({start,end})
      
      this.setState({showModal:true})
    } 
    
    getElements(){

      axios
      .get("http://localhost:8080/getalllessons")
      .then(response => {
        //console.log(response);

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
          
          //console.log(this.state)
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    render() {
      return (
        
        <div>
                    {this.state.showModal
            ?
            <Popup
              open={true}
              onClose={this.onClose}
              modal
              closeOnDocumentClick
            >
            <span> <EditLesson lesson={this.state.lesson} user={this.props.user}/> </span>
            </Popup>
                    
                  : null
                }
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