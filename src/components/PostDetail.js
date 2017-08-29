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
    if (this.props.postDetail.postDetail) {
      postDetail = this.props.postDetail.postDetail
    }
    return (
      <div>
      { postDetail
        ? <div>
            <h3>{postDetail.title}</h3>
            <p>{postDetail.body}</p>
            <p>Author: {postDetail.author}</p>
            <p>Votes: {postDetail.voteScore}</p>
            <p>Time: {this.props.prettyTime(postDetail.timestamp)}</p>

            <h3>Comments</h3>
            <ul>
              list of comments
            </ul>
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
