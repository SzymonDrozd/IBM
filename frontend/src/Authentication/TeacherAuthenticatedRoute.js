import React, {Fragment} from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated
        ? <Fragment>
           {cProps.user.status==="teacher"
            ? <C {...props} {...cProps} />
            : <Redirect
                to={`/login?redirect=${props.location.pathname}${props.location
                  .search}`}
            />}
        </Fragment>
        
        : <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location
              .search}`}
          />}
  />;
