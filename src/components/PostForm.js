import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, fetchCategories } from '../actions'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail } from '../actions'
import { REQUEST_POST_CREATE, RECEIVE_POST_CREATE, fetchPostCreate } from '../actions'
import { SET_POST_FORM_TYPE, UPDATE_POST_FORM_FIELD, setPostFormType, updatePostFormField } from '../actions'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import '../App.css';

class PostForm extends Component {

  state = {
    // formState: this.props.formType,
    // postTitleInp: this.props.postDetail.postDetail ? this.props.postDetail.postDetail.title : '',
    // postBodyTa: this.props.postDetail.postDetail ? this.props.postDetail.postDetail.body : '',
    // postAuthorInp: this.props.postDetail.postDetail ? this.props.postDetail.postDetail.author : '',
    // postCategoryOpt: this.props.postDetail.postDetail ? this.props.postDetail.postDetail.category : 'none',
    // postDatetimeInp: this.props.postDetail.postDetail ? this.props.postDetail.postDetail.timestamp : ''
  }

  formInputUpdate = this.formInputUpdate.bind(this)
  formSubmit = this.formSubmit.bind(this)

  componentDidMount() {
    this.props.dispatch(setPostFormType(this.props.formType))
// should this be necessary?
    this.props.dispatch(fetchCategories())
    if (this.props.formType === "edit" && this.props.match) {
      const postId = this.props.match.params.id
      console.log('postId: ' + postId)
      this.props.dispatch(fetchPostDetail(postId))
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
    if (this.props.postFormState) {
      postFormState = this.props.postFormState
      const formData = {
        title: postFormState.title,
        body: postFormState.body,
        author: postFormState.author,
        category: postFormState.category,
        //timestamp: curDateMs
      }
    }

    this.props.dispatch(fetchPostCreate(formData))
// TODO clear form (need new action for postFormState data clear)
  }

  render() {
    let categories = null
    let postDetail = null
    let postFormState = null
    let title = null
    let postCategory = null
    let body = null
    let author = null

    if (this.props.categories.categories) {
      categories = this.props.categories.categories
    }
    console.log('categories: ' + categories)

    if (this.props.postDetail.postDetail) {
      postDetail = this.props.postDetail.postDetail
    }
    if (this.props.postFormState) {
      postFormState = this.props.postFormState
      title = postFormState.title
      body = postFormState.body
      author = postFormState.author
      postCategory = postFormState.category
    }

// TODO TEST don't think this is possible
      // this.setState({ 
      //   postTitleInp: postDetail.title,
      //   postCategoryOpt: postDetail.category,
      //   postBodyTa: postDetail.body
      // })
      //title = postDetail.title
      //postCategory = postDetail.category
      //body = postDetail.body



    return (
      <div>
        <h3>Add Post</h3>
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
          <button name="postSaveBtn" id="postSaveBtn" onClick={this.formSubmit} >Save</button> <button id="postCancelBtn" id="postCancelBtn">Cancel</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ postCreate, categories, postDetail, postFormState }) {
  return {
    postCreate,
    categories,
    postDetail,
    postFormState
  }
}

export default connect(mapStateToProps)(PostForm);
