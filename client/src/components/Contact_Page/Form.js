import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ user, status }) => {
  const [contactData, setContactdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const TakeMessage = (event) => {
    const { name, value } = event.target;

    setContactdata((pre) => ({ ...pre, [name]: value }));
  };

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      const { name, email, phone, message } = contactData;

      const res = await fetch("/contact_me", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (res.status === 200) {
        toast.success("Your message has been sent!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.status === 404) {
        toast.warn("Please fill all the fields properly", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.status === 400) {
        toast.error("Something went wrong", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      alert(err);
    }
  };
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

      <div className="form_container">
        <form method="POST" onSubmit={sendMessage}>
          <h2 className="form_header">Contact me</h2>
          {/* three in one field */}
          <div className="three_in_one_field">
            <input
              type="text"
              placeholder="Your name"
              name="name"
              onChange={TakeMessage}
            />
            <input
              type="email"
              placeholder="Your email"
              name="email"
              onChange={TakeMessage}
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              onChange={TakeMessage}
            />
          </div>

          <div className="messageField">
            <textarea
              name="contactMessage"
              placeholder="Your message"
              cols="30"
              rows="10"
              name="message"
              onChange={TakeMessage}
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
