import { DynamicTableTextComponent } from "../../../../lib/index";

const vendorHeaders = [
  {
    label: "Empresa",
    key: "company.name",
    component: DynamicTableTextComponent
  },
  {
    label: "Nombre",
    key: "name",
    component: DynamicTableTextComponent
  },
  {
    label: "Email",
    key: "email",
    component: DynamicTableTextComponent
  },
  {
    label: "Phone",
    key: "phone",
    component: DynamicTableTextComponent
  }
];

export default vendorHeaders;
