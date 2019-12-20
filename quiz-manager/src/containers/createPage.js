import React, { Component } from 'react';
import { getCookie } from '../actions/cookie'
import { getUserFromId, getSchoolFromUserKey } from '../actions/user';
import Api from '../services/api';

export default class CreatePage extends Component {

  async componentDidMount() {
    const id = getCookie('session')
    if(!id){
      window.location.replace("/")
  }
    const user = await getUserFromId(id)
    const school = await getSchoolFromUserKey(user.key)
    this.setState({
      user: user,
      school: school
    })
  };

  constructor(props) {
    super(props);

    this.onChangeNameOfQuiz = this.onChangeNameOfQuiz.bind(this);
    this.onChangeQuestion = this.onChangeQuestion.bind(this);
    this.onChangeAnswer = this.onChangeAnswer.bind(this);
    this.onChangeScope = this.onChangeScope.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nameOfQuiz: "",
      question: '',
      answers: ['', '', '', ''],
      scope: 'private',
      user: '',
      school: '',
      message: ''
    }
  }

  onChangeNameOfQuiz(e) {
    this.setState({
      nameOfQuiz: e.target.value
    })
  }

  onChangeQuestion(e) {
    this.setState({
      question: e.target.value
    })
  }

  onChangeScope(e) {
    this.setState({
      scope: e.target.value
    })
    console.log(this.state.scope)
  }

  onChangeAnswer(event, index) {
    let newArray = this.state.answers
    newArray[index] = event.target.value
    console.log(newArray)
    this.setState({
      answers: newArray
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const quiz = {
      name: this.state.nameOfQuiz,
      scope: this.state.scope,
      username: this.state.user.username,
      school: this.state.school,
      questions: [{"question": this.state.question, "listofanswers": this.state.answers}]
    }
    Api.post('/quiz/add', quiz)
    .then(response => {
        if(response.data === "Quiz added!"){
            this.setState({
              nameOfQuiz: "",
              question: '',
              answers: ['', '', '', ''],
              scope: 'private',
              message: 'Quiz Created'
            })
        }
    })
    .catch(error => {
        this.setState({
            message: error.response.data
        })
    });
  }

  render() {
    var answers = this.state.answers
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
          <div className="form-group">
            <label>Question: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.question}
              onChange={this.onChangeQuestion}
            />
          </div>
          {answers.map((answer, index) => (
            <div key={index}>
              {index === 0 ? (
                <div key={"div" + index} className="form-group">
                  <label key={"label" + index}>Correct Answer: </label>
                  <input
                    key={"input" + index}
                    type="text"
                    required
                    className="form-control"
                    value={answer}
                    onChange={(e) => {
                      this.onChangeAnswer(e, index)
                    }}
                  />
                </div>
              ) : (
                  <div key={"div" + index} className="form-group">
                    <label key={"label" + index}>Incorrect Answer {index}: </label>
                    <input
                      key={"input" + index}
                      type="text"
                      required
                      className="form-control"
                      value={answer}
                      onChange={(e) => {
                        this.onChangeAnswer(e, index)
                      }}
                    />
                  </div>
                )}
            </div>
          ))}

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