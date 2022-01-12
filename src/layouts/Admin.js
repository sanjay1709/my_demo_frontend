import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

var ps;

function Dashboard(props) {
  const [activeColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <div className="wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Sidebar {...props} routes={routes} activeColor={activeColor} />
      <div className="main-panel" ref={mainPanel}>
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
      </div>
    </div>
  );
}

export default Dashboard;
