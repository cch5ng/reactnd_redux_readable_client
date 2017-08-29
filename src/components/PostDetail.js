import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail } from '../actions'
import { REQUEST_COMMENTS, RECEIVE_COMMENTS, fetchComments } from '../actions'

import '../App.css';

class PostDetail extends Component {

  componentDidMount() {
    // dispatch fetch to get the post data based on the id
    const postId = this.props.match.params.id
    this.props.dispatch(fetchPostDetail(postId))
    this.props.dispatch(fetchComments(postId))
  }

  render() {
    let postDetail = null
    let comments = null
    if (this.props.postDetail.postDetail) {
      postDetail = this.props.postDetail.postDetail
    }
    if (this.props.comments.comments) {
      comments = this.props.comments.comments
    }
    return (
      <div>
      { postDetail
        ? <div>
            <div className="post-detail">
              <h3>{postDetail.title}</h3>
              <p>{postDetail.body}</p>
              <p>Author: {postDetail.author}</p>
              <p>Votes: {postDetail.voteScore}</p>
              <p>Time: {this.props.prettyTime(postDetail.timestamp)}</p>

              <h4>Comments</h4>
              <ul className="comments-list">
                { comments 
                  ? comments.map(comment => (
                    <li key={comment.id} className="comments-list-item">
                      {comment.body}<br />
                      Author: {comment.author}<br />
                      Votes: {comment.voteScore}<br />
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

function mapStateToProps({ postDetail, comments }) {
  return {
    postDetail,
    comments
  }
}

export default connect(mapStateToProps)(PostDetail);
