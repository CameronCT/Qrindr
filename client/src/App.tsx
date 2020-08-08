import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/pages/Home/Home";
import NavigationMobile from "./components/navigation/NavigationMobile";
import NavigationDesktop from "./components/navigation/NavigationDesktop";

export const App = () => {
  return (
      <BrowserRouter>
        <NavigationDesktop />
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
        </div>
          <NavigationMobile />
      </BrowserRouter>
  );
};