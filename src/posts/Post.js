import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import { prettyTime } from '../utils'
import '../App.css';

class Post extends Component {

  render() {
    const link = `/posts/${this.props.post.id}`
    const post = this.props.post

    return (
      <div className="post-list-item">
        <Link to={link} >{post.title}</Link><br />
        <Link to={`/editPost/${post.id}`}><button className="button">Edit</button></Link> <button className="button" onClick={(ev) => this.props.deletePostBtnClick(post.id)} >Delete</button><br />
          Author: {post.author}<br />
          Votes: {post.voteScore} <ArrowUpIcon className="post-arrow-up-icon" onClick={(ev) => this.props.clickVote(ev, post.id)} /><ArrowDownIcon className="post-arrow-down-icon"  onClick={(ev) => this.props.clickVote(ev, post.id)} /><br />
          Last updated: {prettyTime(post.timestamp)}<br /> 
      </div>
    )
  }
}

export default Post
