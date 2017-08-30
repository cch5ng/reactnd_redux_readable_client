import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import { connect } from 'react-redux'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import '../App.css';

class Post extends Component {

  render() {
    const link = `/posts/${this.props.post.id}`

    return (
      <div className="post-list-item">
        <Link to={link} >{this.props.post.title}</Link><br />
        Author: {this.props.post.author}<br />
        Votes: {this.props.post.voteScore} <ArrowUpIcon className="post-arrow-up-icon" onClick={(ev) => this.props.clickVote(ev, this.props.post.id)} /><ArrowDownIcon className="post-arrow-down-icon"  onClick={(ev) => this.props.clickVote(ev, this.props.post.id)} /><br />
        Time: {this.props.prettyTime(this.props.post.timestamp)}<br />
      </div>
    )
  }
}

// function mapStateToProps({ }) {

//   return {
//   }
// }

// export default connect(mapStateToProps)(Post);

export default Post
