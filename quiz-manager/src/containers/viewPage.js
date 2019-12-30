import React, { Component } from 'react';
import { getCookie } from '../actions/cookie'
import { getUserType, getUserFromId, getSchoolFromUserKey } from '../actions/user';
import { getQuizesByUsername, getQuizesBySchool } from '../actions/quiz';
import QuizDisplay from '../components/quizDispaly';

export default class ViewPage extends Component {

  async componentDidMount() {
    const id = getCookie('session')
    if(!id){
        window.location.replace("/")
    }
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
      
    var userQuizes = this.state.userQuizes.slice(0).reverse()
    var quizes = this.state.quizes.slice(0).reverse()

    return (
      <div >
        <h2 Style="margin-left: 10%;">Your Quizes</h2>
        {userQuizes.map((quiz, index) => (
            <span key={index}>
            <QuizDisplay key={quiz._id} quiz={quiz} index={index} access={this.state.userType}/>
            </span>
        ))}

        <h2 Style="margin-left: 10%;">Other Users Quizes</h2>
        {quizes.map((quiz, index) => (
            <span key={index}>
            <QuizDisplay key={quiz._id} quiz={quiz} index={index} access={this.state.userType}/>
            </span>
        ))}
      </div>
    );
  }
}