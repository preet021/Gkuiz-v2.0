import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './ViewQuestions.css';

export default class ViewQuestions extends Component {
  constructor() {
    super();
    this.state = {
      sports_catg: [],
      movies_catg: [],
      literature_catg: [],
      data: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let request = new Request('http://127.0.0.1:8080/questions/');
    let sp_Set = new Set(), mv_Set = new Set(), lt_Set = new Set();
    let sp_subcatg = [], mv_subcatg = [], lt_subcatg = [];
    fetch(request)
      .then(response => response.json())
        .then(data => {
          data.map(function(item, key){
            if (item.category === "Sports"){
              sp_Set.add(item.qtitle);
            }
            else if (item.category === "Movies"){
              mv_Set.add(item.qtitle);
            }
            else if (item.category === "Literature"){
              lt_Set.add(item.qtitle);
            }
          });
          sp_Set.forEach(function(val1, val2, Set){
            sp_subcatg.push(val1);
          });
          mv_Set.forEach(function(val1, val2, Set){
            mv_subcatg.push(val1);
          });
          lt_Set.forEach(function(val1, val2, Set){
            lt_subcatg.push(val1);
          });
          this.setState({data: data, sports_catg: sp_subcatg, movies_catg: mv_subcatg, literature_catg: lt_subcatg});
        });
  }

  handleSubmit() {
    for (let i=0; i<this.state.sports_catg.length; i+=1){
      if (document.getElementById("sp"+this.state.sports_catg[i]).checked){
        fetch('http://127.0.0.1:8080/deletequiz/Sports/'+this.state.sports_catg[i], {
          method: 'DELETE'
        }).then(response => {
          if (response.status >= 200 && response.status < 300){
            window.location.reload();
          }
        });
      }
    }
    for (let i=0; i<this.state.movies_catg.length; i+=1){
      if (document.getElementById("mv"+this.state.movies_catg[i]).checked){
        fetch('http://127.0.0.1:8080/deletequiz/Movies/'+this.state.movies_catg[i], {
          method: 'DELETE'
        }).then(response => {
          if (response.status >= 200 && response.status < 300){
            window.location.reload();
          }
        });
      } 
    }
    for (let i=0; i<this.state.literature_catg.length; i+=1){
      if (document.getElementById("li"+this.state.literature_catg[i]).checked){
        fetch('http://127.0.0.1:8080/deletequiz/Literature/'+this.state.literature_catg[i], {
          method: 'DELETE'
        }).then(response => {
          if (response.status >= 200 && response.status < 300){
            window.location.reload();
          }
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View/Delete Quizzes</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Category</th>
              <th colspan="2">Quizzes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan={1 + this.state.sports_catg.length}><b>Sports</b></td>
              <td><b>Title</b></td>
              <td></td>
            </tr>
              {this.state.sports_catg.map(function(item, key){
                return(
                  <tr>
                    <td>{item}</td>
                    <td><input type="checkbox" id={"sp"+item} name={"sp"+item}/></td>
                  </tr>
                  )
                })
              }
              <tr>
              <td rowspan={1 + this.state.movies_catg.length}><b>Movies</b></td>
              <td><b>Title</b></td>
              <td></td>
            </tr>
              {this.state.movies_catg.map(function(item, key){
                return(
                  <tr>
                    <td>{item}</td>
                    <td><input type="checkbox" id={"mv"+item} name={"mv"+item}/></td>
                  </tr>
                  )
                })
              }
              <tr>
              <td rowspan={1 + this.state.literature_catg.length}><b>Literature</b></td>
              <td><b>Title</b></td>
              <td></td>
            </tr>
              {this.state.literature_catg.map(function(item, key){
                return(
                  <tr>
                    <td>{item}</td>
                    <td><input type="checkbox" id={"li"+item} name={"li"+item}/></td>
                  </tr>
                  )
                })
              }   
          </tbody>
       </table>
       <br/>
       <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
      </div>
    );
  }
}
