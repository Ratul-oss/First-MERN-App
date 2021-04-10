import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FormImg from "../img/register.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// * the signup page
const Signup = () => {
  const history = useHistory();
  // for storing the country data
  const [countries, setCountries] = useState([]);
  // for handing the input fileds in the form
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    conPass: "",
    country: "",
    profession: "",
  });

  // for handing the form data onChange
  const TakeUserData = (event) => {
    const { name, value } = event.target;

    setUser((pre) => ({ ...pre, [name]: value }));
  };

  // * for fething all the data's from country api and putting them in the select option box
  const fetchCountries = async () => {
    try {
      const api = await fetch("https://restcountries.eu/rest/v2/all");
      const apiData = await api.json();
      setCountries(apiData);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  const RegisterUser = async (e) => {
    try {
      e.preventDefault();

      const {
        name,
        email,
        gender,
        phone,
        password,
        country,
        profession,
      } = user;

      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          gender,
          phone,
          password,
          country,
          profession,
        }),
      });
      const data = await res.json();

      if (res.status === 422) {
        toast.error(data.err, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.status === 200) {
        toast.success(data.success, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          history.push("/login");
        }, 1000);
      } else if (res.status === 400) {
        alert(data.err);
      }
    } catch (err) {
      alert("Err");
    }
  };

  useEffect(() => {
    // for fetching all the datas of country
    fetchCountries();
    document.title = "Register Account";
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

      <section className="registration_page">
        <div className="content_wrapper">
          <div className="form_image">
            <img src={FormImg} alt="Form Image" />
          </div>

          <div className="form_container">
            <form method="POST">
              <h2 className="form_title">Register Account</h2>

              <div className="singleField">
                <input
                  onChange={TakeUserData}
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  required
                  value={user.name}
                />
              </div>

              <div className="singleField">
                <input
                  onChange={TakeUserData}
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  required
                  value={user.email}
                />
              </div>

              <div className="singleField">
                <select
                  value={user.gender}
                  onChange={TakeUserData}
                  name="gender"
                  required
                >
                  <option value="" selected disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="singleField">
                <input
                  onChange={TakeUserData}
                  type="number"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  value={user.phone}
                />
              </div>

              <div className="singleField">
                <input
                  onChange={TakeUserData}
                  type="password"
                  name="password"
                  placeholder="Enter a password"
                  required
                  value={user.password}
                />
              </div>

              <div className="singleField">
                <input
                  onChange={TakeUserData}
                  type="password"
                  name="conPass"
                  placeholder="Confirm Password"
                  required
                  value={user.conPass}
                />
              </div>

              <div className="singleField">
                <select
                  value={user.country}
                  onChange={TakeUserData}
                  name="country"
                  required
                >
                  {/* fething countries using the fetchCountries() function */}
                  <option value="" selected disabled>
                    Select Country
                  </option>
                  {countries.map((data, index) => {
                    return (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="singleField">
                <input
                  onChange={TakeUserData}
                  type="text"
                  name="profession"
                  placeholder="What is your profession"
                  required
                  value={user.profession}
                />
              </div>

              <div className="singleField submitButton">
                <button onClick={RegisterUser} type="submit">
                  Register Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
