import { DynamicTableTextComponent } from "../../../../lib/index";

const productHeaders = [
  {
    label: "Nombre",
    key: "name",
    component: DynamicTableTextComponent,
    sortable: "name"
  },
  {
    label: "Empresa",
    key: "company.name",
    component: DynamicTableTextComponent,
    sortable: "company"
  },
  {
    label: "Price",
    key: "basePrice/a/$",
    component: DynamicTableTextComponent,
    sortable: "basePrice"
  }
];

export default productHeaders;
