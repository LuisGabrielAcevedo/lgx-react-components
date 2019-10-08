import React from "react";
import DynamicFormMixinComponent, {
  IDynamicFormComponentProps
} from "./dynamic.form.mixin";
import {
  IDynamicFormFormatFieldsResponse,
  EDynamicFormType,
  IDynamicFormModel,
  IDynamicFormResponse,
  IDynamicFormGroup
} from "./dynamic-form.interfaces";
import PanelsFormComponent from "./components/panels-form/panels-form.component";
import StepsFormComponent from "./components/steps-form/steps-form.component";
import TabsFormComponent from "./components/tabs-form/tabs-form.component";
import SimpleFormComponent from "./components/simple-form/simple-form-component";
import cloneDeep from "lodash/cloneDeep";
// import set from "lodash/set";

class DynamicFormComponent extends DynamicFormMixinComponent {
  componentDidMount() {
    const formatFieldResponse: IDynamicFormFormatFieldsResponse = this.formatFields(
      this.props.model!
    );
    this.setState({
      mainGroupsFormatted: formatFieldResponse.mainGroupsFormatted,
      form: formatFieldResponse.formGroup
    });
  }

  componentWillUpdate(nextProps: IDynamicFormComponentProps) {
    if (this.props.model !== nextProps.model) {
      const formatFieldResponse: IDynamicFormFormatFieldsResponse = this.formatFields(
        nextProps.model!
      );
      this.setState({
        mainGroupsFormatted: formatFieldResponse.mainGroupsFormatted,
        form: formatFieldResponse.formGroup
      });
    }
  }

  public async submit(): Promise<IDynamicFormResponse> {
    let form: IDynamicFormGroup = cloneDeep(this.state.form!);
    form = this.validateAll(form);
    return {
      valid: form.valid,
      model: form.value
    };
  }

  private formatFields(
    model: IDynamicFormModel
  ): IDynamicFormFormatFieldsResponse {
    return this.formatFieldsAction(
      this.props.fieldsConfig,
      model,
      this.props.columns
    );
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
    let form: IDynamicFormGroup = cloneDeep(this.state.form!);
    form.controls[key].value = value;
    form = this.validateControl(form, key);
    this.setState({ form });
  }

  render() {
    const FormTypeComponent =
      this.state.mainGroupsFormatted.length > 1
        ? this.getComponent()
        : SimpleFormComponent;

    const form = this.state.mainGroupsFormatted.length ? (
      <FormTypeComponent
        groups={this.state.mainGroupsFormatted}
        form={this.state.form}
        materialData={this.props.materialData!}
        updateModel={this.updateModel.bind(this)}
      ></FormTypeComponent>
    ) : null;

    return <div>{form}</div>;
  }
}

export default DynamicFormComponent;
