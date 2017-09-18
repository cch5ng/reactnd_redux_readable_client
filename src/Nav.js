import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';

class Nav extends Component {

  render() {
    //const post = this.props.post
    return (
      <div className="header title">
        <div className="header-main">
          <h2>Talk-about</h2>
        </div>
        <div className="header-contact">
          <p className="contact">
            <Link to="/">Posts</Link> <Link to="/newPost">Add Post</Link>
          </p>
        </div>


      </div>
    )
  }
}

export default Nav
