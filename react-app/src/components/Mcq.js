import React, { Component } from 'react';
import {Button, ButtonToolbar, ToggleButton, ToggleButtonGroup, Panel} from 'react-bootstrap';


export default class QueBox extends Component {
  render() {
    return (
    	<div id={this.props.qno}>
    		<h4><b>{"Q"+this.props.qno+" "+this.props.statement}</b></h4>
    		<input type="checkbox" id={this.props.qno+"op1"} name={this.props.qno+"option2"}/>{this.props.op1}<br/>
    		<input type="checkbox" id={this.props.qno+"op2"} name={this.props.qno+"option2"}/>{this.props.op2}<br/>
    		<input type="checkbox" id={this.props.qno+"op3"} name={this.props.qno+"option2"}/>{this.props.op3}<br/>
    		<input type="checkbox" id={this.props.qno+"op4"} name={this.props.qno+"option2"}/>{this.props.op4}<br/>
    	</div>
    );
  }
}
