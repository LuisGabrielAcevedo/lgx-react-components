export type TDynamicFormUpdateModel = (key: string, value: any) => void;
export type TDynamicFormVisibleCallback = (arg: IDynamicFormModel) => boolean;
export type TDynamicFormDisableCallback = (arg: IDynamicFormModel) => boolean;
export type TDynamicFormErrorCallback = (arg: IDynamicFormModel) => boolean;
export type TDynamicFormValidatorCallback = () => TDynamicFormValidatorFn;
export type TDynamicFormValidatorFn = (
  value: any,
  model: IDynamicFormModel
) => IDynamicFormValidationErrors | null;

export interface IDynamicFormConfig {
  fieldsConfig: IDynamicFormField[];
  validators?: IDynamicFormGroupValidator[];
}

export interface IDynamicFormControl {
  value: any;
  key: string;
  valid: boolean;
  validators: TDynamicFormValidatorFn[];
  errorMessages?: IDynamicFormValidationErrors;
  errors: IDynamicFormValidationErrors;
  index?: number;
}

export interface IDynamicFormValidationErrors {
  [key: string]: any;
}

export const defaultDynamicFormControl: IDynamicFormControl = {
  value: null,
  key: "",
  valid: true,
  validators: [],
  errors: {}
};

export interface IDynamicFormGroupValidator {
  message: string;
  errorName: string;
  invalidFields: string[];
  callback: TDynamicFormErrorCallback;
}

export const defaultDynamicFormGroup: IDynamicFormGroup = {
  controls: {},
  value: {},
  valid: true,
  validators: [],
  invalidControls: [],
  errors: {}
};

export interface IDynamicFormGroup {
  controls: {
    [key: string]: IDynamicFormControl;
  };
  value: IDynamicFormModel;
  valid: boolean;
  validators: IDynamicFormGroupValidator[];
  errors: IDynamicFormValidationErrors;
  invalidControls: string[];
}

export enum EDynamicFormFieldTypes {
  autocomplete = "AutocompleteComponent",
  asyncAutocomplete = "AsyncAutocompleteComponent",
  checkbox = "CheckboxComponent",
  enumSelect = "EnumSelectComponent",
  radioGroup = "RadioGroupComponent",
  select = "SelectComponent",
  switch = "SwitchComponent",
  textarea = "TextareaComponent",
  textField = "TextFieldComponent",
  image = "ImageComponent",
  datepicker = "DatepickerComponent",
  numericField = "NumericFieldComponent",
  passwordField = "PasswordFieldComponent",
  stringList = "StringListComponent"
}

export enum EDynamicFormType {
  panels = "PanelsFormComponent",
  tabs = "TabsFormComponent",
  steps = "StepsFormComponent"
}

export interface IDynamicFormMaterialData {
  appearance?: "standard" | "outlined" | "filled";
  floatLabel?: string;
}

export interface IDynamicFormField {
  name: string;
  key: string;
  component?: EDynamicFormFieldTypes;
  dynamicComponent?: any;
  defaultValue?: any;
  mainGroup?: string;
  flexConfig?: {
    rowTitle?: string;
    row?: number;
    flex?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    group?: IDynamicFormLateralGroup;
  };
  validators?: any[];
  options?: {
    selectOptions?: (...arg: any[]) => Promise<any> | any;
    placeholder?: string;
    label?: string;
    fieldOptions?: (...arg: any[]) => Promise<any>;
    visibleCondition?: TDynamicFormVisibleCallback;
    disableCondition?: TDynamicFormDisableCallback;
    associationValue?: string;
    associationText?: string;
    multiple?: boolean;
    depend?: string;
  };
}

export interface IDynamicFormMainGroup {
  order: number | null;
  name: string;
  fields: IDynamicFormField[] | IDynamicFormField[][];
  leftFieldGroup?: IDynamicFormField[];
  rightFieldGroup?: IDynamicFormField[];
}

export interface IDynamicFormModel {
  [key: string]: any;
}

export interface IDynamicFormOption {
  [key: string]: any;
}

export enum EDynamicFormImageComponentMode {
  SELECT = "SELECT_PHOTO",
  CAMERA = "CAMERA"
}

export enum IDynamicFormLateralGroup {
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}

export interface IDynamicFormFormattedValidations {
  validations: any[];
  errorMessages: IDynamicFormValidationErrors;
}

export interface IDynamicFormResponse {
  valid: boolean;
  model?: any;
  errors?: any;
}

export interface IDynamicFormFormatFieldsResponse {
  mainGroupsFormatted: IDynamicFormMainGroup[];
  formGroup: IDynamicFormGroup;
}
