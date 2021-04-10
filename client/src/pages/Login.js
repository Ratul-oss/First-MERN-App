import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FormImg from "../img/register.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // for handling the login form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  // for handling the input fields
  const TakeLoginInfo = (event) => {
    const { name, value } = event.target;

    setLoginData((pre) => ({ ...pre, [name]: value }));
  };

  // connecting to the back-end
  const LoginUser = async (e) => {
    try {
      e.preventDefault();

      const { email, password } = loginData;

      const res = await fetch("/user_login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(res.status);

      const body = await res.json();

      if (res.status === 200) {
        toast.success(body.success, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          history.push("/");
        }, 1000);
      } else if (res.status === 400) {
        toast.error(body.err, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    document.title = "Log in to your account";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* the toast */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <section className="login_page">
        <div className="content_wrapper">
          <div className="form_image">
            <img src={FormImg} alt="Form Image" />
          </div>

          <div className="form_container">
            <form method="POST" onSubmit={LoginUser}>
              <h2 className="form_title">Log In</h2>

              <div className="singleField">
                <input
                  onChange={TakeLoginInfo}
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  required
                  value={loginData.email}
                />
              </div>

              <div className="singleField">
                <input
                  onChange={TakeLoginInfo}
                  type="password"
                  name="password"
                  placeholder="Enter the password"
                  required
                  value={loginData.password}
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
