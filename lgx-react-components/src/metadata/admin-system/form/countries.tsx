import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "../../../lib/dymanic-form/dynamic-form.interfaces";
import AdminSystem from "../../../models/admin-system/admin-system";
import { ILgxResponse } from "lgx-axios-dev-tools";

const countryFields: IDynamicFormField[] = [
  {
    name: "Name",
    key: "name",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Capital",
    key: "capital",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Code",
    key: "code",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 2,
      flex: 50
    }
  },
  {
    name: "Languages",
    key: "languages",
    component: EDynamicFormFieldTypes.enumSelect,
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
      flex: 50
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
      flex: 50
    }
  }
];
export default countryFields;
