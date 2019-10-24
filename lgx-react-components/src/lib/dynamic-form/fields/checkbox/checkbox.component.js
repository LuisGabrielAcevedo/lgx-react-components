import React from "react";
import DynamicFormFieldComponent from "../dynamic-form-field-base.component";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

class CheckboxComponent extends DynamicFormFieldComponent {
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
            <Checkbox
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

export default CheckboxComponent;
