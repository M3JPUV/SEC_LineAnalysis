import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
import { Home } from './components/Home.js';
import { About } from './About';
import Sidebar from './components/Sidebar';
import { Login } from './components/login';
import {Register} from './components/register';
import {Layout} from './components/Layout';
import {Subscriptions} from './components/Subscriptions';
import {Basic} from './components/Basic';
import {Advanced} from './components/Advanced'

export default class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        token: "holder",
        loginCredentials: "N/A",
      }
    }

    handleToken = (data) => {
      this.setState({token: data});
    }

    handleLoginC = (data) => {
      this.setState({loginCredentials: data});
    }

    render() {
      return(
    <React.Fragment>
      <Router>
        <NavigationBar />
        <Sidebar />
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route> 
            <Route path="/Login">
              <Login parentCallbackT = {this.handleToken} parentCallbackL = {this.handleLoginC} />
            </Route>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/Subscriptions">
              <Subscriptions token={this.state.token} LC={this.state.loginCredentials}/>
            </Route>
            <Route path="/Basic">
              <Basic token={this.state.token} LC={this.state.loginCredentials}/>
            </Route>
            <Route path="/Advanced">
              <Advanced token={this.state.token} LC={this.state.loginCredentials}/>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </React.Fragment>
    );
  }
}
