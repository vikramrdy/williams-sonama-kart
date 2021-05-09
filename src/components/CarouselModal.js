import { useMediaQuery, useTheme } from "@material-ui/core";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import PropTypes from "prop-types";
import React from "react";

import Message from "./Message";

const CarouselModal = ({ open, onClose, thumbnail }) => {
  const theme = useTheme();
  const isMobileResolution = useMediaQuery(theme.breakpoints.down("xs"));

  if (thumbnail.length <= 0) {
    return (
      <Message showMessage={open} message="Thumbnail image are not present" />
    );
  }

  return (
    <AutoRotatingCarousel
      label="Go Back"
      open={open}
      onClose={onClose}
      onStart={onClose}
      mobile={isMobileResolution}
      style={{ position: "absolute" }}
    >
      {thumbnail.length > 0
        ? thumbnail.map((image, index) => (
            <Slide
              key={index}
              media={
                <img
                  src={image.href}
                  style={{ height: "100%", width: "100%" }}
                  alt="no data"
                />
              }
              mediaBackgroundStyle={{ backgroundColor: "grey" }}
              style={{ backgroundColor: "grey" }}
              title="This is a very cool product"
              subtitle="Just using this will blow your mind. To buy Contact Us"
            />
          ))
        : "No Thumbnails Found"}
    </AutoRotatingCarousel>
  );
};

CarouselModal.propTypes = {
  open: PropTypes.bool.isRequired,
  thumbnail: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CarouselModal;
