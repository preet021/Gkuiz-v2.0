import React, { Component } from 'react';
import './ViewPeople.css';

export default class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    console.log(JSON.parse(localStorage.getItem('person')));
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Handle</th>
              <th>Email</th>
              <th>Password</th>
              <th>City</th>
              <th>Is Admin ? </th>
              <th>Total Score</th>
              <th>SportsScore</th>
              <th>MoviesScore</th>
              <th>LiteratureScore</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.fullname}</td>
                      <td>{item.handle}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td>{item.city}</td>
                      <td>{item.isadmin.toString()}</td>
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
