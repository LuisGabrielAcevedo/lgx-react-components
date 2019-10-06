import React, { Component } from "react";
import {
  IDynamicFormMaterialData,
  IDynamicFormModel,
  IDynamicFormField
} from "../../dynamic-form.interfaces";
import SelectDynamicFormFieldComponent from "../select-dynamic-form-field/select-dynamic-form-field.component";

class RowFormComponent extends Component<RowFormComponentProps, {}> {
  render() {
    const fields = this.props.fields.map(
      (field: IDynamicFormField, i: number) => (
        <SelectDynamicFormFieldComponent
          key={i}
          field={field}
          model={this.props.model}
          materialData={this.props.materialData}
        />
      )
    );
    return <div>{fields}</div>;
  }
}

export default RowFormComponent;

export interface RowFormComponentProps {
  fields: IDynamicFormField[];
  materialData: IDynamicFormMaterialData;
  model: IDynamicFormModel;
}
