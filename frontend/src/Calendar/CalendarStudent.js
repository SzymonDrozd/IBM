import React, { Component} from "react";
import BigCalendar from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'
import axios from "axios"
import events from './events'
import Popup from 'reactjs-popup'
import Lesson from "./../Lesson/Lesson"

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
export default class CalendarStudent extends Component {
  constructor(...args){
    super (...args)
    this.state = {
      showModal:false,
      lesson:{
        name: "",
        date:"",
        timeStart: "",
        timeEnd: "",
        note: "",
        authorId:""
    },
      events}
    this.handleSelect=this.handleSelect.bind(this)
    this.onClose=this.onClose.bind(this)
    this.show=this.show.bind(this)
    this.getElements()
  }
  
    async handleSelect(event){
      //alert(event.title)
      console.log(event)
      const lesson=  {
        name: event.title,
        date: event.start.getFullYear()+"-"+("0"+(event.start.getMonth()+1)).slice(-2)+"-"+("0"+event.start.getDate()).slice(-2),
        timeStart: ("0"+event.start.getHours()).slice(-2)+":"+("0"+event.start.getMinutes()).slice(-2),
        timeEnd: ("0"+event.end.getHours()).slice(-2)+":"+("0"+event.end.getMinutes()).slice(-2),
        note: event.desc,
        authorId:event.authorId,
        studentId:event.studentId,
        id:event.id
      }
      this.setState({lesson:lesson})
      //this.props.addLesson(lesson)
      //this.setState({showModal:true})
    } 
    
    async show(event){
      await this.handleSelect(event)
      console.log(this.state.lesson)
      this.setState({showModal:true})
    }

    onClose(event){
      this.setState({
        lesson:this.state.lesson,
        showModal:false,
        events
      })
      this.getElements()
    }

    getElements(){
      axios
      .get("http://localhost:8080/getalllessons")
      .then(response => {
        //console.log(response);
        console.log(response.data);
        if (response.data){
          response.data.forEach(entry=> {
            const event= {
              id:entry.id,
              title:entry.subject,
              start:new Date(entry.dateStart),
              end:new Date(entry.dateStop),
              desc:entry.description,
              authorId:entry.authorId,
              studentId:entry.studentId
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
            <span> <Lesson lesson={this.state.lesson} user = {this.props.user}/> </span>
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
            onSelectEvent={this.show}
        />
      </div>
      );
    }
  }