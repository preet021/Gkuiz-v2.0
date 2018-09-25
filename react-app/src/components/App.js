import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import Leaderboard from './Leaderboard';
import Logout from './Logout';
import NewQuiz from './NewQuiz';
import ViewQuestions from './ViewQuestions';
import DeleteQuestion from './DeleteQuestion';
import ViewPeople from './ViewPeople';
import DeletePerson from './DeletePerson';
import ViewDeleteQuiz from './ViewDeleteQuiz';
import Play from './Play';
import Home from './Home';
import MyPerformance from './MyPerformance';
import EditQuestion from './EditQuestion';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class App extends Component {

  render() {
    var p = JSON.parse(localStorage.getItem('person'));
    if (p.isUsrLoggedin && p.isUsrAdmin) 
      return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>GKuiz</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewQuestions'}>View Questions</Link></li>
                  <li><Link to={'/DeleteQuestion'}>Delete Question</Link></li>
                  <li><Link to={'/NewQuiz'}>Add Quiz</Link></li>
                  <li><Link to={'/ViewDeleteQuiz'}>View/Delete Quiz</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewQuestions' component={ViewQuestions} />
                 <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                 <Route exact path='/NewQuiz' component={NewQuiz} />
                 <Route exact path='/ViewDeleteQuiz' component={ViewDeleteQuiz} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route path={`/EditQuestion/:id`} component={EditQuestion} />
            </Switch>
          </div>
        </Router>
      </div>
    );
    else if (p.isUsrLoggedin && !p.isUsrAdmin) return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>GKuiz</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/Play'}>Play</Link></li>
                  <li><Link to={'/MyPerformance'}>My Performance</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route path='/Play' component={Play} />
                 <Route path='/MyPerformance' component={MyPerformance} />
                 <Route exact path='/Logout' component={Logout} />
            </Switch>
          </div>
        </Router>
      </div>
    );
    else return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>GKuiz</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                  <li><Link to={'/Register'}>Register</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/Register' component={Register} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
