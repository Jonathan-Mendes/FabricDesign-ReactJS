import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Aplication from "./components/Aplication";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/" component={Aplication} />
        </Switch >
      </BrowserRouter >
    );
  }
}
