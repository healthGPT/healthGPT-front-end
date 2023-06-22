import React from "react";
import { render, screen } from "@testing-library/react";
import PercentDot from "./PercentDot";

describe("PercentDot", () => {
  test("renders correctly and applies backgroundImage prop", () => {
    const testBackgroundImage = "url('some_image_url')";
    render(<PercentDot backgroundImage={testBackgroundImage} />);

    const dotElement = screen.getByTestId("percent-dot");
    expect(dotElement).toBeInTheDocument();
    expect(dotElement).toHaveStyle(`background-image: ${testBackgroundImage}`);
  });
});
