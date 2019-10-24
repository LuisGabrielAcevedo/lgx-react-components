import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

class DynamicTableHeaderComponent extends Component {
  render() {
    const { headers, rowActions } = this.props;
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        className="table-header"
      >
        {headers.map((header, i) => (
          <Grid item key={i} xs>
            <span>{header.label}</span>
          </Grid>
        ))}
        {rowActions.map((button, k) => (
          <Grid key={k} item style={{ width: "50px" }}></Grid>
        ))}
      </Grid>
    );
  }
}

DynamicTableHeaderComponent.propTypes = {
  headers: PropTypes.array,
  rowActions: PropTypes.array
};

export default DynamicTableHeaderComponent;
