import { Model } from "lgx-axios-dev-tools";

export class AdminSystemBaseModel extends Model {
  queryConfig = {
    orderBy: "sort",
    with: "populate",
    per_page: "itemsPerPage"
  };

  baseUrl() {
    // return "http://localhost:3500/api/v1";
    return "https://adminsystemnodeserver.herokuapp.com/api/v1";
  }
}
