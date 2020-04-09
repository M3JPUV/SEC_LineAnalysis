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

export default class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        token: "holder",
      }
    }

    handleToken = (data) => {
      this.setState({token: data});
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
              <Home token={this.state.token}/>
            </Route>
            <Route path="/about">
              <About token={this.state.token}/>
            </Route> 
            <Route path="/Login">
              <Login token={this.state.token} parentCallback = {this.handleToken}/>
            </Route>
            <Route path="/Register">
              <Register token={this.state.token}/>
            </Route>
            <Route path="/Subscriptions">
              <Subscriptions token={this.state.token}/>
            </Route>
            <Route path="/Basic">
              <Basic token={this.state.token}/>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </React.Fragment>
    );
  }
}
