import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        !auth.getCurrentUser() ? (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        ) : Component ? (
          <Component {...props} />
        ) : (
          render(props)
        )
      }
    />
  );
};

export default ProtectedRoute;
