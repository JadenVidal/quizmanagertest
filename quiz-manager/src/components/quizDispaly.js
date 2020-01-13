import React, { Component } from 'react';
import QuizEdit from './quizEdit'
import './styles/quizDisplay.css';
import './styles/quizButton.css';

class QuizDisplay extends Component {

  constructor(props) {
    super(props);

    this.editQuiz = this.editQuiz.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      stateOfQuiz: ""
    }
  }

  editQuiz = () => {
    this.setState({
      stateOfQuiz: "edit"
    })
  }

  onSave = () => {
    this.setState({
      stateOfQuiz: ""
    })
    window.location.replace("/view")
  }

  render() {
    const date = new Date(this.props.quiz.updatedAt).toUTCString()
    let displayStyle = ""
    if (this.props.index % 2 === 0) {
      displayStyle = "highlight"
    } else { displayStyle = "none" }
    if (this.props.userType === "mid") {
      return (
        <div className={displayStyle}>
          <h3>{this.props.quiz.name}</h3>
          <p>Created by: {this.props.quiz.username}</p>
          <br />
          {this.props.quiz.questions.map((question, index) => (
            <span key={index}>
              <p>Question: {question.question}</p>
              <p>Correct Answer: {question.listofanswers[0]}</p>
              <p>Incorrect Answers:</p>
              <p>{question.listofanswers[1]}</p>
              <p>{question.listofanswers[2]}</p>
              <p>{question.listofanswers[3]}</p>
              <br />
            </span>
          ))}
          <br />
          <p>{date}</p>
        </div>
      )
    } else if (this.props.userType === "low") {
      return (
        <div className={displayStyle}>
          <h3>{this.props.quiz.name}</h3>
          <p>Created by: {this.props.quiz.username}</p>
          <br />
          {this.props.quiz.questions.map((question, index) => (
            <span key={index}>
              <p>Question: {question.question}</p>
              <br />
            </span>
          ))}
          <br />
          <p>{date}</p>
        </div>
      )
    } else if (this.state.stateOfQuiz === "edit"){
      return (
      <div className={displayStyle}>
        <QuizEdit quiz={this.props.quiz} onSave={this.onSave}/>
      </div>
      )
    } else {
      return (
        <div className={displayStyle}>
          <h3>{this.props.quiz.name}</h3>
          <p>Created by: {this.props.quiz.username}</p>
          <br />
          {this.props.quiz.questions.map((question, index) => (
            <span key={index}>
              <p>Question: {question.question}</p>
              <p>Correct Answer: {question.listofanswers[0]}</p>
              <p>Incorrect Answers:</p>
              <p>{question.listofanswers[1]}</p>
              <p>{question.listofanswers[2]}</p>
              <p>{question.listofanswers[3]}</p>
              <br />
            </span>
          ))}
          <p>Last Updated: {date}</p>
          <button className="button" onClick={this.editQuiz}><span>EDIT</span></button>
        </div>
      )
    }
  }
}

export default (QuizDisplay);