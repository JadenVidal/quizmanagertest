import React, { Component } from 'react';
import ViewQuizButton from '../components/viewQuizButton'
import CreateQuizButton from '../components/createQuizButton'
import { getUserType } from '../actions/user';
import './styles/homePage.css';

export default class HomePage extends Component {

  async componentDidMount() {
    const userAccess = await getUserType()
    this.setState({
      userType: userAccess
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
        {this.state.userType === 'top' ? (
          <div>
            <ViewQuizButton />
            <CreateQuizButton />
          </div>
        ) : (
            <div>
              <ViewQuizButton />
            </div>
          )}
      </div>
    );
  }
}