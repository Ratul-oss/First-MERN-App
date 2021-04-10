import React, { useEffect } from "react";
import aboutImg from "../img/about.png";
import { useHistory } from "react-router-dom";

const About = ({ user, status }) => {
  const history = useHistory();

  useEffect(() => {
    document.title = "Profile Creator About";
    window.scrollTo(0, 0);
    // setting the status to 400 is the user is not authenticated

    if (status === 400) {
      history.push("/login");
    } else if (status === 200) {
      history.push("/about");
    }
  }, [user, status]);

  return (
    <>
      <div className="about_page">
        <div className="Container">
          <div className="about_card">
            <div className="about_desc">
              <h2>{user.name}</h2>
              <p>
                Country: <span>{user.country}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
              <p>
                Profession <span>{user.profession}</span>
              </p>
              <p>
                Gender: <span>{user.gender}</span>
              </p>
              <p>
                Phone: <span>{"0" + user.phone}</span>
              </p>
              <p>
                Member Since: <span>{user.date}</span>
              </p>
            </div>
            <div className="about_img">
              <img src={aboutImg} alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
