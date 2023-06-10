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
      value.includes("Variant detected, not likely at increased risk")
    ) {
      return "rgb(248, 54, 0)";
    }
    // Return a default color if none of the conditions are met
    return "black";
  };
  
  