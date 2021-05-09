import { render } from "@testing-library/react";
import React from "react";

import ProductListPage from "./ProductListPage";

describe("ProductListPage", () => {
  it("should render the product list component", () => {
    const { asFragment } = render(<ProductListPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
