import DynamicFormFieldComponent from "../dynamic-form-field-base.component";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormHelperText from "@material-ui/core/FormHelperText";

class SwitchComponent extends DynamicFormFieldComponent {
  private getValue = () => this.value() || false;

  render() {
    const error = this.errorValue() ? (
      <FormHelperText error={this.errorValue()}>
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
          className={this.errorValue() ? "form-error" : ""}
        />
        {error}
      </FormControl>
    );
  }
}

export default SwitchComponent;
