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

  state = {
    formType: this.props.formType,
    title: this.props.formType === 'edit' ? this.props.post.title : '',
    body: this.props.formType === 'edit' ? this.props.post.body : '',
    author: this.props.formType === 'edit' ? this.props.post.author : '',
    category: this.props.formType === 'edit' ? this.props.post.category : 'none',
    voteScore: this.props.formType === 'edit' ? this.props.post.voteScore : 0,
    timestamp: this.props.formType === 'edit' ? this.props.post.timestamp : '',
  }

  formInputUpdate = this.formInputUpdate.bind(this)
  formSubmit = this.formSubmit.bind(this)

  componentDidMount() {
    this.props.dispatch(setPostFormType(this.props.formType))
// should this be necessary?
    this.props.dispatch(fetchCategories())
    if (this.props.formType === "create") {
      this.props.dispatch(clearPostFormField())
    }
    if (this.props.formType === "edit" && this.props.posts && this.props.posts.posts && this.props.posts.posts.length) {
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
    let value = ev.target.value
    // the className format is like 'ptitle' to differentiate b/t post and comment
    let prettyId = id.slice(1)
    let stateObj = {}

    if (prettyId === "voteScore") {
      value = parseInt(value)
    }
    stateObj[prettyId] = value
    this.setState(stateObj)
  }

  formSubmit(ev) {
    ev.preventDefault()
    const curDateMs = Date.now()
    let postFormState
    let postTimestamp 
    let postId
    let formData

    postTimestamp = curDateMs
    if (this.props.match) {
      postId = this.props.match.params.id
    }
    if (this.props.postFormState) {
      postFormState = this.props.postFormState

      formData = {
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category,
        voteScore: parseInt(this.state.voteScore),
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

    if (this.props.categories && this.props.categories.categories) {
      categories = this.props.categories.categories
    }

    if (this.props.postDetail && this.props.postDetail.postDetail) {
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
      <div className="form-container">
        <h3>{ this.props.formType === 'create' ? 'Add' : 'Edit' } Post</h3>
        <form id="post-create-form">
          <input type="text" value={ this.state.title } name="post-title-inp" id="ptitle" placeholder="title" onChange={this.formInputUpdate} /><br /><br />
          <textarea width="100" value={ this.state.body } name="post-body-ta" id="pbody" placeholder="post body" onChange={this.formInputUpdate} /><br />
          {categories && (
            <div>
              <select id="pcategory" onChange={this.formInputUpdate} value={ this.state.category }>
                {categories.map(category => (
                  <option key={category.name} value={category.name} >{category.name}</option>
                ))}
              </select><br /><br />
            </div>
          )}
          <input type="text" value={ this.state.author } name="post-author-inp" id="pauthor"  placeholder="author" onChange={this.formInputUpdate} /><br /><br />
          { this.props.formType === "edit" && (
            <div>
              <input type="number" value={ this.state.voteScore } name="post-voteScore-inp" id="pvoteScore"  placeholder="number of votes" onChange={this.formInputUpdate} /><br /><br />
            </div>

          )}
          <button name="postSaveBtn" id="postSaveBtn" className="button" onClick={this.formSubmit} >Save</button> <button id="postCancelBtn" id="postCancelBtn" className="button" >Cancel</button>
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
