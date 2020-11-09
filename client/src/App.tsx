import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import NavigationDesktop from "./components/navigation/NavigationDesktop";
import Match from "./components/pages/Match/Match";
import About from "./components/pages/About/About";
import Stream from "./components/pages/Stream/Stream";
import Create from "./components/pages/Create/Create";

export const App = () => {
  return (
      <BrowserRouter>
            <NavigationDesktop />
            <div className={"w-10/12 mx-auto"}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/create" component={Create} />
                    <Route path="/match/:hash/:secret/:player" component={Match} />
                    <Route path="/match/:hash" component={Match} />
                    <Route path="/stream/:hash" component={Stream} />
                </Switch>
            </div>
            <div className={"text-center p-3 uppercase text-sm text-white font-semibold my-6"}>
                &copy; Qrindr 2020 - Created by CameronCT
            </div>
      </BrowserRouter>
  );
};