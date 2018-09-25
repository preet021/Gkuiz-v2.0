import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import './DeleteQuestion.css';

export default class DeleteQuestion extends Component {
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
            .then(data => this.setState({data: data}));
}

handleEdit(event, id){
  localStorage.setItem('editQueId', id);
  window.location.replace(`/EditQuestion/${id}`);
}

handleSubmit(event) 
{
  	this.state.data.map(
        function(item, key) {
  		    if (document.getElementById(item.id).checked) {
                fetch('http://localhost:8080/question/'+item.id, {method: 'DELETE'})
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
  var This = this;
return (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Delete a Question</h1>
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
          <th>Select to Delete</th>
          <th>Select to Edit</th>
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
                  <td><input type="checkbox" id = {item.id}/></td>
                  <td><Button onClick={(e)=>This.handleEdit(e, item.id)}>Edit</Button></td>
              </tr>
            )
         })}
      </tbody>
   </table>
   <br/>
   <Button bsStyle="primary" onClick = {(e) => this.handleSubmit(e)}>Submit</Button><br/><br/>
  </div>
);
}
}
