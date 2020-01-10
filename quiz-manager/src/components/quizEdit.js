import React, { Component } from 'react';
import './styles/quizButton.css';
import Api from '../services/api';

export default class QuizEdit extends Component {

  constructor(props) {
    super(props);

    this.onChangeNameOfQuiz = this.onChangeNameOfQuiz.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeScope = this.onChangeScope.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.deleteQuiz = this.deleteQuiz.bind(this);

    this.state = {
      nameOfQuiz: this.props.quiz.name,
      listOfQuestions: this.props.quiz.questions,
      scope: this.props.quiz.scope,
      user: this.props.quiz.username
    }
  }


  deleteQuestion = (index) => {
    let newStateArr = this.state.listOfQuestions
    newStateArr.splice(index, 1)
    this.setState({
      listOfQuestions: newStateArr
    })
  }

  deleteQuiz(e) {
    e.preventDefault();

    Api.delete(`/quiz/${this.props.quiz._id}`)
      .then(response => {
        if (response.data === "Quiz deleted.") {
          this.props.onSave()
        }
      })
      .catch(error => {
        this.setState({
          message: error.response.data
        })
      });
  }

  addQuestion = () => {
    let index = this.state.listOfQuestions.length
    this.setState({
      listOfQuestions: [
        ...this.state.listOfQuestions.slice(0, index), { question: "", listofanswers: ['', '', '', ''] }
      ]
    })
  }

  onChangeNameOfQuiz(e) {
    this.setState({
      nameOfQuiz: e.target.value
    })
  }

  onChangeQuestion(event, index) {
    let newArray = this.state.listOfQuestions
    newArray[index].question = event.target.value
    this.setState({
      listOfQuestions: newArray
    })
  }

  onChangeScope(e) {
    this.setState({
      scope: e.target.value
    })
  }

  onChangeAnswer(event, index, answerIndex) {
    let newArray = this.state.listOfQuestions
    newArray[index].listofanswers[answerIndex] = event.target.value
    this.setState({
      listOfQuestions: newArray
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const quiz = {
      name: this.state.nameOfQuiz,
      scope: this.state.scope,
      username: this.state.user,
      questions: this.state.listOfQuestions
    }
    Api.put(`/quiz/${this.props.quiz._id}`, quiz)
      .then(response => {
        if (response.data === "Quiz updated!") {
          this.props.onSave()
        }
      })
      .catch(error => {
        this.setState({
          message: error.response.data
        })
      });
  }

  render() {
    var listOfQuestions = this.state.listOfQuestions
    return (
      <div >
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name of Quiz: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.nameOfQuiz}
              onChange={this.onChangeNameOfQuiz}
            />
          </div>
          {listOfQuestions.map((question, index) => (
            <div className="form-group">
              <br />
              <label>Question: </label>
              <input type="text"
                required
                className="form-control"
                value={question.question}
                onChange={(e) => {
                  this.onChangeQuestion(e, index)
                }}
              />
              {question.listofanswers.map((answer, aIndex) => (
                aIndex === 0 ? (
                  <div key={"div" + aIndex} className="form-group">
                    <label key={"label" + aIndex}>Correct Answer: </label>
                    <input
                      key={"input" + aIndex}
                      type="text"
                      required
                      className="form-control"
                      value={answer}
                      onChange={(e) => {
                        this.onChangeAnswer(e, index, aIndex)
                      }}
                    />
                  </div>
                ) : (
                    <div key={"div" + aIndex} className="form-group">
                      <label key={"label" + aIndex}>Incorrect Answer {aIndex}: </label>
                      <input
                        key={"input" + aIndex}
                        type="text"
                        required
                        className="form-control"
                        value={answer}
                        onChange={(e) => {
                          this.onChangeAnswer(e, index, aIndex)
                        }}
                      />
                    </div>
                  )
              ))}
              <br />
              {this.state.listOfQuestions.length > 1 &&
                <button className="delButton" type="button" onClick={() => this.deleteQuestion(index)}><span>Remove Question</span></button>
              }
            </div>
          ))}
          <br />
          <button className="button" onClick={this.addQuestion}><span>Add Question</span></button>
          <div className="radio">
          <br />
            <label>
              <input type="radio" value="private"
                checked={this.state.scope === 'private'}
                onChange={this.onChangeScope} />
              Private
      </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="public"
                checked={this.state.scope === 'public'}
                onChange={this.onChangeScope} />
              Public
      </label>
          </div>
          <br />
          <div className="form-group">
            <input className="button" type="submit" value="Save" />
          </div>
        </form>
        <br />
        <button className="delButton" onClick={this.deleteQuiz}><span>DELETE QUIZ</span></button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}