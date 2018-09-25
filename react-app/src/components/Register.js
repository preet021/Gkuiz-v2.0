import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './Register.css';

export default class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        fullName: "",
        handle: "",
        email: "",
        password: "",
        city: "",
        total_score: 0,
        sports_score: 0,
        movies_score: 0,
        literature_score: 0,
        isAdmin: false
      },
      submitted: false,
    }
    this.handleHChange = this.handleHChange.bind(this);
    this.handleNChange = this.handleNChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleEChange = this.handleEChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    const request = new Request('http://127.0.0.1:8080/people/' + this.state.formData.handle);
    fetch(request)
    .then(response => response.json())
      .then(data => {
        var el = document.getElementById("msg");
        if (data) {
          el.innerHTML = `user with handle "${this.state.formData.handle}" already exists`;
          el.style.color = "red";
        }
        else {
          el.innerHTML = "";  
          fetch('http://localhost:8080/people', {
           method: 'POST',
           body: JSON.stringify(this.state.formData),
         })
            .then(response => {
              if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});
                window.location.replace('/Login');
              }
            });
        }
    });
  }

  handleHChange(event) {
    this.state.formData.handle = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }
  handleNChange(event) {
    this.state.formData.fullName = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }  
  handleCChange(event) {
    this.state.formData.city = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Person</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" value={this.state.fullName} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Handle</label>
                <input type="text" className="form-control" value={this.state.handle} onChange={this.handleHChange}/>
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" value={this.state.city} onChange={this.handleCChange}/>
            </div>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
          </form>
        </div>
        <h4 id="msg"></h4>
      </div>
    );
  }
}
