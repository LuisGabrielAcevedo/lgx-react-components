import React, { Component } from "react";
import {
  IDynamicFormMaterialData,
  IDynamicFormModel,
  IDynamicFormField,
  TDynamicFormUpdateModel
} from "../../dynamic-form.interfaces";
import SelectDynamicFormFieldComponent from "../select-dynamic-form-field/select-dynamic-form-field.component";
import Grid from "@material-ui/core/Grid";

class RowFormComponent extends Component<RowFormComponentProps, {}> {
  render() {
    const fields = this.props.fields.map(
      (field: IDynamicFormField, i: number) => (
        <Grid
          key={i}
          item
          xs={12}
          sm={field.flexConfig!.flex || 12}
          md={field.flexConfig!.flex || 12}
          lg={field.flexConfig!.flex || 12}
          xl={field.flexConfig!.flex || 12}
          style={{ padding: "5px" }}
        >
          <SelectDynamicFormFieldComponent
            key={i}
            field={field}
            model={this.props.model}
            materialData={this.props.materialData}
            updateModel={this.props.updateModel}
          />
        </Grid>
      )
    );
    return (
      <Grid container direction="row">
        {fields}
      </Grid>
    );
  }
}

export default RowFormComponent;

export interface RowFormComponentProps {
  fields: IDynamicFormField[];
  materialData: IDynamicFormMaterialData;
  model: IDynamicFormModel;
  updateModel: TDynamicFormUpdateModel;
}
