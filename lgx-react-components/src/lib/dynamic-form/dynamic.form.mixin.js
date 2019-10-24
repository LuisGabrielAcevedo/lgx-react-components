import { Component } from "react";
import PropTypes from "prop-types";
import {
  DynamicTableTabsFormComponent,
  defaultDynamicFormControl,
  defaultDynamicFormGroup,
  DynamicTableLeft
} from "./constants/index";
import chunk from "lodash/chunk";
import groupBy from "lodash/groupBy";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";

class DynamicFormMixinComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainGroupsFormatted: [],
      activeGroup: 0,
      form: cloneDeep(defaultDynamicFormGroup)
    };
  }

  formatFieldsAction(formConfig, currentModel, columns) {
    let mainGroupsFormatted = [];
    let model = {};
    let formGroup = cloneDeep(defaultDynamicFormGroup);
    let order = 0;
    formConfig.fieldsConfig.forEach(field => {
      let formControl = cloneDeep(defaultDynamicFormControl);
      formControl.key = field.key;
      formControl.value = currentModel[field.key] || field.defaultValue || null;

      if (field.validators) {
        const formattedValidationsResp = this.formatValidations(field);
        formControl.validators = formattedValidationsResp.validations;
        formControl.errorMessages = formattedValidationsResp.errorMessages;
      }

      formGroup.controls[field.key] = formControl;

      model = set(model, field.key, field.defaultValue || null);

      const tab = field.mainGroup;
      const name = tab || "Default tab";
      const group = field.flexConfig ? field.flexConfig.group : undefined;
      const item = mainGroupsFormatted.find(
        tabFormatted => tabFormatted.name === name
      );
      if (item) {
        if (group) {
          group === DynamicTableLeft
            ? item.leftFieldGroup.push(field)
            : item.rightFieldGroup.push(field);
        } else {
          item.fields.push(field);
        }
        formControl.index = item.order;
      } else {
        const tabNewItem = {
          order,
          name,
          fields: [],
          leftFieldGroup: [],
          rightFieldGroup: []
        };
        if (group) {
          group === DynamicTableLeft
            ? tabNewItem.leftFieldGroup.push(field)
            : tabNewItem.rightFieldGroup.push(field);
        } else {
          tabNewItem.fields.push(field);
        }
        formControl.index = order;
        order++;
        mainGroupsFormatted.push(tabNewItem);
      }
    });
    mainGroupsFormatted = this.buildColumns(mainGroupsFormatted, columns);
    formGroup.value = Object.keys(currentModel).length ? currentModel : model;
    if (formConfig.validators && formConfig.validators.length) {
      formGroup.validators = formConfig.validators;
    }
    return {
      mainGroupsFormatted,
      formGroup
    };
  }

  buildColumns(mainGroups, columns) {
    let mainGroupsFormatted = [];
    mainGroupsFormatted = mainGroups.map(group => {
      if (group.fields.length === 1) {
        if (!group.fields[0].flexConfig) {
          group.fields[0].flexConfig = {};
        }
        group.fields[0].flexConfig.flex = 12;
        group.fields = [group.fields];
      } else {
        group.fields = columns
          ? this.buildRowsByColumns(group.fields, columns)
          : this.buildRows(group.fields);
      }
      return group;
    });
    return mainGroupsFormatted;
  }

  buildRows(fields) {
    const rows = [];
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
    const fieldsGroups = groupBy(fields, field => field.flexConfig.row);
    Object.keys(fieldsGroups).forEach(group => {
      rows.push(fieldsGroups[group]);
    });
    return rows;
  }

  buildRowsByColumns(fields, columns) {
    const flex = Math.floor(12 / columns);
    fields.map(fieldItem => {
      if (!fieldItem.flexConfig) {
        fieldItem.flexConfig = {};
      }
      fieldItem.flexConfig.flex = flex;
      return fieldItem;
    });
    return chunk(fields, columns);
  }

  formatValidations(field) {
    let errorMessages = {};
    let dynamicFormFormattedValidations = [];
    field.validators.forEach(validation => {
      dynamicFormFormattedValidations.push(validation.validate());
      errorMessages[validation.name] = validation.message;
    });
    return {
      validations: dynamicFormFormattedValidations,
      errorMessages
    };
  }

  validateAll(form) {
    Object.keys(form.controls).forEach(key => {
      this.validateControl(form, key);
    });
  }

  validateFormGroup(form) {
    form.validators.forEach(validator => {
      const valid = validator.callback(form.value);
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
          delete form.controls[key].errors[validator.errorName];
          delete form.controls[key].errorMessages[validator.errorName];
        }
        form.controls[key].valid = !Object.keys(form.controls[key].errors)
          .length;
        form.invalidControls = Object.keys(form.controls[key].errors).length
          ? [...form.invalidControls, key]
          : form.invalidControls.filter(controlkey => controlkey !== key);
        form.valid = !form.invalidControls.length;
      });
    });
  }

  validateControl(form, key) {
    const errors = this.validate(form.controls[key], form.value);
    form.controls[key].valid = !Object.keys(errors).length;
    form.controls[key].errors = errors;
    form.invalidControls = Object.keys(errors).length
      ? [...form.invalidControls, key]
      : form.invalidControls.filter(controlkey => controlkey !== key);
    form.valid = !form.invalidControls.length;
  }

  validate(control, model) {
    let errors = {};
    control.validators.forEach(vaidation => {
      if (vaidation(control.value, model)) {
        const error = vaidation(control.value, model);
        errors = { ...errors, ...error };
      }
    });
    return errors;
  }
}

DynamicFormMixinComponent.propTypes = {
  model: PropTypes.object,
  formType: PropTypes.string,
  columns: PropTypes.number,
  materialData: PropTypes.object,
  formConfig: PropTypes.object
};

DynamicFormMixinComponent.defaultProps = {
  columns: null,
  formConfig: {
    fieldsConfig: []
  },
  formType: DynamicTableTabsFormComponent,
  materialData: {},
  model: {}
};

export default DynamicFormMixinComponent;
