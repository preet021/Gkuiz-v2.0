import React, { Component } from 'react';
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome {JSON.parse(localStorage.getItem('person')).usrHandle}</h1>
        </header>
        <br/>
      </div>
    );
  }
}
