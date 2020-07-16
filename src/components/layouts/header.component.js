import React, { useState, useEffect } from "react";
import axios from 'axios'
import Button from '@material-ui/core/Button';

const Header = () => {

  // code for show logout 
  let [show, setShow] = useState(false)

  useEffect(() => {
    const checkLogin = () => {
      if (localStorage.getItem('Authorization')) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    checkLogin()
  }, [])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 48;
  // end of logout

  const logout = async () => {
    await axios
      .post("http://localhost:8056/user/logout", "", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        localStorage.removeItem("Authorization");
        window.location = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light navbar-expand-lg">
        <a className="navbar-brand" href="#">
          <img
            src="/images/header5.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          &nbsp;&nbsp;devbook
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Create Account
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
            {show === true ?
              <li className="nav-item">
                <a className="nav-link" href='' onClick={logout}>
                  Logout
                </a>
              </li>
              :
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>}
          </ul>

        </div>
      </nav>
    </div>
  );
};

export default Header;
