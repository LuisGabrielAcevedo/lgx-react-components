import React from "react";
import FormControl from "@material-ui/core/FormControl";
import DynamicFormFieldComponent from "../dynamic-form-field-base.component";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

class EnumSelectComponent extends DynamicFormFieldComponent {
  componentDidMount() {
    this.loadOptions();
  }

  private getValue() {
    return this.value() || (this.multiple() ? [] : "");
  }

  render() {
    const value = this.getValue();

    const error = this.errorValue() ? (
      <FormHelperText error={this.errorValue()}>
        {this.errorMessage()}
      </FormHelperText>
    ) : null;

    return (
      <FormControl fullWidth>
        <InputLabel htmlFor={this.label()}>{this.label()}</InputLabel>
        <Select
          multiple={this.multiple()}
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleChange}
          error={this.errorValue()}
          renderValue={(formattedValue: any) =>
            this.multiple() ? formattedValue.join(",") : formattedValue
          }
        >
          {this.state.options.map((option, i: number) => (
            <MenuItem key={i} value={option[this.associationValue()]}>
              {this.multiple() ? (
                <Checkbox
                  color="primary"
                  checked={value.indexOf(option[this.associationValue()]) > -1}
                />
              ) : null}
              <ListItemText primary={option[this.associationText()]} />
            </MenuItem>
          ))}
        </Select>
        {error}
      </FormControl>
    );
  }
}

export default EnumSelectComponent;
