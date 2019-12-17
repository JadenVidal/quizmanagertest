import React, { Component } from 'react';

export default class viewPage extends Component {
  render() {
    return (
      <div >
        <p>Enter page</p>
        {/* should go to sign in page  */}
        <a href='/home' >CLICK</a>
      </div>
    );
  }
}