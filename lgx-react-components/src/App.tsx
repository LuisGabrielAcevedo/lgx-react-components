import React, { Component } from "react";
import DynamicFormComponent from "./lib/dymanic-form/dynamic-form.component";
import userForm from "./metadata/admin-system/form/users";

class App extends Component {
  public form!: DynamicFormComponent;
  state = {
    user: {}
  };

  componentDidMount() {
    this.loadCountry();
  }

  async loadCountry() {
    // const resp: ILgxResponse = await Country.findById(
    //   // @ts-ignore
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
          formConfig={userForm}
          model={this.state.user}
        ></DynamicFormComponent>
      </div>
    );
  }
}

export default App;
