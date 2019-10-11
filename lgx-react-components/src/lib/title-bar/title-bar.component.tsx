import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./title-bar.component.css";

class TitleBarComponent extends Component<ITitleBarComponentProps, {}> {
  public static defaultProps: ITitleBarComponentProps = {
    title: "Title bar component"
  };
  render() {
    const { title, right } = this.props;
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
        <Grid item>
          <Grid
            container
            direction="row"
            alignContent="center"
            justify="center"
          >
            {right}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default TitleBarComponent;

export interface ITitleBarComponentProps {
  title: string;
  right?: any;
}
