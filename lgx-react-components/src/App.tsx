import React, { Component } from "react";
import DynamicFormComponent from "./lib/dymanic-form/dynamic-form.component";
import countryFields from "./metadata/admin-system/form/countries";
// import { Country } from "./models/admin-system/countries";
// import { ILgxResponse } from "lgx-axios-dev-tools";

class App extends Component {
  public form!: DynamicFormComponent;
  state = {
    country: {}
  };

  componentDidMount() {
    this.loadCountry();
  }

  async loadCountry() {
    // const resp: ILgxResponse = await Country.findById(
    //   "5d80f84db1c0940017f88dfa"
    // );
    // this.setState({ country: resp.data });
  }

  public async submit() {
    // const resp = await this.form.submit();
  }

  render() {
    return (
      <div className="App">
        <DynamicFormComponent
          ref={form => {
            this.form = form!;
          }}
          fieldsConfig={countryFields}
          model={this.state.country}
        ></DynamicFormComponent>
      </div>
    );
  }
}

export default App;
