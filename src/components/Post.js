import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail } from '../actions'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import '../App.css';

class Post extends Component {

  render() {
    const link = `/posts/${this.props.post.id}`
    const post = this.props.post

    return (
      <div className="post-list-item">
        <Link to={link} >{post.title}</Link><br />
          Author: {post.author}<br />
          Votes: {post.voteScore} <ArrowUpIcon className="post-arrow-up-icon" onClick={(ev) => this.props.clickVote(ev, post.id)} /><ArrowDownIcon className="post-arrow-down-icon"  onClick={(ev) => this.props.clickVote(ev, post.id)} /><br />
          Time: {this.props.prettyTime(post.timestamp)}<br /> 
      </div>
    )
  }
}

export default Post
