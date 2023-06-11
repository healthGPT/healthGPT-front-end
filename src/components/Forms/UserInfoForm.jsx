import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const UserInfoForm = ({
  name,
  setName,
  email,
  setEmail,
  age,
  setAge,
  sex,
  setSex,
  heightFeet,
  setHeightFeet,
  heightInches,
  setHeightInches,
  weight,
  setWeight,
  job,
  setJob,
  userInfoForm,
  setUserInfoForm,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any processing or calculations based on the user's inputs and selected job
    // ...
    //
    const selectedJob = jobsData.find((jobObj) => jobObj.job === job);

    const UserInfoFormData = {
      name,
      age,
      sex,
      heightFeet,
      heightInches,
      weight,
      email,
      job: selectedJob,
    };

    localStorage.setItem("UserInfoForm", JSON.stringify(UserInfoFormData));
    setUserInfoForm(UserInfoFormData);

    // Reset the form fields
    setName("");
    setAge("");
    setSex("");
    setHeightFeet("");
    setHeightInches("");
    setWeight("");
    setEmail("");
    console.log(userInfoForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        type="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(event) => setAge(event.target.value)}
        required
      />
      <br />
      <FormControl>
        <InputLabel id="sex-label">Sex</InputLabel>
        <Select
          labelId="sex-label"
          id="sex"
          value={sex}
          onChange={(event) => setSex(event.target.value)}
          required
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <br />
      <TextField
        label="Height (feet)"
        type="number"
        value={heightFeet}
        onChange={(event) => setHeightFeet(event.target.value)}
        required
      />
      <TextField
        label="Height (inches)"
        type="number"
        value={heightInches}
        onChange={(event) => setHeightInches(event.target.value)}
        required
      />
      <br />
      <TextField
        label="Weight"
        type="number"
        value={weight}
        onChange={(event) => setWeight(event.target.value)}
        required
      />
      <br />
      <FormControl>
        <InputLabel id="job-label">Job</InputLabel>
        <Select
          labelId="job-label"
          id="job"
          value={job}
          onChange={(event) => setJob(event.target.value)}
          required
        >
          {jobsData.map((job) => (
            <MenuItem key={job.id} value={job.job}>
              {job.job}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserInfoForm;

const jobsData = [
  {
    job: "Software Engineer",
    stressLevel: 7,
    sedentaryLevel: 9,
    physicalDemand: 2,
    mentalDemand: 8,
    workHours: { average: 40, overtime: "Occasional" },
    nutritionImpact: {
      rating: 5,
      description: "High stress and sedentary work could impact eating habits",
    },
    hazardExposure: {
      rating: 1,
      description: "Minimal exposure to hazardous substances",
    },
    socialIsolation: {
      rating: 4,
      description: "Potential for isolation if remote work",
    },
  },
  {
    job: "Firefighter",
    stressLevel: 9,
    sedentaryLevel: 1,
    physicalDemand: 10,
    mentalDemand: 8,
    workHours: { average: 50, overtime: "Frequent" },
    nutritionImpact: {
      rating: 4,
      description: "Irregular hours can disrupt normal eating patterns",
    },
    hazardExposure: {
      rating: 9,
      description: "High risk of injury and exposure to hazardous conditions",
    },
    socialIsolation: {
      rating: 2,
      description: "Strong camaraderie among firehouse teams",
    },
  },
  {
    job: "Teacher",
    stressLevel: 6,
    sedentaryLevel: 3,
    physicalDemand: 4,
    mentalDemand: 7,
    workHours: { average: 40, overtime: "Occasional" },
    nutritionImpact: {
      rating: 3,
      description: "Regular schedule allows for planned meals",
    },
    hazardExposure: {
      rating: 2,
      description:
        "Minimal exposure to hazardous substances, but potential exposure to germs",
    },
    socialIsolation: {
      rating: 2,
      description: "Frequent interactions with students and staff",
    },
  },
  {
    job: "Nurse",
    stressLevel: 8,
    sedentaryLevel: 3,
    physicalDemand: 6,
    mentalDemand: 8,
    workHours: { average: 45, overtime: "Frequent" },
    nutritionImpact: {
      rating: 7,
      description: "Long shifts can lead to irregular eating patterns",
    },
    hazardExposure: {
      rating: 7,
      description:
        "Frequent exposure to disease and potentially hazardous substances",
    },
    socialIsolation: {
      rating: 2,
      description: "High interaction with patients and staff",
    },
  },
  {
    job: "Corporate Executive",
    stressLevel: 8,
    sedentaryLevel: 7,
    physicalDemand: 2,
    mentalDemand: 9,
    workHours: { average: 50, overtime: "Frequent" },
    nutritionImpact: {
      rating: 6,
      description:
        "High stress and busy schedule could negatively affect eating habits",
    },
    hazardExposure: {
      rating: 1,
      description: "Minimal exposure to hazardous substances",
    },
    socialIsolation: {
      rating: 3,
      description:
        "Frequent interactions, but high stress can lead to feelings of isolation",
    },
  },
  {
    job: "Construction Worker",
    stressLevel: 7,
    sedentaryLevel: 1,
    physicalDemand: 9,
    mentalDemand: 5,
    workHours: { average: 50, overtime: "Occasional" },
    nutritionImpact: {
      rating: 4,
      description: "Physical demands may lead to increased caloric intake",
    },
    hazardExposure: {
      rating: 8,
      description: "High risk of injury and exposure to hazardous substances",
    },
    socialIsolation: {
      rating: 2,
      description: "Regular interactions with construction crew",
    },
  },
];
