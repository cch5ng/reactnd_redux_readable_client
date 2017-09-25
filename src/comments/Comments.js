import React, { Component } from 'react';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import uuidv1 from 'uuid/v1'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import { fetchComments, fetchCommentDelete, fetchCommentCreate, fetchCommentEdit, sortComments,
  setCurrentCommentId, updateCommentVote } from '../comments/CommentActions'
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
  filterSortComments = this.filterSortComments.bind(this)
  clickCommentVote = this.clickCommentVote.bind(this)
  getActiveComment = this.getActiveComment.bind(this)

  componentDidMount() {
    //this.props.dispatch(fetchComments(this.props.postId))
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
  }

  // modal form submit
  formSubmit(ev) {
    ev.preventDefault()
    const curDateMs = Date.now()
    let commentTimestamp
    let commentId

    commentTimestamp = curDateMs
    if (this.state.commentFormType === "create") {
       commentId = uuidv1()
     } else {
       commentId = this.state.formCommentId
    }
    let formData
    const parentId = this.props.postId
    formData = {
      id: commentId,
      body: this.state.body,
      author: this.state.author,
      voteScore: parseInt(this.state.voteScore, 10),
      timestamp: commentTimestamp,
      parentId
    }

    // create form
    if (this.state.commentFormType === "create") {
       this.props.dispatch(fetchCommentCreate(formData))
       this.setState(CLEARED_COMMENT_FORM)
    }
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
      let tComment = this.getActiveComment(commentId)
      this.setState({
        id: tComment.id,
        body: tComment.body,
        author: tComment.author,
        voteScore: tComment.voteScore,
        timestamp: tComment.timestamp
      })
    }
  }

  commentDeleteBtnClick(commentId, postId) {
    this.props.dispatch(fetchCommentDelete(commentId, postId))
  }

  closeModal() {
    this.setState({
      ...CLEARED_COMMENT_FORM,
      commentFormActive: false
    })
  }

  filterSortComments(comments) {
    let orderedComments = []
    let commentsFiltered

    if (comments.length > 0) {
      commentsFiltered = comments.filter(comment => {
        if (comment) {
          return comment.deleted === false
        }
      })
      orderedComments = sortList(this.props.commentsSort.sortKey, this.props.commentsSort.sortOrderDesc, commentsFiltered)
    }

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

  render() {
    let comments = []
    let commentsObj = null
    let commentsSort = null
    // var will store the sorted commments
    let body = null
    let author = null
    let active = null
    let formType = null

    if (this.props.comments && this.props.comments.comments) {
      commentsObj = this.props.comments.comments
      for (let commentId in commentsObj) {
        const parentId = commentsObj[commentId].parentId
        if (parentId === this.props.postId) {
          comments.push(commentsObj[commentId])
        }
      }
    }

    if (this.props.commentsSort) {
      commentsSort = this.props.commentsSort
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
          { comments.length
            ? this.filterSortComments(comments).map(comment => (
              <li key={comment.id} className="comments-list-item">
                {comment.body}<br />
                <button onClick={(ev) => this.commentEditBtnClick(ev.target.id, comment.id)} id="edit-comment" className="button" >Edit</button> <button onClick={(ev) => this.commentDeleteBtnClick(comment.id, this.props.postId)} id="delete-comment" className="button" >Delete</button><br />
                Author: {comment.author} updated {prettyTime(comment.timestamp)}<br />
                Votes: {comment.voteScore}   <ArrowUpIcon className="comment-arrow-up-icon" onClick={(ev) => this.clickCommentVote(ev, comment.id, this.props.postId)} /><ArrowDownIcon className="comment-arrow-down-icon"  onClick={(ev) => this.clickCommentVote(ev, comment.id, this.props.postId)} />
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

function mapStateToProps({ comments, commentsSort, commentCreate, commentEdit }) {
  return {
    comments,
    commentsSort,
    commentCreate,
    commentEdit
  }
}

export default connect(mapStateToProps)(Comments);
