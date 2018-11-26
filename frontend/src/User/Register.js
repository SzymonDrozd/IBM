import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this)

    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      firstName: "",
      lastName: ""
    };
  }

  validateForm() {
    if (this.state.email.length > 0 
      && this.state.password.length > 0 
      && this.state.passwordConfirmation.length > 0
      && this.state.firstName.length > 0
      && this.state.lastName.length > 0 
    ){
      if (this.state.password === this.state.passwordConfirmation)
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
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    if (this.validateForm()){
      //zarejestruj
    }
    event.preventDefault();
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
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="passwordConfirmation" bsSize="large">
            <ControlLabel>Password (confirmation)</ControlLabel>
            <FormControl
              value={this.state.passwordConfirmation}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="firstName" bsSize="large">
            <ControlLabel>First name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.lastName}
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
            Zarejestruj
          </Button>
        </form>
      </div>
    );
  }
}
