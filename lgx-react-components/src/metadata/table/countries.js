import { DynamicTableTextComponent } from "../../../../lib/index";

const countryHeaders = [
  {
    label: "Pais",
    key: "name",
    component: DynamicTableTextComponent
  },
  {
    label: "Lenguaje",
    key: "language",
    component: DynamicTableTextComponent
  },
  {
    label: "Moneda",
    key: "currency",
    component: DynamicTableTextComponent
  }
];

export default countryHeaders;
