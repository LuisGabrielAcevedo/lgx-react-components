import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "../../../lib/dymanic-form/dynamic-form.interfaces";
import AdminSystem from "../../../models/admin-system/admin-system";
import { ILgxResponse } from "lgx-axios-dev-tools";
import DynamicFormValidators from "../../../lib/dymanic-form/validation/dynamic-form-validators";

const countryFields: IDynamicFormField[] = [
  {
    name: "Name",
    key: "name",
    component: EDynamicFormFieldTypes.textField,
    validators: [DynamicFormValidators.required()],
    flexConfig: {
      row: 1,
      flex: 6
    }
  },
  {
    name: "Capital",
    key: "capital",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 6
    }
  },
  {
    name: "Code",
    key: "code",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 2,
      flex: 6
    }
  },
  {
    name: "Languages",
    key: "languages",
    component: EDynamicFormFieldTypes.enumSelect,
    validators: [DynamicFormValidators.required()],
    options: {
      fieldOptions: async () => {
        const resp: ILgxResponse = await AdminSystem.urlParam(
          "languages"
        ).find();
        return resp.data.map((item: any) => {
          return {
            text: item.name,
            value: item.id
          };
        });
      },
      multiple: true
    },
    flexConfig: {
      row: 2,
      flex: 6
    }
  },
  {
    name: "Currencies",
    key: "currencies",
    component: EDynamicFormFieldTypes.enumSelect,
    options: {
      fieldOptions: async () => {
        const resp: ILgxResponse = await AdminSystem.urlParam(
          "currencies"
        ).find();
        return resp.data.map((item: any) => {
          return {
            text: item.symbol,
            value: item.id
          };
        });
      },
      multiple: true
    },
    flexConfig: {
      row: 3,
      flex: 6
    }
  }
];
export default countryFields;
