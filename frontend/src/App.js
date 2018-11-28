import React, { Component , Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem  } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  
    this.userHasAuthenticated=this.userHasAuthenticated.bind(this)
    this.addLesson=this.addLesson.bind(this)
    this.state = {
      isAuthenticated: false,
      user:{
        email: "",
        id:"",
        password: "",
        confirmPassword: "",
        firstName: "",
        surname: "",
        status: ""
      },
      lesson:{
        start:"",
        end:""
      }
    };
  }
  
  userHasAuthenticated(authenticated,user) {
    this.setState({ isAuthenticated: authenticated });
    this.setState({user : user})
    console.log(this.state)
  }
  
  addLesson(lesson){
    this.setState({lesson:lesson})
    console.log(this.state)
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
    this.setState({
      user:{
        email: "",
        id:"",
        password: "",
        confirmPassword: "",
        firstName: "",
        surname: "",
        status: ""
      },
      lesson:{
        start:"",
        end:""
      }
    })
    this.props.history.push("/login");
  }
  

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      userHasAuthenticated: this.userHasAuthenticated,
      addLesson:this.addLesson,
      lesson: this.state.lesson
    };
    
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Umów się na lekcję</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
          {this.state.isAuthenticated
            ? <Fragment> 
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
                {this.state.user.status==="teacher"
                  ? <Fragment> 
                      <LinkContainer to="/editLesson">
                        <NavItem>DodajLekcje</NavItem>
                      </LinkContainer>
                      <LinkContainer to="/calendarTeacher">
                        <NavItem>Kalendarz</NavItem>
                      </LinkContainer>
                    </Fragment>
                  : <Fragment>
                      <LinkContainer to="/calendarStudent">
                        <NavItem>Kalendarz</NavItem>
                      </LinkContainer>  
                    </Fragment>
                }
                <LinkContainer to="/myCalendar">
                  <NavItem>Mój Kalendarz</NavItem>
                </LinkContainer>  
              </Fragment>
            : <Fragment>
              <LinkContainer to="/register">
                <NavItem>Zarejestruj</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Zaloguj</NavItem>
              </LinkContainer>
            </Fragment>
          }

          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />

      </div>
    );
  }
}

export default withRouter(App);
