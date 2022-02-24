import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;


        return (
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign In"
                    elements = {() => (
                        <React.Fragment>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="text"
                                value={emailAddress}
                                onChange={this.change}
                                placeholder="Email"/>
                            <input
                                id="password"
                                name="password"
                                type="text"
                                value={password}
                                onChange={this.change}
                                placeholder="Password"/>
                        </React.Fragment>    
                    )}/>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
        );
    }

    //Set state in fields
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    //Submit email and password
    submit = () => {
        
        
        const { context } = this.props;
        const { from } = this.props.location.state  || { from: { pathname: '/' }}; //Remove later
        const {emailAddress, password } = this.state;
        console.log(this.props.history.location);   //Remove later
        
        console.log({from});   //Remove later

        context.actions.signIn(emailAddress, password)
            .then(user => {
                if(user === null) {
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful']}
                    });
                } else {
                    console.log({from}); //Remove later
                    this.props.history.goBack();
                    console.log(`${emailAddress} is logged in!`); //Remove later
                }
            })
            .catch(err => {
                console.log(err);  
                this.props.history.push('/error');
            })
    }
    
    cancel = () => {
        this.props.history.push('/');
    }
}