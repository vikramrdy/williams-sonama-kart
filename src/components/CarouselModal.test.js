import { render } from "@testing-library/react";
import React from "react";

import CarouselModal from "./CarouselModal";

describe("CarouselModal", () => {
  it("should match the snapshot", () => {
    const modalProps = {
      open: true,
      thumbnail: [
        {
          href:
            "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202116/0258/heather-taylor-home-gingham-bath-mat-5-m.jpg",
        },
      ],
      onClose: jest.fn(),
    };
    const { asFragment } = render(<CarouselModal {...modalProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders modal when thumbnails is passed", () => {
    const modalProps = {
      open: true,
      thumbnail: [
        {
          href:
            "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202116/0258/heather-taylor-home-gingham-bath-mat-5-m.jpg",
        },
      ],
      onClose: jest.fn(),
    };
    const { getByText } = render(<CarouselModal {...modalProps} />);
    expect(getByText(/This is a very cool product/i)).toBeInTheDocument();
  });

  it("renders message component when thumbnails is empty", () => {
    const modalProps = {
      open: true,
      thumbnail: [],
      onClose: jest.fn(),
    };
    const { getByText } = render(<CarouselModal {...modalProps} />);
    expect(getByText(/Thumbnail image are not present/i)).toBeInTheDocument();
  });

  it("should not render carousel when modal is not triggered", () => {
    const modalProps = {
      open: false,
      thumbnail: [
        {
          href:
            "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202116/0258/heather-taylor-home-gingham-bath-mat-5-m.jpg",
        },
      ],
      onClose: jest.fn(),
    };
    const { queryByText } = render(<CarouselModal {...modalProps} />);
    expect(queryByText(/This is a very cool product/i)).toBeFalsy();
  });
});
