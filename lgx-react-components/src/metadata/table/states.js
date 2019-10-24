import { DynamicTableTextComponent } from "../../../../lib/index";

const stateHeaders = [
  {
    label: "Name",
    key: "name",
    component: DynamicTableTextComponent
  },
  {
    label: "Country",
    key: "country.name",
    component: DynamicTableTextComponent
  }
];

export default stateHeaders;
