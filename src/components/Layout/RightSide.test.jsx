import React from "react";
import { render, screen } from "@testing-library/react";
import RightSide from "./RightSide";

describe("RightSide", () => {
  test("renders correctly and displays its children", () => {
    render(
      <RightSide>
        <p data-testid="child-element">Test child</p>
      </RightSide>
    );

    const childElement = screen.getByTestId("child-element");
    expect(childElement).toBeInTheDocument();
    expect(childElement.textContent).toBe("Test child");
  });
});
