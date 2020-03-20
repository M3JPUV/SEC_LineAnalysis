import React from "react";
import loginImg from "../../football.svg";
import axios from 'axios';

export class Login extends React.Component {
  state = {
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
    await axios.post('http://138.47.204.105:5000/api/login/', { "Email": this.state.email, "Password": this.state.password}).then(value => {
      this.setState({loginStatusA: "Successful Login"});
      this.setState({loginStatusB: "Redirecting to account page"});
      this.setState({loginStatusC: ""});
      this.setState({loginStatusD: ""});
      //Place to reset number of password attempts
    }).catch(error => {
      console.log(error.response.status);
    if (error.response.status == "402") {
      this.setState({loginStatusA: "Invalid Email"});
      this.setState({loginStatusB: "Please either create an account with us"});
      this.setState({loginStatusC: "OR"});
      this.setState({loginStatusD: "Please Re-Type your email"});
    }
    else if (error.response.status == "401") {
      this.setState({loginStatusA: "Incorrect Password"});
      this.setState({loginStatusB: "Please attempt to re-type the password"});
      this.setState({loginStatusC: ""});
      this.setState({loginStatusD: ""});
      //Place for number of invalid password attempts
    }});
  }

  //API goes here

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={e => this.onChange(e)} value={this.state.email} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={e => this.onChange(e)} value={this.state.password}/>
            </div>
    { this.state.show && (<div><label >{this.state.loginStatusA}</label></div>) }
    { this.state.show && (<div><label >{this.state.loginStatusB}</label></div>) }
    { this.state.show && (<div><label >{this.state.loginStatusC}</label></div>) }
    { this.state.show && (<div><label >{this.state.loginStatusD}</label></div>) }
          </div>
        </div>

        <div className="footer">
          <button type="button" className="btn" onClick={() => this.onSubmit()}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
