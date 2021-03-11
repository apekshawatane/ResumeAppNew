import React, { Component } from 'react';
import axios from '../utils/axios';
import Protected from './Protected';
import { Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';

class ManagerLogin extends Component {

    constructor(props) {
        super(props);
        let loggedIn = false;
        this.state = {
            userName: '',
            password: '',
            loggedIn
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
          } else {
              console.log("hello");
            Notification.requestPermission();
          }
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try{
        axios.post('/manager/login', {
            userName: this.state.userName,
            password: this.state.password
        })
            .then(res => {
                const token = JSON.stringify(res.data);
                const split = JSON.parse(token);
                const new_token = console.log(split['token']);
                localStorage.setItem('cool-jwt', split['token']);
                // this.setState({
                //     loggedIn: true
                // });
                // Message.success("login successful");
                new Notification('Manager LoggedIn Successfully');
                this.setState({
                    loggedIn: true
                })
                // this.props.history.push('/applicant/viewApplicant');
        })
    }
            catch(err) {
                console.log(err.message);
            }
    };

    render() {
if (this.state.loggedIn === true){
    return <Redirect to="/applicant/viewApplicant" />
}
        const { userName, password } = this.state;

        return (
            <div className="container mt-5 dflex">
                <h1>MANAGER LOGIN</h1>

                <form className=" border border-light p-5" onSubmit={this.handleSubmit}>
                <div className="form-group">
                        <label>User Name:</label>
                        <input type="text" name="userName" className="form-control" value={userName}
                            onChange={this.changeHandler} />
                    </div>
                    <div className="form-group mt-2">
                        <label>Password:</label>
                        <input type="password" name="password" className="form-control" value={password}
                            onChange={this.changeHandler} />
                    </div>
                    <div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
                
            </div>
        )
    }
}

export default ManagerLogin;