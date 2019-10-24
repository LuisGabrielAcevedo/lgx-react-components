export class DynamicFormValidationsFunctions {
  static requiredValidator(error) {
    return (value, model) => {
      let valid = value;
      if (Array.isArray(value)) valid = value.length;
      return valid ? null : error;
    };
  }

  static minLengthValidator(limit, error) {
    return (value, model) => {
      if (!value) return null;
      const valid = value.length >= limit;
      return valid ? null : error;
    };
  }

  static maxLengthValidator(limit, error) {
    return (value, model) => {
      if (!value) return null;
      const valid = value.length < limit;
      return valid ? null : error;
    };
  }

  static minValidator(limit, error) {
    return (value, model) => {
      if (!value) return null;
      const valid = value >= limit;
      return valid ? null : error;
    };
  }

  static maxValidator(limit, error) {
    return (value, model) => {
      if (!value) return null;
      const valid = value <= limit;
      return valid ? null : error;
    };
  }

  static patternValidator(regex, error) {
    return (value, model) => {
      if (!value) return null;
      const valid = regex.test(value);
      return valid ? null : error;
    };
  }

  static confirmValidator(key, error) {
    return (value, model) => {
      if (!value) return null;
      const valid = value === model[key];
      return valid ? null : error;
    };
  }

  static digitsValidator(digits, error) {
    return (value, model) => {
      if (!value) return null;
      const valid = value.length === +digits;
      return valid ? null : error;
    };
  }
}
