import React, { Component } from "react";
import { DynamicFormComponent, TitleBarComponent } from "./lib";
import userForm from "./metadata/admin-system/form/users";
import Fab from "@material-ui/core/Fab";

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
        <TitleBarComponent
          title="User"
          right={
            <div>
              <Fab size="small" color="primary">
                check
              </Fab>
              <Fab size="small" color="primary">
                close
              </Fab>
            </div>
          }
        />
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
