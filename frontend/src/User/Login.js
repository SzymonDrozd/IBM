import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios"
import "./Login.css";

export default class Login extends Component {
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
        status: ""
      }
    };
  }

  validateForm() {
    return this.state.user.email.length > 0 && this.state.user.password.length > 0;
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
      const user = {
        email : this.state.user.email,
        password : this.state.user.password
      }
      axios
        .post("http://localhost:8080/login",user)
        .then(response => {
          console.log(response);
          if (response.data)
            if (response.data.activate){
              this.props.userHasAuthenticated(true,response.data);
              if (response.data.status === "student") 
                this.props.history.push("/calendarStudent");
              else
                this.props.history.push("/calendarTeacher")
              }
            else{
              alert("aktywuj swoje konto")
            }
        })
        .catch(function(error) {
          console.log(error);
        });
        
    }
  }

  render() {
    return (
      <div className="Login">
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
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
