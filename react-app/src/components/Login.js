import React, { Component } from "react";
import {Button, FormGroup, FormData, ControlLabel} from "react-bootstrap";
import * as EmailValidator from "email-validator";
import * as PasswordValidator from "password-validator";
import "./Login.css";

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			data: {
				handle: "",
				password: ""
			}
		};
		this.handleHChange = this.handleHChange.bind(this);
		this.handlePChange = this.handlePChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

handleSubmit(event) {
	const request = new Request('http://127.0.0.1:8080/people/' + this.state.data.handle);
	fetch(request)
		.then(response => response.json())
			.then(data => {
        var el = document.getElementById("invalidUser");
        if (!data) {
          el.innerHTML = "no such user exists";
          el.style.color = "red";
        }
        else {
          if (data.password == this.state.data.password) {
            el.innerHTML = "logged in as " + this.state.data.handle;
            el.style.color = "green";
            var p = {
              isUsrLoggedin: true,
              isUsrAdmin: data.isadmin,
              usrHandle: data.handle,
            }
            localStorage.setItem('person', JSON.stringify(p));
            console.log(data);
            console.log(JSON.parse(localStorage.getItem('person')));
            window.location.replace('/');
          }
          else {
            el.innerHTML = "wrong password";
            el.style.color = "red";
          }
        }
		});
}

handleHChange(event) {
	this.state.data.handle = event.target.value;
}

handlePChange(event) {
	this.state.data.password = event.target.value;
}

 render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">GKuiz Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Handle</label>
                <input name="Handle" type="text" className="form-control" value={this.state.handle} onChange={this.handleHChange} placeholder="tourist"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange} placeholder="password"/>
            </div>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Login</Button>
          </form>
          <h4 id="invalidUser"></h4>
        </div>
      </div>
    );
  }
}