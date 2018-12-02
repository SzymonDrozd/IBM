import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios"
import "./Lesson.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.loadLesson = this.loadLesson.bind(this)
    const less =this.props.lesson

    this.state = {      
      name: less.name,
      date: less.date,
      timeStart: less.timeStart,
      timeEnd: less.timeEnd,
      note: less.note,
      authorId: less.authorId,
      studentId: less.studentId,
      id: less.id
    };
    console.log(this.state)
    //this.loadLesson();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(event.target.value)
    console.log(this.state)
  }
  
  validateForm(){
    return !this.state.studentId
  }

  loadLesson(){
    //this.setState({lesson:this.props.lesson})
    //console.log(this.state)
  }
  handleSubmit = event => {
      event.preventDefault();
      
      const less={
        subject: this.state.name,
        authorId: this.state.authorId,
        author: "",
        description: this.state.note,
        dateStart: this.state.date+"T"+this.state.timeStart,
        dateStop: this.state.date+"T"+this.state.timeEnd,
        studentId: this.props.user.id,
        id:this.state.id
      }
      console.log(less)
      axios
        .post("http://localhost:8080/updatelesson",less)
        .then(response => {
          console.log(response);
          if (response.data)
           alert("Ok")
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  componentDidMount() {
    axios
    .get("http://localhost:8080/getuser/"+this.props.lesson.authorId)
    .then(response => {
        const author=response.data.firstName+" "+response.data.surname;
        this.setState({author:author})
        console.log(author)
    })
    .catch(function(error) {
      console.log(error);
    });
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
            />
          </FormGroup>
          <FormGroup controlId="authorId" bsSize="large">
            <ControlLabel>Nauczyciel</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.author}
            />
          </FormGroup>
          <FormGroup controlId="date" bsSize="large" fo>
            <ControlLabel>Data</ControlLabel>
            <FormControl
              value={this.state.date}
              type="date"
            />
          </FormGroup>
          <FormGroup controlId="timeStart" bsSize="large">
            <ControlLabel>Czas Rozpoczęcia</ControlLabel>
            <FormControl
              value={this.state.timeStart}
              type="time"
            />
          </FormGroup>
          <FormGroup controlId="timeEnd" bsSize="large">
            <ControlLabel>Czas Zakończenia</ControlLabel>
            <FormControl
              value={this.state.timeEnd}
              type="time"
            />
          </FormGroup>
          <FormGroup controlId="note" bsSize="large">
            <ControlLabel>opis</ControlLabel>
            <FormControl
              autoFocus
              componentClass="textarea" placeholder="textarea"
              value={this.state.note}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            //onClick={this.validateForm}
          >
            Zapisz się
          </Button>
        </form>
      </div>
    );
  }
}
