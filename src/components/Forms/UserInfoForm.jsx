import React, { useContext } from "react";
import { JsonDataContext } from "../../context/UserUploads/JsonDataContext";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import { GPT35Turbo } from "../helper/openai";
import { UserInfoPrompt } from "../helper/prompts/prompts";

import { GptContext } from "../../context/GPT/gptContextProvider";

import { LoadingContext } from "../../context/LoadingContext/LoadingContext";

import { useLoading } from "../../context/LoadingContext/LoadingContext";

import { jobsData } from "./jobs";

const UserInfoForm = () => {
  const { addInput, setGptResponse, saveResponse } = useContext(GptContext);
  const { setUserInfoForm, formState, setFormState } =
    useContext(JsonDataContext);
  const { setIsLoading } = useContext(LoadingContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const selectedJob = jobsData.find(
        (jobObj) => jobObj.job === formState.job
      );
      const UserInfoFormData = {
        name: formState.name,
        age: formState.age,
        sex: formState.sex,
        heightFeet: formState.heightFeet,
        heightInches: formState.heightInches,
        weight: formState.weight,
        email: formState.email,
        job: selectedJob,
      };

      localStorage.setItem("UserInfoForm", JSON.stringify(UserInfoFormData));

      setUserInfoForm(UserInfoFormData);

      // call GPT here
      const gptResponse = await GPT35Turbo(UserInfoPrompt(UserInfoFormData));
      console.log("user info prompt", UserInfoPrompt(UserInfoFormData));
      console.log("gpt response", gptResponse);

      setGptResponse(gptResponse);

      setIsLoading(false);
      setFormState({
        name: "",
        age: "",
        sex: "",
        heightFeet: "",
        heightInches: "",
        weight: "",
        email: "",
        job: "",
      });
    } catch (error) {
      console.error("An error occurred:", error);
      // handle the error here
    }
  };

  const createChangeHandler = (field) => (event) => {
    const { value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        type="name"
        value={formState.name}
        onChange={createChangeHandler("name")}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={formState.email}
        onChange={createChangeHandler("email")}
        required
      />
      <TextField
        label="Age"
        type="number"
        value={formState.age}
        onChange={createChangeHandler("age")}
        required
      />
      <br />
      <FormControl>
        <InputLabel id="sex-label">Sex</InputLabel>
        <Select
          labelId="sex-label"
          id="sex"
          value={formState.sex}
          onChange={createChangeHandler("sex")}
          required
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl>
      <br />
      <TextField
        label="Height (feet)"
        type="number"
        value={formState.heightFeet}
        onChange={createChangeHandler("heightFeet")}
        required
      />
      <TextField
        label="Height (inches)"
        type="number"
        value={formState.heightInches}
        onChange={createChangeHandler("heightInches")}
        required
      />
      <br />
      <TextField
        label="Weight"
        type="number"
        value={formState.weight}
        onChange={createChangeHandler("weight")}
        required
      />
      <br />
      <FormControl>
        <InputLabel id="job-label">Job</InputLabel>
        <Select
          labelId="job-label"
          id="job"
          value={formState.job}
          onChange={createChangeHandler("job")}
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
