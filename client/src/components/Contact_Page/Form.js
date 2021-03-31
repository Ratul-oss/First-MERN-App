import React from "react";

const Form = () => {
  return (
    <>
      <div className="form_container">
        <form>
          <h2 className="form_header">Contact me</h2>
          {/* three in one field */}
          <div className="three_in_one_field">
            <input type="text" placeholder="Your name" name="contactName" />
            <input type="email" placeholder="Your email" name="contactEmail" />
            <input
              type="number"
              name="contactNumber"
              placeholder="Phone Number"
            />
          </div>

          <div className="messageField">
            <textarea
              name="contactMessage"
              placeholder="Your message"
              cols="30"
              rows="10"
            ></textarea>
          </div>

          <div className="submitButton">
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
