import React, { useEffect } from "react";
import Form from "../components/Contact_Page/Form";
import TopThreenCards from "../components/Contact_Page/TopThreenCards";

const Contact = () => {
  useEffect(() => {
    document.title = "Profile Creator - Contact";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="contact_page">
        <div className="Container">
          {/*  */}

          {/* this one is containing the three cards */}
          <TopThreenCards />
          {/* the form Component */}
          <Form />

          {/*  */}
        </div>
      </section>
    </>
  );
};

export default Contact;
