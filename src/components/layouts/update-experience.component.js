import React, { useState } from "react";
import moment from "moment";
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

const UpdateExperience = ({ id, paratitle, paracompany, paradescription, parafrom, parato, show, onHide }) => {
  const [formtitle, setTitle] = useState(paratitle);
  const [formcompany, setCompany] = useState(paracompany);
  const [formfrom, setFrom] = useState(parafrom);
  const [formto, setTo] = useState(parato);
  const [formdescription, setDescription] = useState(paradescription);

  const onFormSubmit = async (e) => {
    e.preventDefault()
    const updateExp = {
      title: formtitle,
      company: formcompany,
      from: formfrom,
      to: formto,
      description: formdescription
    }
    console.log(updateExp)
    const config = {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        "content-type": "application/json",
      }
    }
    await axios.put(`http://localhost:8056/user/update-experience/${id}`, updateExp, config)
      .then((res) => {
        //console.log(res.data)
        window.location = '/me'
      }).catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={onHide}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {`I worked as ${formtitle} in ${formcompany}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={formtitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                className="form-control"
                id="company"
                value={formcompany}
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
                  value={moment(formfrom).format("YYYY-MM-DD")}
                  onChange={(e) => setFrom(e.target.value.toString())}
                />
              </div>
              <div className="col">
                <label htmlFor="to">To</label>
                <input
                  type="date"
                  className="form-control"
                  id="to"
                  value={moment(formto).format("YYYY-MM-DD")}
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
                  value={formdescription}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="float-right">
              <input type='submit' className='btn btn-primary btn-sm' value='Update This' />
            </div>
          </form>
        </Modal.Body>

      </Modal>
    </div>
  );
};

export default UpdateExperience;
