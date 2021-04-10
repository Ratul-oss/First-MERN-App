import React, { useEffect } from "react";

const Home = ({ user }) => {
  useEffect(() => {
    document.title = "Profile Creator - Home";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header className="home_page">
        <div className="Container">
          <div className="HeaderContentWrapper">
            {/*  */}

            {user.name && user.email ? (
              <div className="header_desc">
                <p>Welcome</p>
                <h1>Hi {user.name}. How are you doing!</h1>
              </div>
            ) : (
              <div className="header_desc">
                <p>Welcome</p>
                <h1>Let's Create a profile for you</h1>
              </div>
            )}

            {/*  */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Home;
