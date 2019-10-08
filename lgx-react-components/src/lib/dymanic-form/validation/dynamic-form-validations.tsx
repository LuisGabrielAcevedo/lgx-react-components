import {
  IDynamicFormValidationErrors,
  TDynamicFormValidatorFn,
  IDynamicFormModel
} from "../dynamic-form.interfaces";

export class DynamicFormValidationsFunctions {
  public static isRequiredValidator(
    error: IDynamicFormValidationErrors
  ): TDynamicFormValidatorFn {
    return (
      value: any,
      model: IDynamicFormModel
    ): IDynamicFormValidationErrors | null => {
      let valid = value;
      if (Array.isArray(value)) valid = value.length;
      return valid ? null : error;
    };
  }
  public static patternValidator(
    regex: RegExp,
    error: IDynamicFormValidationErrors
  ): TDynamicFormValidatorFn {
    return (
      value: any,
      model: IDynamicFormModel
    ): IDynamicFormValidationErrors | null => {
      if (!value) return null;
      const valid = regex.test(value);
      return valid ? null : error;
    };
  }

  public static confirmValidator(
    key: string,
    error: IDynamicFormValidationErrors
  ): TDynamicFormValidatorFn {
    return (
      value: any,
      model: IDynamicFormModel
    ): IDynamicFormValidationErrors | null => {
      if (!value) return null;
      const valid = value === model[key];
      return valid ? null : error;
    };
  }

  public static digitsValidator(
    digits: any,
    error: IDynamicFormValidationErrors
  ): TDynamicFormValidatorFn {
    return (
      value: any,
      model: IDynamicFormModel
    ): IDynamicFormValidationErrors | null => {
      if (!value) return null;
      const valid = value.length === +digits;
      return valid ? null : error;
    };
  }
}
