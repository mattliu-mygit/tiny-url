import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

test("generate button exists on showShortened true", () => {
  render(<Button showShortened={false} resetStates={() => {}} />);
  let button = screen.getByText("Generate");
  expect(button).toBeInTheDocument();
});

test("pressing generate button without giving valid inputs will not shorten url", () => {
  render(<Button showShortened={false} resetStates={() => {}} />);
  let button = screen.getByText("Generate");
  expect(button).toBeInTheDocument();
  button.click();

  button = screen.getByText("Generate");
  expect(button).toBeInTheDocument();
});
