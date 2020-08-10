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
import RechargeWallet from './components/Admin/RechargeWallet'
import Recharge from './components/Admin/Recharge/Index';
import RechargeReturn from './components/Admin/Recharge/components/pseReturnUrl';
import ErrorBoundary from './helpers/ErrorBoundary'
import PrivateRoute from './helpers/PrivateRoute'
import { createBrowserHistory } from "history";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const userInfo = localStorage.getItem("userData") != null ? JSON.parse(localStorage.getItem("userData")) : null; 
  const tokens = localStorage.getItem("tokens") != null ? JSON.parse(localStorage.getItem("tokens")) : null; 
  const [authTokens, setAuthTokens] = useState(tokens ? tokens : false);
  const [userData, setUserData] = useState(userInfo ? userInfo : false)
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  const setStoreUser = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data)
  }
  const history = createBrowserHistory();
  return (
    <ErrorBoundary>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, disableToken: setTokens, userData, setUserData: setStoreUser }}>
        <Router history={history}>
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
            <Route path="/login" component={ Auth } />
            <PrivateRoute path="/admin/home" component={ () => <Admin userData={ authTokens } /> } />
            <PrivateRoute path="/admin/sucursal/create" component={ () => <CreateSucursal userData={ authTokens } /> } />
            <PrivateRoute path="/admin/sucursal/index" component={ () => <IndexSucursal userData={ authTokens } history={history}/> } />
            <PrivateRoute path="/admin/pos" component={ () => <Pos userData={ authTokens } /> } />
            <PrivateRoute path="/admin/reports/daily" component={ () => <DailyReport userData={ authTokens } /> } />
            <PrivateRoute path="/admin/recharge" component={ () => <Recharge userData={ authTokens } /> } />
            <PrivateRoute exact path="/admin/callback/pse/result" component={() => <RechargeReturn userData={ authTokens } />} />
          </Switch>
        </Router>
      </AuthContext.Provider> 
    </ErrorBoundary>
  );
}

export default App;
