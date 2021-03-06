import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, filterPosts, sortPosts } from '../posts/PostActions'
import Post from '../posts/Post'
import { prettySortVotes, prettySortTime, sortList } from '../utils'
import '../App.css';

class Posts extends Component {

  state = {
    curCategory: 'all'
  }

  categoryClick = this.categoryClick.bind(this)
  postsSortClick = this.postsSortClick.bind(this)

  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  categoryClick(ev) {
    const filter = ev.target.innerHTML
    this.props.dispatch(filterPosts(filter))
    this.setState({curCategory: filter})
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
    let curCategory = null
    let categories = null
    let posts = null
    let postsFiltered = null
    let postsSorted = null
    let sortKey
    let sortOrderDesc

    if (this.props.postsSort) {
      sortKey = this.props.postsSort.sortKey
      sortOrderDesc = this.props.postsSort.sortOrderDesc
    }

    if (this.props.categories && this.props.categories.categories) {
      categories = this.props.categories.allIds.map(id => (
        this.props.categories.categories[id]
      ))
    }

    if (this.props.posts && this.props.posts.posts ) {
      posts = this.props.posts.allIds.map(id => (
        this.props.posts.posts[id]
      ))
    }

    if (this.props.postsFilter && this.props.postsFilter.filter && posts) {
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
              <Link to="/posts" key="postsAll" >
                <li key="all" className={this.state.curCategory === "all" ? "is-active-category" : ""}>all</li>
              </Link>
              {categories
                ? categories.map((category, idx) => {
                  let link = `/${category.name}/posts`
                  let linkKey = `${category.name}${idx}`
                  return (
                    <Link to={link} key={linkKey} >
                      <li key={category.name} className={category.name === this.state.curCategory ? "is-active-category" : ""}>
                        {category.name}
                      </li>
                    </Link>
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
                    <Post key={post.id} post={post} 
                      clickVote={this.props.clickVote} 
                      deletePostBtnClick={this.props.deletePostBtnClick} 
                      getCommentsCountFromPostId={this.props.getCommentsCountFromPostId}
                    />
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
