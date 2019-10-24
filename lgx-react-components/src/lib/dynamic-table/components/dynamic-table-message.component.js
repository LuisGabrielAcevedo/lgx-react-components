import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

function DynamicTableMessageComponent({ message }) {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item style={{ margin: "10px" }}>
        <div>{message || "DynamicTableMessageComponent"}</div>
      </Grid>
    </Grid>
  );
}

DynamicTableMessageComponent.propTypes = {
  message: PropTypes.string
};

export default DynamicTableMessageComponent;
