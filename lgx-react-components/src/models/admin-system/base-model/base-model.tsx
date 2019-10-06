import { Model, ILgxQueryConfig } from "lgx-axios-dev-tools";

export class BaseModel extends Model {
    public queryConfig: ILgxQueryConfig = {
        orderBy: "sort",
        with: "populate",
        per_page: "itemsPerPage"
    };

    public baseUrl(): string {
        // return 'http://localhost:3500/api/v1';
        return "https://adminsystemnodeserver.herokuapp.com/api/v1";
    }
}