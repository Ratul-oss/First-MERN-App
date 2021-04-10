import React from "react";
import SingleCard from "./SingleCard";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

const TopThreenCards = ({ user, status }) => {
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
          subtitle={status === 200 ? user.phone : "Not Provided Yet"}
          style={iconStyle}
          icon={<PhoneIcon style={iconStyle} />}
        />
        <SingleCard
          title="Email"
          subtitle={status === 200 ? user.email : "Not Provided yet"}
          style={iconStyle}
          icon={<MailOutlineIcon style={iconStyle} />}
        />
        <SingleCard
          title="Phone"
          subtitle={status === 200 ? user.phone : "Not Provided Yet"}
          style={iconStyle}
          icon={<WorkOutlineIcon style={iconStyle} />}
        />

        {/*  */}
      </div>
    </>
  );
};

export default TopThreenCards;
