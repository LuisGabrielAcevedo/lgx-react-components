import React, { Component } from "react";
import {
  IDynamicFormMaterialData,
  IDynamicFormModel,
  IDynamicFormMainGroup,
  IDynamicFormField,
  TDynamicFormUpdateModel,
  IDynamicFormValidationErrors
} from "../../dynamic-form.interfaces";
import RowFormComponent from "../row-form/form-row.component";

class SimpleFormComponent extends Component<SimpleFormComponentProps, {}> {
  render() {
    const rows = (this.props.fields[0].fields as IDynamicFormField[][]).map(
      (row: IDynamicFormField[], i: number) => (
        <RowFormComponent
          key={i}
          fields={row}
          model={this.props.model}
          materialData={this.props.materialData}
          updateModel={this.props.updateModel}
          errors={this.props.errors}
        />
      )
    );
    return <div>{rows}</div>;
  }
}

export default SimpleFormComponent;

export interface SimpleFormComponentProps {
  fields: IDynamicFormMainGroup[];
  materialData: IDynamicFormMaterialData;
  model: IDynamicFormModel;
  updateModel: TDynamicFormUpdateModel;
  errors: IDynamicFormValidationErrors;
}
