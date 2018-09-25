import React, { Component } from 'react';
import './ViewQuestions.css';

export default class ViewQuestions extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/questions/');
    fetch(request)
      .then(response => response.json())
        .then(data => {this.setState({data: data});
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Question Type</th>
              <th>Statement</th>
              <th>Option-1</th>
              <th>Option-2</th>
              <th>Option-3</th>
              <th>Option-4</th>
              <th>Answer-1</th>
              <th>Answer-2</th>
              <th>Answer-3</th>
              <th>Answer-4</th>
              <th>Category</th>
              <th>Quiz Title</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.quetype}</td>
                      <td>{item.statement}</td>
                      <td>{item.option1}</td>
                      <td>{item.option2}</td>
                      <td>{item.option3}</td>
                      <td>{item.option4}</td>
                      <td>{item.a1.toString()}</td>
                      <td>{item.a2.toString()}</td>
                      <td>{item.a3.toString()}</td>
                      <td>{item.a4.toString()}</td>
                      <td>{item.category}</td>
                      <td>{item.qtitle}</td>
                  </tr>
                );
             })}
          </tbody>
       </table>
      </div>
    );
  }
}
