import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const DietSelection = () => {
  const [selectedDiet, setSelectedDiet] = React.useState("");

  const handleDietChange = (event) => {
    setSelectedDiet(event.target.value);
    // You can perform further actions based on the selected diet
  };

  return (
    <FormControl>
      <InputLabel id="diet-label">Choose Your Diet</InputLabel>
      <Select
        labelId="diet-label"
        id="diet-select"
        value={selectedDiet}
        onChange={handleDietChange}
        label="Choose Your Diet"
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
