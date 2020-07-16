import React, { useState } from "react";
import axios from "axios";

const Logout = () => {
  const [error, setError] = useState(null);

  const logout = async () => {
    await axios
      .post("http://localhost:8056/user/logout", "", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        setError(res.data);
        localStorage.removeItem();
        window.location = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {error && (
        <div className="pt-4">
          <div className="alert alert-success" role="alert">
            {error}
          </div>
        </div>
      )}
      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Logout;
