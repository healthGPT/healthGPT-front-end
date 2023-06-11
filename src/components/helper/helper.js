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
    // Split the string into separate words at each capital letter and capitalize the first letter of each word.
    let titleCase = str
      .replace(/([a-z](?=[A-Z]))/g, '$1 ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');


      
      // Replace acronyms in the string with their space-separated versions
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
        } else {
            return titleCase;
        }
        
  };
  


  
  
