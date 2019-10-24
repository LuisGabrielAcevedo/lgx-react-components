import { DynamicTableTextComponent } from "../../../../lib/index";

const customerHeaders = [
  {
    label: "Nombre completo",
    key: "firstName,lastName",
    component: DynamicTableTextComponent
  },
  {
    label: "Email",
    key: "email",
    component: DynamicTableTextComponent
  }
];

export default customerHeaders;
