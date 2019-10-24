import {
  DynamicFormValidators,
  DynamicFormTextFieldComponent,
  DynamicFormPasswordFieldComponent
} from "../../lib/index";

const userForm = {
  fieldsConfig: [
    {
      name: "First name",
      key: "first_name",
      component: DynamicFormTextFieldComponent,
      validators: [
        DynamicFormValidators.required({
          message: "The field first name is required"
        })
      ]
    },
    {
      name: "Last name",
      key: "last_name",
      component: DynamicFormTextFieldComponent,
      validators: [
        DynamicFormValidators.required({
          message: "The field last name is required"
        })
      ]
    },
    {
      name: "Email",
      key: "email",
      component: DynamicFormTextFieldComponent,
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
      component: DynamicFormPasswordFieldComponent,
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
      component: DynamicFormPasswordFieldComponent,
      validators: [
        DynamicFormValidators.required({ message: "The confirm is required" }),
        DynamicFormValidators.confirm("password")
      ],
      options: {
        placeholder: "Confirm your password"
      }
    }
  ]
};

export default userForm;
