import { render, screen, fireEvent } from "@testing-library/react";

import RegularButton from "./RegularButton";

describe("RegularButton", () => {
  test("renders button with default text", () => {
    render(<RegularButton />);
    const button = screen.getByText(/Summarize data/i);
    expect(button).toBeInTheDocument();
  });

  test("renders button with custom text", () => {
    render(<RegularButton buttonWord="Test Button" />);
    const button = screen.getByText(/Test Button/i);
    expect(button).toBeInTheDocument();
  });

  test("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();
    render(<RegularButton handleDataUpdate={handleClick} />);
    fireEvent.click(screen.getByText(/Summarize data/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
