import React, { Component } from 'react';
import Quiz from './Quiz';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class Play extends Component {
  constructor() {
    super();
    this.state = {
      categories: [
          "Sports",
          "Movies",
          "Literature"
        ],
      sports_catg: [],
      movies_catg: [],
      literature_catg: [],
      data: []
    }
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

  render() {
    return (
      <div className="App" id="ffl">
        <header className="App-header">
          <h1 className="App-title">Categories</h1>
        </header>
        <br/>
         <Grid> 
          <Row className="show-grid">
          <Col xs={12} md={4}>
            <code style={{justifyContent: 'center', color: 'black'}}><h3><b>Sports</b></h3></code><br/>
            {this.state.sports_catg.map(function(item, key) {
                  return (
                    <div>  
                      <Link to={`/Play/Sports#${item}`}>{item}</Link>
                    </div>
                  )
                }
              ) 
            }
          </Col>
          <Col xs={12} md={4}>
            <code style={{justifyContent: 'center', color: 'black'}}><h3><b>Movies</b></h3></code><br/>
            {this.state.movies_catg.map(function(item, key) {
                  return (
                    <div>  
                      <Link to={`/Play/Movies#${item}`}>{item}</Link>
                    </div>
                  )
                }
              ) 
            }
          </Col>
          <Col xs={12} md={4}>
            <code style={{justifyContent: 'center', color: 'black'}}><h3><b>Literature</b></h3></code><br/>
            {this.state.literature_catg.map(function(item, key) {
                  return (
                    <div>  
                      <Link to={`/Play/Literature#${item}`}>{item}</Link>
                    </div>
                  )
                }
              ) 
            }
          </Col>
          </Row>
        </Grid>  
      <Route path={`/Play/:catg`} component={Quiz}/>
      </div>
    );
  }
}
