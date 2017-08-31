import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail } from '../actions'
import { REQUEST_COMMENTS, RECEIVE_COMMENTS, fetchComments } from '../actions'
import { SORT_COMMENTS, sortComments } from '../actions'

import '../App.css';

class PostDetail extends Component {

  commentsSortClick = this.commentsSortClick.bind(this)

  commentsSortClick(ev) {
    const className = ev.target.className
    let sortKey = ''
    if (className.indexOf('voteScore') > -1) {
      sortKey = 'voteScore'
    }
    if (className.indexOf('timestamp') > -1) {
      sortKey = 'timestamp'      
    }
    this.props.dispatch(sortComments(sortKey))
  }

  componentDidMount() {
    // dispatch fetch to get the post data based on the id
    const postId = this.props.match.params.id
    this.props.dispatch(fetchPostDetail(postId))
    this.props.dispatch(fetchComments(postId))
  }

  render() {
    let postDetail = null
    let comments = null
    let commentsSort = null
    // var will store the sorted commments
    let commentsOrdered = null
    const { sortKey, sortOrderDesc } = this.props.commentsSort

    if (this.props.postDetail.postDetail) {
      postDetail = this.props.postDetail.postDetail
    }
    if (this.props.comments.comments) {
      comments = this.props.comments.comments
    }
    if (this.props.commentsSort) {
      commentsSort = this.props.commentsSort
    }
    if (sortKey && comments && comments.length) {
      commentsOrdered = this.props.sortList(sortKey, sortOrderDesc, comments)
    }

    return (
      <div>
      { postDetail
        ? <div>
            <div className="post-detail">
              <h3>{postDetail.title}</h3>
              <Link to={`/editPost/${postDetail.id}`}><button>Edit</button></Link><br />
              <p>{postDetail.body}</p>
              <p>Author: {postDetail.author}</p>
              <p>Votes: {postDetail.voteScore}</p>
              <p>Time: {this.props.prettyTime(postDetail.timestamp)}</p>

              <h4>Comments</h4>

              <ul onClick={this.commentsSortClick} className="sort-key-list">
                <li className={ commentsSort.sortKey === "voteScore" ? "is-active-sort voteScore" : "voteScore" }>Sort by Votes ({this.props.prettySortVotes(commentsSort.sortOrderDesc)})</li>
                <li className={ commentsSort.sortKey === "timestamp" ? "is-active-sort timestamp" : "timestamp" }>Sort by Most Recent ({this.props.prettySortTime(commentsSort.sortOrderDesc)})</li>
              </ul>

              <ul className="comments-list">
                { commentsOrdered 
                  ? commentsOrdered.map(comment => (
                    <li key={comment.id} className="comments-list-item">
                      {comment.body}<br />
                      Author: {comment.author}<br />
                      Votes: {comment.voteScore}<br />
                      Time: {this.props.prettyTime(comment.timestamp)}
                    </li>
                  ))
                  : null
                }
              </ul>
            </div>
          </div>
        : null
      }
      </div>
    )
  }
}

function mapStateToProps({ postDetail, comments, commentsSort }) {
  return {
    postDetail,
    comments,
    commentsSort
  }
}

export default connect(mapStateToProps)(PostDetail);
