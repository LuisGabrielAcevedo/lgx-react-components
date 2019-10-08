import DynamicFormFieldComponent from "../dynamic-form-field-base.component";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";

class TextFieldComponent extends DynamicFormFieldComponent {
  private getValue() {
    return this.value() || "";
  }

  render() {
    const value = this.getValue();

    const error = this.errorValue ? (
      <FormHelperText error={this.errorValue}>
        {this.errorMessage()}
      </FormHelperText>
    ) : null;

    return (
      <FormControl fullWidth>
        <InputLabel htmlFor={this.label()}>{this.label()}</InputLabel>
        <Input
          placeholder={this.placeholder()}
          value={value}
          onChange={this.handleChange}
          disabled={this.disableValue}
          onBlur={this.handleChange}
          error={this.errorValue}
        />
        {error}
      </FormControl>
    );
  }
}

export default TextFieldComponent;
