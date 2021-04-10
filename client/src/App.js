import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Error from "./pages/404";
import Users from "./pages/Users";

const App = () => {
  // for handling the user informations
  const [user, setuser] = useState({});
  // for handling the status of authenication if the use is authenticated, I will set it to 200
  // otherwise it will be 400
  // it means if the use is not authenticated, he/she is unable to browse the about page
  // the status must be 200 to be able to browse the about page
  const [status, setStatus] = useState(400);
  const [isLoggedIn, setIsloggedIn] = useState(false);

  // for handling the middleware route / authentication
  const callAboutPage = async () => {
    try {
      // route.js line no: 12
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credencials: "include",
        },
      });

      const body = await res.json();

      setStatus(res.status);

      if (res.status === 200) {
        setuser(body);
        setStatus(200);
        setIsloggedIn(true);
      } else {
        setuser(body);
        setStatus(400);
        setIsloggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // the logout function. Which will be passed the nav.js and the nav.js will use it onclicking on the logout button
  const logOutUser = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          credencials: "include",
        },
      });

      if (res.status === 200) {
        setStatus(400);
        setIsloggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, [user, status, isLoggedIn]);

  return (
    <>
      <Router>
        <Nav
          logOutUser={logOutUser}
          isLoggedIn={isLoggedIn}
          setIsloggedIn={setIsloggedIn}
        />
        <Switch>
          <Route path="/" exact>
            <Home user={user} />
          </Route>
          <Route path="/about">
            <About status={status} user={user} />
          </Route>
          <Route path="/contact">
            <Contact status={status} user={user} />
          </Route>
          {!isLoggedIn ? (
            <>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </>
          ) : null}

          {isLoggedIn ? (
            <Route path="/users">
              <Users />
            </Route>
          ) : null}

          <Route path="" component={Error} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
