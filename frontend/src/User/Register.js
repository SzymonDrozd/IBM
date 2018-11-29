import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.css";
import axios from "axios"

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this)

    this.state = {
      user:{
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        surname: "",
        status: "student"
      },
    };
  }

  validateForm() {
    if (this.state.user.email.length > 0 
      && this.state.user.password.length > 0 
      && this.state.user.confirmPassword.length > 0
      && this.state.user.firstName.length > 0
      && this.state.user.surname.length > 0 
    ){
      if (this.state.user.password === this.state.user.confirmPassword)
        return true
      else
        alert("hasłą nie są takie same")
        return 
    }
    else
      alert("uzupełnij pola")
      return false
  }


  handleChange = event => {
    const { user } = this.state;
    console.log(event.target.id)
    this.setState({
      user: {
                ...user,
                [event.target.id]: event.target.value
            }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm()){
      console.log(this.state.user)
      axios
        .post("http://localhost:8080/register",this.state.user)

        .then(response => {
          //console.log(response);
          if (response.data)
          this.props.userHasAuthenticated(true,this.state.user);
          if (this.state.user.status === "student")
            this.props.history.push("/");
          else
            this.props.history.push("/")
            console.log(this.state)
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }

  render() {
    return (
      <div className="Register">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Hasło</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Powtórz hasło</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="firstName" bsSize="large">
            <ControlLabel>Imię</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="surname" bsSize="large">
            <ControlLabel>Nazwisko</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.surname}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="status">
            <ControlLabel>Typ Użytkownika</ControlLabel>
            <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
              <option value="student">uczeń</option>
              <option value="teacher">nauczyciel</option>
              value={this.state.status}
            </FormControl>
          </FormGroup>
          <Button
            block
            bsSize="large"
            //disabled={!this.validateForm()}
            type="submit"
            //onClick={this.validateForm}
          >
            Zarejestruj
          </Button>
        </form>
      </div>
    );
  }
}
