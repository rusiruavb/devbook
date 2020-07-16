import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayExperiences from "../layouts/display-experiences.component";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';

const Profile = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const onClick = () => {
    window.location = "/addexperience";
  };

  useEffect(() => {
    setLoading(true);
    const sendData = async () => {
      try {
        axios
          .get("http://localhost:8056/user/me", {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          })
          .then((res) => {
            //console.log(res.data.avatar);
            setName(res.data.user.name);
            setEmail(res.data.user.email);
            setAvatar(res.data.avatar);
            setLoading(false);
          })
          .catch((error) => {
            window.location = "/login";
            console.log("error is", error.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    sendData();
  }, []);
  // get user profile details

  if (loading) {
    return <h1>Profile Loading...</h1>;
  }

  return (
    <div className="pt-5">
      {error && (
        <div className="pt-4">
          <div className="alert alert-success" role="alert">
            {error}
          </div>
        </div>
      )}
      <div className="row">
        <div className="col col-lg-3 col-md-12 col-sm-12">
          <div className="card" style={{ width: 16 + "rem" }}>
            {avatar && (
              <div className="pt-3 pl-3">
                <Badge badgeContent={
                  <Tooltip title="Add New Experience">
                    <Fab color="default" aria-label="add" size='small'>
                      <AddIcon onClick={onClick} />
                    </Fab>
                  </Tooltip>
                }>
                  <img
                    src={`data:image/png;base64, ${avatar}`}
                    alt="profile-image"
                    style={{ width: 150 + "px" }}
                    className='rounded'
                  />
                </Badge>
              </div>
            )}
            <h4 className="card-title pl-3 pt-2 pb-0">{name}</h4>
            <h6 className="card-text pl-3 pt-0">{email}</h6>
          </div>
        </div>
        <div className="col col-lg-9 col-md-12 col-sm-12">
          <DisplayExperiences />
        </div>
      </div>
    </div>
  );
};

export default Profile;
