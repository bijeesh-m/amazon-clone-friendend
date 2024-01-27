import React, { useContext } from "react";
import { myContext } from "../App";

const LogoutButton = () => {
  const { user } = useContext(myContext);

  const handleLogout = () => {
    /*global google*/
    const email = user.email;
    google.accounts.id.revoke("bijigamer79@gmail.com", (done) => {
    });
  };
  return (
    <div>
      <button onClick={handleLogout} id="signout_button">
        logout
      </button>
    </div>
  );
};

export default LogoutButton;
