import React, { Component } from "react";
import PropTypes from "prop-types";

class PanelsFormComponent extends Component {
  render() {
    return <div>PanelsFormComponent</div>;
  }
}

PanelsFormComponent.propTypes = {
  groups: PropTypes.array,
  materialData: PropTypes.object,
  form: PropTypes.object,
  updateModel: PropTypes.func
};

export default PanelsFormComponent;
