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
    postVoteScoreInp: 0,
    postDatetimeInp: ''
  }

  formInputUpdate = this.formInputUpdate.bind(this)
  formSubmit = this.formSubmit.bind(this)

  formInputUpdate(ev) {
    const id = ev.target.id
    const value = ev.target.value
    let stateObj = {}
    stateObj[id] = value

    this.setState(stateObj)
  }

  formSubmit(ev) {
    ev.preventDefault()
    console.log('got here formSubmit')
    const curDateMs = Date.now()
    console.log('curDateMs: ' + curDateMs)
    const formData = {
      title: this.state.postTitleInp || '',
      body: this.state.postBodyTa || '',
      author: this.state.postAuthorInp || '',
      //voteScore: parseInt(this.state.postVoteScoreInp) || 0,
      timestamp: curDateMs
    }

    this.props.dispatch(fetchPostCreate(formData))

  }

//           <input type="number" value={this.state.postVoteScoreInp} name="post-voteScore-inp" id="postVoteScoreInp" onChange={this.formInputUpdate} /><br />


  render() {

    return (
      <div>
        <h3>Add Post</h3>
        <form>
          <input type="text" value={this.state.postTitleInp} name="post-title-inp" id="postTitleInp" placeholder="title" onChange={this.formInputUpdate} /><br /><br />
          <textarea width="100" value={this.state.postBodyTa} name="post-body-ta" id="postBodyTa" placeholder="post body" onChange={this.formInputUpdate} /><br />
          <input type="text" value={this.state.postAuthorInp} name="post-author-inp" id="postAuthorInp"  placeholder="author" onChange={this.formInputUpdate} /><br />
          <input type="datetime-local" name="post-datetime-inp" id="postDatetimeInp" onChange={this.formInputUpdate} /><br />
          <button name="postSaveBtn" id="postSaveBtn" onClick={this.formSubmit} >Save</button> <button id="postCancelBtn" id="postCancelBtn">Cancel</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ postCreate }) {
  return {
    postCreate
  }
}

export default connect(mapStateToProps)(PostForm);
