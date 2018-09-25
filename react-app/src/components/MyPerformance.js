import React, { Component } from 'react';
import './ViewQuestions.css';

export default class MyPerformance extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/attempted/' + JSON.parse(localStorage.getItem('person')).usrHandle + '/all/all');
    fetch(request)
      .then(response => response.json())
        .then(data => {this.setState({data: data});
      });
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Category</th>
              <th>Quiz Title</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map(function(item, key) {
               return (
                  <tr>
                      <td>{item.category}</td>
                      <td>{item.qtitle}</td>
                      <td>{item.score}</td>
                  </tr>
                );
             })}
          </tbody>
       </table>
      </div>
    );
  }
}
