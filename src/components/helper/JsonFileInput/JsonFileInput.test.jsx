import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JsonFileInput from "./JsonFileInput";

describe("JsonFileInput", () => {
  test("renders file input", () => {
    render(<JsonFileInput onFileChange={() => {}} />);
    const fileInput = screen.getByTestId("json-file-input");
    expect(fileInput).toBeInTheDocument();
  });

  test("handles file change", () => {
    const mockOnFileChange = jest.fn();

    render(<JsonFileInput onFileChange={mockOnFileChange} />);

    const fileInput = screen.getByTestId("json-file-input");

    const file = new Blob(['{"name":"John", "age":30, "city":"New York"}'], {
      type: "application/json",
    });
    const readAsText = jest.fn();
    const addEventListener = jest.fn((_, evtHandler) => {
      evtHandler();
    });
    const dummyFileReader = {
      readAsText,
      addEventListener,
      result: JSON.stringify({ key: "value" }),
    };

    window.FileReader = jest.fn(() => dummyFileReader);
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(readAsText).toHaveBeenCalled();
  });
});
