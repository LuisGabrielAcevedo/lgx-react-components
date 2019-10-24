import DynamicFormFieldComponent from "../dynamic-form-field-base.component";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";

class SwitchComponent extends DynamicFormFieldComponent {
  getValue = () => this.value() || false;

  render() {
    const error = this.invalid() ? (
      <FormHelperText error={this.invalid()}>
        {this.errorMessage()}
      </FormHelperText>
    ) : null;

    return (
      <FormControl fullWidth>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              value={this.getValue()}
              onChange={this.handleChangeCheked}
            />
          }
          label={this.label()}
          className={this.invalid() ? "form-error" : ""}
        />
        {error}
      </FormControl>
    );
  }
}

export default SwitchComponent;
