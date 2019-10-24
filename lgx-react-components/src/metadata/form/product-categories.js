import {
  DynamicFormValidators,
  DynamicFormTextFieldComponent,
  DynamicFormTextareaComponent
} from "../../../../lib/index";

const productCategoryForm = {
  fieldsConfig: [
    {
      name: "Name",
      key: "name",
      component: DynamicFormTextFieldComponent,
      validators: [
        DynamicFormValidators.required({
          message: "The field name is required"
        })
      ]
    },
    {
      name: "Description",
      key: "description",
      component: DynamicFormTextareaComponent
    }
  ]
};

export default productCategoryForm;
