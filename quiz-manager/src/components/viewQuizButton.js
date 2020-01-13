import React, { Component } from 'react';
import './styles/quizButton.css';

var redirectToViewPage = () => {
    window.location.replace("/view");
  }

class ViewQuizButton extends Component {

  render() {
      return <button onClick={redirectToViewPage} type="button" className="block">View Quizes</button>
    }
  }

export default (ViewQuizButton);