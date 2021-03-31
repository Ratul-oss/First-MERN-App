import React from "react";
import SingleCard from "./SingleCard";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

const TopThreenCards = () => {
  const iconStyle = {
    fontSize: "2.5rem",
    color: "#0083fd",
  };
  return (
    <>
      <div className="top_three_cards">
        {/* single card's */}

        <SingleCard
          title="Phone"
          subtitle="01872786575"
          style={iconStyle}
          icon={<PhoneIcon style={iconStyle} />}
        />
        <SingleCard
          title="Email"
          subtitle="azammmgol@gmail.com"
          style={iconStyle}
          icon={<MailOutlineIcon style={iconStyle} />}
        />
        <SingleCard
          title="Profession"
          subtitle="Full Stack Developer"
          style={iconStyle}
          icon={<WorkOutlineIcon style={iconStyle} />}
        />

        {/*  */}
      </div>
    </>
  );
};

export default TopThreenCards;
