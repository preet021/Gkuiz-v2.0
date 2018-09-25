import React, { Component } from "react";
import "./Logout.css";

export default class Logout extends Component {

constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

handleLogout() {
  var p = {
    isUsrLoggedin: false,
    isUsrAdmin: false,
    usrHandle: ""
  }
  localStorage.setItem('person', JSON.stringify(p));
  window.location.replace('/Login');
}

 render() {
    this.handleLogout();
    return (<div></div>);
  }
}