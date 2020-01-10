import React, { Component } from 'react';
import { getCookie } from '../actions/cookie'
import { getUserFromId, getSchoolFromUserKey } from '../actions/user';
import Api from '../services/api';

export default class CreatePage extends Component {

  async componentDidMount() {
    const id = getCookie('session')
    if (!id) {
      window.location.replace("/")
    }
    const user = await getUserFromId(id)
    const school = await getSchoolFromUserKey(user.key)
    this.setState({
      user: user,
      school: school
    })

    if (this.props.quiz) {
      this.setState({
        nameOfQuiz: this.props.quiz.name,
        listOfQuestions: this.props.quiz.listOfQuestions
      })
    }
  };

  constructor(props) {
    super(props);

    this.onChangeNameOfQuiz = this.onChangeNameOfQuiz.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeScope = this.onChangeScope.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);

    this.state = {
      nameOfQuiz: "",
      listOfQuestions: [{ question: "", listofanswers: ['', '', '', ''] }],
      scope: 'private',
      user: '',
      school: '',
      message: ''
    }
  }

  deleteQuestion = (index) => {
    let newStateArr = this.state.listOfQuestions
    newStateArr.splice(index, 1)
    this.setState({
      listOfQuestions: newStateArr
    })
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
      username: this.state.user.username,
      school: this.state.school,
      questions: this.state.listOfQuestions
    }
    Api.post('/quiz/add', quiz)
      .then(response => {
        if (response.data === "Quiz added!") {
          this.setState({
            nameOfQuiz: "",
            listOfQuestions: [{ question: "", listofanswers: ['', '', '', ''] }],
            scope: 'private',
            message: 'Quiz Created'
          })
          //redirect to view page
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
        <h3>Create Quiz</h3>
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
          <br />
          {listOfQuestions.map((question, index) => (
            <div className="form-group">
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
                <button type="button" onClick={() => this.deleteQuestion(index)}>Remove Question</button>
              }
            </div>
          ))}
          <button onClick={this.addQuestion}>Add Question</button>
          <br />
          <div className="radio">
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
          <div className="form-group">
            <input type="submit" value="Sumbit" className="btn btn-primary" />
          </div>
        </form>

        <p>{this.state.message}</p>
      </div>
    );
  }
}