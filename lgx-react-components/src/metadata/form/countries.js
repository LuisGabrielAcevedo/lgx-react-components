import AdminSystem from "../../models/admin-system";
import {
  DynamicFormValidators,
  DynamicFormTextFieldComponent,
  DynamicFormEnumSelectComponent
} from "../../../../lib/index";

const countryForm = {
  fieldsConfig: [
    {
      name: "Name",
      key: "name",
      component: DynamicFormTextFieldComponent,
      validators: [
        DynamicFormValidators.required({
          message: "The field name is required"
        })
      ],
      flexConfig: {
        row: 1,
        flex: 6
      }
    },
    {
      name: "Capital",
      key: "capital",
      component: DynamicFormTextFieldComponent,
      flexConfig: {
        row: 1,
        flex: 6
      }
    },
    {
      name: "Code",
      key: "code",
      component: DynamicFormTextFieldComponent,
      flexConfig: {
        row: 2,
        flex: 6
      }
    },
    {
      name: "Languages",
      key: "languages",
      component: DynamicFormEnumSelectComponent,
      validators: [
        DynamicFormValidators.required({
          message: "The field languages is required"
        })
      ],
      options: {
        fieldOptions: async () => {
          const resp = await AdminSystem.urlParam("languages").find();
          return resp.data.map(item => {
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
      component: DynamicFormEnumSelectComponent,
      options: {
        fieldOptions: async () => {
          const resp = await AdminSystem.urlParam("currencies").find();
          return resp.data.map(item => {
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
  ]
};
export default countryForm;
