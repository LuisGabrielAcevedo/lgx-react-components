import React, { Component } from "react";
import { ELgxSortDirection, ILgxResponse } from "lgx-axios-dev-tools";
import { Product } from "./models/admin-system/products";
import DynamicFormComponent from "./lib/dymanic-form/dynamic-form.component";
import countryFields from "./metadata/admin-system/form/countries";

class App extends Component {
  public page = 1;
  public perPage = 10;
  state = {
    products: []
  };

  componentDidMount() {
    this.loadProducts();
  }

  public async loadProducts() {
    const resp: ILgxResponse = await Product.page(this.page)
      .perPage(this.perPage)
      .orderBy("updateAt", ELgxSortDirection.DESC)
      .find();

    this.setState({
      products: resp.data
    });
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  changePerPage(perPage: number) {
    this.perPage = perPage;
    this.loadProducts();
  }

  render() {
    return (
      <div className="App">
        <DynamicFormComponent
          fieldsConfig={countryFields}
        ></DynamicFormComponent>
      </div>
    );
  }
}

export default App;
