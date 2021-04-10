import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userIcon from "../img/user.png";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUserDatas = async () => {
    try {
      const res = await fetch("/users");
      const body = await res.json();

      setUsers(body);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDatas();
  }, []);

  return (
    <div>
      <div className="user_page">
        <div className="container">
          <h2
            style={{
              fontSize: "2rem",
              textAlign: "center",
              margin: "20px 0px 50px 0px",
            }}
          >
            Our Cool Users 😎
          </h2>
          <div className="users_wrapper">
            {users.map((user, index) => {
              return (
                <div key={index} className="single_user">
                  <div className="userimg">
                    <img src={userIcon} alt="User Icon" />
                  </div>
                  <h1>{user.name}</h1>
                  <p>{user.profession}</p>
                  <Link to={`singleUser/${user._id}`}>View Profile</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
