import {
  CircularProgress,
  GridList,
  GridListTile,
  Paper,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";

import CarouselModal from "../components/CarouselModal";
import Product from "../components/Product";
import { ProductListMockGroups } from "../__mockData__/ProductListMockGroups";

const useStyles = makeStyles(() => ({
  root: {
    background: "whitesmoke",
  },
  gridListTile: {
    border: "1px solid lightGray",
    borderRadius: 7,
  },
  noData: {
    textAlign: "center",
    paddingTop: 20,
  },
  progress: {
    margin: 16,
    position: "absolute",
    top: "50%",
    left: "50%",
  },
}));

const getFormattedProduct = (p) => {
  return {
    id: p.id,
    name: p.name.replace(/&amp;/g, "&"),
    priceRange: p.priceRange,
    lowPrice: p.priceRange?.selling.low,
    highPrice: p.priceRange?.selling.high,
    hero: p.hero,
    thumbnail: p.images,
  };
};

const getFormattedProductGroups = (groups) => {
  return groups.map((p) => getFormattedProduct(p));
};

const ProductListPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobileResolution = useMediaQuery(theme.breakpoints.down("xs"));

  const [thumbnail, setThumbnail] = useState(null);
  const [productList, setProductList] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductList = () => {
    axios
      .get(
        `https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json`
      )
      .then((response) => {
        const productGroupList = getFormattedProductGroups(
          response?.data?.groups
        );
        setProductList(productGroupList);
        setLoading(false);
      })
      .catch(() => {
        // To load product list from mock when fetching data through service fails
        const productGroupList = getFormattedProductGroups(
          ProductListMockGroups.groups
        );
        setProductList(productGroupList);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProductList();
  }, []);

  if (loading)
    return <CircularProgress className={classes.progress} size={50} />;

  if (!productList) return <div className={classes.noData}>No Data Found</div>;

  return (
    <Paper classes={{ root: classes.root }} elevation={0}>
      <GridList
        cols={isMobileResolution ? 1 : 3}
        cellHeight={300}
        spacing={32}
        style={{ margin: 20 }}
      >
        {productList.map((product) => (
          <GridListTile
            key={product.id}
            classes={{ tile: classes.gridListTile }}
            onClick={() => setThumbnail(product.thumbnail)}
          >
            <Product data={product} />
          </GridListTile>
        ))}
      </GridList>
      {Boolean(thumbnail) && (
        <CarouselModal
          thumbnail={thumbnail}
          open={Boolean(thumbnail)}
          onClose={() => setThumbnail(null)}
        />
      )}
    </Paper>
  );
};

export default ProductListPage;
