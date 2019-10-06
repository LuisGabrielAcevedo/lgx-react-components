import React, { Component } from "react";
import {
  IDynamicFormMaterialData,
  IDynamicFormModel,
  IDynamicFormMainGroup
} from "../../dynamic-form.interfaces";

class StepsFormComponent extends Component<StepsFormComponentProps, {}> {
  render() {
    return <div>StepsFormComponent</div>;
  }
}

export default StepsFormComponent;

export interface StepsFormComponentProps {
  fields: IDynamicFormMainGroup[];
  materialData: IDynamicFormMaterialData;
  model: IDynamicFormModel;
}
