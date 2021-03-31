import React, { useEffect } from "react";
import aboutImg from "../img/about.png";

const About = () => {
  useEffect(() => {
    document.title = "Profile Creator About";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="about_page">
        <div className="Container">
          <div className="about_card">
            <div className="about_desc">
              <h2>DevR</h2>
              <p>
                Country: <span>Bangladesh</span>
              </p>
              <p>
                Email: <span>azammmgol@gmail.com</span>
              </p>
              <p>
                Profession <span>Full Stack Developer</span>
              </p>
              <p>
                Gender: <span>Male</span>
              </p>
              <p>
                Phone <span>01872786575</span>
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
