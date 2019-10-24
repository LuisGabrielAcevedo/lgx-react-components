export class DynamicFormValidator {
  _name;
  _message;
  _validateFn;

  constructor(name, message, validate) {
    this._name = name;
    this._message = message;
    this._validateFn = validate;
  }

  get name() {
    return this._name;
  }

  get message() {
    return this._message;
  }

  get validate() {
    return this._validateFn;
  }
}
