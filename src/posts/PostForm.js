import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail, REQUEST_POST_CREATE, 
  RECEIVE_POST_CREATE, fetchPostCreate, REQUEST_POST_EDIT, RECEIVE_POST_EDIT,
  fetchPostEdit, REQUEST_CATEGORIES, RECEIVE_CATEGORIES, fetchCategories
} from '../posts/PostActions'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import '../App.css';

const CLEARED_FORM = {
  title: '',
  body: '',
  author: '',
  category: 'none',
  voteScore: 0,
  timestamp: ''
}

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
// should this be necessary?
    this.props.dispatch(fetchCategories())
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
    let postTimestamp 
    let postId
    let formData

    postTimestamp = curDateMs
    if (this.props.match) {
      postId = this.props.match.params.id
    }

    formData = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
      voteScore: parseInt(this.state.voteScore),
      timestamp: postTimestamp,
    }

    // create form
    if (this.props.formType === "create") {
      this.props.dispatch(fetchPostCreate(formData))
      this.setState(CLEARED_FORM)
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
    let title = null
    let postCategory = null
    let body = null
    let author = null
    let voteScore = null

    if (this.props.categories && this.props.categories.categories) {
//      categories = this.props.categories.categories
      categories = this.props.categories.allIds.map(id => (
        this.props.categories.categories[id]
      ))
    }

    if (this.props.postDetail && this.props.postDetail.postDetail) {
      postDetail = this.props.postDetail.postDetail
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

function mapStateToProps({ postCreate, categories, postDetail, posts }) {
  return {
    postCreate,
    categories,
    postDetail,
    posts
  }
}

export default connect(mapStateToProps)(PostForm);
