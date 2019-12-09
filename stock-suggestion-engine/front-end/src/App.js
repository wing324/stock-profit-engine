import React from 'react';
import './App.css';
import UserInputForm from './component/UserInput';
import UserResult from './component/UserResult';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

function App() {
  return (
      <Router>
        <div>
          <Route exact path="/" component={UserInputForm} />
          <Route path="/results" component={UserResult} />
        </div>
      </Router>
  );
}

export default App;
