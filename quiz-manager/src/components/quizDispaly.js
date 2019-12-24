import React, { Component } from 'react';
import './styles/quizDisplay.css';

class QuizDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stateOfQuiz: ""
    }
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
          <br />
          <p>{date}</p>
          <button>EDIT</button>
        </div>
      )
    }
  }

}

export default (QuizDisplay);