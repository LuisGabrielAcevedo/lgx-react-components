import React, { Component } from "react";
import {
  IDynamicFormMaterialData,
  IDynamicFormModel,
  IDynamicFormMainGroup
} from "../../dynamic-form.interfaces";

class TabsFormComponent extends Component<TabsFormComponentProps, {}> {
  render() {
    return <div>TabsFormComponent</div>;
  }
}

export default TabsFormComponent;

export interface TabsFormComponentProps {
  fields: IDynamicFormMainGroup[];
  materialData: IDynamicFormMaterialData;
  model: IDynamicFormModel;
}
