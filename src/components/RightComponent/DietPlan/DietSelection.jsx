import React from "react";
import { useState, useContext } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { GptContext } from "../../../context/GPT/gptContextProvider";

const DietSelection = () => {
  const { selectedDiet, setSelectedDiet } = useContext(GptContext);

  const handleDietChange = (event) => {
    setSelectedDiet(event.target.value);
  };

  return (
    <FormControl style={{ width: "35%", color: "whtite" }}>
      <InputLabel style={{ color: "white" }} id="diet-label">
        Choose Your Diet
      </InputLabel>
      <Select
        labelId="diet-label"
        id="diet-select"
        value={selectedDiet}
        onChange={handleDietChange}
        label="Choose Your Diet"
        sx={{
          color: "white",
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
        }}
      >
        <MenuItem value="">-- Select Diet --</MenuItem>
        <MenuItem value="alcoholFree">Alcohol Free</MenuItem>
        <MenuItem value="balanced">Balanced</MenuItem>
        <MenuItem value="highFiber">High Fiber</MenuItem>
        <MenuItem value="highProtein">High Protein</MenuItem>
        <MenuItem value="keto">Keto</MenuItem>
        <MenuItem value="kidneyFriendly">Kidney Friendly</MenuItem>
        <MenuItem value="kosher">Kosher</MenuItem>
        <MenuItem value="lowCarb">Low Carb</MenuItem>
        <MenuItem value="lowFat">Low Fat</MenuItem>
        <MenuItem value="lowPotassium">Low Potassium</MenuItem>
        <MenuItem value="lowSodium">Low Sodium</MenuItem>
        <MenuItem value="noOilAdded">No Oil Added</MenuItem>
        <MenuItem value="noSugar">No Sugar</MenuItem>
        <MenuItem value="paleo">Paleo</MenuItem>
        <MenuItem value="pescatarian">Pescatarian</MenuItem>
        <MenuItem value="porkFree">Pork Free</MenuItem>
        <MenuItem value="redMeatFree">Red Meat Free</MenuItem>
        <MenuItem value="sugarConscious">Sugar Conscious</MenuItem>
        <MenuItem value="vegan">Vegan</MenuItem>
        <MenuItem value="vegetarian">Vegetarian</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DietSelection;
