import React, { Component } from 'react';
import './styles/quizButton.css';

var redirectToCreatePage = () => {
    window.location.replace("/create");
  }

class CreateQuizButton extends Component {

  render() {
      return <button onClick={redirectToCreatePage} type="button" className="block">Create Quiz</button>
    }
  }

export default (CreateQuizButton);