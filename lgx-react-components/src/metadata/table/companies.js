import { DynamicTableTextComponent } from "../../../../lib/index";

const companyHeaders = [
  {
    label: "",
    key: "profileImage.url",
    component: "TableImageComponent"
  },
  {
    label: "Nombre",
    key: "name",
    component: DynamicTableTextComponent
  },
  {
    label: "Pais",
    key: "country.name",
    component: DynamicTableTextComponent
  }
];

export default companyHeaders;
