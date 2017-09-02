import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'
import Nav from './components/Nav'
import PostForm from './components/PostForm'
import { REQUEST_POST_VOTE, RECEIVE_POST_VOTE, updatePostVote, fetchPostDelete } from './actions'
import { updateCommentVote } from './actions'
import './App.css';

class App extends Component {

  clickVote = this.clickVote.bind(this)
  sortList = this.sortList.bind(this)
  deletePostBtnClick = this.deletePostBtnClick.bind(this)

// EVENT HANDLERS

  clickVote(ev, objId) {
    const classList = ev.target.classList

    if (classList[0] === "post-arrow-up-icon") {
      this.props.dispatch(updatePostVote(objId, 'upVote'))
    }
    if (classList[0] === "post-arrow-down-icon") {
      this.props.dispatch(updatePostVote(objId, 'downVote'))
    }
    if (classList[0] === "comment-arrow-up-icon") {
      this.props.dispatch(updateCommentVote(objId, 'upVote'))
    }
    if (classList[0] === "comment-arrow-down-icon") {
      this.props.dispatch(updateCommentVote(objId, 'downVote'))
    }
  }

  deletePostBtnClick(postId) {
    this.props.dispatch(fetchPostDelete(postId))
  }

// HELPERS

  sortList(sortKey, sortOrderDesc, list) {
    let sortedList = []
    let sortKeysList = []
    let sortKeysList2

    list.forEach(item => {
      if (sortKeysList.indexOf(item[sortKey]) === -1) {
        sortKeysList.push(item[sortKey])
      }
    })
    sortKeysList2 = this.sortNumbersAr(sortKeysList)

    if (sortOrderDesc) {
      sortKeysList2.reverse()
      sortKeysList2.forEach(score => {
        let nextList = list.filter( item => (
          score === item[sortKey]
        ))
        sortedList = sortedList.concat(nextList)
      })
    }

    if (!sortOrderDesc) {
      sortKeysList2.forEach(score => {
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

  sortNumbersAr(numAr) {
    let sortedAr = []

    for (var i = 0; i < numAr.length; i++) {
      if (sortedAr.length === 0) {
        sortedAr.push(numAr[i])
      } else if (numAr[i] < sortedAr[0]) {
        sortedAr.unshift(numAr[i])
      } else if (numAr[i] > sortedAr[sortedAr.length - 1]) {
        sortedAr.push(numAr[i])
      } else {
        for (var j = 0; j < sortedAr.length - 1; j++) {
          if (numAr[i] >= sortedAr[j] && numAr[i] <= sortedAr[j + 1]) {
            let end = j + 1
            if (j === 0) {
              end = 1
            }
            let tempAr = sortedAr.slice(0, end).concat([numAr[i]]).concat(sortedAr.slice(j + 1))
            sortedAr = tempAr.slice(0)
            break
          }
        }         
      }
    }
    return sortedAr
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
              deletePostBtnClick={this.deletePostBtnClick}
              />
          )} />


          <Route exact path="/posts" render={() => (
            <Posts prettyTime={this.prettyTime} prettySortVotes={this.prettySortVotes} prettySortTime={this.prettySortTime}
              sortList={this.sortList} clickVote={this.clickVote} deletePostBtnClick={this.deletePostBtnClick}
            />
          )} />

          <Route exact path="/:category/posts" render={(match) => (
            <Posts prettyTime={this.prettyTime} match={match} prettySortVotes={this.prettySortVotes} 
              prettySortTime={this.prettySortTime} sortList={this.sortList} clickVote={this.clickVote}
              deletePostBtnClick={this.deletePostBtnClick}
            />
          )} />


          <Route exact path="/posts/:id" render={ ({match}) => (
            <PostDetail prettyTime={this.prettyTime} match={match} prettySortVotes={this.prettySortVotes} 
              prettySortTime={this.prettySortTime} sortList={this.sortList} clickVote={this.clickVote}
              deletePostBtnClick={this.deletePostBtnClick}
            />
          )} />

          <Route exact path="/newPost" render={ () => (
            <PostForm formType="create" />
          )} />

          <Route exact path="/editPost/:id" render={ ({match}) => (
            <PostForm formType="edit" match={match} />
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
