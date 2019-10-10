import { Component } from "react";
import {
  IDynamicFormField,
  IDynamicFormMaterialData,
  IDynamicFormModel,
  IDynamicFormOption,
  TDynamicFormUpdateModel,
  IDynamicFormGroup
} from "../dynamic-form.interfaces";
import "../dynamic-form.component.css";

class DynamicFormFieldComponent extends Component<
  IDynamicFormFieldComponentProps,
  IDynamicFormFieldComponentState
> {
  public visibleValue = true;
  public disableValue = false;
  public key = () => this.props.field.key;
  public model = () => this.props.form.value;
  public control = () => this.props.form.controls[this.key()];
  public errors = () => this.control().errors;
  public errorMessages = () => this.control().errorMessages;
  public errorValue = () => !this.control().valid;
  public value = () => this.control().value;
  public appearance = () => this.props.materialData.appearance || "standard";
  public floatLabel = () => this.props.materialData.floatLabel || "";
  public label = () =>
    this.props.field.options && this.props.field.options.label
      ? this.props.field.options.label
      : this.props.field.name;
  public placeholder = () =>
    this.props.field.options && this.props.field.options.placeholder
      ? this.props.field.options.placeholder
      : "";
  public multiple = () =>
    this.props.field.options && this.props.field.options.multiple;
  public associationText = () =>
    this.props.field.options && this.props.field.options.associationText
      ? this.props.field.options.associationText
      : "text";
  public associationValue = () =>
    this.props.field.options && this.props.field.options.associationValue
      ? this.props.field.options.associationValue
      : "value";
  public dependValue = () =>
    this.props.field.options && this.props.field.options.depend;
  public hasDisableCondition = () =>
    this.props.field.options && this.props.field.options.disableCondition;
  public hasVisibleCondition = () =>
    this.props.field.options && this.props.field.options.visibleCondition;
  public handleChange = (event: React.ChangeEvent<any>) =>
    this.updateModel(event.target.value);
  public handleChangeCheked = (event: React.ChangeEvent<any>) =>
    this.updateModel(event.target.checked);
  public handleFocus = (event: React.FocusEvent<any>) =>
    this.updateModel(event.target.value);
  public updateModel = (value: any) =>
    this.props.updateModel(this.key(), value);
  public errorMessage = () =>
    this.errorMessages()![Object.keys(this.errors()!)[0]];
  public visible = (currentModel: IDynamicFormModel) =>
    (this.visibleValue = !!this.props.field.options!.visibleCondition!(
      currentModel
    ));
  public disable = (currentModel: IDynamicFormModel) =>
    (this.disableValue = !!this.props.field.options!.disableCondition!(
      currentModel
    ));

  constructor(public props: IDynamicFormFieldComponentProps) {
    super(props);
    this.state = {
      options: [],
      loading: false,
      showPassword: false
    };
  }

  public async loadOptions(): Promise<any> {
    this.setState({ loading: true });
    const options: IDynamicFormOption[] = await this.loadFieldOptions();
    this.setState({ options, loading: false });
  }

  public async loadFieldOptions(value?: any): Promise<any> {
    return this.props.field.options && this.props.field.options!.fieldOptions
      ? await this.props.field.options!.fieldOptions(value)
      : [];
  }
}

export default DynamicFormFieldComponent;

export interface IDynamicFormFieldComponentProps {
  field: IDynamicFormField;
  materialData: IDynamicFormMaterialData;
  form: IDynamicFormGroup;
  updateModel: TDynamicFormUpdateModel;
}

export interface IDynamicFormFieldComponentState {
  options: IDynamicFormOption[];
  loading: boolean;
  showPassword: boolean;
}
