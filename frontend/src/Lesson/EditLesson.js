import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios"
import "./EditLesson.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this)

    this.state = {
      name: "",
      date:"",
      timeStart:"",
      timeEnd: "",
      note: ""
    };
    console.log(this.state)
    /*      date:String(this.props.lesson.start).substr(0,String(this.props.lesson.start).indexOf('T')),
      timeStart: String(this.props.lesson.start).substr(String(this.props.lesson.start).indexOf('T'),this.props.lesson.start.length),
      timeEnd: String(this.props.lesson.start).substr(String(this.props.lesson.end).indexOf('T'),this.props.lesson.end.length),*/
  }

  validateForm() {
    if (this.state.name.length > 0 
      && this.state.date.length > 0 
      && this.state.timeStart.length > 0 
      && this.state.timeEnd.length > 0
      && this.state.note.length > 0 
    )
        return true

    else
      alert("uzupełnij pola")
      return false
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const lesson= {
      subject: this.state.name,
      authorId: this.props.user.id,
      description: this.state.note,
      dateStart: this.state.date+"T"+this.state.timeStart,
      dateStop: this.state.date+"T"+this.state.timeEnd
    }
    console.log(lesson)
    if (this.validateForm()){
      axios
      .post("http://localhost:8080/addlesson",lesson)
      .then(response => {
        console.log(response);
        if (response.data){

        }          
          else
            {}
      })
      .catch(function(error) {
        console.log(error);
      });
      }
  }

  render() {
    return (
      <div className="Lesson">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
            <ControlLabel>Nazwa</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="date" bsSize="large">
            <ControlLabel>Data</ControlLabel>
            <FormControl
              value={this.state.date}
              onChange={this.handleChange}
              type="date"
            />
          </FormGroup>
          <FormGroup controlId="timeStart" bsSize="large">
            <ControlLabel>Czas Rozpoczęcia</ControlLabel>
            <FormControl
              value={this.state.timeStart}
              onChange={this.handleChange}
              type="time"
            />
          </FormGroup>
          <FormGroup controlId="timeEnd" bsSize="large">
            <ControlLabel>Czas Zakończenia</ControlLabel>
            <FormControl
              value={this.state.timeEnd}
              onChange={this.handleChange}
              type="time"
            />
          </FormGroup>
          <FormGroup controlId="note" bsSize="large">
            <ControlLabel>opis</ControlLabel>
            <FormControl
              autoFocus
              componentClass="textarea" placeholder="textarea"
              value={this.state.note}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            //disabled={!this.validateForm()}
            type="submit"
            //onClick={this.validateForm}
          >
            Zapisz
          </Button>
        </form>
      </div>
    );
  }
}
