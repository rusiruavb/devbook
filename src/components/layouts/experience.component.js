import React, { useState, Component } from "react";
import moment from "moment";
import UpdateExperience from "./update-experience.component";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

const Experience = ({ id, title, company, from, to, description }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <div className="card box">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <h5 className="text-muted">@{company}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            From: {moment(from).format("YYYY-MM-DD")} &nbsp;&nbsp; To:{" "}
            {moment(to).format("YYYY-MM-DD")}
          </p>
          <div className="float-right">
            <Tooltip title="Update Experience">
              <Fab color="default" aria-label="edit" size='small'>
                <EditIcon onClick={() => setModalShow(true)} />
              </Fab>
            </Tooltip>
            &nbsp;&nbsp;
            <Tooltip title="Delete Experience">
              <Fab color="default" aria-label="edit" size='small'>
                <DeleteIcon />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
      <UpdateExperience
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
        paratitle={title}
        paracompany={company}
        parafrom={from}
        parato={to}
        paradescription={description}
      />
    </div>
  );
};

export default Experience;
