import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Lesson.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this)

    this.state = {
      name: "",
      date:"",
      timeStart: "",
      timeEnd: "",
      note: ""
    };
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
    if (this.validateForm()){
        //zapisz
      }
      event.preventDefault();
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
          <FormGroup controlId="dateStart" bsSize="large">
            <ControlLabel>Czas Rozpoczęcia</ControlLabel>
            <FormControl
              value={this.state.timeStart}
              onChange={this.handleChange}
              type="time"
            />
          </FormGroup>
          <FormGroup controlId="dateEnd" bsSize="large">
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
              type="text"
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
