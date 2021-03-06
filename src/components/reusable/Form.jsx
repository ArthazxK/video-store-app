import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

const Form = ({
  data: newData,
  formName,
  schema,
  inputProps,
  selectOptions,
  handleSubmitData,
}) => {
  const [data, setData] = useState(newData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData(newData);
  }, [newData]);

  const handleChange = ({ target: { name, value } }) => {
    const error = { ...errors };
    const errorMessage = validateProperty(name, value, schema);
    if (errorMessage) error[name] = errorMessage;
    else delete error[name];

    setData({ ...data, [name]: value });
    setErrors(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(data, schema);
    if (errors !== null) return setErrors(errors);
    const error = await handleSubmitData(data);

    if (!error) return;
    const errorList = { ...errors };
    errorList.username = error;
    setErrors(errorList);
  };

  const validate = (data) => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    error.details.forEach((e) => (errors[e.path] = e.message));
    return errors;
  };

  const validateProperty = (name, value) => {
    const obj = { [name]: value };

    const newSchema = { [name]: schema[name] };

    const { error } = Joi.validate(obj, newSchema);

    return error ? error.details[0].message : null;
  };
  return (
    <div>
      <h1>{formName}</h1>
      <form onSubmit={handleSubmit}>
        {inputProps.map((input) => (
          <Input
            key={input.name}
            value={data[input.name]}
            name={input.name}
            id={input.name}
            onChange={handleChange}
            error={errors[input.name]}
            label={input.label}
            type={input.type}
          />
        ))}
        {selectOptions && (
          <Select
            key={selectOptions.name}
            value={data[selectOptions.name]}
            name={selectOptions.name}
            id={selectOptions.name}
            onChange={handleChange}
            error={errors[selectOptions.name]}
            label={selectOptions.label}
            options={selectOptions.options}
          />
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={validate(data) !== null ? true : false}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
