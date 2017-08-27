import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, fetchCategories } from '../actions'
import { REQUEST_POSTS, RECEIVE_POSTS, fetchPosts } from '../actions'
import '../App.css';

class Posts extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
    // fetch all categories
    // fetch all posts
  }

  render() {
    let categories = null
    let posts = null
    if (this.props.categories.categories) {
      categories = this.props.categories.categories
      //const categoriesAr = categories
      console.log('len categories ar: ' + categories.length)
    }

    if (this.props.posts.posts) {
      posts = this.props.posts.posts
      console.log('len posts ar: ' + posts.length)
    }

    return (
      <div className="posts">
        <ul>
          {categories
            ? categories.map((category, idx) => (
              <li key={category.name}>{category.name}</li>
            ))
            : null
          }
        </ul>
        <ul>
          {posts
            ? posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))
            : null
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {

  return {
    posts,
    categories
  }
}

export default connect(mapStateToProps)(Posts);
