import React from "react";
import Grid from "@material-ui/core/Grid";
import "./title-bar.component.css";
import PropTypes from "prop-types";

function TitleBarComponent({ title, rightContent }) {
  return (
    <Grid
      container
      direction="row"
      alignContent="center"
      justify="space-between"
      className="title-bar-header"
    >
      <Grid item>
        <h4 className="title-bar-title">{title}</h4>
      </Grid>
      <Grid item>{rightContent}</Grid>
    </Grid>
  );
}

TitleBarComponent.propTypes = {
  title: PropTypes.string,
  rightContent: PropTypes.element
};

export default TitleBarComponent;
