import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from './components/Posts'
import PostDetail from './components/PostDetail'
import Nav from './components/Nav'
import PostForm from './components/PostForm'
import { fetchPosts, updatePostVote, fetchPostDelete } from './actions'
import './App.css';

class App extends Component {

  clickVote = this.clickVote.bind(this)
  deletePostBtnClick = this.deletePostBtnClick.bind(this)
  getPostFromId = this.getPostFromId.bind(this)

  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

// EVENT HANDLERS

  clickVote(ev, objId) {
    const classList = ev.target.classList

    if (classList[0] === "post-arrow-up-icon") {
      this.props.dispatch(updatePostVote(objId, 'upVote'))
    }
    if (classList[0] === "post-arrow-down-icon") {
      this.props.dispatch(updatePostVote(objId, 'downVote'))
    }
  }

  deletePostBtnClick(postId) {
    this.props.dispatch(fetchPostDelete(postId))
  }

  getPostFromId(postId) {
    let tpost

    if (this.props.posts && this.props.posts.posts) {
      tpost = this.props.posts.posts.filter(post => (
        post.id === postId
      ))

      return tpost[0]
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />

          <Route exact path="/" render={() => (
            <Posts
              clickVote={this.clickVote}
              deletePostBtnClick={this.deletePostBtnClick}
              />
          )} />


          <Route exact path="/posts" render={() => (
            <Posts clickVote={this.clickVote}
              deletePostBtnClick={this.deletePostBtnClick}
            />
          )} />

          <Route exact path="/:category/posts" render={(match) => (
            <Posts match={match} clickVote={this.clickVote}
              deletePostBtnClick={this.deletePostBtnClick}
            />
          )} />


          <Route exact path="/posts/:id" render={ ({match}) => (
            <PostDetail match={match} clickVote={this.clickVote} deletePostBtnClick={this.deletePostBtnClick}
            />
          )} />

          <Route exact path="/newPost" render={ () => (
            <PostForm formType="create" />
          )} />

          <Route exact path="/editPost/:id" render={ ({match}) => (
            <PostForm formType="edit" match={match} post={this.getPostFromId(match.params.id)} />
          )} />


        </div>
      </Router>
    );
  }
}

function mapStateToProps({ postVote, posts }) {

  return {
    postVote,
    posts
  }
}

export default connect(mapStateToProps)(App);
