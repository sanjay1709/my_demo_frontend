import Events from "./pages/events/Events";
import Login from "./pages/auth/login";

var routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Events",
    icon: "nc-icon nc-air-baloon",
    component: Events,
    layout: "/admin",
  },
];
export default routes;
