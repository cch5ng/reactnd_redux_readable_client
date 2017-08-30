import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import '../App.css';

class Post extends Component {

  render() {
    const post = this.props.post
    return (
      <li key={post.id} className="post-list-item">
        {post.title}<br />
        Author: {post.author}<br />
        Votes: {post.voteScore} <ArrowUpIcon className="post-arrow-up-icon" onClick={(ev) => this.props.clickVote(ev, post.id)} /><ArrowDownIcon className="post-arrow-down-icon" onClick={this.props.clickVote} /><br />
        Time: {this.props.prettyTime(post.timestamp)}<br />
      </li>
    )
  }
}

function mapStateToProps({  }) {

  return {

  }
}

export default connect(mapStateToProps)(Post);
