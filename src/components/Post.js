import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import '../App.css';

class Post extends Component {

  render() {
    const post = this.props.post
    const link = `/posts/${post.id}`

    return (
      <div key={post.id} className="post-list-item">
        <Link to={link} >{post.title}</Link><br />
        <Link to={link} >Author: {post.author}</Link><br />
        Votes: {post.voteScore} <ArrowUpIcon className="post-arrow-up-icon" onClick={(ev) => this.props.clickVote(ev, post.id)} /><ArrowDownIcon className="post-arrow-down-icon"  onClick={(ev) => this.props.clickVote(ev, post.id)} /><br />
        <Link to={link} >Time: {this.props.prettyTime(post.timestamp)}</Link><br />
      </div>
    )
  }
}

function mapStateToProps({  }) {

  return {

  }
}

export default connect(mapStateToProps)(Post);
