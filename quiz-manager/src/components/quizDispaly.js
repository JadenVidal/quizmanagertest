import React, { Component } from 'react';
import './styles/quizDisplay.css';

// var redirectToViewPage = () => {
//     window.location.replace("/view");
//   }

class QuizDisplay extends Component {

  render() {
      let displayStyle = ""
      if(this.props.index%2 === 0){
         displayStyle = "highlight"
      } else {  displayStyle = "none" }
      return ( 
            // <button onClick={redirectToViewPage} type="button" className="block">View Quizes</button>
            <div className={displayStyle}>
                <h3>{this.props.quiz.name}</h3>
                <p>Created by: {this.props.quiz.username}</p>
                <p>Question: {this.props.quiz.questions[0].question}</p>
                <p>Correct Answer: {this.props.quiz.questions[0].listofanswers[0]}</p>
                <p>Incorrect Answers:</p>
                <p>{this.props.quiz.questions[0].listofanswers[1]}</p>
                <p>{this.props.quiz.questions[0].listofanswers[2]}</p>
                <p>{this.props.quiz.questions[0].listofanswers[3]}</p>
            </div>
      ) 
    }

  }

export default (QuizDisplay);