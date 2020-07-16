import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Experience from "./experience.component";

const DisplayExperiences = () => {
  const [loading, setLoading] = useState(true);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        };
        const { data } = await axios.get(
          "http://localhost:8056/user/experience",
          config
        );
        //console.log(data.experience);
        setExperience(data.experience);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {experience.length === 0 && (
        <h1 className="pt-4 text-muted display-4">
          Add Experieces To Your Profile
        </h1>
      )}
      {experience.length !== 0 && <h1 className="pt-4">Experieces</h1>}
      <div className="row justify-content-center pt-3">
        {experience.map((exp, index) => (
          <div key={exp._id}>
            <Experience
              id={exp._id}
              title={exp.title}
              company={exp.company}
              from={exp.from}
              to={exp.to}
              description={exp.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayExperiences;
