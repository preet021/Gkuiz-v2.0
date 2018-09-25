import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import NewQuestion from './NewQuestion';
import './NewQuiz.css';

export default class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      category: null,
      quizTitle: null,
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTChange = this.handleTChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.state.category = document.getElementById("Category").options[document.getElementById("Category").selectedIndex].text;
    
    var q = {
      qcatg: this.state.category,
      qtitle: this.state.quizTitle
    }
    localStorage.setItem('qdata', JSON.stringify(q));
    this.setState({submitted: true});
  }

  handleTChange(event) {
    this.state.quizTitle = event.target.value;
  }

  render() {
    if (!this.state.submitted) 
      return (
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Quiz</h1>
        </header>
        <br/>
        <h4 id="success"></h4>
        <div className="formContainer">
          <form>
            <div className="form-group">
              <label>Category&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <select id="Category" className="form-control">
                <option value="Sports" selected>Sports</option>
                <option value="Movies">Movies</option>
                <option value="Literature">Literature</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quiz Title&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input type="text" className="form-control" placeholder="Quiz 1" onChange={(e) => this.handleTChange(e)}/>
            </div>
            <Button bsStyle="primary" onClick={this.handleSubmit}>Add Questions</Button>
          </form>
        </div>
      </div>
    );
  else return (
      <NewQuestion />
    );
  }
}
