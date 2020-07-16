import React, { useState } from "react";
import axios from "axios";

const CreateProfile = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Password Not Matched");
    }
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password1);
    formData.append("avatar", avatar);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:8056/user/register", formData, config)
      .then((res) => {
        setError("Account Created Successfully");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="pt-5">
      <h3>Create Profile</h3>
      {error && (
        <div className="pt-4">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}

      <form className="pt-4" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            placeholder="Password"
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Re Enter Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            placeholder="Verify Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="custom-file mb-3 form-group">
          <label htmlFor="avatar" className="custom-file-label">
            Select Your Profile Picture
          </label>
          <input
            type="file"
            className="custom-file-input"
            id="avatar"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
