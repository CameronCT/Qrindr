import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import NavigationDesktop from "./components/navigation/NavigationDesktop";
import Match from "./components/pages/Match/Match";
import About from "./components/pages/About/About";
import Stream from "./components/pages/Stream/Stream";

export const App = () => {
  return (
      <BrowserRouter>
        <div className="flex min-h-screen">
            <NavigationDesktop />
            <div className="p-4 md:p-6 lg:p-12 w-full">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/match/:hash/:secret/:player" component={Match} />
                    <Route path="/match/:hash" component={Match} />
                    <Route path="/stream/:hash" component={Stream} />
                </Switch>
            </div>
        </div>
      </BrowserRouter>
  );
};