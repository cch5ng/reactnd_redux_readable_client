import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail } from '../actions'

import '../App.css';

class PostDetail extends Component {

  componentDidMount() {
    // dispatch fetch to get the post data based on the id
    const postId = this.props.match.params.id
    this.props.dispatch(fetchPostDetail(postId))

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
          </div>
        : null
      }
      </div>
    )
  }
}

function mapStateToProps({ postDetail }) {

  return {
    postDetail
  }
}

export default connect(mapStateToProps)(PostDetail);


/* 
      <li key={post.id} className="post-list-item">
        {post.title}<br />
        Author: {post.author}<br />
        Votes: {post.voteScore}<br />
        Time: {this.props.prettyTime(post.timestamp)}<br />
      </li>
*/
