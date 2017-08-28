import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, fetchCategories } from '../actions'
import { REQUEST_POSTS, RECEIVE_POSTS, fetchPosts } from '../actions'
import { FILTER_POSTS, filterPosts } from '../actions'
import '../App.css';

class Posts extends Component {

  categoryClick = this.categoryClick.bind(this)

  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
  }

  categoryClick(ev) {
    const filter = ev.target.innerHTML
    this.props.dispatch(filterPosts(filter))
  }

  render() {
    let categories = null
    let posts = null
    let postsFiltered = null
    if (this.props.categories.categories) {
      categories = this.props.categories.categories
    }

    if (this.props.posts.posts ) {
      posts = this.props.posts.posts
    }

    if (this.props.postsFilter.filter && posts) {
      if (this.props.postsFilter.filter !== 'all') {
        postsFiltered = posts.filter(post => (
          post.category === this.props.postsFilter.filter
        ))
      } else {
        postsFiltered = posts
      }
    }

    return (
      <div className="posts">
        <h3>Categories</h3>
        <ul onClick={this.categoryClick} >
          <Link to="/posts" key="postsAll" ><li key="all">all</li></Link>
          {categories
            ? categories.map((category, idx) => {
              let link = `/${category.name}/posts`
              let linkKey = `${category.name}${idx}`
              return (
                <Link to={link} key={linkKey} ><li key={category.name}>{category.name}</li></Link>
              )
            })
            : null
          }
        </ul>
        <h3>Posts</h3>
        <ul>
          {postsFiltered
            ? postsFiltered.map(post => (
              <li key={post.id}>{post.title}</li>
            ))
            : null
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ categories, posts, postsFilter }) {

  return {
    posts,
    categories,
    postsFilter
  }
}

export default connect(mapStateToProps)(Posts);
