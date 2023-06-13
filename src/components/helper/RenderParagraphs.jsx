const RenderParagraphsResponse = ({ data }) => {
  if (!data) {
    return null;
  }

  const paragraphs = data.split("\n\n"); // Split the data into paragraphs using double line breaks
  const paragraphsToRender = paragraphs.slice(1);

  // Render each paragraph with a hyphen
  const renderedParagraphs = paragraphsToRender.map((paragraph, index) => (
    <p style={{ textAlign: "left", fontSize: "16px" }} key={index}>
      {paragraph}
    </p>
  ));

  return <div style={{ padding: "0 30px" }}>{renderedParagraphs}</div>; // Render the paragraphs within a div container
};

export default RenderParagraphsResponse;
