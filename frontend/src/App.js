import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ExpensingInfoPage from './pages/ExpensingInfoPage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import RegisterPage from './pages/RegisterPage'
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/expensing-info" component={ExpensingInfoPage} />
          <Route exact path="/contact" component={ContactPage} />
          <PrivateRoute exact path="/admin-dashboard" component={AdminDashboardPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;