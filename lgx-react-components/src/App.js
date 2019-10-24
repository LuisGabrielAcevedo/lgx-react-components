import React from "react";
import "./App.css";
import userForm from "./metadata/form/users";
import { DynamicFormComponent, DynamicFormFilledAppearance } from "./lib/index";

function App() {
  return (
    <div className="App">
      <DynamicFormComponent
        formConfig={userForm}
        materialData={{
          appearance: DynamicFormFilledAppearance
        }}
      />
    </div>
  );
}

export default App;
