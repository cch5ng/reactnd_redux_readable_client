import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import uuidv1 from 'uuid/v1'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail } from '../actions'
import { REQUEST_COMMENTS, RECEIVE_COMMENTS, fetchComments } from '../actions'
import { SORT_COMMENTS, sortComments } from '../actions'
import { RECEIVE_COMMENT_CREATE, REQUEST_COMMENT_CREATE, fetchCommentCreate } from '../actions'
import { toggleCommentFormActive, updateCommentFormField, setCommentFormType } from '../actions'

import '../App.css';

class PostDetail extends Component {

  commentsSortClick = this.commentsSortClick.bind(this)
  formSubmit = this.formSubmit.bind(this)
  closeModal = this.closeModal.bind(this)
  commentEditBtnClick = this.commentEditBtnClick.bind(this)
  formInputUpdate = this.formInputUpdate.bind(this)

  componentDidMount() {
    // dispatch fetch to get the post data based on the id
    const postId = this.props.match.params.id
    this.props.dispatch(fetchPostDetail(postId))
    this.props.dispatch(fetchComments(postId))
  }

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

  // modal form submit
  formSubmit(ev) {
    ev.preventDefault()
    const curDateMs = Date.now()
    let commentFormState
    let commentTimestamp
    let commentId
    // if (this.props.formType === "create") {
       commentTimestamp = curDateMs
       commentId = uuidv1()
    // } else {
    //   postTimestamp = Date.parse(this.props.postFormState.timestamp)
    // }
    let formData
    const parentId = this.props.match.params.id
    if (this.props.commentFormState) {
      //commentFormState = this.props.commentFormState

// console.log('this.props.postFormState.voteScore: ' + typeof this.props.postFormState.voteScore)
      formData = {
        id: commentId,
        body: this.props.commentFormState.body,
        author: this.props.commentFormState.author,
//         voteScore: parseInt(this.props.postFormState.voteScore),
        timestamp: commentTimestamp,
        parentId
      }
    }

//     // create form
//     if (this.props.formType === "create") {
       this.props.dispatch(fetchCommentCreate(formData))
//     }

//     // edit form
//     if (this.props.formType === "edit") {
//       this.props.dispatch(fetchPostEdit(postId, formData))
//     }
  }

  commentEditBtnClick(ev) {
    let btnId = ev.target.id
    let formType = btnId.split('-')
    this.props.dispatch(toggleCommentFormActive())
    this.props.dispatch(setCommentFormType(formType[0]))
  }

  closeModal() {
    this.props.dispatch(toggleCommentFormActive())
  }

  formInputUpdate(ev) {
    const id = ev.target.id
    let value = ev.target.value
    // the className format is like 'ptitle' to differentiate b/t post and comment
    let prettyId = id.slice(1)
    let stateObj = {}

    if (prettyId === "voteScore") {
      value = parseInt(value)
    }
    stateObj[prettyId] = value
    this.props.dispatch(updateCommentFormField(stateObj))
  }


/*value={ body ? body: ''}*/
//onChange={this.formInputUpdate}
//value={author ? author : ""}
//onChange={this.formInputUpdate}

/*
          { this.props.formType === "edit" && (
            <div>
              <input type="number" value={voteScore ? voteScore : '0'} name="post-voteScore-inp" id="pvoteScore"  placeholder="1" onChange={this.formInputUpdate} /><br />
            </div>
          )}
*/
  render() {
    let postDetail = null
    let comments = null
    let commentsSort = null
    // var will store the sorted commments
    let commentsOrdered = null
    let active = null
    let body = null
    let author = null
    let formType = null
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
    if (this.props.commentFormState) {
      active = this.props.commentFormState.active
      formType = this.props.commentFormState.formType
      body = this.props.commentFormState.body
      author = this.props.commentFormState.author
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

              <button onClick={this.commentEditBtnClick} id="create-comment">Add Comment</button>

              <ul className="comments-list">
                { commentsOrdered 
                  ? commentsOrdered.map(comment => (
                    <li key={comment.id} className="comments-list-item">
                      {comment.body}<br />
                      <button onClick={this.commentEditBtnClick} id="edit-comment">Edit</button><br />
                      Author: {comment.author}<br />
                      Votes: {comment.voteScore}<br />
                      Time: {this.props.prettyTime(comment.timestamp)}
                    </li>
                  ))
                  : null
                }
              </ul>
            </div>
            <Modal isOpen={active} contentLabel="Modal" onRequestClose={this.closeModal}>
              <h3>{formType === "create" ? "Add": "Edit"} Comment</h3>
              <button onClick={this.closeModal}>close</button>
              <form id="comment-form">
                <textarea width="100"  name="comment-body-ta" id="cbody" value={body ? body : ''} onChange={this.formInputUpdate} placeholder="comment body"  /><br />
                <input type="text" name="comment-author-inp" id="cauthor" value={author ? author: ''} onChange={this.formInputUpdate}  placeholder="author" /><br />
                <button name="postSaveBtn" id="commentSaveBtn" onClick={this.formSubmit} >Save</button> <button id="commentCancelBtn" >Cancel</button>
              </form>
            </Modal>
          </div>
        : null
      }
      </div>
    )
  }
}

function mapStateToProps({ postDetail, comments, commentsSort, commentCreate, commentFormState }) {
  return {
    postDetail,
    comments,
    commentsSort,
    commentCreate,
    commentFormState
  }
}

export default connect(mapStateToProps)(PostDetail);
