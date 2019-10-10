import { DynamicFormValidator } from "./dynamic-form-validator";
import { DynamicFormValidationsFunctions } from "./dynamic-form-validations";
import { TDynamicFormValidatorFn } from "../dynamic-form.interfaces";

export class DynamicFormValidators {
  public static required(
    data?: IDynamicFormValidatorData
  ): DynamicFormValidator {
    return new DynamicFormValidator(
      "required",
      data && data.message ? data.message : "The field is required.",
      () =>
        DynamicFormValidationsFunctions.requiredValidator({ required: true })
    );
  }

  public static email(data?: IDynamicFormValidatorData): DynamicFormValidator {
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

  public static minLength(
    data: IDynamicFormValidatorDataWithValue | number
  ): DynamicFormValidator {
    const value: number = typeof data === "object" ? data.value : data;
    const message: string | null =
      typeof data === "object" ? data.message! : null;
    return new DynamicFormValidator(
      "minLength",
      message || `The field must have at least ${value} characters`,
      () =>
        DynamicFormValidationsFunctions.minLengthValidator(value, {
          minlength: true
        })
    );
  }

  public static maxLength(
    data: IDynamicFormValidatorDataWithValue | number
  ): DynamicFormValidator {
    const value: number = typeof data === "object" ? data.value : data;
    const message: string | null =
      typeof data === "object" ? data.message! : null;
    return new DynamicFormValidator(
      "maxLength",
      message || `The field must have less than ${value} characters.`,
      () =>
        DynamicFormValidationsFunctions.maxLengthValidator(value, {
          maxlength: true
        })
    );
  }

  public static min(
    data: IDynamicFormValidatorDataWithValue | number
  ): DynamicFormValidator {
    const value: number = typeof data === "object" ? data.value : data;
    const message: string | null =
      typeof data === "object" ? data.message! : null;
    return new DynamicFormValidator(
      "min",
      message || `The number must be greater than ${value}`,
      () => DynamicFormValidationsFunctions.minValidator(value, { min: true })
    );
  }

  public static max(
    data: IDynamicFormValidatorDataWithValue | number
  ): DynamicFormValidator {
    const value: number = typeof data === "object" ? data.value : data;
    const message: string | null =
      typeof data === "object" ? data.message! : null;
    return new DynamicFormValidator(
      "max",
      message || `The number must be less than ${value}`,
      () => DynamicFormValidationsFunctions.maxValidator(value, { max: true })
    );
  }

  public static hasNumber(
    data?: IDynamicFormValidatorData
  ): DynamicFormValidator {
    return new DynamicFormValidator(
      "hasNumber",
      data && data.message
        ? data.message
        : "The field must have at least one number.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(/\d/, {
          hasnumber: true
        })
    );
  }

  public static hasCapitalCase(
    data?: IDynamicFormValidatorData
  ): DynamicFormValidator {
    return new DynamicFormValidator(
      "hasCapitalCase",
      data && data.message
        ? data.message
        : "The field must have at least one capital letter.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(/[A-Z]/, {
          hascapitalcase: true
        })
    );
  }

  public static onlyCapitalCase(
    data?: IDynamicFormValidatorData
  ): DynamicFormValidator {
    return new DynamicFormValidator(
      "onlyCapitalCase",
      data && data.message
        ? data.message
        : "The field must have at all capital letters.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(/^[A-Z ]+$/, {
          onlycapitalcase: true
        })
    );
  }

  public static hasSmallCase(
    data?: IDynamicFormValidatorData
  ): DynamicFormValidator {
    return new DynamicFormValidator(
      "hasSmallCase",
      data && data.message
        ? data.message
        : "The field must have at least one small letter.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(/[a-z]/, {
          hassmallcase: true
        })
    );
  }

  public static hasSpecialCharacters(
    data?: IDynamicFormValidatorData
  ): DynamicFormValidator {
    return new DynamicFormValidator(
      "hasSpecialCharacters",
      data && data.message
        ? data.message
        : "The field must have at least one special character.",
      () =>
        DynamicFormValidationsFunctions.patternValidator(
          /[*@!#%&()^~{},.?¿¡]+/,
          { hasspecialcharacters: true }
        )
    );
  }

  public static confirm(
    data?: IDynamicFormValidatorDataWithField | string
  ): DynamicFormValidator {
    const field: string = typeof data === "object" ? data.field! : data!;
    const message: string | null =
      typeof data === "object" ? data.message! : null;
    return new DynamicFormValidator(
      "confirm",
      message || `Do not match with the ${field} field.`,
      () =>
        DynamicFormValidationsFunctions.confirmValidator(field, {
          confirm: true
        })
    );
  }

  public static custom(
    data: IDynamicFormCustomValidatorData
  ): DynamicFormValidator {
    return new DynamicFormValidator(
      data.errorName,
      data.message,
      () => data.callback
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

export interface IDynamicFormCustomValidatorData {
  message: string;
  errorName: string;
  callback: TDynamicFormValidatorFn;
}
