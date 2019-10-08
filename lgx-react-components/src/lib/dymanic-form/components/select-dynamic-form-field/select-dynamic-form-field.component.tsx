import React, { Component } from "react";
import {
  EDynamicFormFieldTypes,
  IDynamicFormField,
  IDynamicFormMaterialData,
  IDynamicFormModel,
  TDynamicFormUpdateModel,
  IDynamicFormValidationErrors
} from "../../dynamic-form.interfaces";
import AsyncAutocompleteComponent from "../../fields/async-autocomplete/async-autocomplete.component";
import AutocompleteComponent from "../../fields/autocomplete/autocomplete.component";
import CheckboxComponent from "../../fields/checkbox/checkbox.component";
import DatepickerComponent from "../../fields/datepicker/datepicker.component";
import EnumSelectComponent from "../../fields/enum-select/enum-select.component";
import ImageComponent from "../../fields/image/image.component";
import NumericFieldComponent from "../../fields/numeric-field/numeric-field";
import PasswordFieldComponent from "../../fields/password-field/password-field.component";
import RadioGroupComponent from "../../fields/radio-group/radio-group.component";
import SelectComponent from "../../fields/select/select.component";
import SwitchComponent from "../../fields/switch/switch.component";
import TextFieldComponent from "../../fields/text-field/text-field.component";
import TextareaComponent from "../../fields/textarea/textarea.component";
import StringListComponent from "../../fields/string-list/string-list.component";

class SelectDynamicFormFieldComponent extends Component<
  ISelectDynamicFormFieldComponentProps,
  {}
> {
  protected component() {
    const components: { [key: string]: any } = {
      [EDynamicFormFieldTypes.asyncAutocomplete]: AsyncAutocompleteComponent,
      [EDynamicFormFieldTypes.autocomplete]: AutocompleteComponent,
      [EDynamicFormFieldTypes.checkbox]: CheckboxComponent,
      [EDynamicFormFieldTypes.datepicker]: DatepickerComponent,
      [EDynamicFormFieldTypes.enumSelect]: EnumSelectComponent,
      [EDynamicFormFieldTypes.image]: ImageComponent,
      [EDynamicFormFieldTypes.numericField]: NumericFieldComponent,
      [EDynamicFormFieldTypes.passwordField]: PasswordFieldComponent,
      [EDynamicFormFieldTypes.radioGroup]: RadioGroupComponent,
      [EDynamicFormFieldTypes.select]: SelectComponent,
      [EDynamicFormFieldTypes.switch]: SwitchComponent,
      [EDynamicFormFieldTypes.textField]: TextFieldComponent,
      [EDynamicFormFieldTypes.textarea]: TextareaComponent,
      [EDynamicFormFieldTypes.stringList]: StringListComponent
    };
    return components[this.props.field.component!];
  }

  render() {
    const Component = this.component();
    // console.log(this.props);
    return (
      <div>
        <Component
          field={this.props.field}
          materialData={this.props.materialData}
          model={this.props.model}
          updateModel={this.props.updateModel}
          errors={this.props.errors}
        />
      </div>
    );
  }
}

export default SelectDynamicFormFieldComponent;

export interface ISelectDynamicFormFieldComponentProps {
  field: IDynamicFormField;
  materialData: IDynamicFormMaterialData;
  model: IDynamicFormModel;
  updateModel: TDynamicFormUpdateModel;
  errors: IDynamicFormValidationErrors;
}
