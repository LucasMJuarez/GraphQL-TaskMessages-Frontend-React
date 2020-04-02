import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Navigation } from './components/Navbar';
import { Footer } from './components/Footer'

import "bootswatch/dist/lux/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Switch>
          <Route exact path="/" component={MessageList} />
          <Route exact path="/tasks" component={TaskList} />
          <Route exact path="/new-message" component={MessageForm} />
          <Route exact path="/new-task" component={TaskForm} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
