import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './NewQuestion.css';

export default class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      QueData: {
        queType: null,
        statement: null,
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        category: null,
        qtitle: null,
        a1: false,
        a2: false,
        a3: false,
        a4: false
      },
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTChange = this.handleTChange.bind(this);
    this.handleSChange = this.handleSChange.bind(this);
    this.handleO1Change = this.handleO1Change.bind(this);
    this.handleO2Change = this.handleO2Change.bind(this);
    this.handleO3Change = this.handleO3Change.bind(this);
    this.handleO4Change = this.handleO4Change.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
  }

  newForm(event) {
    this.setState({submitted: false});
  }

  handleSubmit (event, qno) {
    event.preventDefault();
    let el = document.getElementById("opterr"), suc = document.getElementById(qno), cnt = 0;
    let q = JSON.parse(localStorage.getItem('qdata'));
    this.state.QueData.category = q.qcatg;
    this.state.QueData.qtitle = q.qtitle;
    if (document.getElementById(qno + "op1").checked){
      cnt += 1;
      this.state.QueData.a1 = true;
    }
    else this.state.QueData.a1 = false;
    if (document.getElementById(qno + "op2").checked){
      cnt += 1;
      this.state.QueData.a2 = true
    }
    else this.state.QueData.a2 = false;
    if (document.getElementById(qno + "op3").checked){
      cnt += 1;
      this.state.QueData.a3 = true
    }
    else this.state.QueData.a3 = false;
    if (document.getElementById(qno + "op4").checked){
      cnt += 1;
      this.state.QueData.a4 = true
    }
    else this.state.QueData.a4 = false;
    if (cnt > 1){
      this.state.QueData.queType = "mcq";
    }
    else if (cnt == 1) {
      this.state.QueData.queType = "scq";
    }
    else {
      el.innerHTML = "no answer selected";
      el.style.color = "red";
      return;
    }
    el.innerHTML = "";
    fetch('http://localhost:8080/question', {
    method: 'POST',
    body: JSON.stringify(this.state.QueData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
          suc.innerHTML = "new question added successfully";
        }
      });
  }

  handleTChange(event) {
    var t = document.getElementById("QuestionType");
    var type = t.options[t.selectedIndex].text;
    this.state.QueData.queType = type;
  }
  handleSChange(event) {
    this.state.QueData.statement = event.target.value;
  }
  handleO1Change(event) {
    this.state.QueData.option1 = event.target.value;
  }
  handleO2Change(event) {
    this.state.QueData.option2 = event.target.value;
  }
  handleO3Change(event) {
    this.state.QueData.option3 = event.target.value;
  }
  handleO4Change(event) {
    this.state.QueData.option4 = event.target.value;
  }
  handleCChange(event) {
    var c = document.getElementById("Category");
    var catg = c.options[c.selectedIndex].text;
    this.state.QueData.category = catg;
  }

  render() {
    if (!this.state.submitted) return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/>
        <hr/>
        <div className="formContainer" id="q1">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
                <label>Statement</label>
                <input type="text" className="form-control" value={this.state.statement} onChange={(e) => this.handleSChange(e)}/>
            </div>
            <div className="form-group">
                <label>Option-1</label>
                <input type="text" className="form-control" value={this.state.option1} onChange={(e) => this.handleO1Change(e)}/>
            </div>
            <div className="form-group">
                <label>Option-2</label>
                <input type="text" className="form-control" value={this.state.option2} onChange={(e) => this.handleO2Change(e)}/>
            </div>
            <div className="form-group">
                <label>Option-3</label>
                <input type="text" className="form-control" value={this.state.option3} onChange={(e) => this.handleO3Change(e)}/>
            </div>
            <div className="form-group">
                <label>Option-4</label>
                <input type="text" className="form-control" value={this.state.option4} onChange={(e) => this.handleO4Change(e)}/>
            </div>
            <div>
              <b>Answer(s)</b>
              <h6 id="opterr"></h6>
            </div>
            <div className="form-group">
              <input className="form-control" type="checkbox" name="option1" id="q1op1"/>Option-1<br/>
              <input className="form-control" type="checkbox" name="option2" id="q1op2"/>Option-2<br/>
              <input className="form-control" type="checkbox" name="option3" id="q1op3"/>Option-3<br/>
              <input className="form-control" type="checkbox" name="option4" id="q1op4"/>Option-4<br/>
            </div>
            <Button bsStyle="primary" onClick={(e)=>this.handleSubmit(e,"q1")}>Add</Button>
          </form>
        </div>
        <hr/>
      </div>
    );
    else return (
      <div className="App">
        <h2>New Question successfully added</h2><br/>
        Click below to add more questions to the quiz<br/>
        <Button bsStyle="primary" onClick={(e) => this.newForm(e)}>Add Question</Button>
      </div>
    );
  }
}
