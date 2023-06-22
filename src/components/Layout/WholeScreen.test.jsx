import React from "react";
import { render, screen } from "@testing-library/react";
import WholeScreen from "./WholeScreen";

describe("WholeScreen", () => {
  test("renders correctly and displays its children", () => {
    render(
      <WholeScreen>
        <p data-testid="child-element">Test child</p>
      </WholeScreen>
    );

    const childElement = screen.getByTestId("child-element");
    expect(childElement).toBeInTheDocument();
    expect(childElement.textContent).toBe("Test child");
  });
});
