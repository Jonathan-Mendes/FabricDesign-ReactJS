import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import CriarDesenhos from "./components/CriarDesenhos";
import Desenhos from "./components/Desenhos";
import Desenho from "./components/Desenho";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/criar-desenhos" component={CriarDesenhos} />
          <Route exact path="/desenhos" component={Desenhos} />
          <Route exact path="/desenho/:id" component={Desenho} />
        </Switch >
      </BrowserRouter >
    );
  }
}
