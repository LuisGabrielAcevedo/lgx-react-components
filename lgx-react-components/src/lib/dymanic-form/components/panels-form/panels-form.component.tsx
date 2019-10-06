import React, { Component } from "react";
import {
  IDynamicFormMaterialData,
  IDynamicFormModel,
  IDynamicFormMainGroup
} from "../../dynamic-form.interfaces";

class PanelsFormComponent extends Component<PanelsFormComponentProps, {}> {
  render() {
    return <div>PanelsFormComponent</div>;
  }
}

export default PanelsFormComponent;

export interface PanelsFormComponentProps {
  fields: IDynamicFormMainGroup[];
  materialData: IDynamicFormMaterialData;
  model: IDynamicFormModel;
}
