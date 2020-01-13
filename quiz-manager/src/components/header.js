import React, { Component } from 'react';
import { getCookie, deleteCookie } from '../actions/cookie';
import { getUserFromId } from '../actions/user';
import './styles/header.css';

var signOut = () => {
  deleteCookie('session');
}

class Header extends Component {
  async componentDidMount() {
    const id = getCookie('session')
    if (id) {
      let userProfile = await getUserFromId(id)
      this.setState({
        username: userProfile.username
      })
    }
  }
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    }
  }

  render() {
    if (!getCookie('session')) {
      return (
        <div className="header">
          <a href="/" className="logo">Quiz Manager</a>
          <div className="header-right">
            <a className="active" href="/signin">Sign In</a>
          </div>
        </div>
      )
    } else {
      return (
        <div className="header">
          <a href="/" className="logo">Quiz Manager</a>
          <div className="header-right">
            <a className="active" onClick={signOut} href="/">Sign Out</a>
          </div>
          <p className="header-right" >Hello {this.state.username}</p>
        </div>
      )
    }
  }
}

export default (Header);