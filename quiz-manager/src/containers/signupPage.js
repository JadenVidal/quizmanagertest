import React, { Component } from 'react';
import Api from '../services/api';

export default class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangeKey = this.onChangeKey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            confirmpassword: '',
            key: '',
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

    onChangeConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        })
    }

    onChangeKey(e) {
        this.setState({
            key: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.password === this.state.confirmpassword) {
            const user = {
                username: this.state.username,
                password: btoa(this.state.password),
                key: this.state.key
            }
            Api.get(`/schools/key/${user.key}`)
                .then(response => {
                    if(response.data[0] !== undefined){ 
                        Api.post('/users/add', user)
                        .then(response => {
                            if(response.data === "User added!"){
                                this.setState({
                                    message: 'User Created! Please Sign In'
                                })
                            }
                        })
                        .catch(error => {
                            this.setState({
                                message: error.response.data
                            })
                        });
                    } else {
                        this.setState({
                            key: '',
                            message: 'School Key not valid please try again'
                        })
                    }
                })
                .catch(error => {
                    this.setState({
                        message: error.response.data
                    })
                });
        } else {
            this.setState({
                confirmpassword: '',
                message: 'The passwords you entered do not match'
            })
        }
    }
    render() {
        return (
            <div >
                <h3>Sign-Up</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" required className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="password" required className="form-control" value={this.state.confirmpassword} onChange={this.onChangeConfirmPassword}/>
                    </div>
                    <div className="form-group">
                        <label>School Key: </label>
                        <input type="text" required className="form-control" value={this.state.key} onChange={this.onChangeKey}/>
                        <p>The key should be provided by your school administrator</p>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign Up" className="btn btn-primary" />
                    </div>
                </form>

                <p>{this.state.message}</p>
            </div>
        );
    }
}