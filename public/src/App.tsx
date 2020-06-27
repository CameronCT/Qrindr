import React from 'react';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './components/pages/home/Home';
import Match from './components/pages/match/Match';
import About from './components/pages/about/About';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App flex min-h-screen tracking-normal">
      <Navigation />
        <div className="flex-1">
            <div className="p-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 mx-auto">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/match/:hash/" component={Match} />
                        <Route path="/match/:hash/:secret/:player" component={Match} />
                    </Switch>
                </Router>
                <Footer />
            </div>
        </div>
    </div>
  );
}

export default App;
