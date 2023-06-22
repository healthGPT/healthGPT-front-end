import React from "react";
import { render, screen } from "@testing-library/react";
import LeftSide from "./LeftSide";

describe("LeftSide", () => {
  test("renders correctly and displays its children", () => {
    render(
      <LeftSide>
        <p data-testid="child-element">Test child</p>
      </LeftSide>
    );

    const childElement = screen.getByTestId("child-element");
    expect(childElement).toBeInTheDocument();
    expect(childElement.textContent).toBe("Test child");
  });
});
