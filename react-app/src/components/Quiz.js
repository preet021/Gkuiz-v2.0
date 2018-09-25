import React, { Component } from 'react';
import Scq from './Scq.js';
import Mcq from './Mcq.js';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      lifeline_scq: true,
      lifeline_mcq: true
    }
  }

  componentDidMount() {
    let request, catg = window.location.href.toString().split("/")[4], sub_catg = catg.split("#")[1];
    catg = catg.split("#")[0];  
    request = new Request(`http://127.0.0.1:8080/questions/${catg}/${sub_catg}`)
    fetch(request)
      .then(response => response.json())
        .then(data => {
          this.setState({data: data});
        });
  }

  handleScqLifeline(event, id, qno) {
    if (!this.state.lifeline_scq){
      document.getElementById("l"+qno).innerHTML = "Lifeline used";
      document.getElementById("l"+qno).style.color = "red";
      return;
    }
    fetch(`http://127.0.0.1:8080/question/${id}`)
    .then(response => response.json())
    .then(data => {
      let cnt = 0;
      if (!data.a1 && cnt<2) {
        document.getElementById(qno+"op1").disabled = true; 
        cnt += 1;
      }
      if (!data.a2 && cnt<2) {
        document.getElementById(qno+"op2").disabled = true; 
        cnt += 1;
      }
      if (!data.a3 && cnt<2) {
        document.getElementById(qno+"op3").disabled = true; 
        cnt += 1;
      }
      if (!data.a4 && cnt<2) {
        document.getElementById(qno+"op4").disabled = true; 
        cnt += 1;
      }
      this.setState({lifeline_scq: false});
    });
  }

  handleMcqLifeline(event, id, qno) {
    if (!this.state.lifeline_mcq){
      document.getElementById("l"+qno).innerHTML = "Lifeline used";
      document.getElementById("l"+qno).style.color = "red";
      return;
    }
    fetch(`http://127.0.0.1:8080/question/${id}`)
    .then(response => response.json())
    .then(data => {
      let cnt = 0;
      if (data.a1 && cnt<1) {
        document.getElementById(qno+"op1").checked = true; 
        cnt += 1;
      }
      if (data.a2 && cnt<1) {
        document.getElementById(qno+"op2").checked = true; 
        cnt += 1;
      }
      if (data.a3 && cnt<1) {
        document.getElementById(qno+"op3").checked = true; 
        cnt += 1;
      }
      if (data.a4 && cnt<1) {
        document.getElementById(qno+"op4").checked = true; 
        cnt += 1;
      }
      this.setState({lifeline_mcq: false});
    });
  }

  handleSubmit(event) {
    document.getElementById("submit").disabled = true;
    let score = 0, handle;
    for (let i=1; i<=this.state.data.length; ++i) {
      let qbox = document.getElementById(i);
      let op1 = document.getElementById(i+"op1").checked;
      let op2 = document.getElementById(i+"op2").checked;
      let op3 = document.getElementById(i+"op3").checked;
      let op4 = document.getElementById(i+"op4").checked;
      
      let isCorrect = true;
      if (this.state.data[i-1].a1 && !op1) isCorrect = false;
      if (this.state.data[i-1].a2 && !op2) isCorrect = false;
      if (this.state.data[i-1].a3 && !op3) isCorrect = false;
      if (this.state.data[i-1].a4 && !op4) isCorrect = false;

      if (!this.state.data[i-1].a1 && op1) isCorrect = false;
      if (!this.state.data[i-1].a2 && op2) isCorrect = false;
      if (!this.state.data[i-1].a3 && op3) isCorrect = false;
      if (!this.state.data[i-1].a4 && op4) isCorrect = false;

      if (isCorrect) score += 1;
    }
    handle = JSON.parse(localStorage.getItem('person')).usrHandle;
    let catg = window.location.href.toString().split("/")[4].split("#")[0], sub_catg = window.location.href.toString().split("/")[4].split("#")[1];
    let request;
    request = new Request('http://127.0.0.1:8080/people/' + JSON.parse(localStorage.getItem('person')).usrHandle);
    fetch(request)
    .then(response => response.json())
      .then(data => {
        data.TotalScore += score;
        if (catg === "Sports") {
          data.SportsScore += score;
        }
        else if (catg === "Movies") {
          data.MoviesScore += score;
        }
        else if (catg === "Literature") {
          data.LiteratureScore += score;
        }
        request = new Request('http://127.0.0.1:8080/people/' + data.handle);
        fetch(request, {
            method: 'PUT', 
            body: JSON.stringify(data)
          }
        ).then(response => {
            response.json();
        }).then(data => {
          request = new Request(`http://127.0.0.1:8080/attempted/${handle}/${catg}/${sub_catg}`);
          fetch(request)
          .then(response => response.json())
          .then(data => {
            if (data){
              request = new Request(`http://127.0.0.1:8080/attempted/touch/${handle}/${catg}/${sub_catg}`);
              fetch(request, {
                method: 'PUT',
                body: JSON.stringify({handle: handle, category: catg, qtitle: sub_catg, Score: score})
              }).then(response => {
                if (response.status >= 200 && response.status < 300){
                  document.getElementById("submitted").innerHTML = `Your score: ${score}`;
                }
              }
              );
            }
            else {  
              request = new Request('http://127.0.0.1:8080/attempted');
              var pp = {handle: handle, category: catg, qtitle: sub_catg, Score: score};
              fetch(request, {
                method: 'POST',
                body: JSON.stringify(pp)
              }).then(response => {
                if (response.status >= 200 && response.status < 300){
                  document.getElementById("submitted").innerHTML = `Your score: ${score}`;
                }
              });
            }
          });
        });
    });
  }

  render() {
    localStorage.setItem('Score', JSON.stringify({score: 0}));
    var This = this;
    return (
      <div>
        <br/><br/><br/><hr/>
        {this.state.data.map(function(item, key){
          if (item.quetype === "scq") return (
              <div>
                <Scq qno={key+1} statement={item.statement} op1={item.option1} op2={item.option2} op3={item.option3} op4={item.option4}/>
                <h5 id={`l${key+1}`}></h5>
                <Button onClick={(e) => This.handleScqLifeline(e, item.id, key+1)}>50-50</Button>
                <hr/>
              </div>
            )
          if (item.quetype === "mcq") return (
              <div>
                <Mcq T={This} qno={key+1} statement={item.statement} op1={item.option1} op2={item.option2} op3={item.option3} op4={item.option4}/>
                <h5 id={`l${key+1}`}></h5>
                <Button onClick={(e) => This.handleMcqLifeline(e, item.id, key+1)}>Show one answer</Button>
                <hr/>
              </div>
            )
          })
        }
        <Button id="submit" bsStyle="primary" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
        <br/>
        <h3 id="submitted"></h3>
        <br/>
      </div>
    );
  }
}
