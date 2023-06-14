export const generateSummary = (data) => {
    const summary = {};
  
    for (const section in data) {
      summary[section] = {};
  
      const sectionData = data[section];
  
      for (const subsection in sectionData) {
        const subsectionData = sectionData[subsection];
  
        summary[section][subsection] = {
          Explanation: subsectionData.Explanation,
          Count: subsectionData.Details.length,
          Details: subsectionData.Details
        };
      }
    }
  
    return summary;
  }

export const getTextColor = (value) => {
    if (
      value.includes("Slightly increased risk") ||
      value.includes("Increased likelihood") ||
      value.includes("Variant detected, not likely at increased risk") || 
      value.includes("Predicted poor function")
    ) {
      return "rgb(248, 54, 0)";
    }
    return "black";
  };
  

  const acronyms = {
    "hdl": "HDL",
    "ldl": "LDL",
    "vldl": "VLDL",
    "mcv": "MCV",
    "mch": "MCH",
    "mchc": "MCHC",
    "rdw": "RDW",
    "mpv": "MPV",
    "nonhdl": "Non HDL",
    "cholesterolhdl": "Cholesterol HDL"
  };
  
export const toTitleCase = (str) => {
    let titleCase = str
      .replace(/([a-z](?=[A-Z]))/g, '$1 ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

      for (const acronym in acronyms) {
          if (titleCase.toLowerCase().includes(acronym.toLowerCase())) {
              const regex = new RegExp(`\\b${acronym}\\b`, 'ig');
              titleCase = titleCase.replace(regex, acronyms[acronym]);
            }
        }
        if (titleCase.includes("Non Hdlcholesterol")) {
            return "Non HDL Cholesterol"
        } else if (titleCase.includes("Ldlcholesterol")) {
            return "LDL Cholesterol"
        } else if (titleCase.includes("Vldlcholesterol")) {
            return "VLDL Cholesterol"
        } else if (titleCase.includes("Hdlcholesterol")) {
            return "HDL Cholesterol"
        } else {
            return titleCase;
        }
  };

  // Function to retrieve the normal range based on panel and test name
export const getNormalRange = (panelName, testName) => {
    // Define the normal ranges for each panel and test
    const normalRanges = {
      metabolicPanel: {
        sodium: { min: 135, max: 145 },
        potassium: { min: 3.5, max: 5.0 },
        bicarbonate: { min: 22, max: 28 },
        chloride: { min: 95, max: 105 },
        glucose: { min: 70, max: 99 },
        calcium: { min: 8.5, max: 10.5 },
        urea: { min: 7, max: 20 },
        creatinine: { min: 0.6, max: 1.3 },
        alkalinePhosphatase: { min: 20, max: 140 },
        alanineAminotrasferase: { min: 0, max: 40 },
        aspartateAminotransferase: { min: 0, max: 40 },
        totalBilirubin: { min: 0.1, max: 1.2 },
        albumin: { min: 3.4, max: 5.4 },
        totalProtein: { min: 6.0, max: 8.3 },
      },
      lipidPanel: {
        totalCholesterol: { min: 0, max: 200 },
        HDLCholesterol: { min: 40, max: 60 },
        triglycerides: { min: 0, max: 150 },
        nonHDLCholesterol: {}, // Add appropriate normal range if available
        cholesterolHDL: {}, // Add appropriate normal range if available
        LDLCholesterol: { min: 0, max: 130 },
        VLDLCholesterol: {}, // Add appropriate normal range if available
      },
      bloodCount: {
        whiteBloodCellCount: { min: 4.5, max: 11.0 },
        redBloodCellCount: { min: 4.5, max: 5.5 },
        hemoglobin: { min: 13.5, max: 17.5 },
        hematocrit: { min: 38.8, max: 50.0 },
        MCV: { min: 80, max: 96 },
        MCH: { min: 27, max: 33 },
        MCHC: { min: 32, max: 36 },
        RDW: { min: 11.5, max: 14.5 },
        plateletCount: { min: 150000, max: 450000 },
        MPV: { min: 7.4, max: 10.4 },
        absoluteNeutrophils: {}, // Add appropriate normal range if available
        absoluteLymphocytes: {}, // Add appropriate normal range if available
      },
    };
  
    // Return the normal range for the given panel and test
    return normalRanges[panelName]?.[testName] || {};
  };
  
  // Function to check if a value is within the normal range
  export const isValueWithinNormalRange = (value, normalRange) => {
    const { min, max } = normalRange;
  
    // Check if value is within the normal range
    return min !== undefined && max !== undefined && value >= min && value <= max;
  };

export const getRandomNumber = () => {
    return Math.floor(Math.random() * 16) + 1;
  }
  
  
  


  
  
