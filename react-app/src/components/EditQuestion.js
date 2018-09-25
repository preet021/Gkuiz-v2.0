import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './NewQuestion.css';

export default class EditQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        id: "",
        queType: "",
        statement: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        category: "",
        qtitle: "",
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
  }

  componentDidMount() {
    let id = localStorage.getItem('editQueId');
    const request = new Request('http://127.0.0.1:8080/question/' + id);
    fetch(request)
    .then(response => response.json())
    .then(data => {
      this.setState({data: data});
      document.getElementById("Category").value = this.state.data.category;
      document.getElementById("qtitle").value = this.state.data.qtitle;
      document.getElementById("statement").value = this.state.data.statement;
      document.getElementById("op1").value = this.state.data.option1;
      document.getElementById("op2").value = this.state.data.option2;
      document.getElementById("op3").value = this.state.data.option3;
      document.getElementById("op4").value = this.state.data.option4;
      if (this.state.data.a1) document.getElementById("a1").checked = true;
      else document.getElementById("a1").checked = false;
      if (this.state.data.a2) document.getElementById("a2").checked = true;
      else document.getElementById("a2").checked = false;
      if (this.state.data.a3) document.getElementById("a3").checked = true;
      else document.getElementById("a3").checked = false;
      if (this.state.data.a4) document.getElementById("a4").checked = true;
      else document.getElementById("a4").checked = false;
    });
  }

  handleSubmit (event) {
    event.preventDefault();
    let el = document.getElementById("opterr"), suc = document.getElementById("success"), cnt = 0;
    this.state.data.category = document.getElementById("Category").options[document.getElementById("Category").selectedIndex].text;
    this.state.data.qtitle = document.getElementById("qtitle").value;
    if (document.getElementById("a1").checked){
      cnt += 1;
      this.state.data.a1 = true;
    }
    else this.state.data.a1 = false;
    if (document.getElementById("a2").checked){
      cnt += 1;
      this.state.data.a2 = true
    }
    else this.state.data.a2 = false;
    if (document.getElementById("a3").checked){
      cnt += 1;
      this.state.data.a3 = true
    }
    else this.state.data.a3 = false;
    if (document.getElementById("a4").checked){
      cnt += 1;
      this.state.data.a4 = true
    }
    else this.state.data.a4 = false;
    if (cnt > 1){
      this.state.data.queType = "mcq";
    }
    else if (cnt == 1) {
      this.state.data.queType = "scq";
    }
    else {
      el.innerHTML = "no answer selected";
      el.style.color = "red";
      return;
    }
    el.innerHTML = "";
    fetch('http://localhost:8080/question/'+localStorage.getItem('editQueId'), {
    method: 'PUT',
    body: JSON.stringify(this.state.data),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          this.setState({submitted: true});
          suc.innerHTML = "question data updated successfully";
        }
      });
  }

  handleTChange(event) {
    this.state.data.statement = event.target.value;
    this.setState({data: this.state.data});
  }

  handleSChange(event) {
    this.state.data.statement = event.target.value;
    this.setState({data: this.state.data});
  }

  handleO1Change(event) {
    this.state.data.option1 = event.target.value;
    this.setState({data: this.state.data});
  }

  handleO2Change(event) {
    this.state.data.option2 = event.target.value;
    this.setState({data: this.state.data});
  }

  handleO3Change(event) {
    this.state.data.option3 = event.target.value;
    this.setState({data: this.state.data});
  }

  handleO4Change(event) {
    this.state.data.option4 = event.target.value;
    this.setState({data: this.state.data});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/>
        <div className="formContainer" id="q1">
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-group">
              <label>Category</label> 
              <select id="Category" className="form-control">
                <option value="Sports">Sports</option>
                <option value="Movies">Movies</option>
                <option value="Literature">Literature</option>
              </select>
            </div><br/>
            <div className="form-group">
                <label>Title</label>
                <input id="qtitle" type="text" className="form-control" onChange={(e) => this.handleTChange(e)}/>
            </div><br/>
            <div className="form-group">
                <label>Statement</label>
                <input id="statement" type="text" className="form-control" onChange={(e) => this.handleSChange(e)}/>
            </div><br/>
            <div className="form-group">
                <label>Option-1</label>
                <input id="op1" type="text" className="form-control" onChange={(e) => this.handleO1Change(e)}/>
            </div><br/>
            <div className="form-group">
                <label>Option-2</label>
                <input id="op2" type="text" className="form-control" onChange={(e) => this.handleO2Change(e)}/>
            </div><br/>
            <div className="form-group">
                <label>Option-3</label>
                <input id="op3" type="text" className="form-control" onChange={(e) => this.handleO3Change(e)}/>
            </div><br/>
            <div className="form-group">
                <label>Option-4</label>
                <input id="op4" type="text" className="form-control" onChange={(e) => this.handleO4Change(e)}/>
            </div><br/>
            <div>
              <b>Answer(s)</b>
              <h6 id="opterr"></h6>
            </div>
            <div className="form-group">
              <input className="form-control" type="checkbox" name="option1" id="a1"/>Option-1<br/>
              <input className="form-control" type="checkbox" name="option2" id="a2"/>Option-2<br/>
              <input className="form-control" type="checkbox" name="option3" id="a3"/>Option-3<br/>
              <input className="form-control" type="checkbox" name="option4" id="a4"/>Option-4<br/>
            </div>
            <Button bsStyle="primary" onClick={(e)=>this.handleSubmit(e)}>Update</Button>
          </form>
          <h3 id="success"></h3>
        </div>
        <hr/>
      </div>
    );
  }
}
