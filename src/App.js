import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Admin from "./page/Admin";
import AdminLogin from "./page/AdminLogin";
import './App.css';
function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={Admin} />
      <Route path="/adminlogin" component={AdminLogin} />
    </Router>
  );
}

export default App;
