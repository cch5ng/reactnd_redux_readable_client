import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Posts from './components/Posts';
import Post from './components/Post'
import PostDetail from './components/PostDetail'
import Nav from './components/Nav'
import './App.css';

class App extends Component {

  prettyTime(timestampMs) {
    let dateStr = ''
    const dateTime = new Date(timestampMs)
    dateStr = dateTime.toString()

    return dateStr
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />

          <Route exact path="/" render={() => (
            <Posts prettyTime={this.prettyTime} />
          )} />


          <Route exact path="/posts" render={() => (
            <Posts prettyTime={this.prettyTime} />
          )} />

{/* TODO figure out how to pass the category data to the comp */}
          <Route exact path="/:category/posts" render={(match) => (
            <Posts prettyTime={this.prettyTime} match={match} />
          )} />


          <Route exact path="/posts/:id" render={ ({match}) => (
            <PostDetail prettyTime={this.prettyTime} match={match} />
            )
          }
          />

        </div>
      </Router>
    );
  }
}

export default App;
