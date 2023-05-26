import React, { useState, useEffect } from "react";

const TypingEffect = ({ text }) => {
  const [content, setContent] = useState("");

  console.log({ text });

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      const currentText = text || "";
      if (i < currentText.length) {
        setContent((prev) => prev + currentText[i]);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, [text]);

  //   useEffect(() => {
  //     let i = 0;
  //     const typingEffect = setInterval(() => {
  //       if (i < text.length) {
  //         setContent((prev) => prev + text[i]);
  //         i++;
  //       } else {
  //         clearInterval(typingEffect);
  //       }
  //     }, 100); // you can adjust typing speed by changing this value

  //     // Cleanup function to clear the interval if the component unmounts mid-typing
  //     return () => clearInterval(typingEffect);
  //   }, [text]); // the effect will re-run whenever 'text' changes

  return <p>{content}</p>;
};

export default TypingEffect;
