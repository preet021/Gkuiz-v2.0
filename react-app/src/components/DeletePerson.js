import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './DeletePerson.css';

class DeletePerson extends Component {
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

handleSubmit(event) 
{
  	this.state.data.map(
        function(item, key) {
  		    if (document.getElementById(item.id).checked) {
                fetch('http://localhost:8080/people/'+item.id, {method: 'DELETE'})
                .then(response => {
                    if (response.status>=200 && response.status<300) {
                        window.location.reload();
                    }
                });
            }  
        }
    )
}

render() {
return (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Delete a person</h1>
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
          <th>Is Admin ?</th>
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
                  <td><input type="checkbox" id = {item.id}/></td>
              </tr>
            )
         })}
      </tbody>
   </table><br/>
   <Button bsStyle="primary" onClick = {(e) => this.handleSubmit(e)}>Submit</Button>
  </div>
);
}
}
export default DeletePerson;
