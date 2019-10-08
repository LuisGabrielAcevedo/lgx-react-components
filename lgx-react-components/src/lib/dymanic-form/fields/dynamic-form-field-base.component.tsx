import { Component } from "react";
import {
  IDynamicFormField,
  IDynamicFormMaterialData,
  IDynamicFormModel,
  IDynamicFormOption,
  TDynamicFormUpdateModel,
  TDynamicFormValidatorFn,
  IDynamicFormValidationErrors
} from "../dynamic-form.interfaces";

class DynamicFormFieldComponent extends Component<
  IDynamicFormFieldComponentProps,
  IDynamicFormFieldComponentState
> {
  public visibleValue = true;
  public disableValue = false;
  public errorValue = () => !!this.props.errors[this.key()];
  public validations: TDynamicFormValidatorFn[] = [];
  public errorMessages: { [key: string]: any } = {};
  public key = () => this.props.field.key;
  public model = () => this.props.model;
  public value = () => this.props.model[this.key()];
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
  constructor(public props: IDynamicFormFieldComponentProps) {
    super(props);
    this.state = {
      options: [],
      loading: false
    };
    this.formatValidations();
  }

  public visible(currentModel: IDynamicFormModel): void {
    this.visibleValue = !!this.props.field.options!.visibleCondition!(
      currentModel
    );
  }

  public disable(currentModel: IDynamicFormModel): void {
    this.disableValue = !!this.props.field.options!.disableCondition!(
      currentModel
    );
  }

  async loadOptions() {
    this.setState({ loading: true });
    const options: IDynamicFormOption[] = await this.loadFieldOptions();
    this.setState({ options, loading: false });
  }

  public async loadFieldOptions(value?: any): Promise<any> {
    return this.props.field.options && this.props.field.options!.fieldOptions
      ? await this.props.field.options!.fieldOptions(value)
      : [];
  }

  public handleChange = (event: any) => {
    this.updateModel(event.target.value);
  };

  public updateModel(value: any) {
    const errors: IDynamicFormValidationErrors = this.validate(value);
    this.props.updateModel(this.key(), value, errors);
  }

  public validate(value: any): IDynamicFormValidationErrors {
    let errors: IDynamicFormValidationErrors = {};
    this.validations.forEach(vaidation => {
      if (vaidation(value, this.props.model)) {
        const error: IDynamicFormValidationErrors = vaidation(
          value,
          this.props.model
        )!;
        errors = { ...errors, ...error };
      }
    });
    return errors;
  }

  public formatValidations(): void {
    if (this.props.field.validators) {
      let errorMessages: { [key: string]: any } = {};
      let dynamicFormFormattedValidations: TDynamicFormValidatorFn[] = [];
      this.props.field.validators.forEach(validation => {
        dynamicFormFormattedValidations.push(validation.validate());
        errorMessages[validation.name.toLowerCase()] = validation.message;
      });
      this.errorMessages = errorMessages;
      this.validations = dynamicFormFormattedValidations;
    }
  }

  public errorMessage(): string {
    const error: string = Object.keys(this.props.errors[this.key()])[0];
    return this.errorMessages[error];
  }
}

export default DynamicFormFieldComponent;

export interface IDynamicFormFieldComponentProps {
  field: IDynamicFormField;
  materialData: IDynamicFormMaterialData;
  model: IDynamicFormModel;
  updateModel: TDynamicFormUpdateModel;
  updateAndValidate: boolean;
  errors: IDynamicFormValidationErrors;
}

export interface IDynamicFormFieldComponentState {
  options: IDynamicFormOption[];
  loading: boolean;
}
