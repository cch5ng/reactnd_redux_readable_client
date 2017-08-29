import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'
import Nav from './components/Nav'
import './App.css';

class App extends Component {

// HELPERS

  sortList(sortKey, sortOrderDesc, list) {
    let sortedList = []
    console.log('sortKey: ' + sortKey)
    console.log('len list: ' + list.length)

    if (sortOrderDesc) {
      list.forEach(item => {
        if (sortedList.length === 0) {
          sortedList.push(item)
        } else if (sortedList.length === 1 && item[sortKey] >= sortedList[0][sortKey]){
          sortedList.unshift(item)
        } else if (sortedList.length === 1 && item[sortKey] < sortedList[sortedList.length - 1][sortKey]) {
          console.log('gets App.js line 27')
          sortedList.push(item)        
        } else {
          for (var i = 1; i < sortedList.length - 1; i++) {
            if (item.sortKey <= sortedList[i][sortKey] && item[sortKey] >= sortedList[i][sortKey]) {
              let tempAr = []
              tempAr = [...sortedList.slice(0, i), item, ...sortedList.slice(i+1)]
              sortedList = tempAr
            }
          } 
        }
      })
    }

    if (!sortOrderDesc) {
      list.forEach(item => {
        if (sortedList.length === 0) {
          sortedList.push(item)
        } else if (sortedList.length === 1 && item[sortKey] <= sortedList[0][sortKey]){
          sortedList.unshift(item)
        } else if (sortedList.length === 1 && item[sortKey] > sortedList[sortedList.length - 1][sortKey]) {
          sortedList.push(item)        
        } else {
          for (var i = 1; i < sortedList.length - 1; i++) {
            if (item.sortKey >= sortedList[i][sortKey] && item[sortKey] <= sortedList[i][sortKey]) {
              let tempAr = []
              tempAr = [...sortedList.slice(0, i), item, ...sortedList.slice(i+1)]
              sortedList = tempAr
            }
          }
        }
      })
    }
    console.log('len sortedList: ' + sortedList.length)
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
            <Posts prettyTime={this.prettyTime} prettySortVotes={this.prettySortVotes} prettySortTime={this.prettySortTime} sortList={this.sortList}/>
          )} />


          <Route exact path="/posts" render={() => (
            <Posts prettyTime={this.prettyTime} prettySortVotes={this.prettySortVotes} prettySortTime={this.prettySortTime} sortList={this.sortList}/>
          )} />

{/* TODO figure out how to pass the category data to the comp */}
          <Route exact path="/:category/posts" render={(match) => (
            <Posts prettyTime={this.prettyTime} match={match} prettySortVotes={this.prettySortVotes} prettySortTime={this.prettySortTime} sortList={this.sortList}/>
          )} />


          <Route exact path="/posts/:id" render={ ({match}) => (
            <PostDetail prettyTime={this.prettyTime} match={match} prettySortVotes={this.prettySortVotes} prettySortTime={this.prettySortTime} sortList={this.sortList}/>
            )
          }
          />

        </div>
      </Router>
    );
  }
}

export default App;
