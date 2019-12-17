import React, { Component } from 'react';
import Api from '../services/api';
import { setCookie } from '../actions/cookie'

export default class SigninPage extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

            const username = this.state.username
            const password = btoa(this.state.password)

            Api.get(`users/${username}/${password}`)
                .then(response => {
                    if(response.data !== null){
                    setCookie("session", response.data._id, 86400)
                    window.location.replace("/home")
                    } else {
                        this.setState({
                            password: '',
                            message: 'User not found'
                        })
                    }
                })
                .catch(error => {
                    console.log(error.response.data)
                    this.setState({
                        message: error.response.data
                    })
                });
       
    }
    render() {
        return (
            <div >
                <h3>Sign-In</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign In" className="btn btn-primary" />
                    </div>
                </form>
                <a href="/signup">Not a user? Sign Up</a>
                <p>{this.state.message}</p>
            </div>
        );
    }
}