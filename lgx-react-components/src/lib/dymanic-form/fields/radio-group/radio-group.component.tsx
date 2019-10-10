import DynamicFormFieldComponent from "../dynamic-form-field-base.component";
import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

class RadioGroupComponent extends DynamicFormFieldComponent {
  private getValue = () => this.value() || "";
  componentDidMount() {
    this.loadOptions();
  }

  render() {
    const error = this.errorValue() ? (
      <FormHelperText error={this.errorValue()}>
        {this.errorMessage()}
      </FormHelperText>
    ) : null;
    return (
      <FormControl fullWidth>
        <FormLabel
          className={this.errorValue() ? "form-error" : ""}
          component="legend"
        >
          {this.label()}
        </FormLabel>
        <RadioGroup row value={this.getValue()} onChange={this.handleChange}>
          {this.state.options.map((option, i) => (
            <FormControlLabel
              key={i}
              value={option[this.associationValue()]}
              control={<Radio color="primary" />}
              label={option[this.associationText()]}
              className={this.errorValue() ? "form-error" : ""}
            />
          ))}
        </RadioGroup>
        {error}
      </FormControl>
    );
  }
}

export default RadioGroupComponent;
