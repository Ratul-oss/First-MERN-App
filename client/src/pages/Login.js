import React, { useEffect } from "react";
import FormImg from "../img/register.svg";

const Login = () => {
  useEffect(() => {
    document.title = "Log in to your account";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="login_page">
        <div className="content_wrapper">
          <div className="form_image">
            <img src={FormImg} alt="Form Image" />
          </div>

          <div className="form_container">
            <form>
              <h2 className="form_title">Log In</h2>

              <div className="singleField">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="loginEmail"
                  required
                />
              </div>

              <div className="singleField">
                <input
                  type="password"
                  name="loginPass"
                  placeholder="Enter the password"
                  required
                />
              </div>

              <div className="singleField submitButton">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
