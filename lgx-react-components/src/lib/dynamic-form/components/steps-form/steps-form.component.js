import React, { Component } from "react";
import PropTypes from "prop-types";

class StepsFormComponent extends Component {
  render() {
    return <div>StepsFormComponent</div>;
  }
}

StepsFormComponent.propTypes = {
  groups: PropTypes.array,
  materialData: PropTypes.object,
  form: PropTypes.object,
  updateModel: PropTypes.func
};

export default StepsFormComponent;
