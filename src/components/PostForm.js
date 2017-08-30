import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, fetchPostDetail } from '../actions'
import { REQUEST_POST_CREATE, RECEIVE_POST_CREATE, fetchPostCreate } from '../actions'
import ArrowDownIcon from 'react-icons/lib/fa/arrow-circle-down'
import ArrowUpIcon from 'react-icons/lib/fa/arrow-circle-up'
import '../App.css';

class PostForm extends Component {

  state = {
    postTitleInp: '',
    postBodyTa: '',
    postAuthorInp: '',
    postCategoryOpt: 'none',
    postDatetimeInp: ''
  }

  formInputUpdate = this.formInputUpdate.bind(this)
  formSubmit = this.formSubmit.bind(this)

  formInputUpdate(ev) {
    const id = ev.target.id
    const value = ev.target.value
    console.log('id: ' + id)
    console.log('value: ' + value)
    let stateObj = {}
    stateObj[id] = value

    this.setState(stateObj)
  }

  formSubmit(ev) {
    ev.preventDefault()
    const form = document.getElementById("post-create-form")
    const curDateMs = Date.now()
    const formData = {
      title: this.state.postTitleInp || '',
      body: this.state.postBodyTa || '',
      author: this.state.postAuthorInp || '',
      category: this.state.postCategoryOpt || 'none',
      timestamp: curDateMs
    }

    this.props.dispatch(fetchPostCreate(formData))
    this.setState(
      {
          postTitleInp: '',
          postBodyTa: '',
          postAuthorInp: '',
          postCategoryOpt: 'none',
          postDatetimeInp: ''
      }
    )

  }

  render() {
    let categories = null
    if (this.props.categories.categories) {
      categories = this.props.categories.categories
    }
    console.log('categories: ' + categories)

    return (
      <div>
        <h3>Add Post</h3>
        <form id="post-create-form">
          <input type="text" value={this.state.postTitleInp} name="post-title-inp" id="postTitleInp" placeholder="title" onChange={this.formInputUpdate} /><br /><br />
          <textarea width="100" value={this.state.postBodyTa} name="post-body-ta" id="postBodyTa" placeholder="post body" onChange={this.formInputUpdate} /><br />
          {categories && (
            <div>
              <select id="postCategoryOpt" onChange={this.formInputUpdate} defaultValue="none">
                {categories.map(category => (
                  <option key={category.name} value={category.name} >{category.name}</option>
                ))}
              </select><br />
            </div>
          )}
          <input type="text" value={this.state.postAuthorInp} name="post-author-inp" id="postAuthorInp"  placeholder="author" onChange={this.formInputUpdate} /><br />
          <button name="postSaveBtn" id="postSaveBtn" onClick={this.formSubmit} >Save</button> <button id="postCancelBtn" id="postCancelBtn">Cancel</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ postCreate, categories }) {
  return {
    postCreate,
    categories
  }
}

export default connect(mapStateToProps)(PostForm);
