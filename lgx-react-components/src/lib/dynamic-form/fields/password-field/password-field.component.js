import React from "react";
import DynamicFormFieldComponent from "../dynamic-form-field-base.component";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

class PasswordFieldComponent extends DynamicFormFieldComponent {
  getValue = () => this.value() || "";

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const showPassword = this.state.showPassword;
    const error = this.invalid() ? (
      <FormHelperText error={this.invalid()}>
        {this.errorMessage()}
      </FormHelperText>
    ) : null;

    return (
      <FormControl fullWidth>
        <InputLabel htmlFor={this.label()}>{this.label()}</InputLabel>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={this.placeholder()}
          value={this.getValue()}
          onChange={this.handleChange}
          disabled={this.disableValue}
          onBlur={this.handleFocus}
          error={this.invalid()}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {error}
      </FormControl>
    );
  }
}

export default PasswordFieldComponent;
