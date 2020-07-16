import React, { useState } from "react";
import axios from "axios";

const CreateExperience = () => {
  const [title, setTitle] = useState();
  const [company, setCompany] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [description, setDescription] = useState();
  const [alert, setAlert] = useState();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const newExp = { title, company, from, to, description };
    console.log(newExp);
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        "content-type": "application/json",
      },
    };

    await axios
      .put("http://localhost:8056/user/create-experience", newExp, config)
      .then((res) => {
        setAlert("Experience Added");
        window.location = "/me";
        //console.log(res.data);
      })
      .catch((error) => {
        setAlert(error.message);
        console.log(error.message);
      });
  };

  return (
    <div>
      <h1 className="pt-5">Add Experience</h1>
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Senior Manager, Software Developer..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            placeholder="tell comnay that you work for"
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="form-row">
          <div className="col">
            <label htmlFor="from">From</label>
            <input
              type="date"
              className="form-control"
              id="from"
              placeholder="working from"
              onChange={(e) => setFrom(e.target.value.toString())}
            />
          </div>
          <div className="col">
            <label htmlFor="to">To</label>
            <input
              type="date"
              className="form-control"
              id="to"
              placeholder="to"
              onChange={(e) => setTo(e.target.value.toString())}
            />
          </div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="description">Add a Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="2"
              placeholder="Add a description about your work"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-info">
          Share this Experience
        </button>
      </form>
    </div>
  );
};

export default CreateExperience;
