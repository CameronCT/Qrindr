import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import NavigationDesktop from "./components/navigation/NavigationDesktop";
import Match from "./components/pages/Match/Match";

export const App = () => {
  return (
      <BrowserRouter>
        <div className="flex min-h-screen">
            <NavigationDesktop />
            <div className="p-4 md:p-6 lg:p-12 w-full">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/match" component={Match} />
                </Switch>
            </div>
        </div>
      </BrowserRouter>
  );
};