import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import aboutImg from "../img/about.png";

const SingleUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  const fetchUserData = async () => {
    const res = await fetch(`${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    setUser(data);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
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

export default SingleUser;
