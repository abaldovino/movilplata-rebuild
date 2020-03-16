import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import Layout from '../components/Admin/Layout'

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Layout>
            <Component {...props} {...rest}/>
          </Layout>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;