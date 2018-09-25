import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import './ViewPeople.css';

export default class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.handleSubmit=this.handleSubmit.bind(this);  
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/sort/All');
    fetch(request)
      .then(response => response.json())
        .then(data => {
          let ind = -1;
          for (let i=0; i<data.length; i+=1){
            if (data[i].Handle === "ad") {
              ind = i;
              break;
            }
          }
          data.splice(ind, 1);
          this.setState({data: data});
        });
  }

  handleSubmit() {
    let catg = document.getElementById("Category").options[document.getElementById("Category").selectedIndex].text;
    const request = new Request('http://127.0.0.1:8080/sort/' + catg);
    console.log(request);
    fetch(request)
      .then(response => response.json())
        .then(data => {
          this.setState({data:data});
      }); 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leaderboard</h1>
        </header>
        <br/><br/>
        <form> 
            <label>Category&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <select id="Category">
              <option value="All" selected>All</option>
              <option value="Sports">Sports</option>
              <option value="Movies">Movies</option>
              <option value="Literature">Literature</option>
            </select>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button bsStyle="danger" onClick={this.handleSubmit}>Apply</Button>
        </form>
        <br/><br/>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Handle</th>
              <th>Total Score</th>
              <th>Sports Score</th>
              <th>Movies Score</th>
              <th>Literature Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.fullname}</td>
                      <td>{item.handle}</td>
                      <td>{item.TotalScore}</td>
                      <td>{item.SportsScore}</td>
                      <td>{item.MoviesScore}</td>
                      <td>{item.LiteratureScore}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}
