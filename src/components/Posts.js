import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, fetchCategories } from '../actions'
import { REQUEST_POSTS, RECEIVE_POSTS, fetchPosts } from '../actions'
import { FILTER_POSTS, filterPosts } from '../actions'
import { SORT_POSTS, sortPosts } from '../actions'
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
    const sortKey = ev.target.id
    console.log('sortKey: ' + sortKey)
    this.props.dispatch(sortPosts(sortKey))
  }
 
  // HELPERS
// TODO need troubleshoot
  sortPosts(sortKey, sortOrderDesc, posts) {
    let sortedPosts = []

// TODO pretty sure this needs refactor
    if (sortOrderDesc && sortKey === "voteScore") {
      posts.forEach(post => {
        if (sortedPosts.length === 0) {
          sortedPosts.push(post)
        } else if (sortedPosts.length === 1 && post.voteScore >= sortedPosts[0].voteScore){
          sortedPosts.unshift(post)
        } else if (sortedPosts.length === 1 && post.voteScore <= sortedPosts[sortedPosts.length - 1].voteScore) {
          sortedPosts.push(post)        
        } else {
          for (var i = 1; i < sortedPosts.length - 1; i++) {
            if (post.voteScore <= sortedPosts[i].voteScore && post.voteScore >= sortedPosts[i].voteScore) {
              let tempAr = []
              tempAr = [...sortedPosts.slice(0, i), post, ...sortedPosts.slice(i+1)]
              sortedPosts = tempAr
            }
          }        
        }
      })     
    }

    if (!sortOrderDesc && sortKey === "voteScore") {
      posts.forEach(post => {
        if (sortedPosts.length === 0) {
          sortedPosts.push(post)
        } else if (sortedPosts.length === 1 && post.voteScore <= sortedPosts[0].voteScore){
          sortedPosts.unshift(post)
        } else if (sortedPosts.length === 1 && post.voteScore >= sortedPosts[sortedPosts.length - 1].voteScore) {
          sortedPosts.push(post)        
        } else {
          for (var i = 1; i < sortedPosts.length - 1; i++) {
            if (post.voteScore >= sortedPosts[i].voteScore && post.voteScore <= sortedPosts[i].voteScore) {
              let tempAr = []
              tempAr = [...sortedPosts.slice(0, i), post, ...sortedPosts.slice(i+1)]
              sortedPosts = tempAr
            }
          }        
        }
      })     
    }

    if (sortOrderDesc && sortKey === "timestamp") {
      posts.forEach(post => {
        if (sortedPosts.length === 0) {
          sortedPosts.push(post)
        } else if (sortedPosts.length === 1 && post.timestamp >= sortedPosts[0].timestamp){
          sortedPosts.unshift(post)
        } else if (sortedPosts.length === 1 && post.timestamp <= sortedPosts[sortedPosts.length - 1].timestamp) {
          sortedPosts.push(post)        
        } else {
          for (var i = 1; i < sortedPosts.length - 1; i++) {
            if (post.timestamp <= sortedPosts[i].timestamp && post.timestamp >= sortedPosts[i].timestamp) {
              let tempAr = []
              tempAr = [...sortedPosts.slice(0, i), post, ...sortedPosts.slice(i+1)]
              sortedPosts = tempAr
            }
          }        
        }
      })     
    }

    if (!sortOrderDesc && sortKey === "timestamp") {
      posts.forEach(post => {
        if (sortedPosts.length === 0) {
          sortedPosts.push(post)
        } else if (sortedPosts.length === 1 && post.timestamp <= sortedPosts[0].timestamp){
          sortedPosts.unshift(post)
        } else if (sortedPosts.length === 1 && post.timestamp >= sortedPosts[sortedPosts.length - 1].timestamp) {
          sortedPosts.push(post)        
        } else {
          for (var i = 1; i < sortedPosts.length - 1; i++) {
            if (post.timestamp >= sortedPosts[i].timestamp && post.timestamp <= sortedPosts[i].timestamp) {
              let tempAr = []
              tempAr = [...sortedPosts.slice(0, i), post, ...sortedPosts.slice(i+1)]
              sortedPosts = tempAr
            }
          }        
        }
      })     
    }

    return sortedPosts
  }

  prettyTime(timestampMs) {

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
      } else {
        postsFiltered = posts
      }
    }

    if (sortKey && postsFiltered) {
      postsSorted = this.sortPosts(sortKey, sortOrderDesc, postsFiltered)
      console.log('postsSorted: ' + postsSorted)
    }

    return (
      <div className="posts">
        <div>
          <h3>Categories</h3>
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
        <div>
          <h3>Posts</h3>
          <ul onClick={this.postsSortClick} className="sort-key-list">
            <li id="voteScore" className={ sortKey === "voteScore" ? "is-active-sort" : "" }>Sort by Votes ({this.prettySortVotes(sortOrderDesc)})</li>
            <li id="timestamp" className={ sortKey === "timestamp" ? "is-active-sort" : "" }>Sort by Most Recent ({this.prettySortTime(sortOrderDesc)})</li>
          </ul>
          <ul className="post-list">
            {postsSorted
              ? postsSorted.map(post => (
                <li key={post.id} className="post-list-item">
                  {post.title}<br />
                  Author: {post.author}<br />
                  Votes: {post.voteScore}<br />
                  Time: {post.timestamp}<br />

                </li>
              ))
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
