import { DynamicTableTextComponent } from "../../../../lib/index";

const roomHeaders = [
  {
    label: "Empresa",
    key: "company.name",
    component: DynamicTableTextComponent
  },
  {
    label: "Nombre",
    key: "name",
    component: DynamicTableTextComponent
  }
];

export default roomHeaders;
