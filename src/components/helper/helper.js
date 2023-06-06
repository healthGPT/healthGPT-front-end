export const generateSummary = (data) => {
    const summary = {};
  
    for (const section in data) {
      summary[section] = {};
  
      const sectionData = data[section];
  
      for (const subsection in sectionData) {
        const subsectionData = sectionData[subsection];
  
        summary[section][subsection] = {
          Explanation: subsectionData.Explanation,
          Count: subsectionData.Details.length
        };
      }
    }
  
    return summary;
  }