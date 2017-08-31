import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'
import Nav from './components/Nav'
import PostForm from './components/PostForm'
import { REQUEST_POST_VOTE, RECEIVE_POST_VOTE, updatePostVote } from './actions'
import './App.css';

class App extends Component {

  clickVote = this.clickVote.bind(this)

// EVENT HANDLERS

  clickVote(ev, postId) {
    const classList = ev.target.classList

    switch(classList[0]) {
      case "post-arrow-up-icon":
        console.log('clickVote')
        this.props.dispatch(updatePostVote(postId, 'upVote'))
        return
      case "post-arrow-down-icon":
        this.props.dispatch(updatePostVote(postId, 'downVote'))
        return
      default:
        return
    }
  }

// HELPERS

  sortList(sortKey, sortOrderDesc, list) {
    let sortedList = []
    let sortKeysList = []

    list.forEach(item => {
      if (sortKeysList.indexOf(item[sortKey]) === -1) {
        sortKeysList.push(item[sortKey])
      }
    })
    sortKeysList.sort()

    if (sortOrderDesc) {
      sortKeysList.reverse()
      sortKeysList.forEach(score => {
        let nextList = list.filter( item => (
          score === item[sortKey]
        ))
        sortedList = sortedList.concat(nextList)
      })
    }

    if (!sortOrderDesc) {
      sortKeysList.forEach(score => {
        let nextList = list.filter( item => (
          score === item[sortKey]
        ))
        sortedList = sortedList.concat(nextList)
      })
    }
    return sortedList
  }

  prettyTime(timestampMs) {
    let dateStr = ''
    const dateTime = new Date(timestampMs)
    dateStr = dateTime.toString()

    return dateStr
  }

  prettySortVotes(sortOrderDesc) {
    switch(sortOrderDesc) {
      case true:
        return 'high to low'
      case false:
        return 'low to high'
      default:
        return 'unknown'
    }
  }

  prettySortTime(sortOrderDesc) {
    switch(sortOrderDesc) {
      case true:
        return 'recent to oldest'
      case false:
        return 'oldest to recent'
      default:
        return 'unknown'
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />

          <Route exact path="/" render={() => (
            <Posts prettyTime={this.prettyTime} 
              prettySortVotes={this.prettySortVotes} 
              prettySortTime={this.prettySortTime} 
              sortList={this.sortList}
              clickVote={this.clickVote}
              />
          )} />


          <Route exact path="/posts" render={() => (
            <Posts prettyTime={this.prettyTime} prettySortVotes={this.prettySortVotes} prettySortTime={this.prettySortTime} sortList={this.sortList} clickVote={this.clickVote}/>
          )} />

          <Route exact path="/:category/posts" render={(match) => (
            <Posts prettyTime={this.prettyTime} match={match} prettySortVotes={this.prettySortVotes} prettySortTime={this.prettySortTime} sortList={this.sortList} clickVote={this.clickVote}/>
          )} />


          <Route exact path="/posts/:id" render={ ({match}) => (
            <PostDetail prettyTime={this.prettyTime} match={match} prettySortVotes={this.prettySortVotes} prettySortTime={this.prettySortTime} sortList={this.sortList} clickVote={this.clickVote}/>
          )} />

          <Route exact path="/newPost" render={ ({}) => (
            <PostForm />
          )} />

        </div>
      </Router>
    );
  }
}

function mapStateToProps({ postVote }) {

  return {
    postVote
  }
}

export default connect(mapStateToProps)(App);
