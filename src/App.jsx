import AdminLayout from "layouts/Admin.js";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/auth/login";
function App() {
  const localStorageData = JSON.parse(localStorage.getItem("userData"));
  console.log(localStorageData);
  if (!localStorageData) {
    return (
      <>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Redirect to="/login" />
        </Switch>
      </>
    );
  } else {
    return (
      <>
        <Switch>
          <Route
            path="/admin/events"
            render={(props) => <AdminLayout {...props} />}
          />
          <Redirect to="/admin/events" />
        </Switch>
      </>
    );
  }
}

export default App;
