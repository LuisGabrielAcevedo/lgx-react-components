import { DynamicFormValidator } from "./dynamic-form-validator";
import { DynamicFormValidationsFunctions } from "./dynamic-form-validations";

export class DynamicFormValidators {
  public static required(
    data?: IDynamicFormValidatorData
  ): DynamicFormValidator {
    return new DynamicFormValidator(
      "required",
      data && data.message ? data.message : "The field is required",
      () =>
        DynamicFormValidationsFunctions.isRequiredValidator({ required: true })
    );
  }
}

export default DynamicFormValidators;

export interface IDynamicFormValidatorData {
  message?: string;
}

export interface IDynamicFormValidatorDataWithValue
  extends IDynamicFormValidatorData {
  value: number;
}

export interface IDynamicFormValidatorDataWithField
  extends IDynamicFormValidatorData {
  field: string;
}
