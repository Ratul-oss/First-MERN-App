import React from "react";

const SingleCard = (prop) => {
  return (
    <>
      <div className="single_card">
        <h2 className="sideIcon">{prop.icon}</h2>
        <div className="info">
          <h2> {prop.title} </h2>
          <p> {prop.subtitle} </p>
        </div>
      </div>
    </>
  );
};

export default SingleCard;
