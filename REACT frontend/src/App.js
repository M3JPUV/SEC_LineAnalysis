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

function App() {
  return (
    <React.Fragment>
          <Router>
            <NavigationBar />
            <Sidebar />
              <Layout>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/Login" component={Login} />
                  <Route path="/Register" component={Register} />
                  <Route path="/Subscriptions" component={Subscriptions} />
                  <Route path="/Basic" component={Basic} />
                </Switch>
              </Layout>
          </Router>
    </React.Fragment>
  );
}

export default App;
