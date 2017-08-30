import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

class Nav extends Component {

  render() {
    //const post = this.props.post
    return (
      <div>
        <Link to="/">Posts</Link><br />
        <Link to="/newPost">Add Post</Link>
      </div>
    )
  }
}

export default Nav
