import React, { Component } from "react";
import PropTypes from "prop-types";
import SelectDynamicFormFieldComponent from "../select-dynamic-form-field/select-dynamic-form-field.component";
import Grid from "@material-ui/core/Grid";

class RowFormComponent extends Component {
  render() {
    const fields = this.props.fields.map((field, i) => (
      <Grid
        key={i}
        item
        xs={12}
        sm={field.flexConfig.flex || 12}
        md={field.flexConfig.flex || 12}
        lg={field.flexConfig.flex || 12}
        xl={field.flexConfig.flex || 12}
        style={{ padding: "5px" }}
      >
        <SelectDynamicFormFieldComponent
          key={i}
          field={field}
          form={this.props.form}
          materialData={this.props.materialData}
          updateModel={this.props.updateModel}
        />
      </Grid>
    ));
    return (
      <Grid container direction="row">
        {fields}
      </Grid>
    );
  }
}

RowFormComponent.propTypes = {
  fields: PropTypes.array,
  materialData: PropTypes.object,
  form: PropTypes.object,
  updateModel: PropTypes.func
};

export default RowFormComponent;
