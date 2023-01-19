import React from "react";
import { it, expect } from "vitest";
import { render } from "@testing-library/react";
import Heaters from "../../src/screens/Heaters";

it("exports something", () => {
  render(<Heaters />);
  expect(true).toBeTruthy();
});
