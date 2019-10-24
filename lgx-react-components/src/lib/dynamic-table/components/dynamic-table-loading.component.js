import React from "react";
import PropTypes from "prop-types";
import {
  DynamicTableRectLoading,
  DynamicTableProgressBarLoading,
  DynamicTableSpinnerLoading
} from "../constants/index";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

function DynamicTableLoadingComponent({ loadingType }) {
  const rectangles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (loadingType === DynamicTableRectLoading)
    return rectangles.map(rect => (
      <div key={rect} className="rect-loading"></div>
    ));
  if (loadingType === DynamicTableProgressBarLoading) return <LinearProgress />;
  if (loadingType === DynamicTableSpinnerLoading)
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item style={{ margin: "10px" }}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
}

DynamicTableLoadingComponent.propTypes = {
  loadingType: PropTypes.string
};

export default DynamicTableLoadingComponent;
