import React from "react";
import DynamicFormMixinComponent, {
  IDynamicFormComponentProps
} from "./dynamic.form.mixin";
import {
  IDynamicFormFormatFieldsResponse,
  EDynamicFormType
} from "./dynamic-form.interfaces";
import PanelsFormComponent from "./components/panels-form/panels-form.component";
import StepsFormComponent from "./components/steps-form/steps-form.component";
import TabsFormComponent from "./components/tabs-form/tabs-form.component";
import SimpleFormComponent from "./components/simple-form/simple-form-component";

class DynamicFormComponent extends DynamicFormMixinComponent {
  constructor(public props: IDynamicFormComponentProps) {
    super(props);
  }

  componentDidMount() {
    this.formatFields();
  }

  formatFields(): IDynamicFormFormatFieldsResponse {
    return this.formatFieldsAction(
      this.props.fieldsConfig,
      this.state.form,
      this.props.columns
    );
  }

  component() {
    const components: { [key: string]: any } = {
      [EDynamicFormType.panels]: PanelsFormComponent,
      [EDynamicFormType.steps]: StepsFormComponent,
      [EDynamicFormType.tabs]: TabsFormComponent
    };
    return components[this.props.formType!];
  }

  render() {
    const formatFieldResponse: IDynamicFormFormatFieldsResponse = this.formatFields();
    const FormTypeComponent =
      formatFieldResponse.mainGroupsFormatted.length > 1
        ? this.component()
        : SimpleFormComponent;
    return (
      <div>
        <FormTypeComponent
          fields={formatFieldResponse.mainGroupsFormatted}
          model={this.state.form}
          materialData={this.props.materialData!}
        ></FormTypeComponent>
      </div>
    );
  }
}

export default DynamicFormComponent;
