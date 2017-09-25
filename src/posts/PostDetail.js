import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import { fetchPostDetail } from '../posts/PostActions'
import Comments from '../comments/Comments'
import { prettyTime, sortList } from '../utils'
import '../App.css';

class PostDetail extends Component {

  componentDidMount() {
    // dispatch fetch to get the post data based on the id
    const postId = this.props.match.params.id
    this.props.dispatch(fetchPostDetail(postId))
  }

  render() {
    let postDetail = null
    let comments
    let commentsCount
    const postId = this.props.match.params.id

    if (this.props.postDetail.postDetail) {
      postDetail = this.props.postDetail.postDetail
    }
    if (this.props.comments.comments) {
      comments = this.props.comments.comments
    }
    commentsCount = this.props.getCommentsCountFromPostId(comments, postId)

    return (
      <div>
      { postDetail
        ? <div>
            <div className="post-detail">
              <div className="post-detail-sect">
                <h2>Post</h2>
                <Link to={`/editPost/${postDetail.id}`}><button className="button">Edit</button></Link> <button className="button" onClick={(ev) => this.props.deletePostBtnClick(postDetail.id)}>Delete</button><br />
                <p>{postDetail.title}</p>
                <p>{postDetail.body}</p>
                <p>Category: {postDetail.category}</p>
                <p>Author: {postDetail.author} updated {prettyTime(postDetail.timestamp)}</p>
                <p>Votes: {postDetail.voteScore}  <ArrowUpIcon className="post-arrow-up-icon" onClick={(ev) => this.props.clickVote(ev, postDetail.id)} /><ArrowDownIcon className="post-arrow-down-icon"  onClick={(ev) => this.props.clickVote(ev, postDetail.id)} /></p>
                <p>{commentsCount} Comments</p>
              </div>
              <Comments postId={this.props.match.params.id} commentEditBtnClick={this.props.commentEditBtnClick} 
                commentDeleteBtnClick={this.props.commentDeleteBtnClick} clickVote={this.props.clickVote} 
                sortList={sortList}
              />
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
