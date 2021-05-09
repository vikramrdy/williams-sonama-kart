import { render } from "@testing-library/react";
import React from "react";

import Message from "./Message";

describe("Message Component", () => {
  it("should match the snapshot", () => {
    const modalProps = {
      showMessage: true,
      message: "Image not present",
    };
    const { asFragment } = render(<Message {...modalProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render the info message", () => {
    const modalProps = {
      showMessage: true,
      message: "Image not present",
    };
    const { getByText } = render(<Message {...modalProps} />);
    expect(getByText(/Image not present/i)).toBeInTheDocument();
  });

  it("should not render the message component", () => {
    const modalProps = {
      showMessage: false,
      message: "Image not present",
    };
    const { queryByText } = render(<Message {...modalProps} />);
    expect(queryByText(/Image not present/i)).toBeFalsy();
  });
});
