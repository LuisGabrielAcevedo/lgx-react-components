import React from "react";
import PanelsFormComponent from "./components/panels-form/panels-form.component";
import StepsFormComponent from "./components/steps-form/steps-form.component";
import TabsFormComponent from "./components/tabs-form/tabs-form.component";
import SimpleFormComponent from "./components/simple-form/simple-form-component";
import {
  DynamicTablePanelsFormComponent,
  DynamicTableTabsFormComponent,
  DynamicTableStepsFormComponent
} from "./constants/index";
import DynamicFormMixinComponent from "./dynamic.form.mixin";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";

class DynamicFormComponent extends DynamicFormMixinComponent {
  componentDidMount() {
    const formatFieldResponse = this.formatFields(
      this.props.formConfig,
      this.props.model
    );
    this.setState({
      mainGroupsFormatted: formatFieldResponse.mainGroupsFormatted,
      form: formatFieldResponse.formGroup
    });
  }

  componentWillUpdate(nextProps) {
    if (this.props.model !== nextProps.model) {
      const formatFieldResponse = this.formatFields(
        this.props.formConfig,
        nextProps.model
      );
      this.setState({
        mainGroupsFormatted: formatFieldResponse.mainGroupsFormatted,
        form: formatFieldResponse.formGroup
      });
    }

    if (this.props.formConfig !== nextProps.formConfig) {
      const formatFieldResponse = this.formatFields(
        nextProps.formConfig,
        this.props.model
      );
      this.setState({
        mainGroupsFormatted: formatFieldResponse.mainGroupsFormatted,
        form: formatFieldResponse.formGroup
      });
    }
  }

  async submit() {
    let form = cloneDeep(this.state.form);
    this.validateAll(form);
    this.validateFormGroup(form);
    this.setState({ form });
    return {
      valid: form.valid,
      model: form.value
    };
  }

  formatFields(formConfig, model) {
    return this.formatFieldsAction(formConfig, model, this.props.columns);
  }

  getComponent() {
    const components = {
      [DynamicTablePanelsFormComponent]: PanelsFormComponent,
      [DynamicTableStepsFormComponent]: StepsFormComponent,
      [DynamicTableTabsFormComponent]: TabsFormComponent
    };
    return components[this.props.formType];
  }

  updateModel(key, value) {
    let form = cloneDeep(this.state.form);
    form.controls[key].value = value;
    form.value = set(form.value, key, value);
    this.validateControl(form, key);
    this.validateFormGroup(form);
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
        materialData={this.props.materialData}
        updateModel={this.updateModel.bind(this)}
      ></FormTypeComponent>
    ) : null;

    return <div>{form}</div>;
  }
}

export default DynamicFormComponent;
