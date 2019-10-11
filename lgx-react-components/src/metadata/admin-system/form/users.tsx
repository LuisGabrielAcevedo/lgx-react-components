import { Company } from "../../../models/admin-system/companies";
import { Application } from "../../../models/admin-system/applications";
import { Role } from "../../../models/admin-system/roles";
import { Store } from "../../../models/admin-system/stores";
import {
  EDynamicFormFieldTypes,
  IDynamicFormLateralGroup,
  DynamicFormValidators,
  IDynamicFormConfig,
  IDynamicFormModel
} from "../../../lib";
import { ILgxResponse } from "lgx-axios-dev-tools";

const userForm: IDynamicFormConfig = {
  fieldsConfig: [
    {
      name: "Profile image",
      key: "profileImageFile",
      component: EDynamicFormFieldTypes.image,
      mainGroup: "App info",
      flexConfig: {
        group: IDynamicFormLateralGroup.LEFT
      }
    },
    {
      name: "Company",
      key: "company",
      component: EDynamicFormFieldTypes.asyncAutocomplete,
      mainGroup: "App info",
      flexConfig: {
        row: 1,
        flex: 12
      },
      options: {
        placeholder: "Select a company",
        fieldOptions: async arg => {
          const resp: ILgxResponse = await Company.option("search", arg).find();
          return resp.data;
        },
        associationText: "name",
        associationValue: "_id"
      }
    },
    {
      name: "Application",
      key: "application",
      component: EDynamicFormFieldTypes.autocomplete,
      mainGroup: "App info",
      flexConfig: {
        row: 2,
        flex: 6
      },
      options: {
        fieldOptions: async arg => {
          const resp: ILgxResponse = arg
            ? await Application.filter("company", arg).find()
            : await Application.find();
          return resp.data;
        },
        placeholder: "Select a application",
        associationText: "name",
        associationValue: "_id"
      }
    },
    {
      name: "Application role",
      key: "applicationRole",
      component: EDynamicFormFieldTypes.enumSelect,
      mainGroup: "App info",
      flexConfig: {
        row: 2,
        flex: 6
      },
      options: {
        placeholder: "Select a language",
        fieldOptions: async () => [
          { text: "Admin", value: "ADMIN" },
          { text: "User", value: "USER" }
        ]
      }
    },
    {
      name: "Active user",
      key: "isActive",
      component: EDynamicFormFieldTypes.switch,
      validators: [DynamicFormValidators.required()],
      mainGroup: "App info",
      flexConfig: {
        row: 3,
        flex: 3
      }
    },
    {
      name: "First name",
      key: "firstName",
      component: EDynamicFormFieldTypes.textField,
      mainGroup: "Basic info",
      flexConfig: {
        row: 2,
        flex: 6
      },
      validators: [
        DynamicFormValidators.required({
          message: "The field first name is required."
        })
      ],
      options: {
        placeholder: "Write your fisrt name"
      }
    },
    {
      name: "Last name",
      key: "lastName",
      component: EDynamicFormFieldTypes.textField,
      mainGroup: "Basic info",
      flexConfig: {
        row: 2,
        flex: 6
      },
      validators: [DynamicFormValidators.required()],
      options: {
        placeholder: "Write your last name"
      }
    },
    {
      name: "User name",
      key: "userName",
      component: EDynamicFormFieldTypes.textField,
      mainGroup: "Basic info",
      flexConfig: {
        row: 1,
        flex: 12
      },
      options: {
        placeholder: "Write your user name"
      }
    },
    {
      name: "Document type",
      key: "userInformation.documentType",
      component: EDynamicFormFieldTypes.enumSelect,
      mainGroup: "Basic info",
      flexConfig: {
        row: 3,
        flex: 2
      },
      options: {
        placeholder: "Select a type of document",
        fieldOptions: async () => [
          { value: "DNI", text: "Dni" },
          { value: "E", text: "Dni Extranjero" }
        ]
      }
    },
    {
      name: "Document number",
      key: "userInformation.documentNumber",
      component: EDynamicFormFieldTypes.textField,
      mainGroup: "Basic info",
      validators: [
        DynamicFormValidators.required({ message: "The field dni is required" })
      ],
      flexConfig: {
        row: 3,
        flex: 4
      },
      options: {
        placeholder: "Write your document number"
      }
    },
    {
      name: "Birthdate",
      key: "userInformation.birthdate",
      component: EDynamicFormFieldTypes.datepicker,
      mainGroup: "Basic info",
      flexConfig: {
        row: 3,
        flex: 6
      },
      options: {
        placeholder: "White your birthdate"
      }
    },
    {
      name: "Gender",
      key: "userInformation.gender",
      component: EDynamicFormFieldTypes.radioGroup,
      mainGroup: "Basic info",
      validators: [DynamicFormValidators.required()],
      flexConfig: {
        row: 4,
        flex: 12
      },
      options: {
        fieldOptions: async () => [
          { text: "Male", value: "male" },
          { text: "Female", value: "female" }
        ]
      }
    },
    {
      name: "Email",
      key: "email",
      component: EDynamicFormFieldTypes.textField,
      mainGroup: "Basic info",
      validators: [
        DynamicFormValidators.required({ message: "The email is required" }),
        DynamicFormValidators.email()
      ],
      options: {
        placeholder: "Write your email"
      }
    },
    {
      name: "Password",
      key: "password",
      component: EDynamicFormFieldTypes.passwordField,
      mainGroup: "Basic info",
      validators: [
        DynamicFormValidators.required({
          message: "The field password is required"
        }),
        DynamicFormValidators.minLength(10),
        DynamicFormValidators.hasNumber(),
        DynamicFormValidators.hasCapitalCase(),
        DynamicFormValidators.hasSpecialCharacters(),
        DynamicFormValidators.hasSmallCase()
      ],
      options: {
        placeholder: "Write your password"
      }
    },
    {
      name: "Confirm password",
      key: "confirm_password",
      component: EDynamicFormFieldTypes.passwordField,
      mainGroup: "Basic info",
      validators: [
        DynamicFormValidators.required({ message: "The confirm is required" }),
        DynamicFormValidators.confirm("password")
      ],
      options: {
        placeholder: "Confirm your password"
      }
    },
    {
      name: "Phone",
      key: "userInformation.phone",
      component: EDynamicFormFieldTypes.textField,
      mainGroup: "More info",
      flexConfig: {
        row: 2,
        flex: 6
      },
      options: {
        placeholder: "Write your phone"
      }
    },
    {
      name: "Note",
      key: "userInformation.note",
      component: EDynamicFormFieldTypes.textarea,
      mainGroup: "More info",
      flexConfig: {
        row: 3,
        flex: 12
      },
      validators: [
        DynamicFormValidators.required({
          message: "The field note is required."
        })
      ],
      options: {
        placeholder: "Additional Information"
      }
    },
    {
      name: "Role",
      key: "role",
      component: EDynamicFormFieldTypes.autocomplete,
      mainGroup: "Basic info",
      options: {
        placeholder: "Select a role",
        fieldOptions: async arg => {
          const resp: ILgxResponse = arg
            ? await Role.filter("company", arg).find()
            : await Role.find();
          return resp.data;
        },
        associationText: "name",
        associationValue: "_id",
        depend: "company"
      }
    },
    {
      name: "Current store",
      key: "userConfigurations.currentStore",
      component: EDynamicFormFieldTypes.autocomplete,
      mainGroup: "Configurations",
      options: {
        placeholder: "Select a store",
        fieldOptions: async arg => {
          const resp: ILgxResponse = (await arg)
            ? Store.filter("company", arg).find()
            : await Store.find();
          return resp.data;
        },
        associationText: "name",
        associationValue: "_id",
        depend: "company"
      }
    },
    {
      name: "Language",
      key: "userConfigurations.language",
      component: EDynamicFormFieldTypes.enumSelect,
      mainGroup: "Configurations",
      options: {
        placeholder: "Select a language",
        fieldOptions: async () => [
          { text: "Spanish", value: "es" },
          { text: "English", value: "en" }
        ]
      }
    }
  ],
  validators: [
    {
      message: "The type of dni is invalid.",
      errorName: "typeDni",
      invalidFields: ["userInformation.documentNumber"],
      callback: (model: IDynamicFormModel) => {
        const dni: number = model.userInformation.documentNumber;
        const type: string = model.userInformation.documentType;
        if (!dni || !type) return true;
        return (
          (type === "DNI" && dni < 90000000) ||
          (type === "E" && dni >= 90000000)
        );
      }
    }
  ]
};

export default userForm;
