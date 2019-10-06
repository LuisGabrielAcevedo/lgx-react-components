import { Component } from "react";
import {
  IDynamicFormModel,
  IDynamicFormMaterialData,
  IDynamicFormField,
  IDynamicFormMainGroup,
  IDynamicFormFormatFieldsResponse,
  IDynamicFormLateralGroup,
  EDynamicFormType
} from "./dynamic-form.interfaces";
import chunk from "lodash/chunk";
import groupBy from "lodash/groupBy";

class DynamicFormMixinComponent extends Component<
  IDynamicFormComponentProps,
  IDynamicFormComponentState
> {
  public static defaultProps: IDynamicFormComponentProps = {
    columns: 3,
    fieldsConfig: [],
    formType: EDynamicFormType.tabs,
    materialData: {}
  };

  constructor(public props: IDynamicFormComponentProps) {
    super(props);
    this.state = {
      groupIndexes: {},
      mainGroupsFormatted: [],
      activeGroup: 0,
      form: {}
    };
  }

  public formatFieldsAction(
    fieldsConfig: IDynamicFormField[],
    form: any,
    columns?: number
  ): IDynamicFormFormatFieldsResponse {
    let mainGroupsFormatted: IDynamicFormMainGroup[] = [];
    let order: number = 0;
    let groupIndexes: { [key: string]: number } = {};
    fieldsConfig.forEach(field => {
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
          group === IDynamicFormLateralGroup.left
            ? item.leftFieldGroup!.push(field)
            : item.rightFieldGroup!.push(field);
        } else {
          (item.fields as IDynamicFormField[]).push(field);
        }
        groupIndexes[field.key] = item.order!;
      } else {
        const tabNewItem: IDynamicFormMainGroup = {
          order,
          name,
          fields: [],
          leftFieldGroup: [],
          rightFieldGroup: []
        };
        if (group) {
          group === IDynamicFormLateralGroup.left
            ? tabNewItem.leftFieldGroup!.push(field)
            : tabNewItem.rightFieldGroup!.push(field);
        } else {
          (tabNewItem.fields as IDynamicFormField[]).push(field);
        }
        groupIndexes[field.key] = order;
        order++;
        mainGroupsFormatted.push(tabNewItem);
      }
    });
    mainGroupsFormatted = this.buildColumns(mainGroupsFormatted, columns);
    return {
      mainGroupsFormatted,
      groupIndexes
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
        (group.fields as IDynamicFormField[])[0].flexConfig!.flex = 100;
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
    const flex: number = Math.floor(100 / columns!);
    fields.map(fieldItem => {
      if (!fieldItem.flexConfig) {
        fieldItem.flexConfig = {};
      }
      fieldItem.flexConfig!.flex = flex;
      return fieldItem;
    });
    return chunk(fields, columns!);
  }
}

export default DynamicFormMixinComponent;

export interface IDynamicFormComponentProps {
  model?: IDynamicFormModel;
  formType?: EDynamicFormType;
  columns?: number;
  materialData?: IDynamicFormMaterialData;
  formatId?: string;
  fieldsConfig: IDynamicFormField[];
}

export interface IDynamicFormComponentState {
  groupIndexes: object;
  mainGroupsFormatted: IDynamicFormMainGroup[];
  activeGroup: number;
  form: {};
}
