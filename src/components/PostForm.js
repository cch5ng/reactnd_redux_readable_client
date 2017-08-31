import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, fetchCategories } from '../actions'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail } from '../actions'
import { REQUEST_POST_CREATE, RECEIVE_POST_CREATE, fetchPostCreate } from '../actions'
import { REQUEST_POST_EDIT, RECEIVE_POST_EDIT, fetchPostEdit } from '../actions'
import { SET_POST_FORM_TYPE, UPDATE_POST_FORM_FIELD, CLEAR_POST_FORM_FIELD, setPostFormType, updatePostFormField, updatePostFormFieldMultiple, clearPostFormField } from '../actions'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import '../App.css';

class PostForm extends Component {

  formInputUpdate = this.formInputUpdate.bind(this)
  formSubmit = this.formSubmit.bind(this)

  componentDidMount() {
    this.props.dispatch(setPostFormType(this.props.formType))
// should this be necessary?
    this.props.dispatch(fetchCategories())
    if (this.props.formType === "create") {
      this.props.dispatch(clearPostFormField())
    }
    if (this.props.formType === "edit" && this.props.posts.posts && this.props.posts.posts.length) {
      const postId = this.props.match.params.id
      let tpost = this.props.posts.posts.filter(post => (
        post.id === postId
      ))
      const formObj = {
        title: tpost[0].title,
        author: tpost[0].author,
        body: tpost[0].body,
        category: tpost[0].category,
        voteScore: tpost[0].voteScore,
        timestamp: tpost[0].timestamp
      }
      this.props.dispatch(updatePostFormFieldMultiple(formObj))
    }

  }

  formInputUpdate(ev) {
    const id = ev.target.id
    const value = ev.target.value
    // the className format is like 'ptitle' to differentiate b/t post and comment
    let prettyId = id.slice(1)
    let stateObj = {}

    stateObj[prettyId] = value
    this.props.dispatch(updatePostFormField(stateObj))
  }

  formSubmit(ev) {
    ev.preventDefault()
    const curDateMs = Date.now()
    let postFormState
    //let tDate = new Date(this.props.postFormState.timestamp)
    let postTimestamp 
    if (this.props.formType === "create") {
      postTimestamp = curDateMs
    } else {
      postTimestamp = Date.parse(this.props.postFormState.timestamp)
    }
    let formData
    const postId = this.props.match.params.id
    if (this.props.postFormState) {
      postFormState = this.props.postFormState
      formData = {
        title: this.props.postFormState.title,
        body: this.props.postFormState.body,
        author: this.props.postFormState.author,
        category: this.props.postFormState.category,
        voteScore: this.props.postFormState.voteScore,
        timestamp: postTimestamp,
      }
    }

    // create form
    if (this.props.formType === "create") {
      this.props.dispatch(fetchPostCreate(formData))
    }

    // edit form
    if (this.props.formType === "edit") {
      this.props.dispatch(fetchPostEdit(postId, formData))
    }
  }

  render() {
    const { formType } = this.props.formType
    let categories = null
    let postDetail = null
    let postFormState = null
    let title = null
    let postCategory = null
    let body = null
    let author = null
    let voteScore = null

    if (this.props.categories.categories) {
      categories = this.props.categories.categories
    }

    if (this.props.postDetail.postDetail) {
      postDetail = this.props.postDetail.postDetail
    }
    if (this.props.postFormState) {
      postFormState = this.props.postFormState
      title = postFormState.title
      body = postFormState.body
      author = postFormState.author
      postCategory = postFormState.category
      voteScore = postFormState.voteScore
    }

    return (
      <div>
        <h3>{ this.props.formType === 'create' ? 'Add' : 'Edit' } Post</h3>
        <form id="post-create-form">
          <input type="text" value={ postFormState ? postFormState.title : ''} name="post-title-inp" id="ptitle" placeholder="title" onChange={this.formInputUpdate} /><br /><br />
          <textarea width="100" value={ body ? body: ''} name="post-body-ta" id="pbody" placeholder="post body" onChange={this.formInputUpdate} /><br />
          {categories && (
            <div>
              <select id="pcategory" onChange={this.formInputUpdate} value={postCategory ? postCategory : "none"}>
                {categories.map(category => (
                  <option key={category.name} value={category.name} >{category.name}</option>
                ))}
              </select><br />
            </div>
          )}
          <input type="text" value={author ? author : ""} name="post-author-inp" id="pauthor"  placeholder="author" onChange={this.formInputUpdate} /><br />
          { this.props.formType === "edit" && (
            <div>
              <input type="number" value={voteScore ? voteScore : 1} name="post-voteScore-inp" id="pvoteScore"  placeholder="1" onChange={this.formInputUpdate} /><br />
            </div>

          )}
          <button name="postSaveBtn" id="postSaveBtn" onClick={this.formSubmit} >Save</button> <button id="postCancelBtn" id="postCancelBtn">Cancel</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ postCreate, categories, postDetail, postFormState, posts }) {
  return {
    postCreate,
    categories,
    postDetail,
    postFormState,
    posts
  }
}

export default connect(mapStateToProps)(PostForm);
