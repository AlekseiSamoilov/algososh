import React from "react";
import { StringComponent } from "./string";
import { BrowserRouter } from "react-router-dom";

describe("<StringComponent />", () => {
  it("renders", () => {
    <BrowserRouter>
      cy.mount(
      <StringComponent />
      );
    </BrowserRouter>;
  });
});
