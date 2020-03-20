import React from "react";
import loginImg from "../../football.svg";
import axios from 'axios';

export class Register extends React.Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    loginStatusA: '',
    loginStatusB: '',
    loginStatusC: '',
    loginStatusD: '',
    show: false,
  }
  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = async () => {
    this.setState({show: true});
    await axios.post('http://138.47.204.105:5000/api/signup/', { "FirstName": this.state.firstname, "LastName": this.state.lastname, "Email": this.state.email, "Password": this.state.password}).then(value => {
      this.setState({loginStatusA: "Successful Login"});
      this.setState({loginStatusB: "Redirecting to login page"});
      this.setState({loginStatusC: ""});
      this.setState({loginStatusD: ""});
    }).catch(error => {
      console.log(error.response.status);
    if (error.response.status == "400") {
      this.setState({loginStatusA: "Invalid Signup"});
      this.setState({loginStatusB: ""});
      this.setState({loginStatusC: ""});
      this.setState({loginStatusD: "This account has already been created"});
    }
    else if (error.response.status == "500") {
      this.setState({loginStatusA: "Invalid Signup"});
      this.setState({loginStatusB: ""});
      this.setState({loginStatusC: ""});
      this.setState({loginStatusD: "Your sign-up information is invalid"});
      //Place to reset number of password attempts
    }
  });
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
          <div className="form-group">
              <label htmlFor="firstname">FirstName</label>
              <input type="text" name="firstname" placeholder="firstname" onChange={e => this.onChange(e)} value={this.state.firstname}/>
            </div>
            <div className="form-group">
              <label htmlFor="lastname">LastName</label>
              <input type="text" name="lastname" placeholder="lastname" onChange={e => this.onChange(e)} value={this.state.lastname}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={e => this.onChange(e)} value={this.state.email}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" onChange={e => this.onChange(e)} value={this.state.password}/>
            </div>
    { this.state.show && (<div><label >{this.state.loginStatusA}</label></div>) }
    { this.state.show && (<div><label >{this.state.loginStatusB}</label></div>) }
    { this.state.show && (<div><label >{this.state.loginStatusC}</label></div>) }
    { this.state.show && (<div><label >{this.state.loginStatusD}</label></div>) }
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={() => this.onSubmit()}>
            Register
          </button>
        </div>
      </div>
    );
  }
}
