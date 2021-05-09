import { GridListTileBar, IconButton, makeStyles } from "@material-ui/core";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import InfoIcon from "@material-ui/icons/Info";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(() => ({
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  noImage: {
    alignContent: "center",
    color: "dimGray",
    height: 300,
    width: "100%",
  },
  image: {
    width: "100%",
  },
}));

const Product = ({ data }) => {
  const classes = useStyles();

  const { name, priceRange, lowPrice, highPrice, hero } = data;

  return (
    <>
      {hero?.href ? (
        <img src={hero?.href} alt={name} className={classes.image} />
      ) : (
        <BrokenImageIcon
          data-testid="brokenImage"
          className={classes.noImage}
        />
      )}
      <GridListTileBar
        title={name}
        subtitle={
          priceRange ? (
            <span>
              {`$${lowPrice}`} - {`$${highPrice}`}
            </span>
          ) : (
            "Price - TBD"
          )
        }
        actionIcon={
          <IconButton
            aria-label={`info about ${name}`}
            className={classes.icon}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </>
  );
};

Product.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    priceRange: PropTypes.any,
    lowPrice: PropTypes.number,
    highPrice: PropTypes.number,
    hero: PropTypes.shape({
      href: PropTypes.string,
    }),
  }).isRequired,
};

export default Product;
