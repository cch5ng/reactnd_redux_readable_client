import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Posts from './components/Posts';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Route path="/posts" render={() => (
            <Posts />
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
