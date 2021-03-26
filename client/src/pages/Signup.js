import React, { useEffect, useState } from "react";
import FormImg from "../img/register.svg";

const Signup = () => {
  const [countries, setCountries] = useState([]);

  // for fething all the data's from country api
  const fetchCountries = async () => {
    try {
      const api = await fetch("https://restcountries.eu/rest/v2/all");
      const apiData = await api.json();
      setCountries(apiData);
    } catch (err) {
      console.log("Something went wrong");
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <>
      <section className="registration_page">
        <div className="content_wrapper">
          <div className="form_image">
            <img src={FormImg} alt="Form Image" />
          </div>

          <div className="form_container">
            <form action="/" method="post">
              <h2 className="form_title">Register Account</h2>

              <div className="singleField">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="userName"
                  required
                />
              </div>

              <div className="singleField">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="userEmail"
                  required
                />
              </div>

              <div className="singleField">
                <select name="usergGender" required>
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
                  type="number"
                  name="userPhone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="singleField">
                <input
                  type="password"
                  name="userPass"
                  placeholder="Enter a password"
                  required
                />
              </div>

              <div className="singleField">
                <input
                  type="password"
                  name="conPass"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className="singleField">
                <select name="userCountry" required>
                  {/* fething countries using the fetchCountries() function */}
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
                  type="text"
                  name="userProfession"
                  placeholder="What is your profession"
                  required
                />
              </div>

              <div className="singleField submitButton">
                <button type="submit">Register Account</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
