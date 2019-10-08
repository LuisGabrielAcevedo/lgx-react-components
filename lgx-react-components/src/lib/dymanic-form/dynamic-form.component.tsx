import React from "react";
import DynamicFormMixinComponent, {
  IDynamicFormComponentProps
} from "./dynamic.form.mixin";
import {
  IDynamicFormFormatFieldsResponse,
  EDynamicFormType,
  IDynamicFormModel,
  IDynamicFormResponse
} from "./dynamic-form.interfaces";
import PanelsFormComponent from "./components/panels-form/panels-form.component";
import StepsFormComponent from "./components/steps-form/steps-form.component";
import TabsFormComponent from "./components/tabs-form/tabs-form.component";
import SimpleFormComponent from "./components/simple-form/simple-form-component";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";

class DynamicFormComponent extends DynamicFormMixinComponent {
  componentDidMount() {
    this.formatFields();
  }

  componentWillUpdate(nextProps: IDynamicFormComponentProps) {
    if (this.props.model !== nextProps.model)
      this.setState({ currentModel: nextProps.model! });
  }

  public async submit(): Promise<IDynamicFormResponse> {
    const currentModel: IDynamicFormModel = cloneDeep(this.state.currentModel!);
    return {
      valid: true,
      model: currentModel
    };
  }

  private formatFields(): IDynamicFormFormatFieldsResponse {
    return this.formatFieldsAction(this.props.fieldsConfig, this.props.columns);
  }

  private getComponent() {
    const components: { [key: string]: any } = {
      [EDynamicFormType.panels]: PanelsFormComponent,
      [EDynamicFormType.steps]: StepsFormComponent,
      [EDynamicFormType.tabs]: TabsFormComponent
    };
    return components[this.props.formType!];
  }

  private updateModel(key: string, value: any) {
    let currentModel: IDynamicFormModel = cloneDeep(this.state.currentModel!);
    if (!Object.keys(currentModel).length) currentModel = this.defaultModel();
    currentModel = set(currentModel!, key!, value);
    this.setState({ currentModel });
  }

  render() {
    const formatFieldResponse: IDynamicFormFormatFieldsResponse = this.formatFields();

    const FormTypeComponent =
      formatFieldResponse.mainGroupsFormatted.length > 1
        ? this.getComponent()
        : SimpleFormComponent;

    const model: IDynamicFormModel = !Object.keys(this.state.currentModel)
      .length
      ? this.defaultModel()
      : this.state.currentModel;

    return (
      <div>
        <FormTypeComponent
          fields={formatFieldResponse.mainGroupsFormatted}
          model={model}
          materialData={this.props.materialData!}
          updateModel={this.updateModel.bind(this)}
        ></FormTypeComponent>
      </div>
    );
  }
}

export default DynamicFormComponent;
