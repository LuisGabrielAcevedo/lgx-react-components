import { Component } from "react";
import {
  IDynamicFormModel,
  IDynamicFormMaterialData,
  IDynamicFormField,
  IDynamicFormMainGroup,
  IDynamicFormFormatFieldsResponse,
  IDynamicFormLateralGroup,
  EDynamicFormType,
  IDynamicFormValidationErrors,
  IDynamicFormGroup,
  IDynamicFormControl,
  defaultDynamicFormControl,
  TDynamicFormValidatorFn,
  IDynamicFormFormattedValidations,
  defaultDynamicFormGroup,
  IDynamicFormConfig
} from "./dynamic-form.interfaces";
import chunk from "lodash/chunk";
import groupBy from "lodash/groupBy";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";

class DynamicFormMixinComponent extends Component<
  IDynamicFormComponentProps,
  IDynamicFormComponentState
> {
  public static defaultProps: IDynamicFormComponentProps = {
    columns: null,
    formConfig: {
      fieldsConfig: []
    },
    formType: EDynamicFormType.tabs,
    materialData: {},
    model: {}
  };

  constructor(public props: IDynamicFormComponentProps) {
    super(props);
    this.state = {
      mainGroupsFormatted: [],
      activeGroup: 0,
      form: cloneDeep(defaultDynamicFormGroup)
    };
  }

  public formatFieldsAction(
    formConfig: IDynamicFormConfig,
    currentModel: IDynamicFormModel,
    columns?: number | null
  ): IDynamicFormFormatFieldsResponse {
    let mainGroupsFormatted: IDynamicFormMainGroup[] = [];
    let model: IDynamicFormModel = {};
    let formGroup: IDynamicFormGroup = cloneDeep(defaultDynamicFormGroup);
    let order: number = 0;
    formConfig.fieldsConfig.forEach(field => {
      let formControl: IDynamicFormControl = cloneDeep(
        defaultDynamicFormControl
      );
      formControl.key = field.key;
      formControl.value =
        currentModel![field.key] || field.defaultValue || null;

      if (field.validators) {
        const formattedValidationsResp: IDynamicFormFormattedValidations = this.formatValidations(
          field
        );
        formControl.validators = formattedValidationsResp.validations;
        formControl.errorMessages = formattedValidationsResp.errorMessages;
      }

      formGroup.controls[field.key] = formControl;

      model = set(model, field.key!, field.defaultValue || null);

      const tab: string | undefined = field.mainGroup;
      const name: string = tab || "Default tab";
      const group: string | undefined = field.flexConfig
        ? field.flexConfig.group
        : undefined;
      const item = mainGroupsFormatted.find(
        tabFormatted => tabFormatted.name === name
      );
      if (item) {
        if (group) {
          group === IDynamicFormLateralGroup.LEFT
            ? item.leftFieldGroup!.push(field)
            : item.rightFieldGroup!.push(field);
        } else {
          (item.fields as IDynamicFormField[]).push(field);
        }
        formControl.index = item.order!;
      } else {
        const tabNewItem: IDynamicFormMainGroup = {
          order,
          name,
          fields: [],
          leftFieldGroup: [],
          rightFieldGroup: []
        };
        if (group) {
          group === IDynamicFormLateralGroup.LEFT
            ? tabNewItem.leftFieldGroup!.push(field)
            : tabNewItem.rightFieldGroup!.push(field);
        } else {
          (tabNewItem.fields as IDynamicFormField[]).push(field);
        }
        formControl.index = order;
        order++;
        mainGroupsFormatted.push(tabNewItem);
      }
    });
    mainGroupsFormatted = this.buildColumns(mainGroupsFormatted, columns!);
    formGroup.value = Object.keys(currentModel!).length ? currentModel! : model;
    if (formConfig.validators && formConfig.validators.length) {
      formGroup.validators = formConfig.validators;
    }
    return {
      mainGroupsFormatted,
      formGroup
    };
  }

  private buildColumns(
    mainGroups: IDynamicFormMainGroup[],
    columns?: number
  ): IDynamicFormMainGroup[] {
    let mainGroupsFormatted: IDynamicFormMainGroup[] = [];
    mainGroupsFormatted = mainGroups.map(group => {
      if (group.fields.length === 1) {
        if (!(group.fields as IDynamicFormField[])[0].flexConfig) {
          (group.fields as IDynamicFormField[])[0].flexConfig = {};
        }
        (group.fields as IDynamicFormField[])[0].flexConfig!.flex = 12;
        group.fields = [group.fields as IDynamicFormField[]];
      } else {
        group.fields = columns
          ? this.buildRowsByColumns(
              group.fields as IDynamicFormField[],
              columns
            )
          : this.buildRows(group.fields as IDynamicFormField[]);
      }
      return group;
    });
    return mainGroupsFormatted;
  }

  private buildRows(fields: IDynamicFormField[]): IDynamicFormField[][] {
    const rows: IDynamicFormField[][] = [];
    fields = fields.map((field, i) => {
      return field.flexConfig
        ? field.flexConfig.row
          ? field
          : {
              ...field,
              flexConfig: {
                ...field.flexConfig,
                row: i
              }
            }
        : { ...field, flexConfig: { row: i } };
    });
    const fieldsGroups = groupBy(
      fields,
      (field: IDynamicFormField) => field.flexConfig!.row
    );
    Object.keys(fieldsGroups).forEach(group => {
      rows.push(fieldsGroups[group]);
    });
    return rows;
  }

  private buildRowsByColumns(
    fields: IDynamicFormField[],
    columns: number
  ): IDynamicFormField[][] {
    const flex = Math.floor(12 / columns!) as
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12;
    fields.map(fieldItem => {
      if (!fieldItem.flexConfig) {
        fieldItem.flexConfig = {};
      }
      fieldItem.flexConfig!.flex = flex;
      return fieldItem;
    });
    return chunk(fields, columns!);
  }

  private formatValidations(
    field: IDynamicFormField
  ): IDynamicFormFormattedValidations {
    let errorMessages: IDynamicFormValidationErrors = {};
    let dynamicFormFormattedValidations: TDynamicFormValidatorFn[] = [];
    field.validators!.forEach(validation => {
      dynamicFormFormattedValidations.push(validation.validate());
      errorMessages[validation.name] = validation.message;
    });
    return {
      validations: dynamicFormFormattedValidations,
      errorMessages
    };
  }

  public validateAll(form: IDynamicFormGroup) {
    Object.keys(form.controls).forEach(key => {
      this.validateControl(form, key);
    });
  }

  public validateFormGroup(form: IDynamicFormGroup) {
    form.validators.forEach(validator => {
      const valid: boolean = validator.callback(form.value);
      validator.invalidFields.forEach(key => {
        if (!valid) {
          form.controls[key].errors = {
            ...form.controls[key].errors,
            [validator.errorName]: true
          };
          form.controls[key].errorMessages = {
            ...form.controls[key].errorMessages,
            [validator.errorName]: validator.message
          };
        } else {
          delete form.controls[key].errors![validator.errorName];
          delete form.controls[key].errorMessages![validator.errorName];
        }
        form.controls[key].valid = !Object.keys(form.controls[key].errors!)
          .length;
        form.invalidControls = Object.keys(form.controls[key].errors!).length
          ? [...form.invalidControls, key]
          : form.invalidControls.filter(controlkey => controlkey !== key);
        form.valid = !form.invalidControls.length;
      });
    });
  }

  public validateControl(form: IDynamicFormGroup, key: string) {
    const errors: IDynamicFormValidationErrors = this.validate(
      form.controls[key],
      form.value
    );
    form.controls[key].valid = !Object.keys(errors).length;
    form.controls[key].errors = errors;
    form.invalidControls = Object.keys(errors).length
      ? [...form.invalidControls, key]
      : form.invalidControls.filter(controlkey => controlkey !== key);
    form.valid = !form.invalidControls.length;
  }

  public validate(
    control: IDynamicFormControl,
    model: IDynamicFormModel
  ): IDynamicFormValidationErrors {
    let errors: IDynamicFormValidationErrors = {};
    control.validators.forEach(vaidation => {
      if (vaidation(control.value, model)) {
        const error: IDynamicFormValidationErrors = vaidation(
          control.value,
          model
        )!;
        errors = { ...errors, ...error };
      }
    });
    return errors;
  }
}

export default DynamicFormMixinComponent;

export interface IDynamicFormComponentProps {
  model?: IDynamicFormModel;
  formType?: EDynamicFormType;
  columns?: number | null;
  materialData?: IDynamicFormMaterialData;
  formatId?: string;
  formConfig: IDynamicFormConfig;
}

export interface IDynamicFormComponentState {
  mainGroupsFormatted: IDynamicFormMainGroup[];
  activeGroup: number;
  form: IDynamicFormGroup;
}
