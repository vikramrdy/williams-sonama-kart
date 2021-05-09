import { render } from "@testing-library/react";
import React from "react";

import Product from "./Product";

describe("Product Component", () => {
  it("should match the snapshot", () => {
    const props = {
      data: {
        name: "Heather Taylor Home Gingham & Stripe Bath Towels",
        priceRange: { selling: { high: 34.5, low: 24.5 } },
        lowPrice: 24.5,
        highPrice: 34.5,
        hero: {
          href:
            "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202116/0258/heather-taylor-home-gingham-stripe-bath-towel-2-m.jpg",
        },
      },
    };
    const { asFragment } = render(<Product {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should contain the product name", () => {
    const props = {
      data: {
        name: "Heather Taylor Home Gingham & Stripe Bath Towels",
        priceRange: { selling: { high: 34.5, low: 24.5 } },
        lowPrice: 24.5,
        highPrice: 34.5,
        hero: {
          href:
            "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202116/0258/heather-taylor-home-gingham-stripe-bath-towel-2-m.jpg",
        },
      },
    };
    const { getByText } = render(<Product {...props} />);
    expect(
      getByText(/Heather Taylor Home Gingham & Stripe Bath Towels/i)
    ).toBeInTheDocument();
  });

  it("should not render price if price range is not present", () => {
    const props = {
      data: {
        name: "Heather Taylor Home Gingham & Stripe Bath Towels",
        hero: {
          href:
            "https://assets.weimgs.com/weimgs/rk/images/wcm/products/202116/0258/heather-taylor-home-gingham-stripe-bath-towel-2-m.jpg",
        },
      },
    };
    const { getByText } = render(<Product {...props} />);
    expect(getByText(/Price - TBD/i)).toBeInTheDocument();
  });

  it("should render broken image if image is not present", () => {
    const props = {
      data: {
        name: "Heather Taylor Home Gingham & Stripe Bath Towels",
      },
    };
    const { getByTestId } = render(<Product {...props} />);
    expect(getByTestId("brokenImage")).toBeTruthy();
  });
});
