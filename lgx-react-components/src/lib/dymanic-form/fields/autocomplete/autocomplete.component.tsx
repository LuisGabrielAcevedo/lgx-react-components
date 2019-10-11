import DynamicFormFieldComponent from "../dynamic-form-field-base.component";
import React from "react";
import deburr from "lodash/deburr";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Autosuggest from "react-autosuggest";
import cloneDeep from "lodash/cloneDeep";
import { IDynamicFormOption } from "../../dynamic-form.interfaces";

// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormHelperText from "@material-ui/core/FormHelperText";

function renderInputComponent(inputProps: any) {
  const { inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        }
      }}
      {...other}
    />
  );
}
// @ts-ignore
function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.name, query);
  const parts = parse(suggestion.name, matches);
  console.log(suggestion, query, isHighlighted);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, i: number) => (
          <span key={i} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value: string | object, options: IDynamicFormOption[]) {
  const inputValue = deburr(
    //@ts-ignore
    typeof value === "object" ? value["name"].trim() : value.trim()
  ).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : options.filter(option => {
        const keep =
          count < 5 &&
          option.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion: any) {
  return suggestion.name;
}

class AutocompleteComponent extends DynamicFormFieldComponent {
  private getValue = () => this.value() || (this.multiple() ? [] : "");
  componentDidMount() {
    this.loadOptions();
  }

  handleSuggestionsFetchRequested = (data: {
    value: string;
    reason: string;
  }) => {
    const options: IDynamicFormOption[] = cloneDeep(this.state.options);
    this.setState({ filteredOptions: options });
    console.log(getSuggestions(data.value, options));
    // setSuggestions(getSuggestions(value));
  };

  handleSuggestionsClearRequested = () => {
    // setSuggestions([]);
  };

  handleChange = (name: any) => (event: React.ChangeEvent<any>) => {
    this.setState({
      ...this.state,
      [name]: event.target.value
    });
  };

  render() {
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.filteredOptions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };
    return (
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          id: "react-autosuggest-simple",
          label: this.label(),
          placeholder: this.placeholder(),
          value: this.state.single,
          onChange: this.handleChange("single")
        }}
        renderSuggestionsContainer={(options: any) => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    );
  }
}

export default AutocompleteComponent;
