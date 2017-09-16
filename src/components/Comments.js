import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import uuidv1 from 'uuid/v1'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import { fetchComments, fetchCommentDelete, fetchCommentCreate, fetchCommentEdit, sortComments } from '../actions'
import { toggleCommentFormActive, updateCommentFormField, setCommentFormType, clearCommentFormField, 
  updateCommentFormFieldMultiple, setCurrentCommentId, updateCommentVote } from '../actions'
import { prettySortVotes, prettySortTime, prettyTime, sortList } from '../utils'
import '../App.css';

const customStyles = {
  content : {
    background: '#cceae7'
  }
};

const CLEARED_COMMENT_FORM = {
  id: '',
  body: '',
  author: '',
  voteScore: 1,
  timestamp: ''
}

class Comments extends Component {

  state = {
    commentFormActive: false,
    commentFormType: 'create',
    id: '',
    body: '',
    author: '',
    voteScore: 1,
    timestamp: ''
  }

  commentsSortClick = this.commentsSortClick.bind(this)
  formSubmit = this.formSubmit.bind(this)
  closeModal = this.closeModal.bind(this)
  commentEditBtnClick = this.commentEditBtnClick.bind(this)
  commentDeleteBtnClick = this.commentDeleteBtnClick.bind(this)
  formInputUpdate = this.formInputUpdate.bind(this)
  afterOpenModal = this.afterOpenModal.bind(this)
  filterSortComments = this.filterSortComments.bind(this)
  clickCommentVote = this.clickCommentVote.bind(this)
  getActiveComment = this.getActiveComment.bind(this)

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId))
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

  formInputUpdate(ev) {
    const id = ev.target.id
    let value = ev.target.value
    // the className format is like 'ptitle' to differentiate b/t post and comment
    let prettyId = id.slice(1)
    let stateObj = {}

    if (prettyId === "voteScore") {
      value = parseInt(value, 10)
    }
    stateObj[prettyId] = value
    this.setState(stateObj)
    //this.props.dispatch(updateCommentFormField(stateObj))
  }

  // modal form submit
  formSubmit(ev) {
    ev.preventDefault()
    const curDateMs = Date.now()
    let commentTimestamp
    let commentId

    commentTimestamp = curDateMs
    if (this.state.commentFormState === "create") {
       commentId = uuidv1()
     } else {
       commentId = this.state.formCommentId
    }
    let formData
    const parentId = this.props.postId
    //if (this.props.commentFormState) {
      formData = {
        id: commentId,
        body: this.state.body,
        author: this.state.author,
        voteScore: parseInt(this.state.voteScore, 10),
        timestamp: commentTimestamp,
        parentId
      }
    //}
// TODO fix
    // create form
    if (this.state.commentFormType === "create") {
       this.props.dispatch(fetchCommentCreate(formData))
       this.setState(CLEARED_COMMENT_FORM)
    }
// TODO fix
    // edit form
    if (this.state.commentFormType === "edit") {
      this.props.dispatch(fetchCommentEdit(commentId, formData))
    }
  }

  clickCommentVote(ev, objId, postId) {
    const classList = ev.target.classList

    if (classList[0] === "comment-arrow-up-icon") {
      this.props.dispatch(updateCommentVote(objId, postId, 'upVote'))
    }
    if (classList[0] === "comment-arrow-down-icon") {
      this.props.dispatch(updateCommentVote(objId, postId, 'downVote'))
    }
  }

  commentEditBtnClick(btnId, commentId) {
    let formType = btnId.split('-')

    this.setState({
      commentFormActive: true,
      commentFormType: formType[0],
      formCommentId: commentId,
    })

    if (formType[0] === "edit") {
//      this.props.dispatch(setCurrentCommentId(commentId))
      let tComment = this.getActiveComment(commentId)
      this.setState({
        id: tComment.id,
        body: tComment.body,
        author: tComment.author,
        voteScore: tComment.voteScore,
        timestamp: tComment.timestamp
      })
    }

    //this.props.dispatch(toggleCommentFormActive())
    //this.props.dispatch(setCommentFormType(formType[0]))
  }

  commentDeleteBtnClick(commentId, postId) {
    this.props.dispatch(fetchCommentDelete(commentId, postId))
  }

  afterOpenModal() {
    if (this.props.commentFormState.formType === "create") {
      this.props.dispatch(clearCommentFormField())
    }

    if (this.props.commentFormState.formType === "edit" && this.props.comments.comments && this.props.comments.comments.length) {
      let tcomment = this.props.comments.comments.filter(comment => (
        comment.id === this.props.commentFormState.id
      ))
      const formObj = {
        author: tcomment[0].author,
        body: tcomment[0].body,
        voteScore: tcomment[0].voteScore,
        timestamp: tcomment[0].timestamp
      }
      this.props.dispatch(updateCommentFormFieldMultiple(formObj))
    }
  }

  closeModal() {
    this.setState({
      commentFormActive: false
    })
    //this.props.dispatch(toggleCommentFormActive())
  }

  filterSortComments(comments) {
    let orderedComments
    let commentsFiltered

    commentsFiltered = comments.filter(comment => (
      comment.deleted === false
    ))
    orderedComments = sortList(this.props.commentsSort.sortKey, this.props.commentsSort.sortOrderDesc, commentsFiltered)

    return orderedComments
  }

  getActiveComment(commentId) {
    if (this.props.comments && this.props.comments.comments && this.props.comments.comments.length) {
      let comments = this.props.comments.comments
      console.log('len comments: ' + comments.length)
      let comment = comments.filter((comment) => {
        return comment.id === commentId
      })
      return comment[0]
    }

  }

// ? body : ''
//author ? author: ''

  render() {
    let comments = null
    let commentsSort = null
    // var will store the sorted commments
    let body = null
    let author = null
    let active = null
    let formType = null

    if (this.props.comments && this.props.comments.comments && this.props.comments.comments.length) {
       comments = this.props.comments.comments
    }
    if (this.props.commentsSort) {
      commentsSort = this.props.commentsSort
    }
    if (this.props.commentFormState) {
      active = this.props.commentFormState.active
      formType = this.props.commentFormState.formType
      body = this.props.commentFormState.body
      author = this.props.commentFormState.author
    }

    return (
      <div className="comments-container">
        <h2>Comments</h2>

        <div>
          <button className="button" onClick={(ev) => this.commentEditBtnClick(ev.target.id, '')} id="create-comment">Add Comment</button>
          <br /><br />
        </div>
        <h3>Sort Comments</h3>
        <ul onClick={this.commentsSortClick} className="sort-key-list">
          <li className={ commentsSort.sortKey === "voteScore" ? "comment-is-active-sort voteScore" : "voteScore" }>Sort by Votes ({prettySortVotes(commentsSort.sortOrderDesc)})</li>
          <li className={ commentsSort.sortKey === "timestamp" ? "comment-is-active-sort timestamp" : "timestamp" }>Sort by Most Recent ({prettySortTime(commentsSort.sortOrderDesc)})</li>
        </ul>

        <ul className="comments-list">
          { comments 
            ? this.filterSortComments(comments).map(comment => (
              <li key={comment.id} className="comments-list-item">
                {comment.body}<br />
                <button onClick={(ev) => this.commentEditBtnClick(ev.target.id, comment.id)} id="edit-comment" className="button" >Edit</button> <button onClick={(ev) => this.commentDeleteBtnClick(comment.id, this.props.postId)} id="delete-comment" className="button" >Delete</button><br />
                Author: {comment.author}<br />
                Votes: {comment.voteScore}   <ArrowUpIcon className="comment-arrow-up-icon" onClick={(ev) => this.clickCommentVote(ev, comment.id, this.props.postId)} /><ArrowDownIcon className="comment-arrow-down-icon"  onClick={(ev) => this.clickCommentVote(ev, comment.id, this.props.postId)} /><br />
                Last updated: {prettyTime(comment.timestamp)}
              </li>
            ))
            : null
          }
        </ul>
        <Modal isOpen={ this.state.commentFormActive } contentLabel="Modal" onRequestClose={this.closeModal} onAfterOpen={this.afterOpenModal}
          style={customStyles} >
          <h3>{this.state.commentFormType  === "create" ? "Add": "Edit"} Comment</h3>
          <button className="button" onClick={this.closeModal}>Close</button><br /><br />
          <form id="comment-form">
            <textarea width="100"  name="comment-body-ta" id="cbody" value={this.state.body} onChange={this.formInputUpdate} placeholder="comment body"  /><br />
            <input type="text" name="comment-author-inp" id="cauthor" value={this.state.author} onChange={this.formInputUpdate}  placeholder="author" /><br /><br />
            <button name="postSaveBtn" id="commentSaveBtn" className="button" onClick={this.formSubmit} >Save</button> <button id="commentCancelBtn" className="button">Cancel</button>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ comments, commentsSort, commentCreate, commentEdit, commentFormState }) {
  return {
    comments,
    commentsSort,
    commentCreate,
    commentEdit,
    commentFormState
  }
}

export default connect(mapStateToProps)(Comments);
