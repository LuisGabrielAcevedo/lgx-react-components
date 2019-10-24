import { DynamicFormValidator } from "./dynamic-form-validator";
import { DynamicFormValidationsFunctions } from "./dynamic-form-validations";

export class DynamicFormValidators {
  static required(data) {
    return new DynamicFormValidator(
      "required",
      data && data.message ? data.message : "The field is required.",
      () =>
        DynamicFormValidationsFunctions.requiredValidator({ required: true })
    );
  }

  static email(data) {
    return new DynamicFormValidator(
      "email",
      data && data.message ? data.message : "The field must be a valid email.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          { email: true }
        )
    );
  }

  static minLength(data) {
    const value = typeof data === "object" ? data.value : data;
    const message = typeof data === "object" ? data.message : null;
    return new DynamicFormValidator(
      "minLength",
      message || `The field must have at least ${value} characters`,
      () =>
        DynamicFormValidationsFunctions.minLengthValidator(value, {
          minLength: true
        })
    );
  }

  static maxLength(data) {
    const value = typeof data === "object" ? data.value : data;
    const message = typeof data === "object" ? data.message : null;
    return new DynamicFormValidator(
      "maxLength",
      message || `The field must have less than ${value} characters.`,
      () =>
        DynamicFormValidationsFunctions.maxLengthValidator(value, {
          maxLength: true
        })
    );
  }

  static min(data) {
    const value = typeof data === "object" ? data.value : data;
    const message = typeof data === "object" ? data.message : null;
    return new DynamicFormValidator(
      "min",
      message || `The number must be greater than ${value}`,
      () => DynamicFormValidationsFunctions.minValidator(value, { min: true })
    );
  }

  static max(data) {
    const value = typeof data === "object" ? data.value : data;
    const message = typeof data === "object" ? data.message : null;
    return new DynamicFormValidator(
      "max",
      message || `The number must be less than ${value}`,
      () => DynamicFormValidationsFunctions.maxValidator(value, { max: true })
    );
  }

  static hasNumber(data) {
    return new DynamicFormValidator(
      "hasNumber",
      data && data.message
        ? data.message
        : "The field must have at least one number.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(/\d/, {
          hasNumber: true
        })
    );
  }

  static hasCapitalCase(data) {
    return new DynamicFormValidator(
      "hasCapitalCase",
      data && data.message
        ? data.message
        : "The field must have at least one capital letter.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        })
    );
  }

  static onlyCapitalCase(data) {
    return new DynamicFormValidator(
      "onlyCapitalCase",
      data && data.message
        ? data.message
        : "The field must have at all capital letters.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(/^[A-Z ]+$/, {
          onlyCapitalCase: true
        })
    );
  }

  static hasSmallCase(data) {
    return new DynamicFormValidator(
      "hasSmallCase",
      data && data.message
        ? data.message
        : "The field must have at least one small letter.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(/[a-z]/, {
          hasSmallCase: true
        })
    );
  }

  static hasSpecialCharacters(data) {
    return new DynamicFormValidator(
      "hasSpecialCharacters",
      data && data.message
        ? data.message
        : "The field must have at least one special character.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(
          /[*@!#%&()^~{},.?¿¡]+/,
          { hasSpecialCharacters: true }
        )
    );
  }

  static confirm(data) {
    const field = typeof data === "object" ? data.field : data;
    const message = typeof data === "object" ? data.message : null;
    return new DynamicFormValidator(
      "confirm",
      message || `Do not match with the ${field} field.`,
      () =>
        DynamicFormValidationsFunctions.confirmValidator(field, {
          confirm: true
        })
    );
  }

  static controlValidator(data) {
    return new DynamicFormValidator(
      data.errorName,
      data.message,
      () => data.callback
    );
  }
}

export default DynamicFormValidators;
