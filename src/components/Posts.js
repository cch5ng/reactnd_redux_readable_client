import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, fetchCategories } from '../actions'
import { REQUEST_POSTS, RECEIVE_POSTS, fetchPosts } from '../actions'
import { FILTER_POSTS, filterPosts } from '../actions'
import { SORT_POSTS, sortPosts } from '../actions'
import Post from './Post'
import { prettySortVotes, prettySortTime, sortList } from '../utils'
import '../App.css';

class Posts extends Component {

  categoryClick = this.categoryClick.bind(this)
  postsSortClick = this.postsSortClick.bind(this)

  componentDidMount() {
    this.props.dispatch(fetchCategories())
    this.props.dispatch(fetchPosts())
  }

  categoryClick(ev) {
    const filter = ev.target.innerHTML
    this.props.dispatch(filterPosts(filter))
  }

  postsSortClick(ev) {
    const className = ev.target.className
    let sortKey = ''
    if (className.indexOf('voteScore') > -1) {
      sortKey = 'voteScore'
    }
    if (className.indexOf('timestamp') > -1) {
      sortKey = 'timestamp'      
    }
    this.props.dispatch(sortPosts(sortKey))
  }
 
  // HELPERS

  render() {
    let categories = null
    let posts = null
    let postsFiltered = null
    let postsSorted = null
    const { sortKey, sortOrderDesc } = this.props.postsSort
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
        postsFiltered = postsFiltered.filter(post => (
          post.deleted === false
        ))
      } else {
        postsFiltered = posts.filter(post => (
          post.deleted === false
        ))
      }
    }

    if (sortKey && postsFiltered) {
      postsSorted = sortList(sortKey, sortOrderDesc, postsFiltered)
    }

    return (
      <div className="posts-container">
        <h2>Posts</h2>
        <div className="filter-sort grid">
          <div className="col-50p">
            <h3>Filter by Category</h3>
            <ul onClick={this.categoryClick} className="categories-list">
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
          </div>

          <div className="col-50p">
            <h3>Sort Posts</h3>
            <ul onClick={this.postsSortClick} className="sort-key-list">
              <li className={ sortKey === "voteScore" ? "is-active-sort voteScore" : "voteScore" }>Sort by Votes ({prettySortVotes(sortOrderDesc)})</li>
              <li className={ sortKey === "timestamp" ? "is-active-sort timestamp" : "timestamp" }>Sort by Most Recent ({prettySortTime(sortOrderDesc)})</li>
            </ul>
          </div>
        </div>
        <div className="">
          <ul className="post-list">
            {postsSorted
              ? postsSorted.map(post => {
                  return (
                    <Post key={post.id} post={post} clickVote={this.props.clickVote} deletePostBtnClick={this.props.deletePostBtnClick} />
                  )
              })
              : null
            }
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories, posts, postsFilter, postsSort }) {

  return {
    posts,
    categories,
    postsFilter,
    postsSort
  }
}

export default connect(mapStateToProps)(Posts);
