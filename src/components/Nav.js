import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../App.css';

class Nav extends Component {

  render() {
    //const post = this.props.post
    return (
      <div>
        <Link to="/">Posts</Link>
      </div>
    )
  }
}

function mapStateToProps({  }) {

  return {

  }
}

export default connect(mapStateToProps)(Nav);
