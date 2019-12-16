import React, { Component } from 'react';

export default class LandingPage extends Component {
  render() {
    return (
      <div >
        <h1>Quiz Mangager</h1>
        <p>Sign In Below</p>
        {/* should go to sign in page  */}
        <a href='/home' >CLICK</a>
      </div>
    );
  }
}