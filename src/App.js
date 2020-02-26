import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { AuthContext } from "./contexts/Auth";

import Home from './components/Landing/Home'
import Privacy from './components/Landing/Privacy'
import Terms from './components/Landing/Terms'
import Auth from './components/Landing/Auth'
import Admin from './components/Admin'
import CreateSucursal from './components/Admin/CreateSucursal/index'
import IndexSucursal from './components/Admin/ListSucursal/index'
import Pos from './components/Admin/Pos/Pos'
import DailyReport from './components/Admin/Report/'
import ErrorBoundary from './helpers/ErrorBoundary'
import PrivateRoute from './helpers/PrivateRoute'


import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(JSON.stringify(data));
  }

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
        <ToastContainer 
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/privacy" component={ Privacy } />
            <Route path="/terms" component={ Terms } />
            <Route path="/auth" component={ Auth } />
            <PrivateRoute path="/admin/home" component={ () => <Admin userData={ authTokens } /> } />
            <PrivateRoute path="/admin/sucursal/create" component={ () => <CreateSucursal userData={ authTokens } /> } />
            <PrivateRoute path="/admin/sucursal/index" component={ () => <IndexSucursal userData={ authTokens } /> } />
            <PrivateRoute path="/admin/pos" component={ () => <Pos userData={ authTokens } /> } />
            <PrivateRoute path="/admin/reports/daily" component={ () => <DailyReport userData={ authTokens } /> } />
          </Switch>
        </Router>
      </AuthContext.Provider> 
    </ErrorBoundary>
  );
}

export default App;
