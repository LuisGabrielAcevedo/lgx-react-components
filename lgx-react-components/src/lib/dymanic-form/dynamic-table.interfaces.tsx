// import { Observable } from "rxjs";

export type TDynamicFormVisibleCallback = (arg: IDynamicFormModel) => boolean;
export type TDynamicFormDisableCallback = (arg: IDynamicFormModel) => boolean;
// export type TDynamicFormValidatorCallback = (form: FormGroup) => ValidatorFn;
// export type TDynamicFormAsyncValidatorCallback = (
//   control: AbstractControl
// ) => Observable<ValidationErrors>;

export enum EDynamicFormFieldTypes {
  autocomplete = "AutocompleteComponent",
  asyncAutocomplete = "AsyncAutocompleteComponent",
  checkbox = "CheckboxComponent",
  enum = "EnumSelectComponent",
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

export interface IDynamicFormMaterialData {
  appearance?: string;
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
    flex?: number;
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
  value: any;
  text: any;
}

export enum EDynamicFormImageComponentMode {
  SELECT = "SELECT_PHOTO",
  CAMERA = "CAMERA"
}

export enum IDynamicFormLateralGroup {
  left = "left",
  right = "right"
}

export interface IDynamicFormFormattedValidations {
  validations: any[];
  errorMessages: object;
}

export interface IDynamicFormResponse {
  valid: boolean;
  model?: any;
  errors?: any;
  editedFields?: IDynamicFormModel;
}

export interface IDynamicFormFormatFieldsResponse {
  mainGroupsFormatted: IDynamicFormMainGroup[];
  groupIndexes: object;
}
