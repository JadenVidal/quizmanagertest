import React, { Component } from 'react';
import { getCookie } from '../actions/cookie'
import { getUserType, getUserFromId, getSchoolFromUserKey } from '../actions/user';
import { getQuizesByUsername, getQuizesBySchool } from '../actions/quiz';

export default class ViewPage extends Component {

  async componentDidMount() {
    const id = getCookie('session')
    const userAccess = await getUserType()
    const user = await getUserFromId(id)
    const school = await getSchoolFromUserKey(user.key)
    if(userAccess === "top"){
        const userQuizes = await getQuizesByUsername(user.username)
        const quizes = await getQuizesBySchool(user.username, school)
        this.setState({
            userQuizes: userQuizes.data,
            quizes: quizes.data
        })
    } else {
        const quizes = await getQuizesBySchool(user.username, school)
        this.setState({
            quizes: quizes.data
        })
    }
    this.setState({
        userType: userAccess,
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      userType: "",
      userQuizes: [],
      quizes: [] 
    }
  }

  render() {
    var userQuizes = this.state.userQuizes
    var quizes = this.state.quizes

    console.log(userQuizes)
    console.log(quizes)
    return (
      <div >
        {userQuizes.map((quiz, index) => (
            <span key={index}>
            <p key={quiz._id}>{quiz.questions[0].question}</p>
            </span>
        ))}
      </div>
    );
  }
}