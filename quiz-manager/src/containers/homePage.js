import React, { Component } from 'react';
// import Api from '../services/api';
import { getUserType } from '../actions/user';
import './styles/homePage.css';

export default class HomePage extends Component {

  async componentDidMount() {
    const jaden = await getUserType()
    this.setState({
      userType: jaden
  })
  };

  constructor(props) {
    super(props);

    this.state = {
      userType: ""
    }
  }

  render() {
    return (
      <div >
        <p>Hello</p>
        <p>{this.state.userType}</p>
      </div>
    );
  }
}