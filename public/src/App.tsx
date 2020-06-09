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
      <Router>
        <div className="App">
          <Navigation />
            <div className="max-w-screen-lg mx-auto">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/match" component={Match} />
                </Switch>
            </div>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
