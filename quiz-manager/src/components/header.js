import React, { Component } from 'react';
import { getCookie, deleteCookie } from '../actions/cookie';
import './styles/header.css';

var signOut = () => {
  deleteCookie('session');
}

class Header extends Component {

  render() {
    if(!getCookie('session')){
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
          <p className="header-right" >Hello {getCookie('session')}</p>
        </div>
      ) 
    }

  } 
}

export default (Header);