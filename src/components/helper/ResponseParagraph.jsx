import React from "react";

const ResponseComponent = ({ response }) => {
  //   if (!response || !response.gptResponse) {
  //     return null; // or return some loading state or a default message
  //   }
  // Split the gptResponse into an array of lines\

  console.log(response);

  const paragraphs = response.split("\n\n");

  console.log(paragraphs);
  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p style={{ color: "black", textAlign: "left" }} key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default ResponseComponent;
