import React, { Component } from "react";
import PropTypes from "prop-types";
import RowFormComponent from "../row-form/form-row.component";

class SimpleFormComponent extends Component {
  render() {
    const rows = this.props.groups[0].fields.map((row, i) => (
      <RowFormComponent
        key={i}
        fields={row}
        form={this.props.form}
        materialData={this.props.materialData}
        updateModel={this.props.updateModel}
      />
    ));
    return <div>{rows}</div>;
  }
}

SimpleFormComponent.propTypes = {
  groups: PropTypes.array,
  materialData: PropTypes.object,
  form: PropTypes.object,
  updateModel: PropTypes.func
};

export default SimpleFormComponent;
